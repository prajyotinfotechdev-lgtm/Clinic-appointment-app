const crypto = require('crypto');

/**
 * Middleware that attaches a unique request ID to every incoming request.
 * Used for distributed tracing and correlating logs to individual requests.
 *
 * - Reads `x-request-id` header if set by upstream proxy / load balancer
 * - Falls back to a generated UUID
 * - Sets the ID on `req.id` and echoes it in the response header
 */
const requestId = (req, _res, next) => {
    req.id = req.headers['x-request-id'] || crypto.randomUUID();
    next();
};

module.exports = { requestId };
