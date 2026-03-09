"use client";

import { use } from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "@/lib/api";
import { useAppointments } from "@/hooks/useAppointments";
import { ArrowLeft, Phone, Mail, Calendar, Activity, Clock, FileText, Pill, Printer, Edit } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { PrescriptionForm, Medication } from "@/components/prescriptions/PrescriptionForm";
import PrescriptionPrintTemplate from "@/components/prescription/PrescriptionPrintTemplate";
import { useReactToPrint } from "react-to-print";
import { CLINIC, DOCTORS } from "@/lib/clinic-data";
import { formatTime12Hour } from "@/lib/utils";

interface Patient {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: string;
}

interface Prescription {
    id: string;
    diagnosis: string;
    medicines: Medication[];
    notes: string;
}

interface Appointment {
    id: string;
    appointmentDate: string;
    timeSlot: string;
    status: string;
    doctor: { name: string; specialization: string };
    prescription?: Prescription;
}

export default function PatientHistoryPage({ params }: { params: Promise<{ patientId: string }> }) {
    const { patientId } = use(params);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoadingPatient, setIsLoadingPatient] = useState(true);
    const [editingPrescription, setEditingPrescription] = useState<any>(null);
    const [printingPrescription, setPrintingPrescription] = useState<any>(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const printRef = useRef<HTMLDivElement>(null);

    const handlePrintPrescription = useReactToPrint({
        contentRef: printRef,
        documentTitle: `Prescription_${patient?.name || "patient"}`,
        pageStyle: "@page { size: A4; margin: 0; }"
    });

    const triggerPrint = useCallback(() => {
        if (printRef.current) {
            handlePrintPrescription();
        }
    }, [handlePrintPrescription]);

    const { appointments, isLoading: isLoadingAppointments, refetch: refetchAppointments } = useAppointments({ patientId });

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const res = await api.get<{ data: Patient }>(`/patients/${patientId}`);
                setPatient(res.data);
            } catch (err) {
                console.error("Failed to load patient", err);
            } finally {
                setIsLoadingPatient(false);
            }
        };
        fetchPatient();
    }, [patientId]);

    const history = appointments.filter(a => a.status === 'COMPLETED').sort((a, b) =>
        new Date(b.appointmentDate).getTime() - new Date(a.appointmentDate).getTime()
    );

    const handleUpdate = async (data: { diagnosis: string; medicines: Medication[]; notes: string }) => {
        if (!editingPrescription) return;
        try {
            setIsUpdating(true);
            await api.put(`/prescriptions/${editingPrescription.id}`, data);
            setEditingPrescription(null);
            refetchAppointments();
            alert("Prescription updated successfully");
        } catch (err) {
            console.error("Failed to update prescription", err);
            alert("Failed to update prescription");
        } finally {
            setIsUpdating(false);
        }
    };
    const handlePrint = (appt: any) => {
        if (!appt.prescription) return;
        setPrintingPrescription(appt);
    };

    useEffect(() => {
        if (printingPrescription && printRef.current) {
            setTimeout(() => {
                triggerPrint();
                setPrintingPrescription(null);
            }, 100);
        }
    }, [printingPrescription, triggerPrint]);

    if (isLoadingPatient) {
        return (
            <div className="max-w-5xl mx-auto pt-8 px-4 space-y-4">
                <div className="skeleton h-6 w-32 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="skeleton h-64 rounded-xl" />
                    <div className="md:col-span-2 space-y-3">
                        <div className="skeleton h-48 rounded-xl" />
                        <div className="skeleton h-48 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="max-w-5xl mx-auto pt-8 px-4 text-center space-y-3">
                <Activity className="h-8 w-8 text-slate-200 mx-auto" />
                <p className="text-sm font-semibold text-slate-600">Patient Not Found</p>
                <Link href="/doctor/patient-history" className="text-xs text-teal-600 font-semibold hover:underline">
                    &larr; Back to Search
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            <Link href="/doctor/patient-history" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Search
            </Link>

            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Clinical History</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Comprehensive medical records for {patient.name}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left: Patient Card */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden text-center sticky top-4">
                        <div className="h-14 bg-gradient-to-r from-teal-500 to-teal-600" />
                        <div className="px-4 pb-4 relative">
                            <div className="w-14 h-14 mx-auto -mt-7 rounded-full border-3 border-white bg-teal-600 flex items-center justify-center shadow-sm">
                                <span className="text-xl font-bold text-white">{patient.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-sm font-bold text-slate-900 mt-2">{patient.name}</h2>
                            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider">ID: {patient.id.substring(0, 8)}</p>

                            <div className="mt-4 space-y-2 text-left">
                                <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-lg">
                                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Phone</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{patient.phone || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-lg">
                                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Email</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{patient.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2.5 px-3 py-2 bg-slate-50 rounded-lg">
                                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <div className="overflow-hidden">
                                        <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Registered</p>
                                        <p className="text-xs font-semibold text-slate-700 truncate">{format(new Date(patient.createdAt), "MMM do, yyyy")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: History */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-1.5">
                                <FileText className="h-4 w-4 text-teal-600" /> Past Consultations
                            </h3>
                        </div>
                        <div>
                            {isLoadingAppointments ? (
                                <div className="p-4 space-y-3">
                                    {[1, 2].map(i => <div key={i} className="skeleton h-32 rounded-lg" />)}
                                </div>
                            ) : history.length === 0 ? (
                                <div className="text-center py-16 px-4">
                                    <FileText className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                                    <p className="text-sm font-semibold text-slate-600">No clinical history</p>
                                    <p className="text-xs text-slate-400 mt-0.5">No completed consultations yet.</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-50">
                                    {history.map((appt: any) => (
                                        <div key={appt.id} className="p-4 hover:bg-slate-50/30 transition-colors">
                                            <div className="flex items-start justify-between gap-3 mb-3">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-teal-600 flex flex-col items-center justify-center shrink-0 text-white">
                                                        <span className="text-[8px] font-semibold uppercase tracking-widest text-teal-200">{format(new Date(appt.appointmentDate), "MMM")}</span>
                                                        <span className="text-sm font-bold leading-none">{format(new Date(appt.appointmentDate), "dd")}</span>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-slate-800 text-sm">Dr. {appt.doctor.name}</h3>
                                                        <div className="text-slate-400 text-[10px] font-medium flex items-center gap-1.5 mt-0.5">
                                                            <Clock className="h-3 w-3" /> {formatTime12Hour(appt.timeSlot)}
                                                            <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                                                            {format(new Date(appt.appointmentDate), "yyyy")}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-semibold rounded-md shrink-0">
                                                    Completed
                                                </span>
                                            </div>

                                            {appt.prescription ? (
                                                <div className="space-y-2.5">
                                                    {appt.prescription.diagnosis && (
                                                        <div className="bg-slate-50 rounded-lg p-3">
                                                            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-0.5">Diagnosis</p>
                                                            <p className="font-semibold text-slate-800 text-sm">{appt.prescription.diagnosis}</p>
                                                        </div>
                                                    )}

                                                    {appt.prescription.medicines && appt.prescription.medicines.length > 0 && (
                                                        <div className="bg-white rounded-lg p-3 border border-slate-100">
                                                            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                                                <Pill className="h-3 w-3" /> Medications
                                                            </p>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                                {appt.prescription.medicines.map((med: any, i: number) => (
                                                                    <div key={i} className="flex items-start gap-2 p-2 bg-slate-50 rounded-md">
                                                                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0 mt-0.5">
                                                                            <span className="text-[9px] font-bold text-teal-600">{i + 1}</span>
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-semibold text-slate-800 text-xs">{med.name}</p>
                                                                            <p className="text-[10px] text-slate-400 font-medium">{med.dosage} • {med.frequency} • {med.duration}d</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {appt.prescription.notes && (
                                                        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                                                            <p className="text-[9px] font-semibold text-amber-600 uppercase tracking-widest mb-0.5">Notes</p>
                                                            <p className="font-medium text-amber-800 text-xs whitespace-pre-wrap">{appt.prescription.notes}</p>
                                                        </div>
                                                    )}

                                                    <div className="flex justify-end gap-2 pt-1">
                                                        <button
                                                            onClick={() => handlePrint(appt)}
                                                            className="h-7 px-2.5 text-[10px] font-semibold text-teal-600 border border-teal-200 rounded-md hover:bg-teal-50 transition-colors flex items-center gap-1 no-print"
                                                        >
                                                            <Printer className="w-3 h-3" /> Print
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingPrescription(appt.prescription)}
                                                            className="h-7 px-2.5 text-[10px] font-semibold text-amber-600 border border-amber-200 rounded-md hover:bg-amber-50 transition-colors flex items-center gap-1 no-print"
                                                        >
                                                            <Edit className="w-3 h-3" /> Edit
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-slate-50 rounded-lg p-3 border border-dashed border-slate-200 text-center">
                                                    <p className="text-xs font-medium text-slate-400">No prescription recorded for this visit.</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={!!editingPrescription} onOpenChange={(open) => !open && setEditingPrescription(null)}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-bold text-slate-900">Edit Prescription</DialogTitle>
                        <DialogDescription>
                            Updating clinical record for <span className="font-semibold text-teal-600">{patient.name}</span>
                        </DialogDescription>
                    </DialogHeader>
                    {editingPrescription && (
                        <div className="mt-4">
                            <PrescriptionForm
                                initialDiagnosis={editingPrescription.diagnosis}
                                initialMeds={editingPrescription.medicines}
                                initialNotes={editingPrescription.notes}
                                onSave={handleUpdate}
                                isSubmitting={isUpdating}
                            />
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Hidden print-only prescription template for react-to-print */}
            <div style={{ position: 'absolute', left: -9999, top: 0 }} aria-hidden="true">
                <div ref={printRef}>
                    {printingPrescription && (
                        <PrescriptionPrintTemplate
                            clinic={{
                                name: CLINIC.name,
                                address: CLINIC.address.fullAddress,
                                city: CLINIC.address.city,
                                phone: undefined // Add phone if available
                            }}
                            doctor={{
                                name: printingPrescription.doctor?.name || '',
                                qualification: (DOCTORS.find(d => d.name.toLowerCase().includes((printingPrescription.doctor?.name || '').toLowerCase()))?.qualifications) || '',
                                specialization: printingPrescription.doctor?.specialization || ''
                            }}
                            patient={{
                                name: patient.name,
                                age: undefined, // Add age if available
                                gender: undefined, // Add gender if available
                                id: patient.id
                            }}
                            date={format(new Date(printingPrescription.appointmentDate), "dd MMMM yyyy")}
                            medicines={printingPrescription.prescription?.medicines || []}
                            advice={printingPrescription.prescription?.notes ? printingPrescription.prescription.notes.split('\n').filter(Boolean) : []}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
