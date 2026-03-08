"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import {
    Clock,
    CheckCircle2,
    PlayCircle,
    FileText,
    Activity,
    Stethoscope,
    CalendarDays,
    Users,
    Phone,
    ArrowRight,
    Zap
} from "lucide-react";
import { api } from "@/lib/api";
import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime12Hour, getStatusConfig } from "@/lib/utils";

import { SevenDayGlance } from "@/components/dashboard/SevenDayGlance";

export default function DoctorDashboard() {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const { appointments, isLoading, refetch } = useAppointments({
        doctorId: user?.id,
        date: selectedDate
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const waiting = appointments.filter(a => a.status === 'WAITING');
    const booked = appointments.filter(a => a.status === 'BOOKED');
    const active = appointments.find(a => a.status === 'IN_CONSULTATION');
    const completed = appointments.filter(a => a.status === 'COMPLETED');
    const isToday = selectedDate === format(new Date(), 'yyyy-MM-dd');

    const sortedAppointments = [...appointments].sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

    const startConsultation = async (id: string) => {
        try {
            setIsUpdating(true);
            await api.patch(`/appointments/${id}/in-consultation`);
            refetch();
        } catch {
            alert("Failed to start consultation");
        } finally {
            setIsUpdating(false);
        }
    };

    const stats = [
        { label: "Booked", value: booked.length, icon: CalendarDays, color: "text-sky-600", bg: "bg-sky-50" },
        { label: "Waiting", value: waiting.length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "In Room", value: active ? 1 : 0, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Done", value: completed.length, icon: CheckCircle2, color: "text-violet-600", bg: "bg-violet-50" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                            {user?.name ? `Dr. ${user.name}` : "Dashboard"}
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                            {format(new Date(selectedDate), "EEEE, MMMM do")}
                            {appointments.length > 0 && (
                                <span className="text-teal-600 font-semibold"> · {appointments.length} appointments</span>
                            )}
                        </p>
                    </div>
                    {isToday && waiting.length > 0 && !active && (
                        <button
                            onClick={() => startConsultation(waiting[0].id)}
                            disabled={isUpdating}
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 shadow-sm transition-all active:scale-[0.98]"
                        >
                            <Zap className="h-4 w-4" /> Start Next
                        </button>
                    )}
                </div>

                {/* 7-Day Glance */}
                <SevenDayGlance
                    doctorId={user?.id}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                />
            </div>

            {/* ── Stats ── */}
            <div className="grid grid-cols-4 gap-2 md:gap-3 stagger-children">
                {stats.map((s) => (
                    <div
                        key={s.label}
                        className="bg-white rounded-xl border border-slate-200/60 p-3 md:p-4 flex flex-col items-center md:flex-row md:items-center gap-2 md:gap-3 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow"
                    >
                        <div className={cn("w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center shrink-0", s.bg)}>
                            <s.icon className={cn("h-4 w-4 md:h-[18px] md:w-[18px]", s.color)} />
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-lg md:text-xl font-bold text-slate-900 leading-none">{s.value}</p>
                            <p className="text-[10px] font-medium text-slate-400 mt-0.5 uppercase tracking-wider">{s.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Active Consultation Banner ── */}
            {active && (
                <div className="bg-slate-900 rounded-xl p-5 md:p-6 text-white overflow-hidden relative animate-fade-in">
                    <div className="absolute right-0 top-0 bottom-0 w-40 bg-teal-500/10 rounded-l-full blur-3xl" />
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">In Consultation</p>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{active.patient.name}</h2>
                                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{formatTime12Hour(active.timeSlot)}</span>
                                    {active.patient.phone && (
                                        <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{active.patient.phone}</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href="/doctor/prescriptions"
                                    className="px-4 py-2.5 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-500 transition-all flex items-center gap-1.5"
                                >
                                    <FileText className="h-3.5 w-3.5" /> Write Rx
                                </Link>
                                {active.patient.id && (
                                    <Link
                                        href={`/doctor/patient-history/${active.patient.id}`}
                                        className="px-4 py-2.5 bg-white/10 border border-white/10 text-white rounded-lg text-xs font-semibold hover:bg-white/20 transition-all flex items-center gap-1.5"
                                    >
                                        History <ArrowRight className="h-3 w-3" />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Ready to Begin (Today, no active, patients waiting) ── */}
            {!active && isToday && waiting.length > 0 && (
                <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-6 flex flex-col items-center text-center animate-fade-in md:hidden">
                    <Stethoscope className="h-8 w-8 text-teal-500 mb-3" />
                    <h2 className="text-base font-bold text-slate-900 mb-1">Ready to begin</h2>
                    <p className="text-slate-500 text-sm mb-4">{waiting.length} patient{waiting.length > 1 ? "s" : ""} waiting</p>
                    <button
                        onClick={() => startConsultation(waiting[0].id)}
                        disabled={isUpdating}
                        className="px-5 py-2.5 bg-teal-600 text-white rounded-lg font-semibold text-sm hover:bg-teal-700 shadow-sm transition-all flex items-center gap-2 active:scale-[0.98]"
                    >
                        <PlayCircle className="h-4 w-4" /> Start Consultation
                    </button>
                </div>
            )}

            {/* ── Main Content: Queue + Appointment List ── */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                {/* Queue Panel */}
                <div className="xl:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden flex flex-col h-full">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                <Users className="h-4 w-4 text-teal-600" /> Queue
                            </h2>
                            <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{waiting.length} waiting</span>
                        </div>

                        <div className="divide-y divide-slate-50 flex-1">
                            {isLoading ? (
                                <div className="p-6 space-y-3">
                                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-12 rounded-lg" />)}
                                </div>
                            ) : waiting.length === 0 && !active ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-300 mb-2" />
                                    <p className="text-sm font-semibold text-slate-700">All clear</p>
                                    <p className="text-xs text-slate-400 mt-0.5">No patients waiting</p>
                                </div>
                            ) : (
                                <>
                                    {active && (
                                        <div className="px-4 py-3 bg-emerald-50/50 border-l-[3px] border-emerald-500">
                                            <div className="flex justify-between items-center">
                                                <div className="min-w-0">
                                                    <span className="font-semibold text-slate-900 text-sm block truncate">{active.patient.name}</span>
                                                    <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                                                        <Clock className="h-3 w-3" /> {formatTime12Hour(active.timeSlot)} · In room
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-bold">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {waiting.map((appt, idx) => (
                                        <div key={appt.id} className="px-4 py-3 hover:bg-slate-50/50 transition-colors">
                                            <div className="flex justify-between items-center">
                                                <div className="min-w-0">
                                                    <span className="font-medium text-slate-800 text-sm block truncate">{appt.patient.name}</span>
                                                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                                        <Clock className="h-3 w-3" /> {formatTime12Hour(appt.timeSlot)}
                                                    </p>
                                                </div>
                                                {!active && idx === 0 && (
                                                    <button
                                                        className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-[11px] font-semibold hover:bg-teal-700 shadow-sm transition-all active:scale-[0.98]"
                                                        onClick={() => startConsultation(appt.id)}
                                                        disabled={isUpdating}
                                                    >
                                                        Call Next
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Appointment List */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                                <CalendarDays className="h-4 w-4 text-teal-600" />
                                {isToday ? "Today's" : format(new Date(selectedDate), "MMM do")} Schedule
                            </h2>
                            <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{sortedAppointments.length} total</span>
                        </div>

                        {isLoading ? (
                            <div className="p-4 space-y-2">
                                {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-14 rounded-lg" />)}
                            </div>
                        ) : sortedAppointments.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <CalendarDays className="h-8 w-8 text-slate-200 mb-3" />
                                <p className="text-sm font-semibold text-slate-600">No appointments</p>
                                <p className="text-xs text-slate-400 mt-0.5">Nothing scheduled for this day</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-50">
                                {sortedAppointments.map((appt) => {
                                    const sc = getStatusConfig(appt.status);
                                    return (
                                        <div key={appt.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/40 transition-colors">
                                            <div className="bg-slate-50 text-slate-600 px-2.5 py-1.5 rounded-lg font-semibold text-xs min-w-[68px] text-center shrink-0 border border-slate-100">
                                                {formatTime12Hour(appt.timeSlot)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-slate-800 text-sm truncate">{appt.patient.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                                                    {appt.patient.phone || "No phone"} · {appt.createdBy === "RECEPTIONIST" ? "Walk-in" : "Online"}
                                                </p>
                                            </div>
                                            <Badge className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold border-none shrink-0", sc.bg, sc.text)}>
                                                <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-1.5", sc.dot)} />
                                                {sc.label}
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
