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
}

export function PrescriptionForm({
    initialDiagnosis = "",
    initialMeds = [{ name: "", dosage: "", frequency: "", duration: "" }],
    initialNotes = "",
    onSave,
    isSubmitting = false
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
            <Card className="border border-slate-200/60 shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50/30">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 pb-4">
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            <Activity className="h-4 w-4 text-white" />
                        </div>
                        <span className="tracking-tight">Primary Diagnosis</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-6 px-6">
                    <Input
                        placeholder="E.g. Viral Pharyngitis, Acute Bronchitis..."
                        className="h-12 border-slate-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 text-base font-semibold text-slate-900 placeholder:text-slate-400 bg-white shadow-sm"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                    />
                </CardContent>
            </Card>

            {/* Medications */}
            <Card className="border border-slate-200/60 shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50/30">
                <CardHeader className="bg-gradient-to-r from-teal-600 to-teal-700 pb-4">
                    <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-base font-bold text-white">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                                <ClipboardList className="h-4 w-4 text-white" />
                            </div>
                            <span className="tracking-tight">Medications</span>
                        </div>
                        <Button size="sm" type="button" className="bg-white text-teal-700 hover:bg-teal-50 font-bold shadow-md h-9 px-4" onClick={addMed}>
                            <Plus className="h-4 w-4 mr-1.5" /> Add Medicine
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-[10px] uppercase bg-gradient-to-r from-slate-100 to-slate-50 font-bold text-slate-600 tracking-widest border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Medicine Name</th>
                                <th className="px-6 py-4">Dosage</th>
                                <th className="px-6 py-4">Frequency</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {meds.map((med, i) => (
                                <tr key={i} className="hover:bg-teal-50/20 transition-colors group">
                                    <td className="px-6 py-5">
                                        <Input
                                            placeholder="e.g. Paracetamol"
                                            className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 font-semibold text-slate-900 bg-white shadow-sm"
                                            value={med.name}
                                            onChange={(e) => updateMed(i, "name", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <Input placeholder="500mg" className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 font-medium text-slate-800 bg-white shadow-sm"
                                            value={med.dosage}
                                            onChange={(e) => updateMed(i, "dosage", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <Input placeholder="1-0-1" className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 font-medium text-slate-800 bg-white shadow-sm"
                                            value={med.frequency}
                                            onChange={(e) => updateMed(i, "frequency", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <Input placeholder="5 days" className="h-11 border-slate-300 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:border-teal-500 font-medium text-slate-800 bg-white shadow-sm"
                                            value={med.duration}
                                            onChange={(e) => updateMed(i, "duration", e.target.value)}
                                        />
                                    </td>
                                    <td className="px-6 py-5">
                                        <Button variant="ghost" type="button" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50 h-11 w-11 disabled:opacity-20 rounded-lg transition-all" onClick={() => removeMed(i)} disabled={meds.length === 1}>
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
            <Card className="border border-slate-200/60 shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50/30">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-amber-600 pb-4">
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                            <ClipboardList className="h-4 w-4 text-white" />
                        </div>
                        <span className="tracking-tight">Clinical Notes (Optional)</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 pb-6 px-6">
                    <Textarea
                        placeholder="Additional observations, dietary advice, next steps..."
                        className="min-h-[140px] border-slate-300 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:border-amber-500 resize-y text-base font-medium text-slate-900 placeholder:text-slate-400 bg-white shadow-sm"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-6">
                <Button
                    type="button"
                    className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 shadow-xl shadow-teal-600/30 px-10 py-6 font-bold text-base tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98]"
                    disabled={isSubmitting}
                    onClick={handleSave}
                >
                    {isSubmitting ? "Saving..." : "Save Prescription"}
                </Button>
            </div>
        </div>
    );
}
