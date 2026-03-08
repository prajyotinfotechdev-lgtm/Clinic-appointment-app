const appointmentService = require('./service');
const { success } = require('../../utils/apiResponse');

class AppointmentController {
    async getAll(req, res, next) {
        try {
            const filters = {
                doctorId: req.query.doctorId,
                patientId: req.query.patientId,
                status: req.query.status,
                date: req.query.date,
            };

            // ── Ownership enforcement ──
            // Patients can only see their own appointments.
            // Staff can see all.
            if (req.user.role === 'PATIENT') {
                filters.patientId = req.user.id;
            }

            const appointments = await appointmentService.getAllAppointments(filters);
            return success(res, appointments, 'Appointments retrieved');
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const appointment = await appointmentService.getAppointmentById(req.params.id);

            // Patients can only view their own appointments
            if (req.user.role === 'PATIENT' && appointment.patientId !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    message: 'You can only view your own appointments',
                });
            }

            return success(res, appointment, 'Appointment retrieved');
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const { patientId, doctorId, appointmentDate, timeSlot } = req.body;
            const createdBy = req.user.role === 'RECEPTIONIST' ? 'RECEPTIONIST' : 'PATIENT';
            const appointment = await appointmentService.createAppointment({
                patientId: patientId || req.user.id, // patients book for themselves
                doctorId,
                appointmentDate,
                timeSlot,
                createdBy,
            });
            return success(res, appointment, 'Appointment booked', 201);
        } catch (err) {
            // Prisma unique constraint failure = double booking attempt
            if (err.code === 'P2002') {
                err.message = 'This time slot is already booked for the selected doctor';
                err.statusCode = 409;
            }
            next(err);
        }
    }

    async cancel(req, res, next) {
        try {
            const appointment = await appointmentService.cancelAppointment(req.params.id);
            return success(res, appointment, 'Appointment cancelled');
        } catch (err) {
            next(err);
        }
    }

    async markWaiting(req, res, next) {
        try {
            const appointment = await appointmentService.markWaiting(req.params.id);
            return success(res, appointment, 'Patient marked as waiting');
        } catch (err) {
            next(err);
        }
    }

    async markInConsultation(req, res, next) {
        try {
            const appointment = await appointmentService.markInConsultation(req.params.id);
            return success(res, appointment, 'Consultation started');
        } catch (err) {
            next(err);
        }
    }

    async complete(req, res, next) {
        try {
            const appointment = await appointmentService.completeAppointment(req.params.id);
            return success(res, appointment, 'Appointment completed');
        } catch (err) {
            next(err);
        }
    }

    async getSlots(req, res, next) {
        try {
            const { doctorId, date } = req.query;
            console.log('GET /api/appointments/slots called:', { doctorId, date, user: req.user.id });
            const slots = await appointmentService.getAvailableSlots(doctorId, date);
            console.log('Slots found:', slots.length);
            return success(res, slots, 'Available slots retrieved');
        } catch (err) {
            console.error('Error in getSlots:', err);
            next(err);
        }
    }

    async getNextAvailable(req, res, next) {
        try {
            const { doctorId } = req.query;
            const slot = await appointmentService.getNextAvailableSlot(doctorId);
            return success(res, slot, 'Next available slot found');
        } catch (err) {
            next(err);
        }
    }

    async reschedule(req, res, next) {
        try {
            const { appointmentDate, timeSlot } = req.body;
            const appointment = await appointmentService.rescheduleAppointment(req.params.id, {
                appointmentDate,
                timeSlot
            });
            return success(res, appointment, 'Appointment rescheduled');
        } catch (err) {
            next(err);
        }
    }

    async updateVitals(req, res, next) {
        try {
            const appointment = await appointmentService.updateVitals(req.params.id, req.body);
            return success(res, appointment, 'Patient vitals recorded successfully');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AppointmentController();
