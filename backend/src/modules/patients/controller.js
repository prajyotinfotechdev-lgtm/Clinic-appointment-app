const patientService = require('./service');
const { success } = require('../../utils/apiResponse');

class PatientController {
    async getAll(req, res, next) {
        try {
            const patients = await patientService.getAllPatients();
            return success(res, patients, 'Patients retrieved');
        } catch (err) {
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const patient = await patientService.getPatientById(req.params.id);
            return success(res, patient, 'Patient retrieved');
        } catch (err) {
            next(err);
        }
    }

    async getMyProfile(req, res, next) {
        try {
            const patient = await patientService.getPatientById(req.user.id);
            return success(res, patient, 'Profile retrieved');
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const patient = await patientService.updatePatient(req.params.id, req.body);
            return success(res, patient, 'Patient updated');
        } catch (err) {
            next(err);
        }
    }

    async search(req, res, next) {
        try {
            const patients = await patientService.searchPatients(req.query.q);
            return success(res, patients, 'Search results');
        } catch (err) {
            next(err);
        }
    }

    async getHistory(req, res, next) {
        try {
            const appointmentService = require('../appointments/service');
            const history = await appointmentService.getAllAppointments({
                patientId: req.params.id,
                status: 'COMPLETED'
            });
            return success(res, history, 'Patient history retrieved');
        } catch (err) {
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const patient = await patientService.createPatient(req.body);
            return success(res, patient, 'Patient created', 201);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new PatientController();
