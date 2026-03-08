const prisma = require('../../config/database');

class AvailabilityRepository {
    async findByDoctor(doctorId) {
        return prisma.doctorAvailability.findMany({
            where: { doctorId },
            orderBy: { startDate: 'asc' }
        });
    }

    async findActiveByDoctorAndDate(doctorId, date) {
        const targetDate = new Date(date);
        return prisma.doctorAvailability.findMany({
            where: {
                doctorId,
                OR: [
                    {
                        // Single day or start of range
                        startDate: targetDate,
                    },
                    {
                        // Within a range
                        startDate: { lte: targetDate },
                        endDate: { gte: targetDate }
                    }
                ]
            }
        });
    }

    async create(data) {
        return prisma.doctorAvailability.create({ data });
    }

    async delete(id) {
        return prisma.doctorAvailability.delete({ where: { id } });
    }
}

module.exports = new AvailabilityRepository();
