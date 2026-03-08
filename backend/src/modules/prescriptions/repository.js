const prisma = require('../../config/database');

class PrescriptionRepository {
    async findByAppointmentId(appointmentId) {
        return prisma.prescription.findUnique({ where: { appointmentId } });
    }

    async findByPatientId(patientId) {
        return prisma.prescription.findMany({
            where: { patientId },
            include: {
                doctor: { select: { name: true, specialization: true } },
                appointment: { select: { appointmentDate: true, timeSlot: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findByDoctorId(doctorId) {
        return prisma.prescription.findMany({
            where: { doctorId },
            include: {
                patient: { select: { name: true, phone: true } },
                appointment: { select: { appointmentDate: true, timeSlot: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id) {
        return prisma.prescription.findUnique({
            where: { id },
            include: {
                doctor: { select: { name: true, specialization: true } },
                patient: { select: { name: true, phone: true } },
                appointment: { select: { appointmentDate: true, timeSlot: true } },
            },
        });
    }

    async create(data) {
        return prisma.prescription.create({ data });
    }

    async update(id, data) {
        return prisma.prescription.update({ where: { id }, data });
    }
}

module.exports = new PrescriptionRepository();
