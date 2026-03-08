const Joi = require('joi');

// ─── Appointment Creation ─────────────────────────────────
const createAppointmentSchema = Joi.object({
    patientId: Joi.string().optional(), // Optional for patients (uses req.user.id)
    doctorId: Joi.string().required().messages({
        'any.required': 'Doctor ID is required',
    }),
    appointmentDate: Joi.date().required().messages({
        'any.required': 'Appointment date is required',
    }),
    timeSlot: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
            'any.required': 'Time slot is required',
            'string.pattern.base': 'Time slot must be in HH:mm format',
        }),
});

// ─── Appointment Rescheduling ─────────────────────────────
const rescheduleAppointmentSchema = Joi.object({
    appointmentDate: Joi.date().required().messages({
        'any.required': 'New appointment date is required',
    }),
    timeSlot: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required()
        .messages({
            'any.required': 'New time slot is required',
            'string.pattern.base': 'Time slot must be in HH:mm format',
        }),
});

// ─── Slots Query Params ───────────────────────────────────
const slotsQuerySchema = Joi.object({
    doctorId: Joi.string().required().messages({
        'any.required': 'Doctor ID is required for slot lookup',
    }),
    date: Joi.date().required().messages({
        'any.required': 'Date is required for slot lookup',
    }),
});

module.exports = {
    createAppointmentSchema,
    rescheduleAppointmentSchema,
    slotsQuerySchema,
};
