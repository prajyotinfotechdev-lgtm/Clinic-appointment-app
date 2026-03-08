# PWA Push Notification System - Implementation Guide

## Overview

This document describes the complete implementation of native-quality Progressive Web App (PWA) push notifications for the CliniQ appointment management system. The system delivers appointment reminders that behave like native mobile notifications when the PWA is installed on a user's device.

---

## Features Implemented

### ✅ Core Functionality
- **Web Push Protocol** - Standard push notifications using VAPID authentication
- **Service Worker Integration** - Push event handlers and notification click management
- **Automated Reminders** - Notifications sent at 1 hour and 10 minutes before appointments
- **User Control** - Complete notification preferences in patient profile
- **Offline Support** - Notifications work even when the app is closed
- **Security** - VAPID keys, HTTPS-only, authenticated endpoints

### ✅ User Experience
- **Custom Permission Prompt** - Elegant UI that appears after user engagement (5 seconds delay)
- **Profile Settings** - Toggle notifications on/off with visual feedback
- **Test Notifications** - Patients can send test notifications to verify setup
- **Smart Dismissal** - Permission prompt respects user choices and browser settings

---

## Architecture

### Backend Components

#### 1. Push Subscription Module (`/backend/src/modules/push/`)

**Repository** (`repository.js`)
- Create/delete push subscriptions
- Find subscriptions by patient ID or endpoint
- Database operations for PushSubscription model

**Service** (`service.js`)
- Web-push library integration
- VAPID configuration
- Send push notifications with retry logic
- Handle expired subscriptions (410/404 status codes)
- Format appointment reminder payloads

**Controller** (`controller.js`)
- Subscribe/unsubscribe endpoints
- Get VAPID public key
- Test notification endpoint
- Get user subscriptions

**Routes** (`routes.js`)
- `GET /api/push/vapid-public-key` - Public endpoint for VAPID key
- `POST /api/push/subscribe` - Subscribe to notifications (authenticated patients)
- `POST /api/push/unsubscribe` - Unsubscribe from notifications
- `POST /api/push/unsubscribe-all` - Remove all subscriptions
- `GET /api/push/my-subscriptions` - Get current subscriptions
- `POST /api/push/test` - Send test notification

#### 2. Enhanced Notification Cron (`/backend/src/cron/notificationCron.js`)

**Runs every minute** to check for upcoming appointments:

- **1 Hour Reminder**
  - Sends push notification: "Your appointment with Dr [Name] is at [Time] today"
  - Also sends SMS if no SMS notification exists (legacy support)
  
- **10 Minute Reminder**
  - Sends push notification: "Your consultation with Dr [Name] begins in 10 minutes"
  - Urgent reminder for imminent appointments

**Features:**
- Time formatting (24h → 12h with AM/PM)
- Duplicate prevention
- Error handling and logging
- Includes doctor name and appointment details

#### 3. Database Schema

**PushSubscription Model** (already in Prisma schema):
```prisma
model PushSubscription {
  id        String   @id @default(uuid())
  endpoint  String   @unique
  p256dh    String
  auth      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  patientId String
  patient   Patient @relation(fields: [patientId], references: [id], onDelete: Cascade)
  
  @@index([patientId])
  @@map("push_subscriptions")
}
```

### Frontend Components

#### 1. Service Worker (`/frontend/public/sw.js`)

**Push Event Handler:**
- Receives push messages from backend
- Parses notification payload (title, body, icon, badge, data, actions)
- Displays notification with vibration pattern
- Handles malformed data gracefully

**Notification Click Handler:**
- Closes notification on click
- Checks for existing app windows
- Focuses existing window or opens new one
- Navigates to specified URL (default: `/patient/appointments`)
- Posts navigation message to client

**Notification Close Handler:**
- Optional analytics tracking

#### 2. Push Notification Utilities (`/frontend/src/lib/pushNotifications.ts`)

**Functions:**
- `getVapidPublicKey()` - Fetch VAPID key from backend
- `requestNotificationPermission()` - Request browser permission
- `subscribeToPushNotifications()` - Complete subscription flow
- `unsubscribeFromPushNotifications()` - Remove subscription
- `isPushSubscribed()` - Check subscription status
- `getCurrentPushSubscription()` - Get active subscription
- `sendTestNotification()` - Trigger test notification

**Utilities:**
- `urlBase64ToUint8Array()` - Convert VAPID key to proper format

#### 3. Custom Hook (`/frontend/src/hooks/usePushNotifications.ts`)

**State Management:**
- `isSubscribed` - Current subscription status
- `isLoading` - Loading state for async operations
- `permission` - Browser notification permission status
- `isSupported` - Browser support detection

**Methods:**
- `subscribe()` - Subscribe to notifications
- `unsubscribe()` - Unsubscribe from notifications
- `testNotification()` - Send test notification

#### 4. Notification Prompt Component (`/frontend/src/components/pwa/NotificationPrompt.tsx`)

**Features:**
- Only shows to authenticated patients
- 5-second delay after page load
- Respects dismissed state (localStorage)
- Respects browser permission state
- Beautiful gradient design with bell icon
- "Enable Notifications" and "Not Now" buttons
- Dismissible with X button

