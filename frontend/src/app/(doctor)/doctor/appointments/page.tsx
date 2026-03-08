"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { cn, formatTime12Hour, getStatusConfig } from "@/lib/utils";

export default function Doctor7DayAppointmentsOverview() {
    useAuth();
    const { appointments, isLoading } = useAppointments();

    const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

    const nextWeek = () => setCurrentWeekStart(addDays(currentWeekStart, 7));
    const prevWeek = () => setCurrentWeekStart(addDays(currentWeekStart, -7));
    const goToToday = () => setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));

    const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00"
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">7-Day Overview</h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">Your weekly appointment schedule</p>
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
                    <Button variant="outline" size="sm" onClick={goToToday} className="ml-1 h-7 text-[10px] font-semibold text-teal-600 border-teal-200 hover:bg-teal-50">
                        Today
                    </Button>
                </div>
            </div>

            {/* ── Calendar Grid ── */}
            {isLoading ? (
                <div className="skeleton h-[500px] rounded-xl" />
            ) : (
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-x-auto">
                    <div className="min-w-[900px] p-4">
                        <div className="grid grid-cols-8 gap-3">
                            {/* Time column header */}
                            <div className="pt-10 text-right pr-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                                Time
                            </div>

                            {/* Day headers */}
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

                            {/* Time slot rows */}
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
                                                            <div className="flex items-center gap-1 mt-0.5 opacity-75">
                                                                <div className={cn("w-1.5 h-1.5 rounded-full", sc.dot)} />
                                                                <span className="truncate text-[9px]">{sc.label}</span>
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
            )}
        </div>
    );
}
