require('dotenv').config();

const logger = require('./logger');

// ─── Startup Validation ───────────────────────────────────
// Crash early if required environment variables are missing.
const REQUIRED_VARS = ['JWT_SECRET', 'DATABASE_URL'];
for (const key of REQUIRED_VARS) {
  if (!process.env[key]) {
    logger.fatal(`Missing required environment variable: ${key}`);
    process.exit(1);
  }
}

module.exports = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl:
      process.env.GOOGLE_CALLBACK_URL ||
      (process.env.NODE_ENV === 'production'
        ? 'https://clinic-appointment-app-production-320a.up.railway.app/api/auth/google/callback'
        : 'http://localhost:5000/api/auth/google/callback'),
  },
  frontendUrl:
    process.env.FRONTEND_URL ||
    (process.env.NODE_ENV === 'production'
      ? 'https://easygoing-rejoicing-production.up.railway.app'
      : 'http://localhost:3000'),
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  vapid: {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY,
    subject: process.env.VAPID_SUBJECT || 'mailto:admin@cliniq.app',
  },
  msg91AuthKey: process.env.MSG91_AUTH_KEY || "498614AZCwv2r469abe212P1",
};
