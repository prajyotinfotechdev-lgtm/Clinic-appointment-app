# Quick Start - PWA Push Notifications

## 🚀 5-Minute Setup Guide

### 1. Add Environment Variables

Add to `backend/.env`:
```bash
VAPID_PUBLIC_KEY=BOAWJ_clw77b9CQa-PzzYI77lRz0uD8frwfueF_Z5K0Zoh0Q6lAPhvMsqLIwII7O_hAQm02b0c-lo_PLpSRBBXk
VAPID_PRIVATE_KEY=kirtxqwOoARBFKyJcSPoCxp3E6R_fpjzgmMQ2175Lt4
VAPID_SUBJECT=mailto:admin@cliniq.app
```

### 2. Start Services

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. Test Notifications

1. **Login as Patient** (Google OAuth)
2. **Wait 5 seconds** for notification prompt
3. **Click "Enable Notifications"**
4. **Go to Profile** → Check "Push Notifications" toggle
5. **Click "Send Test Notification"**
6. **Verify** notification appears

### 4. Test Appointment Reminders

**Option A - Quick Test:**
1. Go to Profile → "Send Test Notification"
2. Notification should appear immediately

**Option B - Full Flow:**
1. Book appointment for 1 hour from now
2. Wait up to 1 minute
3. Receive notification: "Your appointment with Dr [Name] is at [Time] today"

---

## 📱 Features

✅ **1-hour reminder** - "Your appointment with Dr [Name] is at [Time] today"  
✅ **10-minute reminder** - "Your consultation begins in 10 minutes"  
✅ **Offline support** - Works even when app is closed  
✅ **Click to open** - Clicking notification opens app  
✅ **User control** - Toggle on/off in profile  

---

## 🔧 Troubleshooting

**Notifications not appearing?**
- Check browser supports notifications (Chrome, Firefox, Edge, Safari 16+)
- Verify permission is "granted" (not "denied" or "default")
- Check service worker is registered (DevTools → Application → Service Workers)
- Look for backend logs: "Push notification sent"

**Permission denied?**
- User must enable in browser settings
- Chrome: Settings → Privacy → Site Settings → Notifications
- App shows warning in profile page

**Test notification fails?**
- Check backend is running
- Verify VAPID keys are set in `.env`
- Check browser console for errors
- Verify you're logged in as a patient

---

## 📚 Full Documentation

- **Implementation Guide**: `PUSH_NOTIFICATIONS_GUIDE.md`
- **Production Report**: `PRODUCTION_HARDENING_REPORT.md`
- **API Reference**: See implementation guide

---

## 🎯 Quick Commands

```bash
# Generate new VAPID keys (if needed)
node -e "const webpush = require('web-push'); const vapidKeys = webpush.generateVAPIDKeys(); console.log('VAPID_PUBLIC_KEY=' + vapidKeys.publicKey); console.log('VAPID_PRIVATE_KEY=' + vapidKeys.privateKey);"

# Check service worker status (browser console)
navigator.serviceWorker.getRegistration().then(reg => console.log(reg))

# Check push subscription (browser console)
navigator.serviceWorker.ready.then(reg => reg.pushManager.getSubscription()).then(sub => console.log(sub))

# Check notification permission (browser console)
console.log(Notification.permission)
```

---

## ✅ Production Checklist

- [ ] VAPID keys added to production `.env`
- [ ] HTTPS configured and working
- [ ] Icon files created (`icon-192x192.png`, `badge-72x72.png`)
- [ ] Database migrated (`npx prisma migrate deploy`)
- [ ] Frontend built (`npm run build`)
- [ ] Backend running with production env
- [ ] Test notification sent successfully
- [ ] Appointment reminder tested

---

**Status**: ✅ READY TO USE

**Support**: See `PUSH_NOTIFICATIONS_GUIDE.md` for detailed documentation
