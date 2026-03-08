const authService = require('./service');
const { success } = require('../../utils/apiResponse');

class AuthController {
    // ─── Doctor Auth ─────────────────────────────────────

    async registerDoctor(req, res, next) {
        try {
            const result = await authService.registerDoctor(req.body);
            return success(res, result, 'Doctor registered', 201);
        } catch (err) {
            next(err);
        }
    }

    async loginDoctor(req, res, next) {
        try {
            const result = await authService.loginDoctor(req.body);
            return success(res, result, 'Login successful');
        } catch (err) {
            next(err);
        }
    }

    // ─── Receptionist Auth ───────────────────────────────

    async registerReceptionist(req, res, next) {
        try {
            const result = await authService.registerReceptionist(req.body);
            return success(res, result, 'Receptionist registered', 201);
        } catch (err) {
            next(err);
        }
    }

    async loginReceptionist(req, res, next) {
        try {
            const result = await authService.loginReceptionist(req.body);
            return success(res, result, 'Login successful');
        } catch (err) {
            next(err);
        }
    }

    // ─── Google SSO (Patients) ─────────────────────────

    async googleLogin(req, res, next) {
        try {
            const { token } = req.body;
            // The service will verify the token and return the user session
            const result = await authService.handleGoogleAuth(token);
            return success(res, result, 'Google login successful');
        } catch (err) {
            next(err);
        }
    }

    // ─── Phone Verification (Patients) ───────────────────

    async sendOtp(req, res, next) {
        try {
            const { phone } = req.body;
            const otpService = require('../../utils/otpService');
            await otpService.generateOtp(phone);
            return success(res, null, 'OTP sent successfully');
        } catch (err) {
            next(err);
        }
    }

    async verifyOtp(req, res, next) {
        try {
            const { phone, accessToken, otp } = req.body;

            if (otp) {
                const otpService = require('../../utils/otpService');
                const isValidOtp = await otpService.verifyOtp(phone, otp);

                if (!isValidOtp) {
                    const { error } = require('../../utils/apiResponse');
                    return error(res, 'Invalid or expired OTP', 400);
                }
            } else {
                const url = 'https://control.msg91.com/api/v5/widget/verifyAccessToken';
                const headers = {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                };
                const body = {
                    "authkey": process.env.MSG91_AUTH_KEY || "498614AZCwv2r469abe212P1",
                    "access-token": accessToken
                };

                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(body)
                });
                const json = await response.json();

                if (json.type !== 'success') {
                    const { error } = require('../../utils/apiResponse');
                    return error(res, 'Invalid or expired OTP token', 400);
                }
            }

            const patient = await authService.verifyPatientPhone(
                req.user.id,
                phone
            );

            const { signToken } = require('../../utils/jwt');
            const jwtToken = signToken({
                userId: patient.id,
                role: 'PATIENT',
                name: patient.name,
                phoneVerified: patient.phoneVerified
            });

            return success(res, { user: patient, token: jwtToken }, 'Phone verified');
        } catch (err) {
            next(err);
        }
    }

    // ─── Profile ─────────────────────────────────────────

    async getProfile(req, res, next) {
        try {
            const user = await authService.getProfile(req.user.id, req.user.role);
            return success(res, user, 'Profile retrieved');
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AuthController();
