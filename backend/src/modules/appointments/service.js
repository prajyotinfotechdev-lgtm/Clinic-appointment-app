const clinicSettingsService = require('../clinic_settings/service');
const appointmentRepository = require('./repository');
const { AppError } = require('../../utils/AppError');
const logger = require('../../config/logger');

// ─── Valid Status Transitions (state machine) ─────────────
const VALID_TRANSITIONS = {
    BOOKED: ['WAITING', 'CANCELLED'],
    WAITING: ['IN_CONSULTATION', 'CANCELLED'],
    IN_CONSULTATION: ['COMPLETED'],
    COMPLETED: [],   // terminal state
    CANCELLED: [],   // terminal state
};

class AppointmentService {
    async getAllAppointments(filters) {
        return appointmentRepository.findAll(filters);
    }

    async updateAppointmentStatus(id, newStatus) {
        // Validate appointment exists
        const appointment = await appointmentRepository.findById(id);
        if (!appointment) {
            throw new AppError('Appointment not found', 404);
        }

        return appointmentRepository.updateStatus(id, newStatus);
    }

    async updateVitals(id, vitalsData) {
        const appointment = await appointmentRepository.findById(id);
        if (!appointment) {
            throw new AppError('Appointment not found', 404);
        }

        // Validate data structure loosely, or rely on Prisma.
        // We can just rely on Prisma to reject bad types, or we can sanitize:
        const dataToUpdate = {};
        if (vitalsData.symptoms !== undefined) dataToUpdate.symptoms = vitalsData.symptoms;
        if (vitalsData.weight !== undefined) dataToUpdate.weight = vitalsData.weight;
        if (vitalsData.bloodPressure !== undefined) dataToUpdate.bloodPressure = vitalsData.bloodPressure;
        if (vitalsData.temperature !== undefined) dataToUpdate.temperature = vitalsData.temperature;

        return appointmentRepository.update(id, dataToUpdate);
    }

    async getAppointmentById(id) {
        const appointment = await appointmentRepository.findById(id);
        if (!appointment) {
            throw new AppError('Appointment not found', 404);
        }
        return appointment;
    }

    /**
     * Book a new appointment using a database transaction.
     *
     * The transaction atomically:
     * 1. Checks that the slot is not already taken
     * 2. Creates the appointment
     *
     * Plus the unique composite index guarantees no double-booking
     * even if two requests manage to pass the check simultaneously.
     */
    async createAppointment({ patientId, doctorId, appointmentDate, timeSlot, createdBy }) {
        logger.info({ doctorId, appointmentDate, timeSlot, patientId },
            'Attempting to book appointment');

        const appointment = await appointmentRepository.createWithTransaction({
            patientId,
            doctorId,
            appointmentDate: new Date(appointmentDate),
            timeSlot,
            createdBy: createdBy || 'PATIENT',
        });

        logger.info({ appointmentId: appointment.id }, 'Appointment booked successfully');
        return appointment;
    }

    // ── Status Transition Helpers ─────────────────────────

    async _transition(id, targetStatus) {
        const appointment = await this.getAppointmentById(id);
        const allowed = VALID_TRANSITIONS[appointment.status] || [];

        if (!allowed.includes(targetStatus)) {
            throw new AppError(
                `Cannot transition from ${appointment.status} to ${targetStatus}`,
                400
            );
        }

        logger.info({ appointmentId: id, from: appointment.status, to: targetStatus },
            'Appointment status transition');
        return appointmentRepository.updateStatus(id, targetStatus);
    }

    async cancelAppointment(id) {
        return this._transition(id, 'CANCELLED');
    }

    async markWaiting(id) {
        return this._transition(id, 'WAITING');
    }

    async markInConsultation(id) {
        return this._transition(id, 'IN_CONSULTATION');
    }

    async completeAppointment(id) {
        return this._transition(id, 'COMPLETED');
    }

