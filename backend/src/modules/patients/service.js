const patientRepository = require('./repository');

class PatientService {
    async getAllPatients() {
        return patientRepository.findAll();
    }

    async getPatientById(id) {
        const patient = await patientRepository.findById(id);
        if (!patient) {
            const err = new Error('Patient not found');
            err.statusCode = 404;
            throw err;
        }
        return patient;
    }

    async getPatientByPhone(phone) {
        return patientRepository.findByPhone(phone);
    }

    async updatePatient(id, data) {
        return patientRepository.update(id, data);
    }

    async createPatient(data) {
        return patientRepository.create(data);
    }

    async searchPatients(query) {
        return patientRepository.search(query);
    }
}

module.exports = new PatientService();
