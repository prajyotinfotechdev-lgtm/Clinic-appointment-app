const prisma = require('../../config/database');

class PushSubscriptionRepository {
    async create(data) {
        return prisma.pushSubscription.create({
            data: {
                endpoint: data.endpoint,
                p256dh: data.keys.p256dh,
                auth: data.keys.auth,
                patientId: data.patientId,
            },
        });
    }

    async findByPatientId(patientId) {
        return prisma.pushSubscription.findMany({
            where: { patientId },
        });
    }

    async findByEndpoint(endpoint) {
        return prisma.pushSubscription.findUnique({
            where: { endpoint },
        });
    }

    async deleteByEndpoint(endpoint) {
        return prisma.pushSubscription.delete({
            where: { endpoint },
        });
    }

    async deleteByPatientId(patientId) {
        return prisma.pushSubscription.deleteMany({
            where: { patientId },
        });
    }

    async findAll() {
        return prisma.pushSubscription.findMany({
            include: {
                patient: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
    }
}

module.exports = new PushSubscriptionRepository();
