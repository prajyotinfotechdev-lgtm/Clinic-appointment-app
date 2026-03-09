const authRepository = require('./repository');
const { hashPassword, comparePassword } = require('../../utils/password');
const { signToken } = require('../../utils/jwt');
const { AppError } = require('../../utils/AppError');

class AuthService {
    // ─── Google SSO (Patients) ─────────────────────────

    async handleGoogleAuth(idToken) {
        const { OAuth2Client } = require('google-auth-library');
        const { google } = require('../../config');
        const client = new OAuth2Client(google.clientId);

        let payload;
        try {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: google.clientId,
            });
            payload = ticket.getPayload();
        } catch (err) {
            throw new AppError('Invalid Google Token', 401);
        }

        const { sub: googleId, email, name, picture } = payload;

        let patient = await authRepository.findPatientByGoogleId(googleId);

        if (!patient) {
            const googleDigits = (googleId || '').replace(/\D/g, '').slice(-10).padStart(10, '0');
            const placeholderPhone = `9${googleDigits.slice(-9)}`;
            patient = await authRepository.createPatient({
                name,
                email,
                googleId,
                // Placeholder unique phone; patient must verify/update from UI
                phone: placeholderPhone,
                phoneVerified: false,
            });
        }

        const token = signToken({
            userId: patient.id,
            role: 'PATIENT',
            name: patient.name,
            phoneVerified: patient.phoneVerified,
        });

        return { user: patient, token, phoneVerified: patient.phoneVerified };
    }

    async verifyPatientPhone(patientId, phone) {
        return authRepository.updatePatientPhone(patientId, phone);
    }

    // ─── Email + Password (Doctor) ───────────────────────

    async registerDoctor({ name, email, password, specialization }) {
        const existing = await authRepository.findDoctorByEmail(email);
        if (existing) {
            throw new AppError('Email already registered', 409);
        }

        const passwordHash = await hashPassword(password);
        const doctor = await authRepository.createDoctor({
            name,
            email,
            passwordHash,
            specialization,
        });

        const token = signToken({ userId: doctor.id, role: 'DOCTOR', name: doctor.name });
        return { user: this._sanitize(doctor), token };
    }

    async loginDoctor({ email, password }) {
        const doctor = await authRepository.findDoctorByEmail(email);
        if (!doctor) {
            throw new AppError('Invalid email or password', 401);
        }

        const isMatch = await comparePassword(password, doctor.passwordHash);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = signToken({ userId: doctor.id, role: 'DOCTOR', name: doctor.name });
        return { user: this._sanitize(doctor), token };
    }

    // ─── Email + Password (Receptionist) ─────────────────

    async registerReceptionist({ name, email, password }) {
        const existing = await authRepository.findReceptionistByEmail(email);
        if (existing) {
            throw new AppError('Email already registered', 409);
        }

        const passwordHash = await hashPassword(password);
        const receptionist = await authRepository.createReceptionist({
            name,
            email,
            passwordHash,
        });

        const token = signToken({ userId: receptionist.id, role: 'RECEPTIONIST', name: receptionist.name });
        return { user: this._sanitize(receptionist), token };
    }

    async loginReceptionist({ email, password }) {
        const receptionist = await authRepository.findReceptionistByEmail(email);
        if (!receptionist) {
            throw new AppError('Invalid email or password', 401);
        }

        const isMatch = await comparePassword(password, receptionist.passwordHash);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = signToken({ userId: receptionist.id, role: 'RECEPTIONIST', name: receptionist.name });
        return { user: this._sanitize(receptionist), token };
    }

    // ─── Profile ─────────────────────────────────────────

    async getProfile(userId, role) {
        let user;
        switch (role) {
            case 'PATIENT':
                user = await authRepository.findPatientById(userId);
                break;
            case 'DOCTOR':
                user = await authRepository.findDoctorById(userId);
                break;
            case 'RECEPTIONIST':
                user = await authRepository.findReceptionistById(userId);
                break;
            default:
                throw new AppError('Invalid role', 400);
        }

        if (!user) {
            throw new AppError('User not found', 404);
        }

        return this._sanitize(user);
    }

    _sanitize(user) {
        const { passwordHash, ...safe } = user;
        return safe;
    }
}

module.exports = new AuthService();
