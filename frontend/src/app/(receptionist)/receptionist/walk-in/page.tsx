"use client";

import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { UserSearch, Clock, Search, CalendarDays, UserCheck, Stethoscope, Zap } from "lucide-react";
import { cn, formatTime12Hour } from "@/lib/utils";

interface Doctor {
    id: string;
    name: string;
    specialization?: string;
}

export default function WalkInBooking() {
    const [phone, setPhone] = useState("");
    const [patientName, setPatientName] = useState("");
    const [patientId, setPatientId] = useState<string | null>(null);
    const [searching, setSearching] = useState(false);

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isBooking, setIsBooking] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [regName, setRegName] = useState("");
    const [regEmail, setRegEmail] = useState("");

    const router = useRouter();

    useEffect(() => {
        api.get<{ data: Doctor[] }>("/doctors").then(res => setDoctors(res.data));
    }, []);

    const handleSearchPatient = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!phone) return;
        try {
            setSearching(true);
            const res = await api.get<{ data: { id: string; name: string }[] }>(`/patients/search?q=${phone}`);
            if (res.data.length > 0) {
                setPatientId(res.data[0].id);
                setPatientName(res.data[0].name);
            } else {
                setPatientId(null);
                alert("Patient not found. Please register as new.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSearching(false);
        }
    };

    const [autoSelect, setAutoSelect] = useState(false);

    useEffect(() => {
        if (selectedDoctor && selectedDate) {
            setSelectedSlot("");
            api.get<{ data: string[] }>(`/appointments/slots?doctorId=${selectedDoctor}&date=${selectedDate}`)
                .then(res => {
                    setAvailableSlots(res.data);
                    if (res.data.length > 0 && autoSelect) {
                        setSelectedSlot(res.data[0]);
                    }
                });
        } else {
            setAvailableSlots([]);
            setSelectedSlot("");
        }
    }, [selectedDoctor, selectedDate, autoSelect]);

    const handleAutoQueue = async () => {
        if (!selectedDoctor) return;
        try {
            setSearching(true);
            const res = await api.get<{ data: { date: string, timeSlot: string } }>(`/appointments/next-available?doctorId=${selectedDoctor}`);
            setSelectedDate(res.data.date);
            setSelectedSlot(res.data.timeSlot);
            setAutoSelect(true);
        } catch {
            alert("No slots available at the moment");
        } finally {
            setSearching(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsRegistering(true);
            const res = await api.post<{ data: { id: string, name: string } }>("/patients", {
                name: regName,
                phone: phone,
                email: regEmail
            });
            setPatientId(res.data.id);
            setPatientName(res.data.name);
            alert("Patient registered successfully!");
        } catch {
            alert("Failed to register patient");
        } finally {
            setIsRegistering(false);
        }
    };

    const handleBook = async () => {
        try {
            setIsBooking(true);
            await api.post("/appointments", {
                patientId,
                doctorId: selectedDoctor,
                appointmentDate: selectedDate,
                timeSlot: selectedSlot
            });
            router.push("/receptionist/queue");
        } catch {
            alert("Failed to book appointment");
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Walk-in Registration</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Find or register a patient, then assign a slot</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5">
                {/* ── Left: Patient Lookup ── */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                            <UserSearch className="h-4 w-4 text-teal-600" />
                            <h2 className="text-sm font-semibold text-slate-900">Patient Lookup</h2>
                        </div>
                        <div className="p-4 space-y-4">
                            <form onSubmit={handleSearchPatient} className="flex gap-2">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                    <Input
                                        placeholder="Phone number"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="pl-9 h-9 bg-white border-slate-200/60 text-sm"
                                        type="tel"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={searching || !phone}
                                    className="bg-teal-600 hover:bg-teal-700 h-9 px-4 text-xs font-semibold shadow-sm"
                                >
                                    {searching ? "..." : "Search"}
                                </Button>
                            </form>

                            {patientId ? (
                                <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-100 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                        <UserCheck className="h-4 w-4 text-emerald-600" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-slate-800 text-sm truncate">{patientName}</p>
                                        <p className="text-[10px] text-emerald-600 font-medium">ID: {patientId.substring(0, 8)}</p>
                                    </div>
                                </div>
                            ) : phone && !searching ? (
                                <div className="p-4 bg-slate-50 rounded-lg border border-dashed border-slate-200 space-y-3">
                                    <p className="text-xs text-slate-500 font-medium text-center">Patient not found — register below</p>
                                    <form onSubmit={handleRegister} className="space-y-2.5">
                                        <Input placeholder="Full Name" value={regName} onChange={e => setRegName(e.target.value)} required className="bg-white h-9 text-sm" />
                                        <Input placeholder="Email (Optional)" type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="bg-white h-9 text-sm" />
                                        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 h-9 font-semibold text-xs" disabled={isRegistering}>
                                            {isRegistering ? "Registering..." : "Register Patient"}
                                        </Button>
                                    </form>
                                </div>
                            ) : (
                                <div className="p-5 bg-slate-50 rounded-lg border border-dashed border-slate-200 text-center">
                                    <p className="text-xs text-slate-400 font-medium">Enter phone to verify or register</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Right: Doctor & Slot Selection ── */}
                <div className="lg:col-span-3 space-y-4">
                    <div className={cn(
                        "bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden transition-all duration-300",
                        !patientId && "opacity-50 pointer-events-none"
                    )}>
                        <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-teal-600" />
                            <h2 className="text-sm font-semibold text-slate-900">Queue Assignment</h2>
                        </div>
                        <div className="p-4 space-y-5">
                            {/* Date */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Date</label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="h-9 w-full px-3 rounded-lg border border-slate-200/60 bg-white text-slate-800 text-sm font-medium focus:ring-1 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                                />
                            </div>

                            {/* Doctor */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Doctor</label>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {doctors.map(doc => (
                                        <button
                                            key={doc.id}
                                            onClick={() => setSelectedDoctor(doc.id)}
                                            className={cn(
                                                "p-3 rounded-lg border text-left transition-all flex items-center gap-3",
                                                selectedDoctor === doc.id
                                                    ? "border-teal-500 bg-teal-50/60 shadow-sm"
                                                    : "border-slate-200/60 hover:border-teal-200 bg-white"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                                                selectedDoctor === doc.id ? "bg-teal-600 text-white" : "bg-slate-50 text-slate-400"
                                            )}>
                                                <Stethoscope className="h-4 w-4" />
                                            </div>
                                            <p className={cn(
                                                "text-sm font-semibold truncate",
                                                selectedDoctor === doc.id ? "text-teal-800" : "text-slate-700"
                                            )}>
                                                Dr. {doc.name.split(' ')[0]}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Slots */}
                            {selectedDoctor && (
                                <div className="space-y-3 pt-3 border-t border-slate-100 animate-fade-in">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Available Slots</label>
                                        <button
                                            onClick={handleAutoQueue}
                                            className="text-[10px] font-semibold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1"
                                        >
                                            <Zap className="h-3 w-3" /> Auto-assign
                                        </button>
                                    </div>

                                    {availableSlots.length === 0 ? (
                                        <div className="p-5 text-center bg-slate-50 rounded-lg border border-slate-100">
                                            <p className="text-xs text-slate-400 font-medium">No slots available for this date</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1.5">
                                            {availableSlots.map(slot => (
                                                <button
                                                    key={slot}
                                                    onClick={() => {
                                                        setSelectedSlot(slot);
                                                        setAutoSelect(false);
                                                    }}
                                                    className={cn(
                                                        "py-2 px-1.5 text-xs font-semibold rounded-lg border transition-all",
                                                        selectedSlot === slot
                                                            ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                                                            : "bg-white text-slate-600 border-slate-200/60 hover:border-teal-300 hover:text-teal-700"
                                                    )}
                                                >
                                                    {formatTime12Hour(slot)}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Confirm */}
                    <button
                        className={cn(
                            "w-full h-12 font-semibold rounded-xl shadow-sm transition-all text-sm",
                            !patientId || !selectedSlot || isBooking
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-teal-600 hover:bg-teal-700 text-white active:scale-[0.98]"
                        )}
                        disabled={!patientId || !selectedSlot || isBooking}
                        onClick={handleBook}
                    >
                        {isBooking ? "Confirming..." : "Confirm & Add to Queue"}
                    </button>
                </div>
            </div>
        </div>
    );
}