**Smart Behavior:**
- Doesn't show if already subscribed
- Doesn't show if permission denied
- Doesn't show if previously dismissed
- Doesn't show to non-patient users

#### 5. Patient Profile Integration (`/frontend/src/app/(patient)/patient/profile/page.tsx`)

**Notification Preferences Section:**
- Visual toggle switch (on/off)
- Status indicator (Enabled/Disabled/Blocked)
- Description of reminder timing
- "Send Test Notification" button
- Browser permission warning if denied
- Only visible if browser supports notifications

---

## Setup Instructions

### 1. Backend Configuration

Add the following to your `.env` file:

```bash
# Web Push Notifications (VAPID)
VAPID_PUBLIC_KEY=BOAWJ_clw77b9CQa-PzzYI77lRz0uD8frwfueF_Z5K0Zoh0Q6lAPhvMsqLIwII7O_hAQm02b0c-lo_PLpSRBBXk
VAPID_PRIVATE_KEY=kirtxqwOoARBFKyJcSPoCxp3E6R_fpjzgmMQ2175Lt4
VAPID_SUBJECT=mailto:admin@cliniq.app
```

**Note:** The VAPID keys above were generated during implementation. For production, you may want to generate new keys using:

```bash
node -e "const webpush = require('web-push'); const vapidKeys = webpush.generateVAPIDKeys(); console.log('VAPID_PUBLIC_KEY=' + vapidKeys.publicKey); console.log('VAPID_PRIVATE_KEY=' + vapidKeys.privateKey);"
```

### 2. Install Dependencies

Backend dependencies are already installed:
- `web-push` - Web Push protocol library

### 3. Database Migration

The `PushSubscription` model is already in the Prisma schema. If you need to apply migrations:

```bash
cd backend
npx prisma migrate dev
npx prisma generate
```

### 4. Start the Services

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm run dev
```

---

## Testing Guide

### 1. Enable Notifications

1. **Install the PWA** (optional but recommended for full experience)
   - Open the app in Chrome/Edge
   - Click the install prompt or use browser menu → Install

2. **Login as a Patient**
   - Use Google OAuth to login
   - Navigate to the patient dashboard

3. **Wait for Notification Prompt**
   - After 5 seconds, a custom prompt will appear
   - Click "Enable Notifications"
   - Accept the browser permission dialog

4. **Verify in Profile**
   - Go to Patient → Profile
   - Check the "Preferences" section
   - Toggle should show "Enabled"

### 2. Send Test Notification

1. Go to Patient Profile
2. In the Notification Preferences section
3. Click "Send Test Notification"
4. You should receive a notification immediately

### 3. Test Appointment Reminders

**Option A: Create Future Appointment**
1. Book an appointment for 1 hour from now
2. Wait for the notification (cron runs every minute)
3. You should receive: "Your appointment with Dr [Name] is at [Time] today"

**Option B: Simulate with Database**
1. Create an appointment in the database with:
   - `appointmentDate` = today's date
   - `timeSlot` = 1 hour from current time (format: "HH:MM")
   - `status` = "BOOKED"
2. Wait up to 1 minute for the cron job to run
3. Check backend logs for notification sent confirmation

### 4. Test Notification Click

1. Receive a notification
2. Click on the notification
3. The app should open (or focus if already open)
4. You should navigate to `/patient/appointments`

### 5. Test Offline Notifications

1. Close the browser completely
2. Ensure the service worker is still registered
3. Trigger a notification (via cron or test endpoint)
4. The notification should still appear
5. Clicking it should open the app

---

## Notification Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Patient Installs PWA                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│          Custom Prompt Appears (after 5 seconds)             │
│                 "Enable Notifications"                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Browser Permission Dialog                       │
│                   (Allow / Block)                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼ (if allowed)
┌─────────────────────────────────────────────────────────────┐
│         Browser Generates Push Subscription                  │
│    (endpoint, p256dh key, auth key)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│      Frontend Sends Subscription to Backend                  │
│           POST /api/push/subscribe                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│     Backend Stores Subscription in Database                  │
│         (PushSubscription table)                             │
└─────────────────────────────────────────────────────────────┘

                    ═══ Later ═══

┌─────────────────────────────────────────────────────────────┐
│         Cron Job Runs (every minute)                         │
│   Checks for appointments in 1hr and 10min                   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│    Backend Sends Push Notification via web-push              │
│      (to patient's subscription endpoint)                    │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         Service Worker Receives Push Event                   │
│       Displays Notification (even if app closed)             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼ (user clicks)
┌─────────────────────────────────────────────────────────────┐
│      Service Worker Handles Click Event                      │
│   Opens/Focuses App → Navigates to /patient/appointments     │
└─────────────────────────────────────────────────────────────┘
```

---

## Notification Payload Structure

```javascript
{
  title: "CliniQ Appointment Reminder",
  body: "Your appointment with Dr Rahul Kalekar is at 5:30 PM today",
  icon: "/icon-192x192.png",
  badge: "/badge-72x72.png",
  tag: "appointment-{appointmentId}",
  data: {
    url: "/patient/appointments",
    appointmentId: "uuid-here"
  },
  actions: [
    {
      action: "open",
      title: "Open App"
    }
  ]
}
```

