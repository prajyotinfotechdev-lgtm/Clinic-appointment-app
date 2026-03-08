"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarDays, Search } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { cn, formatTime12Hour, getStatusConfig } from "@/lib/utils";

export default function PatientAppointments() {
    const { user } = useAuth();
    const { appointments, isLoading } = useAppointments({ patientId: user?.id });
    const [searchQuery, setSearchQuery] = useState("");

    const filtered = appointments.filter((appt) =>
        appt.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered].sort((a, b) =>
        new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
    );

    return (
        <div className="max-w-4xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">My Appointments</h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">Your upcoming and past visits</p>
                </div>
                <div className="relative w-full md:w-56">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                        placeholder="Search doctor or status..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 h-9 bg-white border border-slate-200/60 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400"
                    />
                </div>
            </div>

            {/* ── Appointment List ── */}
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                {isLoading ? (
                    <div className="p-4 space-y-2">
                        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-16 rounded-lg" />)}
                    </div>
                ) : sorted.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
                        <CalendarDays className="h-8 w-8 text-slate-200 mb-3" />
                        <p className="text-sm font-semibold text-slate-600">No appointments found</p>
                        <p className="text-xs text-slate-400 mt-0.5">Book your first appointment to see it here.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {sorted.map((appt) => {
                            const sc = getStatusConfig(appt.status);
                            return (
                                <div key={appt.id} className="px-4 py-3 hover:bg-slate-50/40 transition-colors flex items-center gap-3">
                                    <div className="w-11 h-11 md:w-14 md:h-14 rounded-lg bg-slate-50 flex flex-col items-center justify-center shrink-0 border border-slate-100">
                                        <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-400 leading-none">{format(new Date(appt.appointmentDate), "MMM")}</span>
                                        <span className="text-base md:text-xl font-bold text-slate-800 leading-none">{format(new Date(appt.appointmentDate), "dd")}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-slate-800 text-sm md:text-base truncate">Dr. {appt.doctor.name}</h3>
                                        <p className="text-[10px] md:text-xs text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                            <Clock className="h-3 w-3 shrink-0" /> {formatTime12Hour(appt.timeSlot)}
                                        </p>
                                    </div>
                                    <Badge className={cn("px-2 py-0.5 rounded-md text-[9px] md:text-[10px] font-semibold border-none shrink-0", sc.bg, sc.text)}>
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
    );
}
