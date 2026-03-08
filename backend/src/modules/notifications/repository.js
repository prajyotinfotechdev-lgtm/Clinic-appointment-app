const prisma = require('../../config/database');

class NotificationRepository {
    async findByPatientId(patientId) {
        return prisma.notification.findMany({
            where: { patientId },
            include: {
                appointment: {
                    select: { appointmentDate: true, timeSlot: true, doctorId: true },
                },
            },
            orderBy: { sentAt: 'desc' },
            take: 50,
        });
    }

    async create(data) {
        return prisma.notification.create({ data });
    }

    async updateStatus(id, status, sentAt = null) {
        const updateData = { status };
        if (sentAt) updateData.sentAt = sentAt;
        return prisma.notification.update({ where: { id }, data: updateData });
    }

    async getPendingNotifications() {
        return prisma.notification.findMany({
            where: { status: 'PENDING' },
            include: {
                patient: { select: { name: true, phone: true } },
                appointment: { select: { appointmentDate: true, timeSlot: true } },
            },
        });
    }
}

module.exports = new NotificationRepository();
