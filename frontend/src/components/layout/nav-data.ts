import {
    LayoutDashboard,
    CalendarPlus,
    CalendarDays,
    FileText,
    User,
    Users,
    Activity,
    Stethoscope,
    ListTodo,
    History,
    Settings
} from "lucide-react";

export const patientNavigation = [
    { name: "Dashboard", href: "/patient/dashboard", icon: LayoutDashboard },
    { name: "Book Appointment", href: "/patient/book", icon: CalendarPlus },
    { name: "My Appointments", href: "/patient/appointments", icon: CalendarDays },
    { name: "Prescriptions", href: "/patient/prescriptions", icon: FileText },
    { name: "Profile", href: "/patient/profile", icon: User },
];

export const receptionistNavigation = [
    { name: "Dashboard", href: "/receptionist/dashboard", icon: LayoutDashboard },
    { name: "Patients", href: "/receptionist/patients", icon: Users },
    { name: "Appointments", href: "/receptionist/appointments", icon: CalendarDays },
    { name: "Queue", href: "/receptionist/queue", icon: Activity },
    { name: "Patient History", href: "/receptionist/patient-history", icon: History },
];

export const doctorNavigation = [
    { name: "Dashboard", href: "/doctor/dashboard", icon: LayoutDashboard },
    { name: "7-Day Overview", href: "/doctor/appointments", icon: CalendarDays },
    { name: "Today's Queue", href: "/doctor/queue", icon: ListTodo },
    { name: "Patient History", href: "/doctor/patient-history", icon: History },
    { name: "Prescriptions", href: "/doctor/prescriptions", icon: Stethoscope },
    { name: "Availability", href: "/doctor/settings", icon: Settings },
];
