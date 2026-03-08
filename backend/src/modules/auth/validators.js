const Joi = require('joi');

// ─── Doctor Registration ──────────────────────────────────
const registerDoctorSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required().messages({
        'any.required': 'Doctor name is required',
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'A valid email is required',
    }),
    password: Joi.string().min(8).max(128).required().messages({
        'string.min': 'Password must be at least 8 characters',
    }),
    specialization: Joi.string().trim().min(2).max(100).required().messages({
        'any.required': 'Specialization is required',
    }),
});

const completePhoneSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^\+?[1-9]\d{6,14}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone must be a valid international number',
        }),
});

// ─── Receptionist Registration ────────────────────────────
const registerReceptionistSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(128).required().messages({
        'string.min': 'Password must be at least 8 characters',
    }),
});

// ─── Staff Login (Doctor or Receptionist) ─────────────────
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

// ─── Google SSO (Patient) ─────────────────────────────────
const googleLoginSchema = Joi.object({
    token: Joi.string().required().messages({
        'any.required': 'Google ID token is required',
    }),
});

// ─── OTP ──────────────────────────────────────────────────
const sendOtpSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^\+?[1-9]\d{6,14}$/)
        .required()
        .messages({
            'string.pattern.base': 'Phone must be a valid international number',
        }),
});

const verifyOtpSchema = Joi.object({
    phone: Joi.string()
        .pattern(/^\+?[1-9]\d{6,14}$/)
        .required(),
    accessToken: Joi.string().optional(),
    otp: Joi.string().pattern(/^\d{4,8}$/).optional(),
}).or('accessToken', 'otp').messages({
    'object.missing': 'Either verification access token or otp is required',
});

module.exports = {
    registerDoctorSchema,
    registerReceptionistSchema,
    loginSchema,
    googleLoginSchema,
    completePhoneSchema,
    sendOtpSchema,
    verifyOtpSchema,
};
