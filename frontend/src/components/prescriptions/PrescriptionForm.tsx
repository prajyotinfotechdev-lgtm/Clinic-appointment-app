"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, ClipboardList, Activity } from "lucide-react";

export interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
}

interface PrescriptionFormProps {
    initialDiagnosis?: string;
    initialMeds?: Medication[];
    initialNotes?: string;
    onSave: (data: { diagnosis: string; medicines: Medication[]; notes: string }) => Promise<void>;
    isSubmitting?: boolean;
    activePatientName?: string;
}

export function PrescriptionForm({
    initialDiagnosis = "",
    initialMeds = [{ name: "", dosage: "", frequency: "", duration: "" }],
    initialNotes = "",
    onSave,
    isSubmitting = false,
    activePatientName
}: PrescriptionFormProps) {
    const [diagnosis, setDiagnosis] = useState(initialDiagnosis);
    const [meds, setMeds] = useState<Medication[]>(initialMeds);
    const [notes, setNotes] = useState(initialNotes);

    const addMed = () => setMeds([...meds, { name: "", dosage: "", frequency: "", duration: "" }]);
    const removeMed = (idx: number) => setMeds(meds.filter((_, i) => i !== idx));
    const updateMed = (idx: number, field: keyof Medication, val: string) => {
        const newMeds = [...meds];
        newMeds[idx][field] = val;
        setMeds(newMeds);
    };

    const handleSave = () => {
        if (!diagnosis.trim()) {
            alert("Diagnosis is required.");
            return;
        }
        onSave({ diagnosis, medicines: meds, notes });
    };

    return (
        <div className="space-y-6">
            {/* Diagnosis */}
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-extrabold text-teal-950 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-teal-600" /> Primary Diagnosis
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <Input
                        placeholder="E.g. Viral Pharyngitis, Acute Bronchitis..."
                        className="h-12 border-slate-200 focus-visible:ring-teal-600 focus-visible:border-teal-600 text-lg font-medium"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                    />
                </CardContent>
            </Card>

            {/* Medications */}
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-lg font-extrabold text-teal-950">
                        <div className="flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-teal-600" /> Medications
                        </div>
                        <Button size="sm" type="button" className="bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold" onClick={addMed}>
                            <Plus className="h-4 w-4 mr-1.5" /> Add Medicine
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-slate-50/80 font-bold text-slate-500 tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Medicine Name</th>
                                <th className="px-6 py-4">Dosage</th>
                                <th className="px-6 py-4">Frequency</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {meds.map((med, i) => (
                                <tr key={i} className="hover:bg-teal-50/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <Input
                                            placeholder="e.g. Paracetamol"
                                            className="h-10 border-slate-200 focus-visible:ring-teal-600 font-medium"
                                            value={med.name}
                                            onChange={(e) => updateMed(i, "name", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Input placeholder="500mg" className="h-10 border-slate-200 focus-visible:ring-teal-600"
                                            value={med.dosage}
                                            onChange={(e) => updateMed(i, "dosage", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Input placeholder="1-0-1" className="h-10 border-slate-200 focus-visible:ring-teal-600"
                                            value={med.frequency}
                                            onChange={(e) => updateMed(i, "frequency", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Input placeholder="5 days" className="h-10 border-slate-200 focus-visible:ring-teal-600"
                                            value={med.duration}
                                            onChange={(e) => updateMed(i, "duration", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button variant="ghost" type="button" size="icon" className="text-red-400 hover:text-red-600 hover:bg-red-50 h-10 w-10 disabled:opacity-30" onClick={() => removeMed(i)} disabled={meds.length === 1}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>

            {/* Notes */}
            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg font-extrabold text-teal-950">Clinical Notes (Optional)</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <Textarea
                        placeholder="Additional observations, dietary advice, next steps..."
                        className="min-h-[120px] border-slate-200 focus-visible:ring-teal-600 focus-visible:border-teal-600 resize-y"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    className="bg-teal-600 hover:bg-teal-700 shadow-lg shadow-teal-600/20 px-8 font-bold"
                    disabled={isSubmitting}
                    onClick={handleSave}
                >
                    {isSubmitting ? "Saving..." : "Save Prescription"}
                </Button>
            </div>
        </div>
    );
}
