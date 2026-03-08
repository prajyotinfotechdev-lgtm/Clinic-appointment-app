import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// ─── Shared Time Formatter ──────────────────────────────────
export function formatTime12Hour(time24: string): string {
    const [h, m] = time24.split(":");
    let hours = parseInt(h, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, "0")}:${m} ${ampm}`;
}

// ─── Appointment Status Helpers ─────────────────────────────
export type AppointmentStatus =
    | "BOOKED"
    | "WAITING"
    | "IN_CONSULTATION"
    | "COMPLETED"
    | "CANCELLED";

const STATUS_CONFIG: Record<
    AppointmentStatus,
    { label: string; bg: string; text: string; dot: string }
> = {
    BOOKED: {
        label: "Booked",
        bg: "bg-sky-50",
        text: "text-sky-700",
        dot: "bg-sky-500",
    },
    WAITING: {
        label: "Waiting",
        bg: "bg-amber-50",
        text: "text-amber-700",
        dot: "bg-amber-500",
    },
    IN_CONSULTATION: {
        label: "In Room",
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
    },
    COMPLETED: {
        label: "Done",
        bg: "bg-violet-50",
        text: "text-violet-700",
        dot: "bg-violet-500",
    },
    CANCELLED: {
        label: "Cancelled",
        bg: "bg-rose-50",
        text: "text-rose-700",
        dot: "bg-rose-500",
    },
};

export function getStatusConfig(status: string) {
    return (
        STATUS_CONFIG[status as AppointmentStatus] ?? {
            label: status,
            bg: "bg-slate-50",
            text: "text-slate-600",
            dot: "bg-slate-400",
        }
    );
}

export function getStatusBadgeClasses(status: string): string {
    const c = getStatusConfig(status);
    return `${c.bg} ${c.text} border-transparent`;
}
