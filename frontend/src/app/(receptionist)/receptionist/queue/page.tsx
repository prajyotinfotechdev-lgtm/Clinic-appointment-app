"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useState } from "react";
import { format } from "date-fns";
import { Clock, Users, XCircle, HeartPulse } from "lucide-react";
import { formatTime12Hour } from "@/lib/utils";
import { PatientVitalsDialog } from "@/components/appointments/PatientVitalsDialog";

export default function ReceptionistQueuePage() {
    useAuth();
    const todayStr = format(new Date(), 'yyyy-MM-dd');
    const { appointments, isLoading, refetch } = useAppointments({ date: todayStr });
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

    const queueAppointments = appointments
        .filter(a => a.status === 'WAITING' || a.status === 'IN_CONSULTATION')
        .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

    const groupedByDoctor = queueAppointments.reduce((acc, appt) => {
        const docName = "Dr. " + appt.doctor.name;
        if (!acc[docName]) acc[docName] = [];
        acc[docName].push(appt);
        return acc;
    }, {} as Record<string, typeof appointments>);

    const updateStatus = async (id: string, action: string) => {
        try {
            setIsUpdating(true);
            await api.patch(`/appointments/${id}/${action}`);
            refetch();
        } catch {
            alert(`Failed to ${action} appointment`);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Live Queue</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Active waitlists across the clinic</p>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2].map(i => <div key={i} className="skeleton h-48 rounded-xl" />)}
                </div>
            ) : Object.keys(groupedByDoctor).length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                    <Users className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No active queues</p>
                    <p className="text-xs text-slate-400 mt-0.5">No patients waiting or in consultation right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 stagger-children">
                    {Object.entries(groupedByDoctor).map(([doctorName, docsAppointments]) => {
                        const active = docsAppointments.find(a => a.status === 'IN_CONSULTATION');
                        const waiting = docsAppointments.filter(a => a.status === 'WAITING');

                        return (
                            <div key={doctorName} className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden flex flex-col">
                                {/* Doctor header */}
                                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                                    <h2 className="text-sm font-semibold text-slate-900">{doctorName}</h2>
                                    <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">{docsAppointments.length} in queue</span>
                                </div>

                                {/* Active consultation */}
                                {active && (
                                    <div className="px-4 py-3 bg-emerald-50/50 border-b border-emerald-100/50 border-l-[3px] border-l-emerald-500">
                                        <div className="flex items-center justify-between">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-1.5 mb-0.5">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-widest">In Consultation</span>
                                                </div>
                                                <p className="font-semibold text-slate-900 text-sm truncate">{active.patient.name}</p>
                                                <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1 mt-0.5">
                                                    <Clock className="h-3 w-3" /> {formatTime12Hour(active.timeSlot)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Waiting list */}
                                <div className="flex-1 divide-y divide-slate-50">
                                    {waiting.length === 0 ? (
                                        <div className="p-6 text-center">
                                            <p className="text-xs text-slate-400 font-medium">No other patients waiting</p>
                                        </div>
                                    ) : (
                                        waiting.map((appt, idx) => (
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
                                                    <div className="flex items-center gap-1 shrink-0">
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
                                                            title="Add Vitals"
                                                        >
                                                            <HeartPulse className="h-3.5 w-3.5" /> Vitals
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(appt.id, 'cancel')}
                                                            disabled={isUpdating}
                                                            className="h-7 w-7 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-md transition-colors flex items-center justify-center"
                                                            title="Cancel"
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        );
                    })}
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
