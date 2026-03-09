const prescriptionRepository = require('./repository');
const { AppError } = require('../../utils/AppError');

class PrescriptionService {
    async getAllPrescriptions() {
        return prescriptionRepository.findAll();
    }

    async getPrescriptionsByPatient(patientId) {
        return prescriptionRepository.findByPatientId(patientId);
    }

    async getPrescriptionsByDoctor(doctorId) {
        return prescriptionRepository.findByDoctorId(doctorId);
    }

    async getPrescriptionById(id) {
        const prescription = await prescriptionRepository.findById(id);
        if (!prescription) {
            throw new AppError('Prescription not found', 404);
        }
        return prescription;
    }

    async getPrescriptionByAppointment(appointmentId) {
        return prescriptionRepository.findByAppointmentId(appointmentId);
    }

    async createPrescription(data) {
        return prescriptionRepository.create(data);
    }

    async updatePrescription(id, data) {
        return prescriptionRepository.update(id, data);
    }
}

module.exports = new PrescriptionService();
