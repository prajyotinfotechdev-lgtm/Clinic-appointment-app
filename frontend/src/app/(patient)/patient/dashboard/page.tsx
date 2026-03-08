"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, Plus, Heart, Pill, Search, MapPin, Phone, X, ArrowRight, Stethoscope } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { DOCTORS, CLINIC } from "@/lib/clinic-data";
import { cn, formatTime12Hour, getStatusConfig } from "@/lib/utils";
import { ButtonSpinner } from "@/components/ui/clinic-loader";

export default function PatientDashboard() {
    const { user } = useAuth();
    const { appointments, isLoading } = useAppointments({ patientId: user?.id });
    const [showPhoneModal, setShowPhoneModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isSavingPhone, setIsSavingPhone] = useState(false);
    const [phoneSaved, setPhoneSaved] = useState(false);

    useEffect(() => {
        if (user && !user.phoneVerified) {
            setShowPhoneModal(true);
        }
    }, [user]);

    const handleSavePhone = async () => {
        if (!phoneNumber.trim() || phoneNumber.trim().length < 10) {
            alert("Please enter a valid 10-digit mobile number.");
            return;
        }
        try {
            setIsSavingPhone(true);
            await api.put(`/patients/${user?.id}`, { phone: phoneNumber.trim() });
            setPhoneSaved(true);
            setTimeout(() => setShowPhoneModal(false), 1500);
        } catch {
            alert("Failed to save phone number. Please try again.");
        } finally {
            setIsSavingPhone(false);
        }
    };

    const upcoming = appointments.filter(a =>
        a.status === 'BOOKED' || a.status === 'WAITING' || a.status === 'IN_CONSULTATION'
    ).sort((a, b) => {
        const dateDiff = new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime();
        return dateDiff !== 0 ? dateDiff : a.timeSlot.localeCompare(b.timeSlot);
    });

    const userName = user?.name ? user.name.split(' ')[0] : (user?.email ? user.email.split('@')[0] : "there");

    const quickActions = [
        { icon: Search, label: "Find Doctor", bg: "bg-sky-50", iconColor: "text-sky-600", href: "/patient/book" },
        { icon: CalendarDays, label: "Appointments", bg: "bg-emerald-50", iconColor: "text-emerald-600", href: "/patient/appointments" },
        { icon: Pill, label: "Prescriptions", bg: "bg-violet-50", iconColor: "text-violet-600", href: "/patient/prescriptions" },
        { icon: Heart, label: "Profile", bg: "bg-rose-50", iconColor: "text-rose-600", href: "/patient/profile" },
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Phone Modal ── */}
            {showPhoneModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-[var(--shadow-elevated)] max-w-sm w-full p-6 relative animate-fade-in">
                        <button onClick={() => setShowPhoneModal(false)} className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors">
                            <X className="h-5 w-5" />
                        </button>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-amber-50 rounded-xl mx-auto flex items-center justify-center border border-amber-100 mb-4">
                                <Phone className="h-6 w-6 text-amber-600" />
                            </div>
                            {phoneSaved ? (
                                <>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Phone Saved!</h2>
                                    <p className="text-slate-500 text-sm">You can now book appointments.</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-lg font-bold text-slate-900 mb-1">Add Your Phone Number</h2>
                                    <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                                        Required for appointment confirmations and reminders.
                                    </p>
                                    <input
                                        type="tel"
                                        placeholder="Enter 10-digit mobile number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-center text-lg font-bold tracking-widest text-slate-900 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none transition-all placeholder:text-slate-300 placeholder:tracking-normal placeholder:font-medium placeholder:text-sm"
                                        maxLength={10}
                                    />
                                    <button
                                        onClick={handleSavePhone}
                                        disabled={isSavingPhone || phoneNumber.length < 10}
                                        className="w-full mt-3 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isSavingPhone ? <><ButtonSpinner /> Saving...</> : "Save & Continue"}
                                    </button>
                                    <button onClick={() => setShowPhoneModal(false)} className="mt-3 text-slate-400 text-xs font-medium hover:text-slate-600 transition-colors">
                                        I&apos;ll do this later
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ── Header ── */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-white">{userName.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                        <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight truncate">Hi, {userName}</h1>
                        <p className="text-slate-400 text-xs truncate">{user?.email}</p>
                    </div>
                </div>
                <Link href="/patient/book">
                    <button className="px-3 md:px-4 py-2 bg-teal-600 text-white rounded-lg font-semibold text-xs md:text-sm hover:bg-teal-700 transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.98] shrink-0">
                        <Plus className="h-4 w-4" /> <span className="hidden md:inline">Book Appointment</span><span className="md:hidden">Book</span>
                    </button>
                </Link>
            </div>

            {/* ── Next Visit Banner ── */}
            {upcoming.length > 0 && (
                <div className="bg-teal-900 rounded-xl p-4 md:p-5 text-white overflow-hidden relative animate-fade-in">
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-teal-500/10 rounded-l-full blur-3xl" />
                    <div className="relative z-10 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-[10px] font-semibold text-teal-300 uppercase tracking-widest mb-1">Next Appointment</p>
                            <p className="text-base md:text-lg font-bold">
                                Dr. {upcoming[0].doctor.name}
                            </p>
                            <div className="flex items-center gap-3 mt-1.5 text-xs text-teal-200">
                                <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{format(new Date(upcoming[0].appointmentDate), "MMM do")}</span>
                                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatTime12Hour(upcoming[0].timeSlot)}</span>
                            </div>
                        </div>
                        <Link href="/patient/appointments" className="shrink-0">
                            <div className="h-10 w-10 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                <ArrowRight className="h-4 w-4 text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
            )}

            {/* ── Quick Actions ── */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 stagger-children">
                {quickActions.map((item) => (
                    <Link key={item.label} href={item.href}>
                        <div className="bg-white rounded-xl border border-slate-200/60 p-3 md:p-4 flex flex-col items-center gap-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all cursor-pointer group">
                            <div className={cn("w-9 h-9 md:w-10 md:h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform", item.bg)}>
                                <item.icon className={cn("h-4 w-4 md:h-5 md:w-5", item.iconColor)} />
                            </div>
                            <span className="font-semibold text-[10px] md:text-xs text-slate-600 text-center leading-tight">{item.label}</span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* ── Main Content ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
                {/* Upcoming Visits */}
                <div className="lg:col-span-1 space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-900">Upcoming Visits</h2>
                        <Link href="/patient/appointments" className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors">
                            View All
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="space-y-2">
                            {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
                        </div>
                    ) : upcoming.length === 0 ? (
                        <div className="bg-white rounded-xl border border-dashed border-slate-200 py-10 px-6 flex flex-col items-center text-center shadow-[var(--shadow-card)]">
                            <CalendarDays className="h-8 w-8 text-slate-200 mb-3" />
                            <p className="text-sm font-semibold text-slate-600">No upcoming visits</p>
                            <Link href="/patient/book" className="mt-4">
                                <button className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg font-semibold text-xs hover:bg-slate-100 transition-all">
                                    Schedule Now
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {upcoming.slice(0, 3).map((appt) => {
                                const sc = getStatusConfig(appt.status);
                                return (
                                    <div key={appt.id} className="bg-white rounded-xl border border-slate-200/60 p-3 flex items-center gap-3 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow">
                                        <div className="w-11 h-11 rounded-lg bg-slate-50 flex flex-col items-center justify-center shrink-0 border border-slate-100">
                                            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400 leading-none">{format(new Date(appt.appointmentDate), "MMM")}</span>
                                            <span className="text-base font-bold text-slate-800 leading-none">{format(new Date(appt.appointmentDate), "dd")}</span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-800 text-sm truncate">Dr. {appt.doctor.name}</h3>
                                            <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                                <Clock className="h-3 w-3" /> {formatTime12Hour(appt.timeSlot)}
                                            </p>
                                        </div>
                                        <Badge className={cn("px-2 py-0.5 rounded-md text-[9px] font-semibold border-none", sc.bg, sc.text)}>
                                            {sc.label}
                                        </Badge>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Doctors & Info */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-sm font-semibold text-slate-900">Our Doctors</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {DOCTORS.map((doc) => (
                            <div key={doc.id} className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow flex flex-col justify-between group">
                                <div>
                                    <div className="flex items-start gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center border border-teal-100 shrink-0">
                                            <Stethoscope className="h-5 w-5 text-teal-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-slate-800 text-sm truncate">{doc.name}</h3>
                                            <p className="text-teal-600 text-[10px] font-semibold">{doc.specialization}</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 text-[11px] font-medium leading-relaxed line-clamp-2">{doc.shortBio}</p>
                                </div>
                                <Link href="/patient/book" className="mt-3">
                                    <button className="w-full py-2 bg-slate-50 border border-slate-200/60 text-slate-600 rounded-lg font-semibold text-[11px] hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all active:scale-[0.98]">
                                        Book Appointment
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Clinic Info */}
                    <div className="bg-white rounded-xl border border-slate-200/60 px-4 py-3.5 flex items-center gap-3 shadow-[var(--shadow-card)]">
                        <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                            <MapPin className="h-4 w-4 text-teal-600" />
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-slate-800">{CLINIC.brandName}</h3>
                            <p className="text-slate-400 text-[11px] font-medium truncate">
                                {CLINIC.address.building}, {CLINIC.address.area}, {CLINIC.address.city}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
