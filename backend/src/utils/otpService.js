/**
 * In-memory OTP store for development.
 * In production, use Redis for persistence and expiry.
 */
const otpStore = new Map();

class OtpService {
    /**
     * Generate a 6-digit OTP and store it.
     */
    async generateOtp(phone) {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes expiry

        otpStore.set(phone, { otp, expiry });

        console.log(`[OTP] Generated for ${phone}: ${otp}`); // Always log locally for debugging

        // Actual MSG91 Dispatch
        const config = require('../config');
        const authKey = config.msg91AuthKey;
        const templateId = process.env.MSG91_TEMPLATE_ID;

        if (authKey && templateId) {
            try {
                // Formatting phone: ensure it doesn't have + for MSG91 v5 in some cases, 
                // but usually cc+phone is better.
                const cleanPhone = phone.replace('+', '');

                const url = `https://control.msg91.com/api/v5/otp?template_id=${templateId}&mobile=${cleanPhone}&authkey=${authKey}&otp=${otp}`;

                const response = await fetch(url, { method: 'POST' });
                const result = await response.json();

                console.log(`[OTP] MSG91 Response for ${phone}:`, result);

                if (result.type === 'success') {
                    console.log(`[OTP] Successfully dispatched to ${phone}`);
                } else {
                    console.error(`[OTP] MSG91 Error for ${phone}:`, result.message);
                }
            } catch (err) {
                console.error(`[OTP] Failed to dispatch to ${phone}:`, err.message);
            }
        } else {
            console.log(`[OTP] SIMULATED (Missing MSG91_TEMPLATE_ID or AuthKey) to ${phone}: ${otp}`);
        }

        return otp;
    }

    /**
     * Verify an OTP.
     */
    async verifyOtp(phone, otp) {
        const record = otpStore.get(phone);

        if (!record) return false;
        if (Date.now() > record.expiry) {
            otpStore.delete(phone);
            return false;
        }

        if (record.otp === otp) {
            otpStore.delete(phone);
            return true;
        }

        return false;
    }
}

module.exports = new OtpService();
