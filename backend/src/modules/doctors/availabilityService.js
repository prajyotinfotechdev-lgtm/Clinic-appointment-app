const availabilityRepository = require('./availabilityRepository');
const { AppError } = require('../../utils/AppError');

class AvailabilityService {
    async getDoctorAvailability(doctorId) {
        return availabilityRepository.findByDoctor(doctorId);
    }

    async addAvailability(doctorId, data) {
        return availabilityRepository.create({
            ...data,
            doctorId,
            startDate: new Date(data.startDate),
            endDate: data.endDate ? new Date(data.endDate) : null
        });
    }

    async removeAvailability(id) {
        return availabilityRepository.delete(id);
    }

    async checkAvailability(doctorId, date, timeSlot) {
        const availabilities = await availabilityRepository.findActiveByDoctorAndDate(doctorId, date);

        for (const avail of availabilities) {
            if (avail.type === 'HOLIDAY') {
                return false; // Doctor is on holiday
            }
            if (avail.type === 'UNAVAILABLE') {
                // If it's a specific time range
                if (avail.startTime && avail.endTime && timeSlot) {
                    if (timeSlot >= avail.startTime && timeSlot < avail.endTime) {
                        return false; // Time slot is within unavailable range
                    }
                } else if (!avail.startTime) {
                    return false; // Whole day is unavailable
                }
            }
        }
        return true;
    }
}

module.exports = new AvailabilityService();
