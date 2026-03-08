"use client";

import { useState, useEffect } from "react";
import { format, addDays, startOfDay, isSameDay } from "date-fns";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

interface DayStats {
    date: Date;
    count: number;
}

interface SevenDayGlanceProps {
    doctorId?: string;
    onDateSelect: (date: string) => void;
    selectedDate: string;
}

export function SevenDayGlance({ doctorId, onDateSelect, selectedDate }: SevenDayGlanceProps) {
    const [stats, setStats] = useState<DayStats[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                const days = Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i));

                const statsPromises = days.map(async (day) => {
                    const dateStr = format(day, 'yyyy-MM-dd');
                    const url = doctorId
                        ? `/appointments?doctorId=${doctorId}&date=${dateStr}`
                        : `/appointments?date=${dateStr}`;
                    const res = await api.get<{ data: any[] }>(url);
                    return { date: day, count: res.data.length };
                });

                const results = await Promise.all(statsPromises);
                setStats(results);
            } catch (err) {
                console.error("Failed to fetch 7-day stats", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [doctorId]);

    return (
        <div className="flex overflow-x-auto scrollbar-none gap-1.5 p-1 bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)]">
            {isLoading ? (
                Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="skeleton min-w-[72px] h-[68px] rounded-lg shrink-0" />
                ))
            ) : (
                stats.map((stat) => {
                    const isSelected = selectedDate === format(stat.date, 'yyyy-MM-dd');
                    const isToday = isSameDay(stat.date, new Date());

                    return (
                        <button
                            key={stat.date.toISOString()}
                            onClick={() => onDateSelect(format(stat.date, 'yyyy-MM-dd'))}
                            className={cn(
                                "min-w-[72px] py-2 px-2 rounded-lg flex flex-col items-center justify-center transition-all duration-200 shrink-0 border",
                                isSelected
                                    ? "bg-teal-600 border-teal-600 text-white shadow-sm"
                                    : "bg-transparent border-transparent hover:bg-slate-50"
                            )}
                        >
                            <span className={cn(
                                "text-[10px] font-semibold uppercase tracking-wide",
                                isSelected ? "text-teal-100" : isToday ? "text-teal-600" : "text-slate-400"
                            )}>
                                {isToday ? "Today" : format(stat.date, "EEE")}
                            </span>
                            <span className={cn(
                                "text-lg font-bold leading-tight",
                                isSelected ? "text-white" : "text-slate-800"
                            )}>
                                {format(stat.date, "dd")}
                            </span>
                            {stat.count > 0 && (
                                <span className={cn(
                                    "text-[9px] font-bold mt-0.5 px-1.5 py-px rounded-full",
                                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                                )}>
                                    {stat.count}
                                </span>
                            )}
                        </button>
                    );
                })
            )}
        </div>
    );
}