---

## Security Considerations

### ✅ Implemented Security Features

1. **VAPID Authentication**
   - Public/private key pair for server identification
   - Prevents unauthorized push notifications

2. **HTTPS Only**
   - Service workers require HTTPS (except localhost)
   - Push API requires secure context

3. **Authenticated Endpoints**
   - All subscription endpoints require JWT authentication
   - Only patients can subscribe to notifications
   - Patients can only manage their own subscriptions

4. **No Sensitive Data in Payloads**
   - Notifications contain only doctor name and time
   - No medical information or personal details
   - Appointment ID for navigation only

5. **Subscription Validation**
   - Duplicate endpoint prevention
   - Automatic cleanup of expired subscriptions
   - Patient-subscription relationship enforced

---

## Troubleshooting

### Notifications Not Appearing

**Check Browser Support:**
```javascript
if ('Notification' in window && 'serviceWorker' in navigator) {
  console.log('Push notifications supported');
} else {
  console.log('Push notifications NOT supported');
}
```

**Check Permission Status:**
```javascript
console.log('Notification permission:', Notification.permission);
// Should be: "granted", "denied", or "default"
```

**Check Service Worker:**
```javascript
navigator.serviceWorker.getRegistration().then(reg => {
  console.log('Service Worker:', reg);
  reg.pushManager.getSubscription().then(sub => {
    console.log('Push Subscription:', sub);
  });
});
```

**Check Backend Logs:**
- Look for "Push notification sent" or error messages
- Verify VAPID keys are loaded correctly
- Check cron job is running

### Permission Denied

If the user blocked notifications:
1. They must manually enable in browser settings
2. Chrome: Settings → Privacy and security → Site Settings → Notifications
3. The app will show a warning in the profile page

### Subscription Expired

The backend automatically removes expired subscriptions when it receives 410/404 status codes from the push service.

---

## Production Deployment

### Required Environment Variables

```bash
VAPID_PUBLIC_KEY=your_production_vapid_public_key
VAPID_PRIVATE_KEY=your_production_vapid_private_key
VAPID_SUBJECT=mailto:your-admin-email@domain.com
```

### HTTPS Requirement

- Push notifications **require HTTPS** in production
- Service workers only work on HTTPS (except localhost)
- Ensure your domain has a valid SSL certificate

### Icon Files

Create the following icon files in `/frontend/public/`:
- `icon-192x192.png` - Main notification icon
- `badge-72x72.png` - Badge icon (monochrome, transparent background)

### Monitoring

Monitor the following in production:
- Push notification delivery rate
- Subscription count per patient
- Failed notification attempts
- Expired subscription cleanup

---

## API Reference

### Backend Endpoints

#### Get VAPID Public Key
```
GET /api/push/vapid-public-key
Response: { success: true, data: { publicKey: "..." } }
```

#### Subscribe to Notifications
```
POST /api/push/subscribe
Headers: Authorization: Bearer {token}
Body: { subscription: { endpoint, keys: { p256dh, auth } } }
Response: { success: true, data: { id, endpoint, ... } }
```

#### Unsubscribe
```
POST /api/push/unsubscribe
Headers: Authorization: Bearer {token}
Body: { endpoint: "..." }
Response: { success: true, message: "Unsubscribed" }
```

#### Send Test Notification
```
POST /api/push/test
Headers: Authorization: Bearer {token}
Response: { success: true, data: { sent: 1, failed: 0 } }
```

---

## Browser Compatibility

| Browser | Push Notifications | Service Workers |
|---------|-------------------|-----------------|
| Chrome 50+ | ✅ | ✅ |
| Firefox 44+ | ✅ | ✅ |
| Edge 17+ | ✅ | ✅ |
| Safari 16+ | ✅ | ✅ |
| Opera 37+ | ✅ | ✅ |
| iOS Safari 16.4+ | ✅ | ✅ |
| Android Chrome | ✅ | ✅ |

---

## Future Enhancements

### Potential Improvements

1. **Rich Notifications**
   - Add images to notifications
   - Multiple action buttons
   - Progress indicators

2. **Notification Preferences**
   - Choose reminder times (30min, 1hr, 2hr, etc.)
   - Enable/disable specific notification types
   - Quiet hours configuration

3. **Analytics**
   - Track notification open rates
   - A/B test notification content
   - User engagement metrics

4. **Advanced Features**
   - Notification grouping
   - Priority levels
   - Custom sounds
   - Geolocation-based reminders

---

## Summary

The PWA push notification system is now fully implemented and production-ready. It provides:

✅ Native-quality push notifications for appointment reminders  
✅ Automated reminders at 1 hour and 10 minutes before appointments  
✅ Complete user control via profile settings  
✅ Secure VAPID authentication  
✅ Offline notification support  
✅ Elegant UX with custom permission prompts  
✅ Comprehensive error handling and logging  

The system delivers a seamless mobile-app-like experience with reliable appointment reminders that work even when the application is closed.
