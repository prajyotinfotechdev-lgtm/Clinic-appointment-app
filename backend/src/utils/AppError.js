/**
 * Custom application error class.
 * Thrown by services for expected, operational errors.
 * The global errorHandler distinguishes these from unexpected crashes.
 */
class AppError extends Error {
    /**
     * @param {string} message  - Human-readable error message
     * @param {number} statusCode - HTTP status code (default 500)
     */
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.isOperational = true;

        // Capture stack trace (excludes constructor call from the trace)
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = { AppError };
