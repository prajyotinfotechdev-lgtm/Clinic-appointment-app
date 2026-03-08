const notificationRepository = require('./repository');

class NotificationService {
    async getPatientNotifications(patientId) {
        return notificationRepository.findByPatientId(patientId);
    }

    /**
     * Send an SMS reminder for an appointment.
     */
    async sendSmsReminder({ patientId, appointmentId }) {
        const notification = await notificationRepository.create({
            patientId,
            appointmentId,
            type: 'SMS',
            status: 'PENDING',
        });

        // TODO: Integrate with Twilio SDK
        // const twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken);
        // await twilio.messages.create({ ... });

        // Mark as sent (simulated for now)
        await notificationRepository.updateStatus(notification.id, 'SENT', new Date());

        return notification;
    }

    /**
     * Process all pending notifications (for cron job).
     */
    async processPendingNotifications() {
        const pending = await notificationRepository.getPendingNotifications();
        const results = [];

        for (const notification of pending) {
            try {
                // TODO: Actually send via SMS/Email provider
                await notificationRepository.updateStatus(notification.id, 'SENT', new Date());
                results.push({ id: notification.id, status: 'SENT' });
            } catch (err) {
                await notificationRepository.updateStatus(notification.id, 'FAILED');
                results.push({ id: notification.id, status: 'FAILED', error: err.message });
            }
        }

        return results;
    }
}

module.exports = new NotificationService();
