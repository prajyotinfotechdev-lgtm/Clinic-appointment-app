const webpush = require('web-push');
const config = require('../../config');
const logger = require('../../config/logger');
const pushRepository = require('./repository');

webpush.setVapidDetails(
    config.vapid.subject,
    config.vapid.publicKey,
    config.vapid.privateKey
);

class PushService {
    async subscribe(patientId, subscription) {
        const existing = await pushRepository.findByEndpoint(subscription.endpoint);
        
        if (existing) {
            if (existing.patientId === patientId) {
                return existing;
            }
            await pushRepository.deleteByEndpoint(subscription.endpoint);
        }

        return pushRepository.create({
            endpoint: subscription.endpoint,
            keys: subscription.keys,
            patientId,
        });
    }

    async unsubscribe(endpoint) {
        return pushRepository.deleteByEndpoint(endpoint);
    }

    async unsubscribeAll(patientId) {
        return pushRepository.deleteByPatientId(patientId);
    }

    async getSubscriptionsByPatientId(patientId) {
        return pushRepository.findByPatientId(patientId);
    }

    async sendNotification(patientId, payload) {
        const subscriptions = await pushRepository.findByPatientId(patientId);

        if (subscriptions.length === 0) {
            logger.info({ patientId }, 'No push subscriptions found for patient');
            return { sent: 0, failed: 0 };
        }

        const results = await Promise.allSettled(
            subscriptions.map(async (sub) => {
                const pushSubscription = {
                    endpoint: sub.endpoint,
                    keys: {
                        p256dh: sub.p256dh,
                        auth: sub.auth,
                    },
                };

                try {
                    await webpush.sendNotification(
                        pushSubscription,
                        JSON.stringify(payload)
                    );
                    logger.info({ endpoint: sub.endpoint }, 'Push notification sent');
                    return { success: true };
                } catch (err) {
                    if (err.statusCode === 410 || err.statusCode === 404) {
                        logger.warn({ endpoint: sub.endpoint }, 'Subscription expired, removing');
                        await pushRepository.deleteByEndpoint(sub.endpoint);
                    } else {
                        logger.error({ err, endpoint: sub.endpoint }, 'Failed to send push notification');
                    }
                    return { success: false, error: err.message };
                }
            })
        );

        const sent = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
        const failed = results.length - sent;

        return { sent, failed, total: results.length };
    }

    async sendAppointmentReminder({ patientId, doctorName, appointmentTime, appointmentId }) {
        const payload = {
            title: 'CliniQ Appointment Reminder',
            body: `Your appointment with Dr ${doctorName} is at ${appointmentTime}`,
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png',
            tag: `appointment-${appointmentId}`,
            data: {
                url: '/patient/appointments',
                appointmentId,
            },
            actions: [
                {
                    action: 'open',
                    title: 'Open App',
                },
            ],
        };

        return this.sendNotification(patientId, payload);
    }

    getVapidPublicKey() {
        return config.vapid.publicKey;
    }
}

module.exports = new PushService();
