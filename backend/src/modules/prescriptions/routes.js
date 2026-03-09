const { Router } = require('express');
const prescriptionController = require('./controller');
const { authenticate } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');

const router = Router();

router.use(authenticate);

router.get(
    '/',
    authorize('RECEPTIONIST'),
    prescriptionController.getAll
);
router.get(
    '/patient/:patientId',
    authorize('DOCTOR', 'PATIENT'),
    prescriptionController.getByPatient
);
router.get(
    '/doctor',
    authorize('DOCTOR'),
    prescriptionController.getByDoctor
);
router.get(
    '/:id',
    authorize('DOCTOR', 'PATIENT'),
    prescriptionController.getById
);
router.post(
    '/',
    authorize('DOCTOR'),
    prescriptionController.create
);
router.put(
    '/:id',
    authorize('DOCTOR'),
    prescriptionController.update
);

module.exports = router;
