"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import useSWR from "swr";
import { Search, Phone, Activity, Calendar, Stethoscope, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

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

export default function PatientSearchPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");

    const { data: prescriptions, isLoading } = useSWR<Prescription[]>('/prescriptions/doctor', fetcher);

    // Grouping by patient to show distinct patients with their latest visit info, 
    // or just showing the raw history timeline. We'll show the timeline to make finding past visits easy.
    const filteredHistory = (prescriptions || []).filter(p => {
        const term = searchTerm.toLowerCase();
        return (
            p.patient?.name?.toLowerCase().includes(term) ||
            p.patient?.phone?.includes(term) ||
            p.diagnosis?.toLowerCase()?.includes(term)
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
            ) : filteredHistory.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                    <Activity className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-600">No medical history found</p>
                    <p className="text-xs text-slate-400 mt-0.5">No prescriptions written yet, or no records match your search.</p>
                </div>
            ) : (
                <div className="space-y-2 stagger-children">
                    {filteredHistory.map(record => (
                        <div
                            key={record.id}
                            onClick={() => router.push(`/doctor/patient-history/${record.patientId}`)}
                            className="group bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-hover)] px-4 py-3 cursor-pointer transition-all flex items-center gap-3"
                        >
                            <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                <span className="text-xs font-bold text-teal-600">{record.patient.name.charAt(0)}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h3 className="font-semibold text-slate-800 text-sm truncate">{record.patient.name}</h3>
                                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 shrink-0">
                                        <Calendar className="h-3 w-3" />
                                        {format(new Date(record.appointment.appointmentDate), 'MMM do, yyyy')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-slate-400 font-medium">
                                    <span className="flex items-center gap-1">
                                        <Phone className="h-3 w-3" /> {record.patient.phone}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Stethoscope className="h-3 w-3 text-teal-500" />
                                        <span className={cn(record.diagnosis ? "text-slate-600 font-semibold" : "italic text-slate-400")}>
                                            {record.diagnosis || "No diagnosis"}
                                        </span>
                                    </span>
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
