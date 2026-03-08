"use client";

import { format } from "date-fns";
import { Printer } from "lucide-react";
import { CLINIC, DOCTORS } from "@/lib/clinic-data";

interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string | number;
}

interface PrescriptionPrintProps {
    clinicName?: string;
    doctorName: string;
    patientName: string;
    patientAge?: string | number;
    patientGender?: string;
    diagnosis: string;
    medications: Medication[];
    notes?: string;
    date: string | Date;
    prescriptionId?: string;
}

export function PrescriptionPrint({
    clinicName,
    doctorName,
    patientName,
    patientAge,
    patientGender,
    diagnosis,
    medications,
    notes,
    date,
    prescriptionId
}: PrescriptionPrintProps) {
    const resolvedClinicName = clinicName || CLINIC.name;
    const doctorInfo = DOCTORS.find(d => d.name.toLowerCase().includes(doctorName.toLowerCase()));
    const qualifications = doctorInfo?.qualifications || "Medical Professional";
    const title = doctorInfo?.title || "Attending Physician";

    return (
        <div id="prescription-print-template" className="bg-white p-8 max-w-[800px] mx-auto text-slate-900 font-sans print:p-0">
            {/* Header / Letterhead */}
            <div className="border-b-4 border-teal-600 pb-6 mb-8 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-black text-teal-700 tracking-tighter mb-1 uppercase">{resolvedClinicName}</h1>
                    <p className="text-slate-500 font-bold text-xs tracking-widest uppercase">{CLINIC.address.fullAddress}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold text-slate-900">Dr. {doctorName}</h2>
                    <p className="text-slate-500 font-medium text-sm">{qualifications}</p>
                    <p className="text-slate-400 font-medium text-xs">{title}</p>
                </div>
            </div>

            {/* Patient Info Bar */}
            <div className="grid grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl mb-8 border border-slate-100">
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Patient Name</p>
                    <p className="font-bold text-slate-900">{patientName}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age / Gender</p>
                    <p className="font-bold text-slate-900">{patientAge || '--'} / {patientGender || '--'}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="font-bold text-slate-900">{format(new Date(date), 'MMM dd, yyyy')}</p>
                </div>
                <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID</p>
                    <p className="font-bold text-slate-900">{prescriptionId ? `#${prescriptionId.substring(0, 8).toUpperCase()}` : `#RX-${format(new Date(date), 'ddMMyy')}`}</p>
                </div>
            </div>

            {/* Diagnosis Section */}
            <div className="mb-10">
                <h3 className="text-xs font-black text-teal-700 uppercase tracking-[0.2em] mb-3 border-b border-teal-100 pb-2">Diagnosis</h3>
                <p className="text-xl font-bold text-slate-900">{diagnosis || 'General Consultation'}</p>
            </div>

            {/* Rx Section */}
            <div className="mb-12 min-h-[400px]">
                <div className="flex items-end gap-3 mb-6">
                    <span className="text-5xl font-serif italic text-teal-700 opacity-50">Rx</span>
                    <div className="h-px flex-1 bg-slate-100 mb-2"></div>
                </div>

                <div className="space-y-8">
                    {medications.map((med, index) => (
                        <div key={index} className="flex gap-6 group">
                            <div className="text-slate-300 font-black text-2xl tracking-tighter w-8">{String(index + 1).padStart(2, '0')}</div>
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <p className="text-xl font-black text-slate-900 tracking-tight">{med.name}</p>
                                    <div className="flex-1 border-b border-dotted border-slate-200 mx-4 mb-1"></div>
                                    <p className="font-bold text-teal-700">{med.duration} Days</p>
                                </div>
                                <div className="flex gap-4 text-sm font-bold text-slate-500">
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                        <Clock className="w-3.5 h-3.5" /> {med.dosage}
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                                        <Printer className="w-3.5 h-3.5" /> {med.frequency}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Advice / Notes */}
            {notes && (
                <div className="mb-16">
                    <h3 className="text-xs font-black text-teal-700 uppercase tracking-[0.2em] mb-2 border-b border-teal-100 pb-2">Clinical Advice & Notes</h3>
                    <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">{notes}</p>
                </div>
            )}

            {/* Footer / Signature */}
            <div className="mt-auto pt-12 flex justify-between items-end border-t border-slate-100 italic text-xs text-slate-400 font-medium">
                <div>
                    <p>Electronic Prescription. Generated on {format(new Date(), 'MMM dd, yyyy HH:mm')}</p>
                </div>
                <div className="text-center w-56">
                    <div className="h-10 flex items-center justify-center mb-2">
                        {/* Placeholder for digital signature stamp */}
                        <div className="w-32 h-10 border-2 border-slate-100 rounded-lg flex items-center justify-center opacity-30 select-none font-bold">STAMP HERE</div>
                    </div>
                    <div className="h-px bg-slate-900 mb-2"></div>
                    <p className="font-black text-slate-900 uppercase tracking-wider text-sm">Dr. {doctorName}</p>
                    <p className="uppercase tracking-widest text-[10px]">{title}</p>
                </div>
            </div>
        </div>
    );
}

// Icon helper
function Clock({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    )
}
