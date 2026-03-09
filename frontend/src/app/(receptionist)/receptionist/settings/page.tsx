"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Clock, Timer, Save } from "lucide-react";
import { DOCTORS } from "@/lib/clinic-data";
import { cn } from "@/lib/utils";

export default function ClinicSettingsPage() {
    useAuth();
    const [selectedDoctorId, setSelectedDoctorId] = useState<string>(DOCTORS[0].id);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [duration, setDuration] = useState("15");
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchSettings = async () => {
            setIsLoading(true);
            try {
                const res: any = await api.get(`/clinic-settings/doctor/${selectedDoctorId}`);
                if (res.data) {
                    setStartTime(res.data.clinicStartTime);
                    setEndTime(res.data.clinicEndTime);
                    setDuration(res.data.slotDurationMinutes.toString());
                } else {
                    setStartTime("09:00");
                    setEndTime("17:00");
                    setDuration("15");
                }
            } catch (err) {
                console.error("Failed to load settings");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, [selectedDoctorId]);

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await api.put("/clinic-settings", {
                doctorId: selectedDoctorId,
                clinicStartTime: startTime,
                clinicEndTime: endTime,
                slotDurationMinutes: parseInt(duration, 10)
            });
            alert("Clinic settings updated successfully!");
        } catch {
            alert("Failed to update clinic settings.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Clinic Settings</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Configure doctor schedules, hours, and slots</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Doctor Selection */}
                <div className="md:col-span-1 bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden h-fit">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <h3 className="text-sm font-semibold text-slate-900">Select Doctor</h3>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {DOCTORS.map(doc => (
                            <button
                                key={doc.id}
                                onClick={() => setSelectedDoctorId(doc.id)}
                                className={cn(
                                    "w-full p-3 text-left transition-colors flex items-center gap-2.5",
                                    selectedDoctorId === doc.id
                                        ? "bg-teal-50 border-l-2 border-l-teal-600"
                                        : "hover:bg-slate-50 border-l-2 border-l-transparent"
                                )}
                            >
                                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                                    <span className="text-sm">{doc.avatar}</span>
                                </div>
                                <div className="overflow-hidden">
                                    <p className={cn("font-semibold text-xs truncate", selectedDoctorId === doc.id ? "text-teal-800" : "text-slate-700")}>
                                        Dr. {doc.name.split(' ')[0]}
                                    </p>
                                    <p className="text-[10px] text-slate-400 truncate">{doc.specialization}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Settings Form */}
                <div className="md:col-span-3">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        {/* Dark header */}
                        <div className="bg-teal-900 px-4 py-3 text-white">
                            <h3 className="text-sm font-semibold flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-teal-300" /> Schedule Configuration
                            </h3>
                            <p className="text-[10px] text-teal-200/70 mt-0.5">Changes apply to all future appointment dates</p>
                        </div>

                        {isLoading ? (
                            <div className="p-4 space-y-3">
                                <div className="skeleton h-9 rounded-lg" />
                                <div className="skeleton h-9 rounded-lg" />
                                <div className="skeleton h-9 rounded-lg w-2/3" />
                            </div>
                        ) : (
                            <div className="p-4 space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Start Time</label>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="h-9 w-full px-3 rounded-lg border border-slate-200/60 bg-white text-slate-800 text-sm font-semibold focus:outline-none focus:border-teal-400 transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">End Time</label>
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="h-9 w-full px-3 rounded-lg border border-slate-200/60 bg-white text-slate-800 text-sm font-semibold focus:outline-none focus:border-teal-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5 max-w-sm">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Timer className="h-3 w-3" /> Slot Duration
                                    </label>
                                    <select
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                        className="w-full h-9 px-3 border border-slate-200/60 rounded-lg text-sm font-semibold text-slate-800 bg-white focus:outline-none focus:border-teal-400 transition-colors"
                                    >
                                        <option value="10">10 Minutes</option>
                                        <option value="15">15 Minutes</option>
                                        <option value="20">20 Minutes</option>
                                        <option value="30">30 Minutes</option>
                                        <option value="60">60 Minutes</option>
                                    </select>
                                    <p className="text-[10px] text-slate-400">Slots generated dynamically based on this interval.</p>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <Button
                                        size="sm"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className="bg-teal-600 hover:bg-teal-700 transition-all"
                                    >
                                        {isSaving ? "Saving..." : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Settings</>}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
