const doctorRepository = require('./repository');

class DoctorService {
    async getAllDoctors() {
        return doctorRepository.findAll();
    }

    async getDoctorById(id) {
        const doctor = await doctorRepository.findById(id);
        if (!doctor) {
            const err = new Error('Doctor not found');
            err.statusCode = 404;
            throw err;
        }
        return doctor;
    }

    async updateDoctor(id, data) {
        // Prevent updating sensitive fields via this endpoint
        const { passwordHash, email, ...safeData } = data;
        return doctorRepository.update(id, safeData);
    }
}

module.exports = new DoctorService();
