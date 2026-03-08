"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import {
    Clock,
    Search,
    UserPlus,
    CalendarPlus,
    CheckCircle2,
    Activity,
    CalendarDays,
    ArrowRight
} from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { api } from "@/lib/api";
import Link from "next/link";
import { cn, formatTime12Hour, getStatusConfig } from "@/lib/utils";
import { SevenDayGlance } from "@/components/dashboard/SevenDayGlance";

export default function ReceptionistDashboard() {
    useAuth();
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const { appointments, isLoading, refetch } = useAppointments({
        date: selectedDate,
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const waiting = appointments.filter(a => a.status === 'WAITING');
    const booked = appointments.filter(a => a.status === 'BOOKED');
    const inConsultation = appointments.filter(a => a.status === 'IN_CONSULTATION');
    const completed = appointments.filter(a => a.status === 'COMPLETED');

    const filtered = appointments.filter(a =>
        a.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.patient?.phone?.includes(searchQuery)
    );

    const markWaiting = async (id: string) => {
        try {
            setIsUpdating(true);
            await api.patch(`/appointments/${id}/waiting`);
            refetch();
        } catch {
            alert("Failed to update status");
        } finally {
            setIsUpdating(false);
        }
    };

    const stats = [
        { label: "Booked", value: booked.length, icon: CalendarPlus, color: "text-sky-600", bg: "bg-sky-50" },
        { label: "Waiting", value: waiting.length, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
        { label: "In Room", value: inConsultation.length, icon: Activity, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Done", value: completed.length, icon: CheckCircle2, color: "text-violet-600", bg: "bg-violet-50" },
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col gap-4">
                <div className="flex items-start md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Reception</h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                            {format(new Date(selectedDate), "EEEE, MMMM do")}
                            {appointments.length > 0 && (
                                <span className="text-teal-600 font-semibold"> · {appointments.length} appointments</span>
                            )}
                        </p>
                    </div>
                    <Link href="/receptionist/walk-in" className="md:hidden">
                        <button className="px-3 py-2 bg-teal-600 text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-1.5 active:scale-[0.98] transition-all">
                            <UserPlus className="h-3.5 w-3.5" /> Walk-in
                        </button>
                    </Link>
                </div>

                {/* 7-Day Glance */}
                <SevenDayGlance
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

            {/* ── Quick Actions (Desktop) ── */}
            <div className="hidden md:grid grid-cols-2 gap-3">
                <Link href="/receptionist/walk-in">
                    <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-teal-200 transition-all cursor-pointer group flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center shrink-0 group-hover:bg-teal-600 transition-colors">
                            <UserPlus className="h-5 w-5 text-teal-600 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 text-sm">New Walk-in</h3>
                            <p className="text-slate-400 text-xs mt-0.5">Quick registration & queueing</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-teal-500 transition-colors" />
                    </div>
                </Link>
                <Link href="/receptionist/appointments">
                    <div className="bg-white rounded-xl border border-slate-200/60 p-4 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] hover:border-teal-200 transition-all cursor-pointer group flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-teal-600 transition-colors">
                            <CalendarPlus className="h-5 w-5 text-slate-500 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 text-sm">Advance Booking</h3>
                            <p className="text-slate-400 text-xs mt-0.5">Schedule for future dates</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-300 group-hover:text-teal-500 transition-colors" />
                    </div>
                </Link>
            </div>

            {/* ── Appointment Queue ── */}
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-slate-900">Active Queue</h2>
                    <div className="relative w-full sm:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                            placeholder="Search patient or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 h-8 bg-slate-50 border border-slate-200/60 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-4 space-y-2">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton h-14 rounded-lg" />)}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                        <CalendarDays className="h-8 w-8 text-slate-200 mb-3" />
                        <p className="text-sm font-semibold text-slate-600">
                            {searchQuery ? "No matching patients" : "No appointments"}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {searchQuery ? "Try a different search term" : "Nothing scheduled for this day"}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {/* Table Header - Desktop */}
                        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2.5 bg-slate-50/50 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                            <div className="col-span-2">Time</div>
                            <div className="col-span-3">Patient</div>
                            <div className="col-span-3">Doctor</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2 text-right">Action</div>
                        </div>

                        {filtered.map((appt) => {
                            const sc = getStatusConfig(appt.status);
                            return (
                                <div key={appt.id} className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 px-4 py-3 hover:bg-slate-50/40 transition-colors md:items-center">
                                    {/* Mobile: Time + Status row */}
                                    <div className="flex md:hidden items-center justify-between">
                                        <div className="bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md font-semibold text-xs border border-slate-100">
                                            {formatTime12Hour(appt.timeSlot)}
                                        </div>
                                        <Badge className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold border-none", sc.bg, sc.text)}>
                                            <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-1.5", sc.dot)} />
                                            {sc.label}
                                        </Badge>
                                    </div>

                                    {/* Desktop: Time */}
                                    <div className="hidden md:flex col-span-2 items-center">
                                        <div className="bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md font-semibold text-xs border border-slate-100">
                                            {formatTime12Hour(appt.timeSlot)}
                                        </div>
                                    </div>

                                    {/* Patient */}
                                    <div className="col-span-3">
                                        <p className="font-semibold text-slate-800 text-sm leading-tight">{appt.patient.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">{appt.patient.phone || "No phone"}</p>
                                    </div>

                                    {/* Doctor */}
                                    <div className="col-span-3">
                                        <p className="text-xs font-medium text-slate-600">Dr. {appt.doctor.name}</p>
                                    </div>

                                    {/* Desktop: Status */}
                                    <div className="hidden md:block col-span-2">
                                        <Badge className={cn("px-2 py-0.5 rounded-md text-[10px] font-semibold border-none", sc.bg, sc.text)}>
                                            <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-1.5", sc.dot)} />
                                            {sc.label}
                                        </Badge>
                                    </div>

                                    {/* Action */}
                                    <div className="col-span-2 flex justify-start md:justify-end">
                                        {appt.status === "BOOKED" && (
                                            <button
                                                onClick={() => markWaiting(appt.id)}
                                                disabled={isUpdating}
                                                className="px-3 py-1.5 w-full md:w-auto justify-center bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 shadow-sm transition-all active:scale-[0.98] flex items-center gap-1.5"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5" /> Check In
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
