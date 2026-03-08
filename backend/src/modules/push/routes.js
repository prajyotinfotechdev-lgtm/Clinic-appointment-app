const { Router } = require('express');
const pushController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');

const router = Router();

router.get('/vapid-public-key', pushController.getVapidPublicKey);

router.use(authenticate);
router.use(authorize('PATIENT'));

router.post('/subscribe', pushController.subscribe);
router.post('/unsubscribe', pushController.unsubscribe);
router.post('/unsubscribe-all', pushController.unsubscribeAll);
router.get('/my-subscriptions', pushController.getMySubscriptions);
router.post('/test', pushController.testNotification);

module.exports = router;
