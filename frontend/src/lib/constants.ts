export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const ROLES = {
    PATIENT: "PATIENT",
    DOCTOR: "DOCTOR",
    RECEPTIONIST: "RECEPTIONIST",
} as const;

export const APPOINTMENT_STATUSES = {
    SCHEDULED: "SCHEDULED",
    CONFIRMED: "CONFIRMED",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELLED: "CANCELLED",
    NO_SHOW: "NO_SHOW",
} as const;

export const APPOINTMENT_TYPES = {
    ONLINE: "ONLINE",
    WALK_IN: "WALK_IN",
} as const;
