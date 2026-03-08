const { Router } = require('express');
const clinicSettingsController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');

const router = Router();

router.use(authenticate);

// Doctor views their own settings
router.get('/me', authorize('DOCTOR'), clinicSettingsController.getSettings);

// Any role can view a doctor's schedule (for booking)
router.get(
    '/doctor/:doctorId',
    authorize('PATIENT', 'RECEPTIONIST', 'DOCTOR'),
    clinicSettingsController.getSettings
);

// Doctor or Receptionist updates clinic settings
router.put('/', authorize('DOCTOR', 'RECEPTIONIST'), clinicSettingsController.upsertSettings);

module.exports = router;
