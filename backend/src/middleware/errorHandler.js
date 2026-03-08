const logger = require('../config/logger');

/**
 * Global error-handling middleware.
 * Must be registered LAST in the Express middleware chain.
 *
 * Distinguishes between:
 *  - Operational errors (AppError) → safe to show to client
 *  - Prisma errors → mapped to user-friendly messages
 *  - Unexpected errors → generic 500 in production, logged as fatal
 */
const errorHandler = (err, req, res, _next) => {
    const requestId = req.id || 'unknown';

    // ─── Structured Logging ───────────────────────────
    if (err.isOperational) {
        logger.warn({
            err,
            requestId,
            statusCode: err.statusCode,
            path: req.originalUrl,
        }, `Operational error: ${err.message}`);
    } else {
        logger.error({
            err,
            requestId,
            path: req.originalUrl,
            method: req.method,
            body: req.body,
        }, `Unexpected error: ${err.message}`);
    }

    // ── Sentry / External Monitoring Hook ─────────────
    // When Sentry is configured, uncomment:
    // const Sentry = require('@sentry/node');
    // if (!err.isOperational) {
    //     Sentry.captureException(err, { extra: { requestId, path: req.originalUrl } });
    // }

    // Echo request ID in response for client-side correlation
    res.setHeader('x-request-id', requestId);

    // ── Prisma known errors ──
    if (err.code === 'P2002') {
        return res.status(409).json({
            success: false,
            message: 'A record with that unique field already exists',
            requestId,
        });
    }
    if (err.code === 'P2025') {
        return res.status(404).json({
            success: false,
            message: 'Record not found',
            requestId,
        });
    }

    // ── Joi / Zod validation ──
    if (err.isJoi || err.name === 'ZodError') {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: err.details || err.errors,
            requestId,
        });
    }

    // ── Operational errors (AppError) ──
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            requestId,
        });
    }

    // ── Unexpected errors ──
    const statusCode = err.statusCode || 500;
    const message =
        process.env.NODE_ENV === 'production'
            ? 'Internal Server Error'
            : err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message,
        requestId,
    });
};

module.exports = { errorHandler };
