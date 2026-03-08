const clinicSettingsRepository = require('./repository');

class ClinicSettingsService {
    async getSettingsByDoctor(doctorId) {
        const settings = await clinicSettingsRepository.findByDoctorId(doctorId);
        if (!settings) {
            // Return defaults if no settings configured yet
            return {
                doctorId,
                clinicStartTime: '09:00',
                clinicEndTime: '17:00',
                slotDurationMinutes: 15,
                workingDays: [1, 2, 3, 4, 5],
            };
        }
        return settings;
    }

    async upsertSettings(doctorId, data) {
        return clinicSettingsRepository.upsert(doctorId, {
            clinicStartTime: data.clinicStartTime,
            clinicEndTime: data.clinicEndTime,
            slotDurationMinutes: data.slotDurationMinutes,
            workingDays: data.workingDays,
        });
    }
}

module.exports = new ClinicSettingsService();
