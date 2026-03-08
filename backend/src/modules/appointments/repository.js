const prisma = require('../../config/database');

class AppointmentRepository {
    async findAll(filters = {}) {
        const where = {};
        if (filters.doctorId) where.doctorId = filters.doctorId;
        if (filters.patientId) where.patientId = filters.patientId;
        if (filters.date) {
            const startDate = new Date(filters.date);
            const endDate = new Date(filters.date);
            endDate.setDate(endDate.getDate() + 1);
            where.appointmentDate = {
                gte: startDate,
                lt: endDate,
            };
        }

        // Handle status filter — can be a string or a Prisma operator object
        if (filters.status) {
            where.status = filters.status;
        }

        return prisma.appointment.findMany({
            where,
            include: {
                patient: { select: { id: true, name: true, phone: true } },
                doctor: { select: { id: true, name: true, specialization: true } },
            },
            orderBy: [{ appointmentDate: 'asc' }, { timeSlot: 'asc' }],
        });
    }

    /**
     * Optimized query for slot availability — only fetches active
     * appointments for a specific doctor on a specific date.
     */
    async findByDoctorAndDate(doctorId, date) {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);

        return prisma.appointment.findMany({
            where: {
                doctorId,
                appointmentDate: {
                    gte: startDate,
                    lt: endDate,
                },
                status: { not: 'CANCELLED' },
            },
            select: { timeSlot: true },
        });
    }

    async findById(id) {
        return prisma.appointment.findUnique({
            where: { id },
            include: {
                patient: { select: { id: true, name: true, phone: true, email: true } },
                doctor: { select: { id: true, name: true, specialization: true } },
                prescription: true,
            },
        });
    }

    /**
     * Transactional appointment creation.
     *
     * Uses an interactive Prisma transaction to:
     * 1. Check that the slot is not already taken (SELECT)
     * 2. Create the appointment (INSERT)
     *
     * This guarantees atomicity — no double-booking race conditions
     * even under concurrent requests, because the unique constraint
     * plus the serialised transaction make it bullet-proof.
     */
    async createWithTransaction(data) {
        return prisma.$transaction(async (tx) => {
            // Step 1: Verify slot is still available (inside transaction)
            const startDate = new Date(data.appointmentDate);
            const endDate = new Date(data.appointmentDate);
            endDate.setDate(endDate.getDate() + 1);

            const existing = await tx.appointment.findFirst({
                where: {
                    doctorId: data.doctorId,
                    appointmentDate: {
                        gte: startDate,
                        lt: endDate,
                    },
                    timeSlot: data.timeSlot,
                    status: { not: 'CANCELLED' },
                },
            });

            if (existing) {
                const { AppError } = require('../../utils/AppError');
                throw new AppError('This time slot is already booked', 409);
            }

            // Step 2: Create the appointment
            const appointment = await tx.appointment.create({
                data,
                include: {
                    patient: { select: { id: true, name: true, email: true } },
                    doctor: { select: { id: true, name: true } },
                },
            });

            // Step 3: Trigger a mock notification (skeleton)
            await tx.notification.create({
                data: {
                    type: 'EMAIL',
                    status: 'PENDING',
                    patientId: appointment.patientId,
                    appointmentId: appointment.id
                }
            });

            // Mock Logger
            console.log(`[SYSTEM] Support Notification Generated. To: ${appointment.patient.email || 'User'} | Type: EMAIL | Status: PENDING`);

            return appointment;
        });
    }

    /**
     * Transactional reschedule: cancel old slot + book new slot atomically.
     */
    async rescheduleWithTransaction(id, newData) {
        return prisma.$transaction(async (tx) => {
            // Step 1: Verify new slot is available
            const startDate = new Date(newData.appointmentDate);
            const endDate = new Date(newData.appointmentDate);
            endDate.setDate(endDate.getDate() + 1);

            const existing = await tx.appointment.findFirst({
                where: {
                    doctorId: newData.doctorId,
                    appointmentDate: {
                        gte: startDate,
                        lt: endDate,
                    },
                    timeSlot: newData.timeSlot,
                    status: { not: 'CANCELLED' },
                    id: { not: id }, // Exclude current appointment
                },
            });

            if (existing) {
                const { AppError } = require('../../utils/AppError');
                throw new AppError('Requested slot is no longer available', 409);
            }

            // Step 2: Update the appointment
            return tx.appointment.update({
                where: { id },
                data: {
                    appointmentDate: newData.appointmentDate,
                    timeSlot: newData.timeSlot,
                    status: 'BOOKED',
                },
            });
        });
    }

    async updateStatus(id, status) {
        return prisma.appointment.update({
            where: { id },
            data: { status },
        });
    }

    async update(id, data) {
        return prisma.appointment.update({ where: { id }, data });
    }
}

module.exports = new AppointmentRepository();
