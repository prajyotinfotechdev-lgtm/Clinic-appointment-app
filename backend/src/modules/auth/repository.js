const prisma = require('../../config/database');

class AuthRepository {
    // ─── Patient (Google OAuth) ──────────────────────────

    async findPatientByGoogleId(googleId) {
        return prisma.patient.findUnique({ where: { googleId } });
    }

    async findPatientByEmail(email) {
        return prisma.patient.findFirst({ where: { email } });
    }

    async findPatientById(id) {
        return prisma.patient.findUnique({ where: { id } });
    }

    async createPatient(data) {
        return prisma.patient.create({ data });
    }

    async updatePatientPhone(id, phone) {
        return prisma.patient.update({
            where: { id },
            data: { phone, phoneVerified: true },
        });
    }

    // ─── Doctor (Email + Password) ───────────────────────

    async findDoctorByEmail(email) {
        return prisma.doctor.findUnique({ where: { email } });
    }

    async findDoctorById(id) {
        return prisma.doctor.findUnique({ where: { id } });
    }

    async createDoctor(data) {
        return prisma.doctor.create({ data });
    }

    // ─── Receptionist (Email + Password) ─────────────────

    async findReceptionistByEmail(email) {
        return prisma.receptionist.findUnique({ where: { email } });
    }

    async findReceptionistById(id) {
        return prisma.receptionist.findUnique({ where: { id } });
    }

    async createReceptionist(data) {
        return prisma.receptionist.create({ data });
    }
}

module.exports = new AuthRepository();
