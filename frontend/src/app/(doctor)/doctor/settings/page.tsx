"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
    Clock,
    Calendar,
    Save,
    CheckCircle2,
    AlertCircle,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AvailabilityManager } from "@/components/doctor/AvailabilityManager";

const DAYS = [
    { id: 1, name: "Monday", short: "Mon" },
    { id: 2, name: "Tuesday", short: "Tue" },
    { id: 3, name: "Wednesday", short: "Wed" },
    { id: 4, name: "Thursday", short: "Thu" },
    { id: 5, name: "Friday", short: "Fri" },
    { id: 6, name: "Saturday", short: "Sat" },
    { id: 7, name: "Sunday", short: "Sun" },
];

export default function AvailabilitySettings() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'general' | 'availability'>('general');
    const [settings, setSettings] = useState({
        clinicStartTime: "09:00",
        clinicEndTime: "17:00",
        slotDurationMinutes: 15,
        workingDays: [1, 2, 3, 4, 5],
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            if (!user?.id) return;
            try {
                const res = await api.get<{ data: any }>(`/clinic-settings/doctor/${user.id}`);
                if (res.data) {
                    setSettings({
                        clinicStartTime: res.data.clinicStartTime,
                        clinicEndTime: res.data.clinicEndTime,
                        slotDurationMinutes: res.data.slotDurationMinutes,
                        workingDays: res.data.workingDays || [1, 2, 3, 4, 5],
                    });
                }
            } catch (err) {
                console.error("Failed to fetch settings", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, [user?.id]);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            setMessage(null);
            await api.put('/clinic-settings', {
                ...settings,
                doctorId: user?.id
            });
            setMessage({ type: 'success', text: "Availability updated successfully" });
            setTimeout(() => setMessage(null), 3000);
        } catch (err) {
            setMessage({ type: 'error', text: "Failed to update settings" });
        } finally {
            setIsSaving(false);
        }
    };

    const toggleDay = (dayId: number) => {
        setSettings(prev => ({
            ...prev,
            workingDays: prev.workingDays.includes(dayId)
                ? prev.workingDays.filter(id => id !== dayId)
                : [...prev.workingDays, dayId].sort()
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Availability & Schedule</h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">Manage working hours, holidays, and slots</p>
                </div>
                {activeTab === 'general' && (
                    <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-teal-600 hover:bg-teal-700 transition-all"
                    >
                        {isSaving ? "Saving..." : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Changes</>}
                    </Button>
                )}
            </div>

            {/* ── Tabs ── */}
            <div className="flex border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('general')}
                    className={cn(
                        "px-4 py-2.5 font-semibold text-xs transition-all border-b-2 -mb-px",
                        activeTab === 'general' ? "border-teal-600 text-teal-600" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                >
                    Clinic Hours
                </button>
                <button
                    onClick={() => setActiveTab('availability')}
                    className={cn(
                        "px-4 py-2.5 font-semibold text-xs transition-all border-b-2 -mb-px",
                        activeTab === 'availability' ? "border-teal-600 text-teal-600" : "border-transparent text-slate-400 hover:text-slate-600"
                    )}
                >
                    Holidays & Absences
                </button>
            </div>

            {/* ── Message ── */}
            {message && (
                <div className={cn(
                    "px-3 py-2.5 rounded-lg border flex items-center gap-2 text-xs font-semibold animate-fade-in",
                    message.type === 'success' ? "bg-emerald-50 border-emerald-100 text-emerald-700" : "bg-red-50 border-red-100 text-red-700"
                )}>
                    {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {message.text}
                </div>
            )}

            {isLoading ? (
                <div className="space-y-3">
                    <div className="skeleton h-64 rounded-xl" />
                    <div className="skeleton h-48 rounded-xl" />
                </div>
            ) : activeTab === 'general' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Working Days */}
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                                <Calendar className="h-4 w-4 text-teal-600" /> Working Days
                            </h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">Days you are available for consultations</p>
                        </div>
                        <div className="p-3 space-y-1.5">
                            {DAYS.map((day) => {
                                const isSelected = settings.workingDays.includes(day.id);
                                return (
                                    <button
                                        key={day.id}
                                        onClick={() => toggleDay(day.id)}
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-sm",
                                            isSelected
                                                ? "bg-teal-50 border-teal-200 text-teal-800"
                                                : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50"
                                        )}
                                    >
                                        <span className={cn("font-semibold text-xs", isSelected && "text-teal-900")}>{day.name}</span>
                                        <div className={cn(
                                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                            isSelected ? "bg-teal-500 border-teal-500 text-white" : "border-slate-200"
                                        )}>
                                            {isSelected && <CheckCircle2 className="w-3 h-3" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Consultation Timing */}
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-teal-600" /> Consult Timing
                                </h3>
                                <p className="text-[10px] text-slate-400 mt-0.5">Clinical hours and slot duration</p>
                            </div>
                            <div className="p-4 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Start Time</label>
                                        <input
                                            type="time"
                                            value={settings.clinicStartTime}
                                            onChange={(e) => setSettings(prev => ({ ...prev, clinicStartTime: e.target.value }))}
                                            className="h-9 w-full px-3 rounded-lg border border-slate-200/60 bg-white text-slate-800 text-sm font-semibold focus:outline-none focus:border-teal-400 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">End Time</label>
                                        <input
                                            type="time"
                                            value={settings.clinicEndTime}
                                            onChange={(e) => setSettings(prev => ({ ...prev, clinicEndTime: e.target.value }))}
                                            className="h-9 w-full px-3 rounded-lg border border-slate-200/60 bg-white text-slate-800 text-sm font-semibold focus:outline-none focus:border-teal-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Slot Duration</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[15, 20, 30].map((mins) => (
                                            <button
                                                key={mins}
                                                onClick={() => setSettings(prev => ({ ...prev, slotDurationMinutes: mins }))}
                                                className={cn(
                                                    "h-9 rounded-lg border text-xs font-semibold transition-all",
                                                    settings.slotDurationMinutes === mins
                                                        ? "bg-teal-50 border-teal-200 text-teal-800"
                                                        : "bg-white border-slate-200/60 text-slate-400 hover:border-slate-300"
                                                )}
                                            >
                                                {mins} min
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info card */}
                        <div className="bg-teal-900 rounded-xl p-4 text-white relative overflow-hidden">
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
                            <div className="relative z-10 flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                    <Info className="w-4 h-4" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-1">Booking Impact</h4>
                                    <p className="text-teal-200/70 text-xs leading-relaxed">
                                        Availability settings affect dates and slots visible to patients in the booking portal.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <AvailabilityManager />
            )}
        </div>
    );
}
