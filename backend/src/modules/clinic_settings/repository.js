const prisma = require('../../config/database');

class ClinicSettingsRepository {
    async findByDoctorId(doctorId) {
        return prisma.clinicSettings.findUnique({ where: { doctorId } });
    }

    async upsert(doctorId, data) {
        return prisma.clinicSettings.upsert({
            where: { doctorId },
            update: data,
            create: { ...data, doctorId },
        });
    }
}

module.exports = new ClinicSettingsRepository();
