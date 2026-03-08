const pushService = require('./service');
const { success, error } = require('../../utils/apiResponse');
const logger = require('../../config/logger');

class PushController {
    async subscribe(req, res) {
        try {
            const { subscription } = req.body;
            const patientId = req.user.id;

            if (!subscription || !subscription.endpoint || !subscription.keys) {
                return error(res, 'Invalid subscription object', 400);
            }

            const result = await pushService.subscribe(patientId, subscription);
            
            logger.info({ patientId, endpoint: subscription.endpoint }, 'Push subscription created');
            
            return success(res, result, 'Subscribed to push notifications');
        } catch (err) {
            logger.error({ err }, 'Failed to subscribe to push notifications');
            return error(res, 'Failed to subscribe to push notifications', 500);
        }
    }

    async unsubscribe(req, res) {
        try {
            const { endpoint } = req.body;

            if (!endpoint) {
                return error(res, 'Endpoint is required', 400);
            }

            await pushService.unsubscribe(endpoint);
            
            logger.info({ endpoint }, 'Push subscription removed');
            
            return success(res, null, 'Unsubscribed from push notifications');
        } catch (err) {
            logger.error({ err }, 'Failed to unsubscribe from push notifications');
            return error(res, 'Failed to unsubscribe', 500);
        }
    }

    async unsubscribeAll(req, res) {
        try {
            const patientId = req.user.id;

            await pushService.unsubscribeAll(patientId);
            
            logger.info({ patientId }, 'All push subscriptions removed');
            
            return success(res, null, 'All subscriptions removed');
        } catch (err) {
            logger.error({ err }, 'Failed to remove all subscriptions');
            return error(res, 'Failed to remove subscriptions', 500);
        }
    }

    async getMySubscriptions(req, res) {
        try {
            const patientId = req.user.id;
            const subscriptions = await pushService.getSubscriptionsByPatientId(patientId);
            
            return success(res, subscriptions);
        } catch (err) {
            logger.error({ err }, 'Failed to fetch subscriptions');
            return error(res, 'Failed to fetch subscriptions', 500);
        }
    }

    async getVapidPublicKey(req, res) {
        try {
            const publicKey = pushService.getVapidPublicKey();
            return success(res, { publicKey });
        } catch (err) {
            logger.error({ err }, 'Failed to get VAPID public key');
            return error(res, 'Failed to get public key', 500);
        }
    }

    async testNotification(req, res) {
        try {
            const patientId = req.user.id;
            
            const result = await pushService.sendNotification(patientId, {
                title: 'CliniQ Test Notification',
                body: 'This is a test notification from CliniQ',
                icon: '/icon-192x192.png',
                badge: '/badge-72x72.png',
                data: {
                    url: '/patient/dashboard',
                },
            });

            return success(res, result, 'Test notification sent');
        } catch (err) {
            logger.error({ err }, 'Failed to send test notification');
            return error(res, 'Failed to send test notification', 500);
        }
    }
}

module.exports = new PushController();
