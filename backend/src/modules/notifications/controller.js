const notificationService = require('./service');
const { success } = require('../../utils/apiResponse');

class NotificationController {
    async getMyNotifications(req, res, next) {
        try {
            const notifications = await notificationService.getPatientNotifications(req.user.id);
            return success(res, notifications, 'Notifications retrieved');
        } catch (err) {
            next(err);
        }
    }

    async sendReminder(req, res, next) {
        try {
            const notification = await notificationService.sendSmsReminder(req.body);
            return success(res, notification, 'Reminder sent', 201);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new NotificationController();
