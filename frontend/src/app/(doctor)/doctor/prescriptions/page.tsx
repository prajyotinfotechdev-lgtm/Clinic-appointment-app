"use client";

import { useAppointments } from "@/hooks/useAppointments";
import { useAuth } from "@/hooks/useAuth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Stethoscope,
    Save,
    Activity,
    Printer
} from "lucide-react";
import { useState } from "react";
import { api } from "@/lib/api";
import { PrescriptionForm, Medication } from "@/components/prescriptions/PrescriptionForm";
import { CLINIC, DOCTORS } from "@/lib/clinic-data";
import { formatTime12Hour } from "@/lib/utils";

export default function PrescriptionWriter() {
    const { user } = useAuth();
    const { appointments, isLoading, refetch } = useAppointments({
        doctorId: user?.id,
        status: 'IN_CONSULTATION'
    });

    const active = appointments[0];
    const [diagnosis, setDiagnosis] = useState("");
    const [meds, setMeds] = useState<Medication[]>([{ name: "", dosage: "", frequency: "", duration: "" }]);
    const [notes, setNotes] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [completedPx, setCompletedPx] = useState<any>(null);

    const handleSave = async () => {
        if (!active) return;
        if (!diagnosis.trim()) {
            alert("Diagnosis is required.");
            return;
        }

        try {
            setIsSubmitting(true);
            await api.post("/prescriptions", {
                appointmentId: active.id,
                patientId: active.patient.id,
                diagnosis,
                medicines: meds,
                notes
            });
            await api.patch(`/appointments/${active.id}/complete`);

            setCompletedPx({
                patient: active.patient,
                doctor: active.doctor,
                appointmentDate: active.appointmentDate,
                timeSlot: active.timeSlot,
                diagnosis,
                medicines: meds,
                notes
            });
            refetch();
        } catch {
            alert("Failed to save prescription");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return (
        <div className="max-w-4xl mx-auto pt-8 px-4 space-y-3">
            <div className="skeleton h-8 w-48 rounded-lg" />
            <div className="skeleton h-[400px] rounded-xl" />
        </div>
    );

    if (!active && !completedPx) return (
        <div className="max-w-4xl mx-auto pt-8 px-4">
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                <Stethoscope className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-600">No Active Consultation</p>
                <p className="text-xs text-slate-400 mt-0.5">Start a consultation from your queue to write a prescription.</p>
            </div>
        </div>
    );

    if (completedPx) {
        return (
            <div className="max-w-4xl mx-auto space-y-5 pt-2 md:pt-4 pb-20 md:pb-6 px-4 text-center">
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-12 px-6 flex flex-col items-center print:hidden">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                        <Activity className="h-6 w-6 text-emerald-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Consultation Completed</h2>
                    <p className="text-sm text-slate-500 mb-6">
                        Prescription for <strong className="text-slate-700">{completedPx.patient.name}</strong> saved to their record.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-slate-200 text-slate-600 hover:bg-slate-50"
                            onClick={() => window.location.href = '/doctor/queue'}
                        >
                            Back to Queue
                        </Button>
                        <Button
                            size="sm"
                            className="bg-teal-600 hover:bg-teal-700"
                            onClick={() => window.print()}
                        >
                            <Printer className="h-3.5 w-3.5 mr-1.5" /> Print
                        </Button>
                    </div>
                </div>

                {/* hidden print block for the completed prescription */}
                <div className="hidden print:block print:w-full print:h-[100vh] bg-white text-black p-8 text-left">
                    <div className="border-b-4 border-teal-900 pb-6 mb-6 flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-extrabold text-teal-950 uppercase tracking-tighter">{CLINIC.name}</h1>
                            <p className="text-slate-600 text-sm mt-1 font-medium">{CLINIC.address.fullAddress}</p>
                        </div>
                        <div className="text-right">
                            <h2 className="text-xl font-bold text-teal-900">Dr. {completedPx.doctor.name}</h2>
                            <p className="text-slate-600 text-sm">{completedPx.doctor.specialization}</p>
                            <p className="text-slate-500 text-xs">{DOCTORS.find(d => d.name.toLowerCase().includes(completedPx.doctor.name.toLowerCase()))?.qualifications || ''}</p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200 mb-8 mt-6">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Patient Name</p>
                            <p className="text-xl font-bold text-slate-900">{completedPx.patient?.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                            <p className="text-lg font-bold text-slate-900">{completedPx.patient?.phone || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date</p>
                            <p className="text-lg font-bold text-slate-900">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                    {completedPx.diagnosis && (
                        <div className="mb-8 mt-6">
                            <h3 className="text-sm text-teal-800 font-bold uppercase tracking-widest border-b border-teal-100 pb-2 mb-3">Primary Diagnosis</h3>
                            <p className="text-xl font-medium text-slate-900">{completedPx.diagnosis}</p>
                        </div>
                    )}
                    <div className="mb-10 min-h-[400px]">
                        <h3 className="text-3xl font-serif italic text-teal-900 mb-6">Rx</h3>
                        <div className="space-y-6">
                            {completedPx.medicines.filter((m: any) => m.name).map((med: any, i: number) => (
                                <div key={i} className="flex gap-4 border-b border-slate-100 pb-4">
                                    <div className="text-lg font-bold text-slate-900 mt-1">{i + 1}.</div>
                                    <div>
                                        <p className="text-xl font-bold text-slate-900">{med.name}</p>
                                        <p className="text-slate-600 mt-1">
                                            <span className="font-semibold text-slate-800">{med.dosage}</span> &nbsp;—&nbsp; {med.frequency} &nbsp;—&nbsp; <span className="font-semibold">{med.duration}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {completedPx.notes && (
                        <div className="mb-16">
                            <h3 className="text-sm text-teal-800 font-bold uppercase tracking-widest border-b border-teal-100 pb-2 mb-3">Clinical Notes & Advice</h3>
                            <p className="text-slate-800 whitespace-pre-wrap mt-2">{completedPx.notes}</p>
                        </div>
                    )}
                    <div className="flex justify-end pt-12 mt-12">
                        <div className="text-center">
                            <div className="w-48 border-b-2 border-slate-400 mb-2"></div>
                            <p className="font-bold text-teal-900">Dr. {completedPx.doctor?.name}</p>
                            <p className="text-xs text-slate-500 uppercase tracking-widest">Signature</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-5 pt-2 md:pt-4 pb-20 md:pb-6 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Prescription Writer</h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">
                        Creating record for <span className="font-semibold text-slate-700">{active.patient.name}</span>
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto print:hidden">
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none border-slate-200 text-slate-600 hover:bg-slate-50" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 md:flex-none border-slate-200 text-slate-600 hover:bg-slate-50" onClick={() => window.print()}>
                        <Printer className="h-3.5 w-3.5 mr-1.5" /> Print
                    </Button>
                    <Button
                        size="sm"
                        className="flex-1 md:flex-none bg-teal-600 hover:bg-teal-700 transition-all"
                        disabled={isSubmitting}
                        onClick={handleSave}
                    >
                        <Save className="h-3.5 w-3.5 mr-1.5" /> Save & Complete
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 print:hidden">
                {/* Patient Summary */}
                <div className="lg:col-span-1 bg-teal-900 rounded-xl p-4 text-white overflow-hidden h-fit">
                    <div className="pb-3 mb-3 border-b border-white/10">
                        <h3 className="text-sm font-semibold text-teal-100">Patient Details</h3>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Full Name</p>
                            <p className="font-bold text-sm">{active.patient.name}</p>
                        </div>
                        <div>
                            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Phone</p>
                            <p className="text-xs font-medium text-teal-200">{active.patient.phone || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-wider mb-0.5">Appt Slot</p>
                            <p className="text-xs font-medium text-teal-200">{formatTime12Hour(active.timeSlot)}</p>
                        </div>
                        <div className="pt-3 border-t border-white/10">
                            <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 uppercase font-semibold tracking-wider text-[9px]">
                                In Consultation
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Prescription Form */}
                <div className="lg:col-span-3">
                    <PrescriptionForm
                        onSave={async (data) => {
                            setDiagnosis(data.diagnosis);
                            setMeds(data.medicines);
                            setNotes(data.notes);

                            // We trigger the actual save here
                            if (!active) return;
                            try {
                                setIsSubmitting(true);
                                await api.post("/prescriptions", {
                                    appointmentId: active.id,
                                    patientId: active.patient.id,
                                    ...data
                                });
                                // Also complete the appointment after prescribing
                                await api.patch(`/appointments/${active.id}/complete`);

                                // Save the data for the success view before refetching clears it
                                setCompletedPx({
                                    patient: active.patient,
                                    doctor: active.doctor,
                                    appointmentDate: active.appointmentDate,
                                    timeSlot: active.timeSlot,
                                    ...data
                                });
                                refetch();
                            } catch {
                                alert("Failed to save prescription");
                            } finally {
                                setIsSubmitting(false);
                            }
                        }}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>


            {/* Print Header/Layout (Hidden on Screen) */}
            <div className="hidden print:block print:w-full print:h-[100vh] bg-white text-black p-8">
                {/* Print Header */}
                <div className="border-b-4 border-teal-900 pb-6 mb-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-extrabold text-teal-950 uppercase tracking-tighter">{CLINIC.name}</h1>
                        <p className="text-slate-600 text-sm mt-1 font-medium">{CLINIC.address.fullAddress}</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold text-teal-900">Dr. {active.doctor?.name}</h2>
                        <p className="text-slate-600 text-sm">{active.doctor?.specialization}</p>
                    </div>
                </div>

                {/* Patient Info Bar */}
                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200 mb-8">
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Patient Name</p>
                        <p className="text-xl font-bold text-slate-900">{active.patient?.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Phone</p>
                        <p className="text-lg font-bold text-slate-900">{active.patient?.phone}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date</p>
                        <p className="text-lg font-bold text-slate-900">{active.appointmentDate ? new Date(active.appointmentDate).toLocaleDateString() : new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Primary Diagnosis */}
                <div className="mb-8">
                    <h3 className="text-sm text-teal-800 font-bold uppercase tracking-widest border-b border-teal-100 pb-2 mb-3">Primary Diagnosis</h3>
                    <p className="text-xl font-medium text-slate-900">{diagnosis || "N/A"}</p>
                </div>

                {/* Rx Area */}
                <div className="mb-10 min-h-[400px]">
                    <h3 className="text-3xl font-serif italic text-teal-900 mb-6">Rx</h3>
                    <div className="space-y-6">
                        {meds.filter(m => m.name).map((med, i) => (
                            <div key={i} className="flex gap-4 border-b border-slate-100 pb-4">
                                <div className="text-lg font-bold text-slate-900 mt-1">{i + 1}.</div>
                                <div>
                                    <p className="text-xl font-bold text-slate-900">{med.name}</p>
                                    <p className="text-slate-600 mt-1">
                                        <span className="font-semibold text-slate-800">{med.dosage}</span> &nbsp;—&nbsp; {med.frequency} &nbsp;—&nbsp; <span className="font-semibold">{med.duration} days</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notes */}
                {notes && (
                    <div className="mb-16">
                        <h3 className="text-sm text-teal-800 font-bold uppercase tracking-widest border-b border-teal-100 pb-2 mb-3">Clinical Notes & Advice</h3>
                        <p className="text-slate-800 whitespace-pre-wrap">{notes}</p>
                    </div>
                )}

                {/* Signature Block */}
                <div className="flex justify-end pt-12">
                    <div className="text-center">
                        <div className="w-48 border-b-2 border-slate-400 mb-2"></div>
                        <p className="font-bold text-teal-900">Dr. {active.doctor?.name}</p>
                        <p className="text-xs text-slate-500 uppercase tracking-widest">Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
