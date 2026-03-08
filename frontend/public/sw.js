const CACHE_NAME = 'clinic-flow-v1';

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll([
            '/',
        ])),
    );
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (e) => {
    // DO NOT intercept API requests or cross-origin requests
    if (e.request.url.includes('/api/') || !e.request.url.startsWith(self.location.origin)) {
        return;
    }

    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});

// ─── Push Notification Handlers ──────────────────────────────────

/**
 * Listen for push events from the backend.
 * Display a notification when a push message is received.
 */
self.addEventListener('push', (event) => {
    let notificationData = {
        title: 'CliniQ Notification',
        body: 'You have a new notification',
        icon: '/icon-192x192.png',
        badge: '/badge-72x72.png',
        data: {
            url: '/patient/dashboard',
        },
    };

    if (event.data) {
        try {
            notificationData = event.data.json();
        } catch (e) {
            console.error('Failed to parse push notification data', e);
        }
    }

    const options = {
        body: notificationData.body,
        icon: notificationData.icon || '/icon-192x192.png',
        badge: notificationData.badge || '/badge-72x72.png',
        tag: notificationData.tag || 'default',
        data: notificationData.data || {},
        actions: notificationData.actions || [],
        vibrate: [200, 100, 200],
        requireInteraction: false,
    };

    event.waitUntil(
        self.registration.showNotification(notificationData.title, options)
    );
});

/**
 * Handle notification click events.
 * When a notification is clicked, open the app and navigate to the appropriate page.
 */
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const urlToOpen = event.notification.data?.url || '/patient/appointments';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // Check if there's already a window open
            for (const client of clientList) {
                if (client.url.includes(self.location.origin) && 'focus' in client) {
                    client.focus();
                    client.postMessage({
                        type: 'NAVIGATE',
                        url: urlToOpen,
                    });
                    return;
                }
            }

            // If no window is open, open a new one
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});

/**
 * Handle notification close events (optional analytics).
 */
self.addEventListener('notificationclose', (event) => {
    console.log('Notification closed', event.notification.tag);
});
