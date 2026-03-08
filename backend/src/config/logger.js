const pino = require('pino');

const nodeEnv = process.env.NODE_ENV || 'development';

/**
 * Structured logger using pino.
 *
 * - Development: pretty-printed with colors and timestamps
 * - Production: JSON logs for ingestion by log aggregators (Datadog, ELK, CloudWatch)
 *
 * Usage:
 *   const logger = require('./logger');
 *   logger.info({ userId: '123' }, 'User logged in');
 *   logger.error({ err }, 'Database connection failed');
 */
const logger = pino({
    level: nodeEnv === 'production' ? 'info' : 'debug',
    ...(nodeEnv !== 'production' && {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                ignore: 'pid,hostname',
            },
        },
    }),
    // Redact sensitive fields from log output
    redact: {
        paths: ['req.headers.authorization', 'req.headers.cookie', 'password', 'passwordHash', 'token'],
        censor: '[REDACTED]',
    },
    // Add service metadata for log aggregation
    base: {
        service: 'clinic-api',
        env: nodeEnv,
    },
    // Serialise errors properly
    serializers: {
        err: pino.stdSerializers.err,
        req: pino.stdSerializers.req,
        res: pino.stdSerializers.res,
    },
});

module.exports = logger;
