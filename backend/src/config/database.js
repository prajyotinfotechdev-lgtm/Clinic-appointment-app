const { PrismaClient } = require('@prisma/client');

/**
 * Singleton PrismaClient instance.
 *
 * In development, hot-reload (nodemon) can spawn multiple PrismaClient
 * instances. Storing the client on `globalThis` prevents this.
 * In production this is a no-op since the process restarts cleanly.
 */
const globalForPrisma = globalThis;

// Use Railway production database URL if DATABASE_URL is not set or invalid
const databaseUrl = process.env.DATABASE_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'postgresql://postgres:PtfJLXRfVgNvXSoXlyJpodQvZuTIidqv@clinic-appointment-app.railway.internal:5432/railway'
        : undefined);

const prisma =
    globalForPrisma.__prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['error', 'warn']
                : ['error', 'info'],
        datasources: {
            db: {
                url: databaseUrl,
            },
        },
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.__prisma = prisma;
}

module.exports = prisma;
