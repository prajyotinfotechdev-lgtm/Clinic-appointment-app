"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useState } from "react";
import { format } from "date-fns";
import { Clock, CheckCircle2, PlayCircle, HeartPulse } from "lucide-react";
import { formatTime12Hour } from "@/lib/utils";
import { PatientVitalsDialog } from "@/components/appointments/PatientVitalsDialog";

export default function ConsultationQueue() {
    const { user } = useAuth();
    const { appointments, isLoading, refetch } = useAppointments({
        doctorId: user?.id,
        date: format(new Date(), 'yyyy-MM-dd')
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const [vitalsModal, setVitalsModal] = useState<{
        isOpen: boolean;
        appointmentId: string;
        patientName: string;
        existingVitals?: any;
    }>({
        isOpen: false,
        appointmentId: "",
        patientName: "",
    });

    const waiting = appointments.filter(a => a.status === 'WAITING').sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
    const active = appointments.find(a => a.status === 'IN_CONSULTATION');

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

    return (
        <div className="max-w-4xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Today&apos;s Queue</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">{format(new Date(), 'EEEE, MMMM do')}</p>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
                </div>
            ) : waiting.length === 0 && !active ? (
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                    <CheckCircle2 className="h-8 w-8 text-emerald-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-600">All clear!</p>
                    <p className="text-xs text-slate-400 mt-0.5">Your queue is currently empty.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Active consultation */}
                    {active && (
                        <div className="bg-teal-900 rounded-xl p-4 md:p-5 text-white overflow-hidden relative animate-fade-in">
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-teal-500/10 rounded-l-full blur-3xl" />
                            <div className="relative z-10 flex items-center justify-between gap-4">
                                <div>
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span className="text-[10px] font-semibold text-teal-300 uppercase tracking-widest">In Consultation</span>
                                    </div>
                                    <p className="text-lg md:text-xl font-bold">{active.patient.name}</p>
                                    <p className="text-xs text-teal-200 flex items-center gap-1 mt-0.5">
                                        <Clock className="h-3 w-3" /> {formatTime12Hour(active.timeSlot)}
                                    </p>
                                </div>
                                <span className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold">
                                    In Room
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Waiting list */}
                    {waiting.length > 0 && (
                        <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-slate-900">Waiting List</h3>
                                <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{waiting.length} patients</span>
                            </div>

                            <div className="divide-y divide-slate-50">
                                {waiting.map((appt, idx) => (
                                    <div key={appt.id} className="px-4 py-3 hover:bg-slate-50/40 transition-colors">
                                        <div className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-bold text-xs flex items-center justify-center shrink-0">
                                                    {idx + 1}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-slate-800 text-sm truncate">{appt.patient.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                                        <Clock className="h-3 w-3" /> {formatTime12Hour(appt.timeSlot)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 shrink-0">
                                                <button
                                                    onClick={() => setVitalsModal({
                                                        isOpen: true,
                                                        appointmentId: appt.id,
                                                        patientName: appt.patient.name,
                                                        existingVitals: {
                                                            symptoms: appt.symptoms,
                                                            weight: appt.weight,
                                                            bloodPressure: appt.bloodPressure,
                                                            temperature: appt.temperature
                                                        }
                                                    })}
                                                    className="h-7 px-2 text-teal-600 hover:bg-teal-50 rounded-md transition-colors flex items-center gap-1 text-[10px] font-semibold"
                                                    title="View or Add Vitals"
                                                >
                                                    <HeartPulse className="h-3.5 w-3.5" /> Vitals
                                                </button>

                                                {!active && idx === 0 && (
                                                    <button
                                                        className="h-8 px-3 bg-teal-600 text-white rounded-lg text-xs font-semibold hover:bg-teal-700 transition-all active:scale-[0.98] flex items-center gap-1.5"
                                                        onClick={() => startConsultation(appt.id)}
                                                        disabled={isUpdating}
                                                    >
                                                        <PlayCircle className="w-3.5 h-3.5" /> Start
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <PatientVitalsDialog
                isOpen={vitalsModal.isOpen}
                onClose={() => setVitalsModal(prev => ({ ...prev, isOpen: false }))}
                appointmentId={vitalsModal.appointmentId}
                patientName={vitalsModal.patientName}
                existingVitals={vitalsModal.existingVitals}
                onVitalsSaved={refetch}
            />
        </div>
    );
}
