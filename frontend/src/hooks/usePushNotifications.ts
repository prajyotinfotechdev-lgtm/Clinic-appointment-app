import { useState, useEffect } from 'react';
import {
    subscribeToPushNotifications,
    unsubscribeFromPushNotifications,
    isPushSubscribed,
    sendTestNotification,
} from '@/lib/pushNotifications';

export function usePushNotifications() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [permission, setPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        checkSubscriptionStatus();
        checkPermissionStatus();
    }, []);

    const checkSubscriptionStatus = async () => {
        try {
            const subscribed = await isPushSubscribed();
            setIsSubscribed(subscribed);
        } catch (error) {
            console.error('Failed to check subscription status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const checkPermissionStatus = () => {
        if ('Notification' in window) {
            setPermission(Notification.permission);
        }
    };

    const subscribe = async () => {
        setIsLoading(true);
        try {
            const subscription = await subscribeToPushNotifications();
            if (subscription) {
                setIsSubscribed(true);
                setPermission('granted');
                return true;
            }
            return false;
        } catch (error) {
            console.error('Failed to subscribe:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const unsubscribe = async () => {
        setIsLoading(true);
        try {
            await unsubscribeFromPushNotifications();
            setIsSubscribed(false);
            return true;
        } catch (error) {
            console.error('Failed to unsubscribe:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const testNotification = async () => {
        try {
            await sendTestNotification();
            return true;
        } catch (error) {
            console.error('Failed to send test notification:', error);
            return false;
        }
    };

    return {
        isSubscribed,
        isLoading,
        permission,
        subscribe,
        unsubscribe,
        testNotification,
        isSupported: 'Notification' in window && 'serviceWorker' in navigator,
    };
}
