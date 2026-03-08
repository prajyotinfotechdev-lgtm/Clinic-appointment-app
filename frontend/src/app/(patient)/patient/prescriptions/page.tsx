"use client";

import { usePrescriptions } from "@/hooks/usePrescriptions";
import { useAuth } from "@/hooks/useAuth";
import { Pill, Activity, CalendarDays, Stethoscope, Printer } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime12Hour } from "@/lib/utils";
import { CLINIC, DOCTORS } from "@/lib/clinic-data";

export default function PatientPrescriptionsPage() {
    const { user } = useAuth();
    const { prescriptions, isLoading } = usePrescriptions(user?.id);

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">My Prescriptions</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Digital prescriptions and clinical notes from past visits</p>
            </div>

            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2].map(i => <div key={i} className="skeleton h-48 rounded-xl" />)}
                </div>
            ) : prescriptions.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                    <Pill className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No Prescriptions Found</p>
                    <p className="text-xs text-slate-400 mt-0.5">No past prescriptions in your clinical record yet.</p>
                </div>
            ) : (
                <div className="space-y-4 stagger-children">
                    {prescriptions.map((px) => (
                        <div key={px.id} className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                            {/* Header */}
                            <div className="px-4 py-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                                        <Stethoscope className="h-4 w-4 text-teal-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-slate-800 text-sm truncate">Dr. {px.doctor.name}</h3>
                                        <p className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                                            <CalendarDays className="h-3 w-3 shrink-0" />
                                            {format(new Date(px.appointment.appointmentDate), "MMM do, yyyy")} · {formatTime12Hour(px.appointment.timeSlot)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    {px.diagnosis && (
                                        <Badge className="bg-rose-50 text-rose-600 border-none px-2 py-0.5 rounded-md text-[9px] font-semibold flex items-center gap-1">
                                            <Activity className="h-3 w-3" /> {px.diagnosis}
                                        </Badge>
                                    )}
                                    <button
                                        onClick={() => {
                                            const contents = document.getElementById(`print-rx-${px.id}`)?.innerHTML;
                                            const original = document.body.innerHTML;
                                            if (contents) {
                                                document.body.innerHTML = `<div class="p-8">${contents}</div>`;
                                                window.print();
                                                document.body.innerHTML = original;
                                                window.location.reload();
                                            }
                                        }}
                                        className="h-7 px-2 text-teal-600 hover:bg-teal-50 rounded-md transition-colors flex items-center gap-1 text-[10px] font-semibold"
                                    >
                                        <Printer className="w-3.5 h-3.5" /> Print
                                    </button>
                                </div>
                            </div>

                            {/* Medications */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-[10px] uppercase bg-slate-50/60 font-semibold text-slate-400 tracking-wider">
                                        <tr>
                                            <th className="px-4 py-2.5">Medicine</th>
                                            <th className="px-4 py-2.5">Dosage</th>
                                            <th className="px-4 py-2.5">Frequency</th>
                                            <th className="px-4 py-2.5">Duration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {px.medicines.map((med: any, i: number) => (
                                            <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                                                <td className="px-4 py-3 font-semibold text-slate-800 text-sm flex items-center gap-2">
                                                    <Pill className="h-3.5 w-3.5 text-slate-300 shrink-0" /> {med.name}
                                                </td>
                                                <td className="px-4 py-3 text-xs font-medium text-slate-500">{med.dosage}</td>
                                                <td className="px-4 py-3 text-xs font-medium text-slate-500">{med.frequency}</td>
                                                <td className="px-4 py-3 text-xs font-medium text-slate-500">{med.duration}</td>
                                            </tr>
                                        ))}
                                        {px.medicines.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-4 py-6 text-center text-xs text-slate-400">No medications prescribed.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Notes */}
                            {px.notes && (
                                <div className="px-4 py-3 bg-slate-50/50 border-t border-slate-100">
                                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1">Notes</p>
                                    <p className="text-xs text-slate-600 leading-relaxed">{px.notes}</p>
                                </div>
                            )}

                            {/* Hidden Print Template */}
                            <div id={`print-rx-${px.id}`} className="hidden print:block bg-white text-black text-left">
                                <div className="border-b-4 border-teal-900 pb-6 mb-6 flex justify-between items-start">
                                    <div>
                                        <h1 className="text-4xl font-extrabold text-teal-950 uppercase tracking-tighter">{CLINIC.name}</h1>
                                        <p className="text-slate-600 text-sm mt-1 font-medium">{CLINIC.address.fullAddress}</p>
                                    </div>
                                    <div className="text-right">
                                        <h2 className="text-xl font-bold text-teal-900">Dr. {px.doctor.name}</h2>
                                        <p className="text-slate-600 text-sm">{px.doctor.specialization}</p>
                                        <p className="text-slate-500 text-xs">{DOCTORS.find(d => d.name.toLowerCase().includes(px.doctor.name.toLowerCase()))?.qualifications || ''}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg border border-slate-200 mb-8">
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Patient Name</p>
                                        <p className="text-lg font-bold text-slate-900">{user?.name || "Self"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Patient ID</p>
                                        {/* @ts-ignore */}
                                        <p className="text-lg font-bold text-slate-900">{px.patientId ? px.patientId.substring(0, 8) : "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Date</p>
                                        <p className="text-lg font-bold text-slate-900">{format(new Date(px.appointment.appointmentDate), "MMM do, yyyy")}</p>
                                    </div>
                                </div>
                                {px.diagnosis && (
                                    <div className="mb-8">
                                        <h3 className="text-sm text-teal-800 font-bold uppercase tracking-widest border-b border-teal-100 pb-2 mb-3">Primary Diagnosis</h3>
                                        <p className="text-xl font-medium text-slate-900">{px.diagnosis}</p>
                                    </div>
                                )}
                                <div className="mb-10 min-h-[300px]">
                                    <h3 className="text-3xl font-serif italic text-teal-900 mb-6">Rx</h3>
                                    <div className="space-y-6">
                                        {px.medicines.map((med: any, i: number) => (
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
                                        {px.medicines.length === 0 && (
                                            <p className="text-slate-500 italic">No medications prescribed in this session.</p>
                                        )}
                                    </div>
                                </div>
                                {px.notes && (
                                    <div className="mb-16">
                                        <h3 className="text-sm text-teal-800 font-bold uppercase tracking-widest border-b border-teal-100 pb-2 mb-3">Clinical Notes & Advice</h3>
                                        <p className="text-slate-800 whitespace-pre-wrap">{px.notes}</p>
                                    </div>
                                )}
                                <div className="flex justify-end pt-12">
                                    <div className="text-center">
                                        <div className="w-48 border-b-2 border-slate-400 mb-2"></div>
                                        <p className="font-bold text-teal-900">Dr. {px.doctor.name}</p>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest">Signature</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
