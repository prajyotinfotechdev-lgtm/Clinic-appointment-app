const { Router } = require('express');
const notificationController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');

const router = Router();

router.use(authenticate);

router.get(
    '/me',
    authorize('PATIENT', 'DOCTOR', 'RECEPTIONIST'),
    notificationController.getMyNotifications
);
router.post(
    '/send-reminder',
    authorize('RECEPTIONIST'),
    notificationController.sendReminder
);

module.exports = router;
