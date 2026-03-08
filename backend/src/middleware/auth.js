const { verifyToken } = require('../utils/jwt');
const { error } = require('../utils/apiResponse');
const prisma = require('../config/database');

/**
 * Authentication middleware — verifies JWT from Authorization header.
 *
 * The JWT payload contains { userId, role }.
 * We look up the user in the correct table based on `role`
 * and attach the record to `req.user` with the role field added.
 */
const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return error(res, 'Authentication required', 401);
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyToken(token);

        let user;
        switch (decoded.role) {
            case 'PATIENT':
                user = await prisma.patient.findUnique({ where: { id: decoded.userId } });
                break;
            case 'DOCTOR':
                user = await prisma.doctor.findUnique({ where: { id: decoded.userId } });
                break;
            case 'RECEPTIONIST':
                user = await prisma.receptionist.findUnique({ where: { id: decoded.userId } });
                break;
            default:
                return error(res, 'Invalid role in token', 401);
        }

        if (!user) {
            return error(res, 'User not found', 401);
        }

        // Attach user + role to the request
        req.user = { ...user, role: decoded.role };
        next();
    } catch (err) {
        return error(res, 'Invalid or expired token', 401);
    }
};

module.exports = { authenticate };