    /**
     * Generate available slots for a doctor on a specific date.
     */
    async getAvailableSlots(doctorId, date) {
        if (!doctorId || !date) {
            throw new AppError('Doctor ID and Date are required', 400);
        }

        const targetDateStr =
            typeof date === 'string'
                ? date.slice(0, 10)
                : new Date(date).toISOString().split('T')[0];

        const targetDateUtc = new Date(`${targetDateStr}T00:00:00.000Z`);
        if (isNaN(targetDateUtc.getTime())) {
            throw new AppError('Invalid date format provided', 400);
        }

        const settings = await clinicSettingsService.getSettingsByDoctor(doctorId);

        if (!settings) {
            throw new AppError('Doctor has not configured clinic settings', 404);
        }

        // Use IST (India Standard Time) for all comparisons to handle same-day booking correctly
        const now = new Date();
        const istDateFormatter = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const istTimeFormatter = new Intl.DateTimeFormat('en-GB', { // en-GB gives HH:mm
            timeZone: 'Asia/Kolkata',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        const todayParts = istDateFormatter.formatToParts(now);
        const todayYear = todayParts.find((p) => p.type === 'year')?.value;
        const todayMonth = todayParts.find((p) => p.type === 'month')?.value;
        const todayDay = todayParts.find((p) => p.type === 'day')?.value;
        const todayStr = `${todayYear}-${todayMonth}-${todayDay}`;
        const currentTimeStr = istTimeFormatter.format(now);
        const isToday = targetDateStr === todayStr;

        if (targetDateStr < todayStr) {
            return [];
        }

        // Check Working Days (1=Mon, 7=Sun)
        const dayOfWeek = targetDateUtc.getUTCDay() === 0 ? 7 : targetDateUtc.getUTCDay();
        let rawWorkingDays = [1, 2, 3, 4, 5, 6, 7];

        if (Array.isArray(settings.workingDays)) {
            rawWorkingDays = settings.workingDays;
        } else if (typeof settings.workingDays === 'string') {
            try {
                const parsed = JSON.parse(settings.workingDays);
                if (Array.isArray(parsed)) {
                    rawWorkingDays = parsed;
                }
            } catch {
                // keep defaults
            }
        }

        const workingDays = rawWorkingDays
            .map((d) => Number(d))
            .filter((d) => Number.isFinite(d));

        if (!workingDays.includes(dayOfWeek)) {
            return [];
        }

        // Check for Doctor Holidays/Unavailability
        const doctorAvailabilityService = require('../doctors/availabilityService');
        const dayAvailabilities = await doctorAvailabilityService.getDoctorAvailability(doctorId);

        // Filter for specific date (targetDateStr already defined at line 139)
        const activeAbsences = dayAvailabilities.filter(a => {
            const start = new Date(a.startDate).toISOString().split('T')[0];
            const end = a.endDate ? new Date(a.endDate).toISOString().split('T')[0] : start;
            return targetDateStr >= start && targetDateStr <= end;
        });

        // If any absence is a HOLIDAY, no slots available
        if (activeAbsences.some(a => a.type === 'HOLIDAY')) {
            console.log('Doctor is on holiday on this day');
            return [];
        }

        console.log('Fetching booked appointments...');
        const appointments = await appointmentRepository.findByDoctorAndDate(doctorId, targetDateStr);
        const bookedSlots = appointments.map(a => a.timeSlot);
        console.log('Booked slots:', bookedSlots);

        const slots = [];
        const [startHour, startMin] = settings.clinicStartTime.split(':').map(Number);
        const [endHour, endMin] = settings.clinicEndTime.split(':').map(Number);

        const startMinutes = (startHour * 60) + startMin;
        const endMinutes = (endHour * 60) + endMin;

        for (let minute = startMinutes; minute < endMinutes; minute += settings.slotDurationMinutes) {
            const slotHour = String(Math.floor(minute / 60)).padStart(2, '0');
            const slotMin = String(minute % 60).padStart(2, '0');
            const slot = `${slotHour}:${slotMin}`;

            // Check if slot is in the past (if today)
            const isFutureSlot = !isToday || slot > currentTimeStr;

            // Check if slot is within an UNAVAILABLE period
            const isActuallyAvailable = !activeAbsences.some(a => {
                if (a.type !== 'UNAVAILABLE') return false;
                if (!a.startTime || !a.endTime) return true; // Whole day unavailable
                return slot >= a.startTime && slot < a.endTime;
            });

            if (!bookedSlots.includes(slot) && isFutureSlot && isActuallyAvailable) {
                slots.push(slot);
            }
        }

        return slots;
    }

    async getNextAvailableSlot(doctorId) {
        const today = new Date().toISOString().split('T')[0];
        const slots = await this.getAvailableSlots(doctorId, today);

        if (slots.length > 0) {
            return { date: today, timeSlot: slots[0] };
        }

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        const tomorrowSlots = await this.getAvailableSlots(doctorId, tomorrowStr);

        if (tomorrowSlots.length > 0) {
            return { date: tomorrowStr, timeSlot: tomorrowSlots[0] };
        }

        throw new AppError('No available slots found in the near future', 404);
    }

    /**
     * Reschedule an existing appointment using a database transaction.
     */
    async rescheduleAppointment(id, { appointmentDate, timeSlot }) {
        const appointment = await this.getAppointmentById(id);

        if (appointment.status === 'COMPLETED' || appointment.status === 'CANCELLED') {
            throw new AppError(`Cannot reschedule a ${appointment.status.toLowerCase()} appointment`, 400);
        }

        logger.info({ appointmentId: id, newDate: appointmentDate, newSlot: timeSlot },
            'Attempting to reschedule appointment');

        const updated = await appointmentRepository.rescheduleWithTransaction(id, {
            doctorId: appointment.doctorId,
            appointmentDate: new Date(appointmentDate),
            timeSlot,
        });

        logger.info({ appointmentId: id }, 'Appointment rescheduled successfully');
        return updated;
    }
}

module.exports = new AppointmentService();
