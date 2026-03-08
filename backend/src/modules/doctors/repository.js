const prisma = require('../../config/database');

class DoctorRepository {
    async findAll() {
        return prisma.doctor.findMany({
            select: {
                id: true,
                name: true,
                specialization: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: { name: 'asc' },
        });
    }

    async findById(id) {
        return prisma.doctor.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                specialization: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                clinicSettings: true,
            },
        });
    }

    async update(id, data) {
        return prisma.doctor.update({ where: { id }, data });
    }
}

module.exports = new DoctorRepository();
