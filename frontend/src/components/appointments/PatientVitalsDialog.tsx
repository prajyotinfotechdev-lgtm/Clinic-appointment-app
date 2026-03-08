"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Activity, Thermometer, Weight, FileText, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface PatientVitalsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    appointmentId: string;
    patientName: string;
    existingVitals?: {
        symptoms?: string | null;
        weight?: number | null;
        bloodPressure?: string | null;
        temperature?: number | null;
    };
    onVitalsSaved: () => void;
}

export function PatientVitalsDialog({ isOpen, onClose, appointmentId, patientName, existingVitals, onVitalsSaved }: PatientVitalsDialogProps) {
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [symptoms, setSymptoms] = useState(existingVitals?.symptoms || "");
    const [weight, setWeight] = useState(existingVitals?.weight?.toString() || "");
    const [bloodPressure, setBloodPressure] = useState(existingVitals?.bloodPressure || "");
    const [temperature, setTemperature] = useState(existingVitals?.temperature?.toString() || "");

    const handleSave = async () => {
        try {
            setIsSaving(true);
            await api.patch(`/appointments/${appointmentId}/vitals`, {
                symptoms: symptoms || null,
                weight: weight ? parseFloat(weight) : null,
                bloodPressure: bloodPressure || null,
                temperature: temperature ? parseFloat(temperature) : null
            });
            onVitalsSaved();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to save patient vitals");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-extrabold text-teal-950 flex items-center gap-2">
                        <Activity className="h-5 w-5 text-teal-600" /> Pre-Consultation Vitals
                    </DialogTitle>
                    <DialogDescription className="font-medium">
                        Record initial metrics and symptoms for <span className="font-bold text-slate-800">{patientName}</span>.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Weight className="h-3.5 w-3.5" /> Weight (kg)
                                </label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g. 70.5"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="font-medium text-slate-900 border-slate-200 focus:ring-teal-600"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                    <Thermometer className="h-3.5 w-3.5" /> Temp (°F)
                                </label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    placeholder="e.g. 98.6"
                                    value={temperature}
                                    onChange={(e) => setTemperature(e.target.value)}
                                    className="font-medium text-slate-900 border-slate-200 focus:ring-teal-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <Activity className="h-3.5 w-3.5" /> Blood Pressure
                            </label>
                            <Input
                                type="text"
                                placeholder="e.g. 120/80"
                                value={bloodPressure}
                                onChange={(e) => setBloodPressure(e.target.value)}
                                className="font-medium text-slate-900 border-slate-200 focus:ring-teal-600"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                                <FileText className="h-3.5 w-3.5" /> Presenting Symptoms
                            </label>
                            <Textarea
                                placeholder="Describe chief complaints and symptoms here..."
                                value={symptoms}
                                onChange={(e) => setSymptoms(e.target.value)}
                                className="min-h-[100px] font-medium text-slate-900 border-slate-200 focus:ring-teal-600 resize-none"
                            />
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-between border-t border-slate-100 pt-4">
                    <Button variant="ghost" onClick={onClose} className="font-bold text-slate-500 hover:text-slate-900">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 shadow-md shadow-teal-900/10"
                    >
                        {isSaving ? (
                            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                        ) : "Save Vitals"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
