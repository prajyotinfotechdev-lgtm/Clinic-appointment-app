const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const pinoHttp = require('pino-http');
const config = require('./config');
const logger = require('./config/logger');
const prisma = require('./config/database');
const { errorHandler } = require('./middleware/errorHandler');
const { requestId } = require('./middleware/requestId');
const { sanitize } = require('./middleware/sanitize');
const { startNotificationCron } = require('./cron/notificationCron');

// ─── Module Routes ────────────────────────────────────
const authRoutes = require('./modules/auth/routes');
const patientRoutes = require('./modules/patients/routes');
const doctorRoutes = require('./modules/doctors/routes');
const appointmentRoutes = require('./modules/appointments/routes');
const prescriptionRoutes = require('./modules/prescriptions/routes');
const notificationRoutes = require('./modules/notifications/routes');
const clinicSettingsRoutes = require('./modules/clinic_settings/routes');
const pushRoutes = require('./modules/push/routes');

const app = express();

// Trust proxy for Railway (only in production)
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// ──────────────────────────────────────────────────────
// Debug: Log environment variables
// ──────────────────────────────────────────────────────
console.log('🔍 Debug - Environment Variables:');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);

// Log the actual database URL being used
const databaseUrl = process.env.DATABASE_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'postgresql://postgres:PtfJLXRfVgNvXSoXlyJpodQvZuTIidqv@clinic-appointment-app.railway.internal:5432/railway'
        : undefined);
console.log('🔍 Using Database URL:', databaseUrl ? databaseUrl.replace(/:[^:@]+@/, ':***@') : 'NOT SET');

// ──────────────────────────────────────────────────────
// Auto-seed on startup (fallback for Railway)
// ──────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'production' && process.env.AUTO_SEED !== 'false') {
    setTimeout(async () => {
        try {
            console.log('🌱 Auto-seeding on startup...');
            const { execSync } = require('child_process');
            
            // Run migrations first
            console.log('🔧 Running migrations...');
            execSync('npx prisma migrate deploy', { stdio: 'inherit' });
            
            // Then run safe seed
            console.log('🌱 Running safe seed...');
            execSync('node seed-safe.js', { stdio: 'inherit' });
            
            console.log('✅ Auto-seeding completed successfully!');
        } catch (error) {
            console.error('❌ Auto-seeding failed:', error.message);
            // Don't crash the app, just log the error
        }
    }, 5000); // Wait 5 seconds after startup
}

// ──────────────────────────────────────────────────────
// 1. Security Middleware
// ──────────────────────────────────────────────────────
app.use(helmet({
    contentSecurityPolicy: config.nodeEnv === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
}));
app.use(cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
}));
app.use(hpp());                                         // Prevent HTTP Parameter Pollution
app.use(sanitize);                                      // Strip XSS payloads from req.body/query/params
app.use(express.json({ limit: '10kb' }));               // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ──────────────────────────────────────────────────────
// 2. Observability Middleware
// ──────────────────────────────────────────────────────
app.use(requestId);                                      // Attach UUID to every request
app.use(pinoHttp({
    logger,
    genReqId: (req) => req.id,                           // Use our requestId middleware
    customLogLevel: (_req, res, err) => {
        if (res.statusCode >= 500 || err) return 'error';
        if (res.statusCode >= 400) return 'warn';
        return 'info';
    },
    serializers: {
        req: (req) => ({
            id: req.id,
            method: req.method,
            url: req.url,
        }),
        res: (res) => ({
            statusCode: res.statusCode,
        }),
    },
}));

// ──────────────────────────────────────────────────────
// 3. Rate Limiting
// ──────────────────────────────────────────────────────

// Global limiter: 200 requests per 15 minutes per IP
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    message: { success: false, message: 'Too many requests, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', globalLimiter);

// Auth limiter: 20 attempts per 15 minutes (brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { success: false, message: 'Too many login attempts, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/auth', authLimiter);

// Appointment creation limiter: 10 per 15 minutes per IP
const appointmentLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { success: false, message: 'Booking rate limit exceeded, please try again later' },
    standardHeaders: true,
    legacyHeaders: false,
});
app.post('/api/appointments', appointmentLimiter);

