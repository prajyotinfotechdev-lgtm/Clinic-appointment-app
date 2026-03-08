const clinicSettingsService = require('./service');
const { success } = require('../../utils/apiResponse');

class ClinicSettingsController {
    async getSettings(req, res, next) {
        try {
            const doctorId = req.params.doctorId || req.user.id;
            const settings = await clinicSettingsService.getSettingsByDoctor(doctorId);
            return success(res, settings, 'Clinic settings retrieved');
        } catch (err) {
            next(err);
        }
    }

    async upsertSettings(req, res, next) {
        try {
            const settings = await clinicSettingsService.upsertSettings(
                req.body.doctorId || req.user.id,
                req.body
            );
            return success(res, settings, 'Clinic settings updated');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ClinicSettingsController();
