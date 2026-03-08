import { api } from "./api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/**
 * Convert a base64 string to Uint8Array for VAPID key
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * Get the VAPID public key from the backend
 */
export async function getVapidPublicKey(): Promise<string> {
    try {
        const response = await fetch(`${API_BASE_URL}/push/vapid-public-key`);
        const data = await response.json();
        return data.data.publicKey;
    } catch (error) {
        console.error('Failed to get VAPID public key:', error);
        throw error;
    }
}

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
        throw new Error('This browser does not support notifications');
    }

    if (Notification.permission === 'granted') {
        return 'granted';
    }

    if (Notification.permission === 'denied') {
        return 'denied';
    }

    return await Notification.requestPermission();
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
    try {
        // Check if service worker is supported
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service workers are not supported');
        }

        // Check if push notifications are supported
        if (!('PushManager' in window)) {
            throw new Error('Push notifications are not supported');
        }

        // Request permission
        const permission = await requestNotificationPermission();
        if (permission !== 'granted') {
            console.log('Notification permission denied');
            return null;
        }

        // Get service worker registration
        const registration = await navigator.serviceWorker.ready;

        // Get VAPID public key
        const vapidPublicKey = await getVapidPublicKey();
        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

        // Subscribe to push notifications
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey as BufferSource,
        });

        // Send subscription to backend
        await api.post('/push/subscribe', { subscription });

        console.log('Successfully subscribed to push notifications');
        return subscription;
    } catch (error) {
        console.error('Failed to subscribe to push notifications:', error);
        throw error;
    }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications(): Promise<void> {
    try {
        if (!('serviceWorker' in navigator)) {
            return;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
            await subscription.unsubscribe();
            await api.post('/push/unsubscribe', { endpoint: subscription.endpoint });
            console.log('Successfully unsubscribed from push notifications');
        }
    } catch (error) {
        console.error('Failed to unsubscribe from push notifications:', error);
        throw error;
    }
}

/**
 * Check if user is currently subscribed to push notifications
 */
export async function isPushSubscribed(): Promise<boolean> {
    try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            return false;
        }

        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        return subscription !== null;
    } catch (error) {
        console.error('Failed to check push subscription status:', error);
        return false;
    }
}

/**
 * Get current push subscription
 */
export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
    try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
            return null;
        }

        const registration = await navigator.serviceWorker.ready;
        return await registration.pushManager.getSubscription();
    } catch (error) {
        console.error('Failed to get current push subscription:', error);
        return null;
    }
}

/**
 * Send a test notification
 */
export async function sendTestNotification(): Promise<void> {
    await api.post('/push/test', {});
}
