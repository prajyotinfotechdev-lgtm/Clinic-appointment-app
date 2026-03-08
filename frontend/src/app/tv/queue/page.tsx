"use client";

import useSWR from "swr";
import { api } from "@/lib/api";
import { format } from "date-fns";
import { Activity, Users, ChevronRight, Stethoscope } from "lucide-react";
import { DOCTORS } from "@/lib/clinic-data";

interface Appointment {
    id: string;
    timeSlot: string;
    status: 'WAITING' | 'IN_CONSULTATION';
    patient: {
        name: string;
    };
    doctor: {
        id: string;
        name: string;
    };
}

const fetcher = (url: string) => api.get(url).then((res: any) => res.data);

// Component to handle individual doctor's queue display
function DoctorQueueBoard({ doctor }: { doctor: any }) {
    const { data: appointments = [], isLoading } = useSWR<Appointment[]>(
        `/appointments?date=${format(new Date(), 'yyyy-MM-dd')}&doctorId=${doctor.id}`,
        fetcher,
        { refreshInterval: 5000 } // Poll every 5 seconds
    );

    const inConsultation = appointments.filter(a => a.status === 'IN_CONSULTATION')[0];
    const waitingQueue = appointments
        .filter(a => a.status === 'WAITING')
        .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));

    return (
        <div className="flex flex-col h-full bg-slate-50/50 border-r border-slate-200/60 last:border-r-0">
            {/* Header */}
            <div className="bg-teal-900 text-white px-6 py-5 flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <span className="text-2xl">{doctor.avatar}</span>
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Dr. {doctor.name}</h2>
                    <p className="text-teal-300/70 font-semibold uppercase text-xs tracking-widest">{doctor.specialization}</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col p-5 gap-4 overflow-hidden">
                {/* Now Serving */}
                <div className="bg-white rounded-xl border border-emerald-100 shadow-[var(--shadow-card)] p-6 shrink-0 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-10" />
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="h-5 w-5 text-emerald-600 animate-pulse" />
                        <h3 className="text-sm font-bold text-emerald-800 uppercase tracking-widest">Now Serving</h3>
                    </div>

                    {isLoading ? (
                        <div className="skeleton h-14 rounded-lg" />
                    ) : inConsultation ? (
                        <div className="animate-fade-in">
                            <p className="text-4xl leading-none font-bold text-slate-900 truncate">
                                {inConsultation.patient.name}
                            </p>
                            <p className="text-lg font-semibold text-emerald-600 mt-1.5">Room {doctor.roomId || "1"}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-3 text-center">
                            <Stethoscope className="h-10 w-10 text-slate-200 mb-2" />
                            <p className="text-xl font-semibold text-slate-400">Doctor Available</p>
                        </div>
                    )}
                </div>

                {/* Queue */}
                <div className="flex-1 bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 shrink-0">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-teal-600" />
                            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Next in Queue</h3>
                        </div>
                        <span className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded-md font-bold text-sm">
                            {waitingQueue.length}
                        </span>
                    </div>

                    <div className="flex-1 overflow-auto p-3 space-y-2">
                        {waitingQueue.map((appt, index) => (
                            <div
                                key={appt.id}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-lg transition-all ${index === 0
                                    ? "bg-teal-50 border border-teal-200"
                                    : "bg-slate-50/50 border border-slate-100"
                                    }`}
                            >
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 font-bold text-lg ${index === 0 ? "bg-teal-600 text-white" : "bg-slate-200 text-slate-500"
                                        }`}>
                                        {index + 1}
                                    </div>
                                    <p className={`text-2xl font-bold truncate ${index === 0 ? "text-teal-900" : "text-slate-700"}`}>
                                        {appt.patient.name}
                                    </p>
                                </div>
                                {index === 0 && (
                                    <div className="shrink-0 flex items-center text-teal-600 font-semibold text-sm">
                                        Up Next <ChevronRight className="h-4 w-4 ml-0.5" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {!isLoading && waitingQueue.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                <p className="text-lg font-semibold text-slate-400">Queue is empty</p>
                                <p className="text-slate-400 text-sm mt-0.5">No patients waiting</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LiveQueueTV() {
    return (
        <div className="fixed inset-0 bg-[hsl(var(--background))] flex flex-col overflow-hidden">
            {/* Sync indicator */}
            <div className="h-1.5 bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-400 w-full animate-pulse z-50" />

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
                {DOCTORS.map(doc => (
                    <DoctorQueueBoard key={doc.id} doctor={doc} />
                ))}
            </div>
        </div>
    );
}
