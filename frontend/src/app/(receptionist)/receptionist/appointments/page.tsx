"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Search, CalendarDays, CalendarPlus, UserPlus, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn, formatTime12Hour, getStatusConfig } from "@/lib/utils";

export default function ReceptionistAppointments() {
    useAuth();
    const { appointments, isLoading, refetch } = useAppointments();
    const [searchQuery, setSearchQuery] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
    const nextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));
    const prevWeek = () => setCurrentWeekStart(addDays(currentWeekStart, -7));
    const goToThisWeek = () => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));
    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00"
    ];

    const todayStr = selectedDate;

    const filtered = appointments.filter(a => {
        const matchesSearch =
            a.patient?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.patient?.phone?.includes(searchQuery) ||
            a.doctor?.name?.toLowerCase().includes(searchQuery.toLowerCase());

        if (searchQuery) return matchesSearch;
        return format(new Date(a.appointmentDate), 'yyyy-MM-dd') === todayStr;
    }).sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

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

    const groupedByDoctor = filtered.reduce((acc, appt) => {
        const docName = "Dr. " + appt.doctor.name;
        if (!acc[docName]) acc[docName] = [];
        acc[docName].push(appt);
        return acc;
    }, {} as Record<string, typeof appointments>);

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Daily Appointments</h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">{format(new Date(selectedDate), "EEEE, MMMM do, yyyy")}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="h-9 px-3 border border-slate-200/60 rounded-lg bg-white text-slate-800 text-sm font-medium focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all cursor-pointer"
                    />
                    <div className="relative w-full md:w-56">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                        <input
                            placeholder="Search patient or phone..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 h-9 bg-white border border-slate-200/60 rounded-lg text-xs focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all placeholder:text-slate-400"
                        />
                    </div>
                </div>
            </div>

            {/* ── Quick Actions ── */}
            <div className="grid grid-cols-2 gap-3">
                <Link href="/receptionist/queue">
                    <div className="bg-teal-600 rounded-xl p-3.5 flex items-center gap-3 text-white hover:bg-teal-700 transition-all shadow-sm cursor-pointer active:scale-[0.98]">
                        <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                            <UserPlus className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Walk-in Patient</p>
                            <p className="text-teal-100 text-[10px]">Register & queue</p>
                        </div>
                    </div>
                </Link>
                <Link href="/receptionist/walk-in">
                    <div className="bg-white rounded-xl border border-slate-200/60 p-3.5 flex items-center gap-3 hover:border-teal-300 transition-all shadow-[var(--shadow-card)] cursor-pointer group active:scale-[0.98]">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600 flex items-center justify-center shrink-0 transition-colors">
                            <CalendarPlus className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-slate-800">Book Advance</p>
                            <p className="text-slate-400 text-[10px]">Schedule future date</p>
                        </div>
                    </div>
                </Link>
            </div>

            {/* ── Appointment List ── */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
                </div>
            ) : Object.keys(groupedByDoctor).length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                    <CalendarDays className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No appointments found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                        {searchQuery ? "Try a different search term." : "No appointments for this date."}
                    </p>
                </div>
            ) : (
                <div className="space-y-4 stagger-children">
                    {Object.entries(groupedByDoctor).map(([doctorName, docsAppointments]) => (
                        <div key={doctorName} className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                            <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                                <h2 className="text-sm font-semibold text-slate-900">{doctorName}</h2>
                                <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{docsAppointments.length}</span>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {docsAppointments.map(appt => {
                                    const sc = getStatusConfig(appt.status);
                                    return (
                                        <div key={appt.id} className="px-4 py-3 flex items-center gap-3 hover:bg-slate-50/40 transition-colors">
                                            <div className="w-16 shrink-0 text-center">
                                                <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-md">
                                                    {formatTime12Hour(appt.timeSlot)}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-slate-800 text-sm truncate">{appt.patient.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{appt.patient.phone || 'No phone'}</p>
                                            </div>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {searchQuery && (
                                                    <span className="text-[9px] font-medium text-slate-400 hidden md:block">
                                                        {format(new Date(appt.appointmentDate), "MMM dd")}
                                                    </span>
                                                )}
                                                <Badge className={cn("px-2 py-0.5 rounded-md text-[9px] font-semibold border-none", sc.bg, sc.text)}>
                                                    <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-1", sc.dot)} />
                                                    {sc.label}
                                                </Badge>
                                                {appt.status === 'BOOKED' && (
                                                    <button
                                                        onClick={() => markWaiting(appt.id)}
                                                        disabled={isUpdating}
                                                        className="h-7 px-2.5 bg-teal-600 text-white rounded-md text-[10px] font-semibold hover:bg-teal-700 transition-all active:scale-[0.98] flex items-center gap-1"
                                                    >
                                                        <CheckCircle2 className="w-3 h-3" /> Check In
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ── 7-Day Overview ── */}
            <div className="pt-6 mt-4 border-t border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 tracking-tight">7-Day Overview</h2>
                        <p className="text-slate-500 text-xs mt-0.5">Clinic-wide weekly schedule</p>
                    </div>

                    <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200/60 shadow-[var(--shadow-card)] w-fit">
                        <Button variant="ghost" size="sm" onClick={prevWeek} className="h-8 w-8 p-0 text-slate-400 hover:text-teal-700">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <div className="px-3 font-semibold text-slate-800 text-sm min-w-[130px] text-center">
                            {format(currentWeekStart, "MMM d")} – {format(addDays(currentWeekStart, 6), "MMM d")}
                        </div>
                        <Button variant="ghost" size="sm" onClick={nextWeek} className="h-8 w-8 p-0 text-slate-400 hover:text-teal-700">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={goToThisWeek} className="ml-1 h-7 text-[10px] font-semibold text-teal-600 border-teal-200 hover:bg-teal-50">
                            This Week
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-x-auto">
                    <div className="min-w-[900px] p-4">
                        <div className="grid grid-cols-8 gap-3">
                            <div className="pt-10 text-right pr-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                Time
                            </div>

                            {weekDays.map((day, i) => {
                                const isToday = isSameDay(day, new Date());
                                return (
                                    <div key={i} className={cn("text-center pb-3 border-b-2", isToday ? "border-teal-500" : "border-slate-100")}>
                                        <p className={cn("text-[10px] font-semibold uppercase tracking-wider", isToday ? "text-teal-600" : "text-slate-400")}>
                                            {format(day, "EEE")}
                                        </p>
                                        <p className={cn("text-xl font-bold mt-0.5", isToday ? "text-slate-900" : "text-slate-700")}>
                                            {format(day, "d")}
                                        </p>
                                    </div>
                                );
                            })}

                            {timeSlots.map((time) => (
                                <div className="col-span-8 grid grid-cols-8 gap-3 border-b border-dashed border-slate-50 last:border-0 group" key={time}>
                                    <div className="py-3 text-right pr-3 text-xs font-medium text-slate-400 group-hover:text-slate-600 transition-colors">
                                        {formatTime12Hour(time)}
                                    </div>

                                    {weekDays.map((day, dayIndex) => {
                                        const apptsInSlot = appointments.filter(a =>
                                            isSameDay(new Date(a.appointmentDate), day) &&
                                            a.timeSlot === time
                                        );

                                        return (
                                            <div key={dayIndex} className="relative py-1.5 px-0.5 min-h-[48px] group-hover:bg-slate-50/30 transition-colors rounded-md">
                                                {apptsInSlot.map(appt => {
                                                    const sc = getStatusConfig(appt.status);
                                                    return (
                                                        <div
                                                            key={appt.id}
                                                            className={cn("p-1.5 rounded-md text-[10px] font-semibold border mb-1 transition-all hover:shadow-sm", sc.bg, sc.text, "border-transparent")}
                                                        >
                                                            <span className="truncate block">{appt.patient.name}</span>
                                                            <div className="flex items-center justify-between gap-1 mt-0.5 opacity-75">
                                                                <div className="flex items-center gap-1">
                                                                    <div className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />
                                                                    <span className="truncate text-[9px]">{sc.label}</span>
                                                                </div>
                                                                <span className="text-[8px] opacity-60">Dr. {appt.doctor.name.split(' ')[0]}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