// ──────────────────────────────────────────────────────
// 4. Health Check
// ──────────────────────────────────────────────────────
app.get('/api/health', async (_req, res) => {
    try {
        // Verify database connectivity
        await prisma.$queryRaw`SELECT 1`;
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: config.nodeEnv,
        });
    } catch {
        res.status(503).json({
            status: 'DEGRADED',
            timestamp: new Date().toISOString(),
            database: 'UNREACHABLE',
        });
    }
});

// ──────────────────────────────────────────────────────
// 5. Manual Migration Endpoint (for Railway)
// ──────────────────────────────────────────────────────
app.post('/api/setup-database', async (_req, res) => {
    try {
        console.log('🔧 Running database migrations...');
        const { execSync } = require('child_process');
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
        
        console.log('🌱 Running safe seed script...');
        execSync('node seed-safe.js', { stdio: 'inherit' });
        
        res.json({
            success: true,
            message: 'Database migrations and seeding completed successfully',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('❌ Database setup failed:', error);
        res.status(500).json({
            success: false,
            message: 'Database setup failed',
            error: error.message,
        });
    }
});

// ──────────────────────────────────────────────────────
// 6. Safe Seed Only Endpoint
// ──────────────────────────────────────────────────────
app.post('/api/seed-database', async (_req, res) => {
    try {
        console.log('🌱 Running safe seed script...');
        const { execSync } = require('child_process');
        execSync('node seed-safe.js', { stdio: 'inherit' });
        
        res.json({
            success: true,
            message: 'Database seeding completed successfully',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        res.status(500).json({
            success: false,
            message: 'Seeding failed',
            error: error.message,
        });
    }
});

// ──────────────────────────────────────────────────────
// 5. API Routes
// ──────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/clinic-settings', clinicSettingsRoutes);
app.use('/api/push', pushRoutes);
app.use('/api/doctor-availability', require('./modules/doctors/availabilityRoutes'));

// ──────────────────────────────────────────────────────
// 6. 404 + Global Error Handler
// ──────────────────────────────────────────────────────
app.use((req, res) => {
    logger.warn(`404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(errorHandler);

// ──────────────────────────────────────────────────────
// 7. Start Server
// ──────────────────────────────────────────────────────
const server = app.listen(config.port, async () => {
    logger.info(`🏥 Clinic API running on http://localhost:${config.port}`);
    logger.info(`   Environment: ${config.nodeEnv}`);

    // ─── Run Seeding on Startup ──────────────────────────
    try {
        const { exec } = require('child_process');
        const path = require('path');
        const seedPath = path.resolve(__dirname, '../seed.js');

        logger.info('🌱 Checking/Seeding default data...');
        exec(`node "${seedPath}"`, (error, stdout, stderr) => {
            if (error) {
                logger.error(`❌ Seeding error: ${error.message}`);
                return;
            }
            if (stderr) logger.warn(`⚠️ Seeding stderr: ${stderr}`);
            if (stdout) logger.info(`✅ Seeding result: ${stdout.trim()}`);
        });
    } catch (err) {
        logger.error(`❌ Failed to trigger seeding: ${err.message}`);
    }

    startNotificationCron();
});

// ──────────────────────────────────────────────────────
// 8. Graceful Shutdown
// ──────────────────────────────────────────────────────
const shutdown = async (signal) => {
    logger.info(`Received ${signal}. Shutting down gracefully...`);
    server.close(async () => {
        await prisma.$disconnect();
        logger.info('Database disconnected. Goodbye.');
        process.exit(0);
    });

    // Force exit after 10s if graceful shutdown fails
    setTimeout(() => {
        logger.error('Forced shutdown after timeout.');
        process.exit(1);
    }, 10000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

// Catch unhandled rejections and uncaught exceptions
process.on('unhandledRejection', (reason) => {
    logger.fatal({ err: reason }, 'Unhandled Promise Rejection');
    shutdown('UNHANDLED_REJECTION');
});
process.on('uncaughtException', (err) => {
    logger.fatal({ err }, 'Uncaught Exception');
    shutdown('UNCAUGHT_EXCEPTION');
});

module.exports = app;
