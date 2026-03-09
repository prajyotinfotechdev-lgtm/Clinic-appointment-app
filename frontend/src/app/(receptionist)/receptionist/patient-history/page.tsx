"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import useSWR from "swr";
import { Search, Phone, Activity, Calendar, Stethoscope, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
}

interface Prescription {
    id: string;
    patientId: string;
    diagnosis: string | null;
    medicines: Medication[];
    notes: string | null;
    createdAt: string;
    patient: {
        name: string;
        phone: string;
    };
    appointment: {
        appointmentDate: string;
        timeSlot: string;
    };
}

const fetcher = (url: string) => api.get(url).then((res: any) => res.data);

export default function ReceptionistPatientHistoryPage() {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: prescriptions, isLoading } = useSWR<Prescription[]>('/prescriptions', fetcher);

    const groupedByPatient = (prescriptions || []).reduce((acc, p) => {
        if (!acc[p.patientId]) {
            acc[p.patientId] = {
                patientId: p.patientId,
                patientName: p.patient.name,
                patientPhone: p.patient.phone,
                consultations: [],
                latestDate: p.appointment.appointmentDate,
                latestDiagnosis: p.diagnosis
            };
        }
        acc[p.patientId].consultations.push(p);
        if (new Date(p.appointment.appointmentDate) > new Date(acc[p.patientId].latestDate)) {
            acc[p.patientId].latestDate = p.appointment.appointmentDate;
            acc[p.patientId].latestDiagnosis = p.diagnosis;
        }
        return acc;
    }, {} as Record<string, {
        patientId: string;
        patientName: string;
        patientPhone: string;
        consultations: Prescription[];
        latestDate: string;
        latestDiagnosis: string | null;
    }>);

    const patients = Object.values(groupedByPatient);

    const filteredPatients = patients.filter(patient => {
        const term = searchTerm.toLowerCase();
        return (
            patient.patientName?.toLowerCase().includes(term) ||
            patient.patientPhone?.includes(term) ||
            patient.latestDiagnosis?.toLowerCase()?.includes(term)
        );
    });

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Patient History</h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">Search past visits, patients, or diagnoses</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Name, phone, or diagnosis..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 h-9 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 shadow-[var(--shadow-card)] focus:outline-none focus:border-teal-400 transition-colors"
                    />
                </div>
            </div>

            {/* ── Records ── */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
                </div>
            ) : filteredPatients.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                    <Activity className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No medical history found</p>
                    <p className="text-xs text-slate-400 mt-0.5">No prescriptions written yet, or no records match your search.</p>
                </div>
            ) : (
                <div className="space-y-2 stagger-children">
                    {filteredPatients.map(patient => (
                        <div
                            key={patient.patientId}
                            onClick={() => router.push(`/receptionist/patient-history/${patient.patientId}`)}
                            className="group bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] px-4 py-3 cursor-pointer transition-all flex items-center gap-3"
                        >
                            <div className="h-10 w-10 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                <span className="text-sm font-bold text-teal-600">{patient.patientName.charAt(0)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h3 className="font-semibold text-slate-800 text-sm truncate">{patient.patientName}</h3>
                                    <span className="px-1.5 py-0.5 bg-teal-50 text-teal-600 text-[9px] font-bold rounded-md shrink-0">
                                        {patient.consultations.length} visit{patient.consultations.length > 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" /> {patient.patientPhone}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        Last: {format(new Date(patient.latestDate), 'MMM do, yyyy')}
                                    </span>
                                    {patient.latestDiagnosis && (
                                        <span className="flex items-center gap-1">
                                            <Stethoscope className="h-3 w-3 text-teal-500" />
                                            <span className="text-slate-600 font-semibold truncate max-w-[200px]">
                                                {patient.latestDiagnosis}
                                            </span>
                                        </span>
                                    )}
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-teal-600 transition-colors shrink-0" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
