export type UserRole = "PATIENT" | "DOCTOR" | "RECEPTIONIST";

export interface AuthUser {
    id: string;
    email: string;
    role: UserRole;
    clinicId?: string;
    name?: string;
    phoneVerified?: boolean;
}

/**
 * Store JWT token in localStorage.
 */
export function setToken(token: string) {
    if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
    }
}

/**
 * Remove JWT token from localStorage.
 */
export function removeToken() {
    if (typeof window !== "undefined") {
        localStorage.removeItem("token");
    }
}

/**
 * Get stored JWT token.
 */
export function getToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}

/**
 * Decode JWT payload (without verification — that's the server's job).
 */
export function decodeToken(token: string): AuthUser | null {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return {
            id: payload.userId,
            email: payload.email,
            role: payload.role,
            clinicId: payload.clinicId,
            name: payload.name,
            phoneVerified: payload.phoneVerified,
        };
    } catch {
        return null;
    }
}

/**
 * Get the dashboard path for a given role and verification status.
 */
export function getDashboardPath(user: AuthUser): string {
    switch (user.role) {
        case "PATIENT":
            return user.phoneVerified ? "/patient/dashboard" : "/verify-phone";
        case "DOCTOR":
            return "/doctor/dashboard";
        case "RECEPTIONIST":
            return "/receptionist/dashboard";
        default:
            return "/login";
    }
}
