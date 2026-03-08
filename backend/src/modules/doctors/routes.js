const { Router } = require('express');
const doctorController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');

const router = Router();

router.use(authenticate);

router.get('/', authorize('PATIENT', 'RECEPTIONIST', 'DOCTOR'), doctorController.getAll);
router.get('/me', authorize('DOCTOR'), doctorController.getMyProfile);
router.get('/:id', authorize('PATIENT', 'RECEPTIONIST', 'DOCTOR'), doctorController.getById);
router.put('/:id', authorize('DOCTOR'), doctorController.update);

module.exports = router;
