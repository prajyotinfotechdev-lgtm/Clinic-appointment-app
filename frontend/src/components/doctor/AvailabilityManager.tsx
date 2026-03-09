"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, X, Plus, Trash2, Home, Clock } from "lucide-react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";

interface Availability {
    id: string;
    type: 'HOLIDAY' | 'UNAVAILABLE';
    startDate: string;
    endDate?: string;
    startTime?: string;
    endTime?: string;
    reason?: string;
}

export function AvailabilityManager() {
    useAuth();
    const [availabilities, setAvailabilities] = useState<Availability[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        type: 'HOLIDAY' as 'HOLIDAY' | 'UNAVAILABLE',
        startDate: format(new Date(), 'yyyy-MM-dd'),
        endDate: '',
        startTime: '',
        endTime: '',
        reason: ''
    });

    const fetchAvailability = async () => {
        try {
            const res = await api.get<{ data: Availability[] }>('/doctor-availability');
            setAvailabilities(res.data);
        } catch (err) {
            console.error("Failed to fetch availability", err);
        }
    };

    useEffect(() => {
        fetchAvailability();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/doctor-availability', formData);
            setShowForm(false);
            setFormData({
                type: 'HOLIDAY',
                startDate: format(new Date(), 'yyyy-MM-dd'),
                endDate: '',
                startTime: '',
                endTime: '',
                reason: ''
            });
            fetchAvailability();
        } catch (err) {
            console.error("Failed to add availability", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await api.delete(`/doctor-availability/${id}`);
            fetchAvailability();
        } catch (err) {
            console.error("Failed to delete availability", err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h2 className="text-xl font-bold text-slate-900">Holiday & Absence Management</h2>
                    <p className="text-slate-500 text-sm font-medium">Mark your holidays or specific unavailable time slots.</p>
                </div>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-900/10"
                >
                    {showForm ? <><X className="w-4 h-4 mr-2" /> Close Form</> : <><Plus className="w-4 h-4 mr-2" /> Add Absence</>}
                </Button>
            </div>

            {showForm && (
                <Card className="border-2 border-teal-100 shadow-xl shadow-teal-900/5 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <CardHeader className="bg-teal-50/50 pb-4">
                        <CardTitle className="text-lg font-bold text-teal-950 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-teal-600" /> New Absence Record
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Type of Absence</label>
                                    <select
                                        className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 transition-all font-medium text-slate-900 outline-none bg-slate-50/50"
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                    >
                                        <option value="HOLIDAY">Full Holiday (Disabled Whole Day)</option>
                                        <option value="UNAVAILABLE">Unavailable Period (Specific Hours)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Reason (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 transition-all font-medium text-slate-900 outline-none bg-slate-50/50"
                                        placeholder="e.g. Medical Conference"
                                        value={formData.reason}
                                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Start Date</label>
                                    <input
                                        type="date"
                                        className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 transition-all font-medium text-slate-900 outline-none bg-slate-50/50"
                                        value={formData.startDate}
                                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">End Date (Optional for Range)</label>
                                    <input
                                        type="date"
                                        className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 transition-all font-medium text-slate-900 outline-none bg-slate-50/50"
                                        value={formData.endDate}
                                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                        min={formData.startDate}
                                    />
                                </div>

                                {formData.type === 'UNAVAILABLE' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">Start Time</label>
                                            <input
                                                type="time"
                                                className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 transition-all font-medium text-slate-900 outline-none bg-slate-50/50"
                                                value={formData.startTime}
                                                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-slate-700">End Time</label>
                                            <input
                                                type="time"
                                                className="w-full h-11 px-4 rounded-xl border-2 border-slate-100 focus:border-teal-500 transition-all font-medium text-slate-900 outline-none bg-slate-50/50"
                                                value={formData.endTime}
                                                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold h-12 rounded-xl text-lg shadow-lg shadow-teal-900/10 active:scale-95 transition-all"
                            >
                                Save Absence Record
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availabilities.length === 0 ? (
                    <div className="md:col-span-2 text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <CalendarIcon className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-bold">No absence records found.</p>
                        <p className="text-slate-400 text-sm">Add your upcoming holidays or meetings.</p>
                    </div>
                ) : (
                    availabilities.map((avail) => (
                        <Card key={avail.id} className="border-slate-100 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                            <div className="p-5 flex items-start justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${avail.type === 'HOLIDAY' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                        {avail.type === 'HOLIDAY' ? <Home className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <Badge className={
                                                avail.type === 'HOLIDAY'
                                                    ? "bg-red-100 text-red-700 border-red-200"
                                                    : "bg-amber-100 text-amber-700 border-amber-200"
                                            }>
                                                {avail.type}
                                            </Badge>
                                            <span className="text-slate-900 font-extrabold tracking-tight">
                                                {format(new Date(avail.startDate), 'MMM dd, yyyy')}
                                                {avail.endDate && ` — ${format(new Date(avail.endDate), 'MMM dd, yyyy')}`}
                                            </span>
                                        </div>
                                        {avail.type === 'UNAVAILABLE' && avail.startTime && (
                                            <p className="text-slate-600 font-bold text-sm flex items-center gap-1.5">
                                                {avail.startTime} to {avail.endTime}
                                            </p>
                                        )}
                                        {avail.reason && (
                                            <p className="text-slate-500 font-medium text-sm italic">"{avail.reason}"</p>
                                        )}
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(avail.id)}
                                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
