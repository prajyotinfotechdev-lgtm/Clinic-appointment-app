const doctorService = require('./service');
const { success } = require('../../utils/apiResponse');

class DoctorController {
    async getAll(req, res, next) {
        try {
            console.log('GET /api/doctors called by:', req.user.id, req.user.role);
            const doctors = await doctorService.getAllDoctors();
            console.log('Doctors found:', doctors.length);
            return success(res, doctors, 'Doctors retrieved');
        } catch (err) {
            console.error('Error in getAllDoctors:', err);
            next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const doctor = await doctorService.getDoctorById(req.params.id);
            return success(res, doctor, 'Doctor retrieved');
        } catch (err) {
            next(err);
        }
    }

    async getMyProfile(req, res, next) {
        try {
            const doctor = await doctorService.getDoctorById(req.user.id);
            return success(res, doctor, 'Profile retrieved');
        } catch (err) {
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const doctor = await doctorService.updateDoctor(req.params.id, req.body);
            return success(res, doctor, 'Doctor updated');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new DoctorController();
