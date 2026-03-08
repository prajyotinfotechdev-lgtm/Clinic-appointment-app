const prisma = require('../../config/database');

class PatientRepository {
    async findAll() {
        return prisma.patient.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id) {
        return prisma.patient.findUnique({ where: { id } });
    }

    async findByPhone(phone) {
        return prisma.patient.findUnique({ where: { phone } });
    }

    async update(id, data) {
        return prisma.patient.update({ where: { id }, data });
    }

    async create(data) {
        return prisma.patient.create({ data });
    }

    async search(query) {
        return prisma.patient.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: 'insensitive' } },
                    { phone: { contains: query } },
                    { email: { contains: query, mode: 'insensitive' } },
                ],
            },
        });
    }
}

module.exports = new PatientRepository();
