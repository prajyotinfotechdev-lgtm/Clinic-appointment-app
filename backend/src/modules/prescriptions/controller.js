const prescriptionService = require('./service');
const { success } = require('../../utils/apiResponse');

class PrescriptionController {
    async getByPatient(req, res, next) {
        try {
            const prescriptions = await prescriptionService.getPrescriptionsByPatient(req.params.patientId);
            return success(res, prescriptions, 'Prescriptions retrieved');
        } catch (err) {
            next(err);
        }
    }

    async getByDoctor(req, res, next) {
        try {
            // Doctors can only query their own prescriptions
            const prescriptions = await prescriptionService.getPrescriptionsByDoctor(req.user.id);
            return success(res, prescriptions, 'Prescriptions retrieved');
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const prescription = await prescriptionService.getPrescriptionById(req.params.id);
            return success(res, prescription, 'Prescription retrieved');
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const prescription = await prescriptionService.createPrescription({
                ...req.body,
                doctorId: req.user.id,  // doctor writes the prescription
            });
            return success(res, prescription, 'Prescription created', 201);
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const prescription = await prescriptionService.updatePrescription(req.params.id, req.body);
            return success(res, prescription, 'Prescription updated');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new PrescriptionController();
