const { Router } = require('express');
const patientController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');

const router = Router();

router.use(authenticate);

router.get('/', authorize('RECEPTIONIST', 'DOCTOR'), patientController.getAll);
router.get('/search', authorize('RECEPTIONIST', 'DOCTOR'), patientController.search);
router.get('/me', authorize('PATIENT'), patientController.getMyProfile);
router.get('/:id', authorize('PATIENT', 'RECEPTIONIST', 'DOCTOR'), patientController.getById);
router.get('/:id/history', authorize('PATIENT', 'RECEPTIONIST', 'DOCTOR'), patientController.getHistory);
router.post('/', authorize('RECEPTIONIST'), patientController.create);
router.put('/:id', authorize('PATIENT', 'RECEPTIONIST'), patientController.update);

module.exports = router;
