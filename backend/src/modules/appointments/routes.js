const { Router } = require('express');
const appointmentController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');
const { validate } = require('../../middleware/validate');
const {
    createAppointmentSchema,
    rescheduleAppointmentSchema,
    slotsQuerySchema,
} = require('./validators');

const router = Router();

router.use(authenticate);

// ── Static routes MUST come before parameterized /:id routes ──

router.get(
    '/slots',
    authorize('PATIENT', 'RECEPTIONIST'),
    validate(slotsQuerySchema, 'query'),
    appointmentController.getSlots
);

router.get(
    '/next-available',
    authorize('RECEPTIONIST'),
    appointmentController.getNextAvailable
);

// ── Standard CRUD ──

router.get(
    '/',
    authorize('PATIENT', 'DOCTOR', 'RECEPTIONIST'),
    appointmentController.getAll
);
router.get(
    '/:id',
    authorize('PATIENT', 'DOCTOR', 'RECEPTIONIST'),
    appointmentController.getById
);
router.post(
    '/',
    authorize('PATIENT', 'RECEPTIONIST'),
    validate(createAppointmentSchema),
    appointmentController.create
);
router.patch(
    '/:id/cancel',
    authorize('PATIENT', 'RECEPTIONIST'),
    appointmentController.cancel
);
router.patch(
    '/:id/waiting',
    authorize('RECEPTIONIST'),
    appointmentController.markWaiting
);
router.patch(
    '/:id/vitals',
    authorize('RECEPTIONIST', 'DOCTOR'),
    appointmentController.updateVitals
);
router.patch(
    '/:id/in-consultation',
    authorize('DOCTOR'),
    appointmentController.markInConsultation
);
router.patch(
    '/:id/complete',
    authorize('DOCTOR'),
    appointmentController.complete
);
router.patch(
    '/:id/reschedule',
    authorize('PATIENT', 'RECEPTIONIST'),
    validate(rescheduleAppointmentSchema),
    appointmentController.reschedule
);

module.exports = router;
