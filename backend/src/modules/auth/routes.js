const { Router } = require('express');
const authController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');
const { validate } = require('../../middleware/validate');
const {
    registerDoctorSchema,
    registerReceptionistSchema,
    loginSchema,
    googleLoginSchema,
    sendOtpSchema,
    verifyOtpSchema,
} = require('./validators');

const router = Router();

// ─── Doctor Auth ────────────────────────────────────────
// Registration is protected — only existing authenticated staff can create new staff
router.post(
    '/doctor/register',
    authenticate,
    authorize('DOCTOR', 'RECEPTIONIST'),
    validate(registerDoctorSchema),
    authController.registerDoctor
);
router.post(
    '/doctor/login',
    validate(loginSchema),
    authController.loginDoctor
);

// ─── Receptionist Auth ──────────────────────────────────
router.post(
    '/receptionist/register',
    authenticate,
    authorize('DOCTOR', 'RECEPTIONIST'),
    validate(registerReceptionistSchema),
    authController.registerReceptionist
);
router.post(
    '/receptionist/login',
    validate(loginSchema),
    authController.loginReceptionist
);

// ─── Google SSO (Patients) ────────────────────────────
router.post(
    '/google',
    validate(googleLoginSchema),
    authController.googleLogin
);

// ─── Phone Verification (Patients, after login) ────────
router.post(
    '/send-otp',
    authenticate,
    validate(sendOtpSchema),
    authController.sendOtp
);
router.post(
    '/verify-otp',
    authenticate,
    validate(verifyOtpSchema),
    authController.verifyOtp
);

// ─── Profile (all roles) ───────────────────────────────
router.get('/profile', authenticate, authController.getProfile);

module.exports = router;
