const { error } = require('../utils/apiResponse');

/**
 * Role-based access control middleware.
 * Usage: authorize('DOCTOR', 'RECEPTIONIST')
 *
 * Must be used AFTER the `authenticate` middleware
 * so that `req.user` is available.
 */
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return error(res, 'Authentication required', 401);
        }

        if (!allowedRoles.includes(req.user.role)) {
            return error(res, 'You do not have permission to access this resource', 403);
        }

        next();
    };
};

module.exports = { authorize };
