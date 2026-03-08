"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Users, Search, Phone, Mail, FileText } from "lucide-react";

interface Patient {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: string;
}

export default function ReceptionistPatientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [patients, setPatients] = useState<Patient[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            setIsLoading(true);
            try {
                const res = await api.get('/patients') as { data: Patient[] };
                if (res.data) setPatients(res.data);
            } catch (err) {
                console.error("Failed to fetch patients", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.phone && p.phone.includes(searchTerm)) ||
        (p.email && p.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Patient Directory</h1>
                    <p className="text-slate-500 text-xs md:text-sm mt-0.5">Search and manage registered patients</p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                    <input
                        placeholder="Search name, phone, email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 h-9 bg-white border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 shadow-[var(--shadow-card)] focus:outline-none focus:border-teal-400 transition-colors"
                    />
                </div>
            </div>

            {/* ── Patient List ── */}
            <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                {isLoading ? (
                    <div className="space-y-0">
                        {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton h-14 border-b border-slate-50 last:border-0" />)}
                    </div>
                ) : filteredPatients.length === 0 ? (
                    <div className="py-16 text-center">
                        <Users className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                        <p className="text-sm font-semibold text-slate-600">No patients found</p>
                        <p className="text-xs text-slate-400 mt-0.5">Try adjusting your search.</p>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:grid grid-cols-12 gap-3 px-4 py-2.5 bg-slate-50/60 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                            <div className="col-span-4">Patient</div>
                            <div className="col-span-4">Contact</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>

                        <div className="divide-y divide-slate-50">
                            {filteredPatients.map((patient) => (
                                <div key={patient.id} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-3 px-4 py-3 hover:bg-slate-50/40 transition-colors items-center">
                                    <div className="col-span-4 flex items-center gap-3 min-w-0">
                                        <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-bold text-teal-600">{patient.name.charAt(0)}</span>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-semibold text-slate-800 text-sm truncate">{patient.name}</p>
                                            <p className="text-[10px] text-slate-400 font-medium">ID: {patient.id.substring(0, 8)}</p>
                                        </div>
                                    </div>

                                    <div className="col-span-4 space-y-0.5">
                                        <div className="flex items-center text-xs font-medium text-slate-600 gap-1.5">
                                            <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                                            {patient.phone || <span className="text-slate-400 italic">No phone</span>}
                                        </div>
                                        <div className="flex items-center text-xs font-medium text-slate-600 gap-1.5 truncate">
                                            <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                                            <span className="truncate">{patient.email}</span>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Active</span>
                                    </div>

                                    <div className="col-span-2 flex justify-end">
                                        <button className="h-7 w-7 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors flex items-center justify-center" title="View Records">
                                            <FileText className="h-3.5 w-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Count footer */}
            {!isLoading && filteredPatients.length > 0 && (
                <p className="text-[10px] text-slate-400 font-medium text-center">
                    Showing {filteredPatients.length} of {patients.length} patients
                </p>
            )}
        </div>
    );
}
