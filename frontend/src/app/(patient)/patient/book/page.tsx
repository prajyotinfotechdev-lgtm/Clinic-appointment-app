"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, startOfDay, isBefore, isSameDay, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import { CheckCircle2, Calendar as CalendarIcon, Clock, ArrowRight, Stethoscope, GraduationCap } from "lucide-react";
import { mutate } from "swr";
import { cn, formatTime12Hour } from "@/lib/utils";
import { ButtonSpinner } from "@/components/ui/clinic-loader";

interface Doctor {
    id: string;
    name: string;
    specialization: string;
}

const getQualifications = (name: string) => {
    if (name.toLowerCase().includes("rahul")) return "MBBS, DNB, D.ORTHO, FIJR";
    if (name.toLowerCase().includes("aparna")) return "MBBS, MS OBGY, Laparoscopic Surgeon";
    return "Medical Professional";
};

export default function BookAppointment() {
    const { user } = useAuth();
    const router = useRouter();

    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [doctorSettings, setDoctorSettings] = useState<any>(null);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<string>("");
    const [doctorHolidays, setDoctorHolidays] = useState<any[]>([]);
    const [holidayMessage, setHolidayMessage] = useState<string>("");

    const [isBooking, setIsBooking] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    useEffect(() => {
        api.get<{ data: Doctor[] }>("/doctors")
            .then(res => setDoctors(res.data))
            .catch(err => console.error("Failed to fetch doctors", err));
    }, []);

    useEffect(() => {
        if (selectedDoctor) {
            api.get<{ data: any }>(`/clinic-settings/doctor/${selectedDoctor.id}`)
                .then(res => setDoctorSettings(res.data))
                .catch(err => console.error("Failed to fetch doctor settings", err));
            
            // Fetch doctor holidays
            api.get<{ data: any[] }>(`/doctor-availability?doctorId=${selectedDoctor.id}`)
                .then(res => {
                    const holidays = res.data.filter((a: any) => a.type === 'HOLIDAY');
                    setDoctorHolidays(holidays);
                })
                .catch(err => console.error("Failed to fetch doctor holidays", err));
        } else {
            setDoctorSettings(null);
            setDoctorHolidays([]);
        }
    }, [selectedDoctor]);

    useEffect(() => {
        if (!selectedDoctor || !selectedDate) {
            setAvailableSlots([]);
            return;
        }

        // Using a safer manual string construction to prevent timezone shifting on mobile browsers
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        api.get<{ data: string[] }>(`/appointments/slots?doctorId=${selectedDoctor.id}&date=${dateStr}`)
            .then(res => {
                setAvailableSlots(res.data);
                setSelectedSlot("");
            })
            .catch(err => {
                console.error("Failed to fetch slots", err);
                setAvailableSlots([]);
            });
    }, [selectedDoctor, selectedDate]);

    const handleBook = async () => {
        if (!selectedDoctor || !selectedDate || !selectedSlot) return;

        try {
            setIsBooking(true);

            // Safer manual string construction
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            const dateStr = `${year}-${month}-${day}`;

            await api.post("/appointments", {
                patientId: user?.id,
                doctorId: selectedDoctor.id,
                appointmentDate: dateStr,
                timeSlot: selectedSlot,
                status: "BOOKED"
            });

            setBookingSuccess(true);

            // Invalidate cache
            mutate(key => typeof key === 'string' && key.startsWith('/appointments'));

            setTimeout(() => {
                router.push("/patient/dashboard");
            }, 2500);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Failed to book appointment");
            setIsBooking(false);
        }
    };

    const today = startOfDay(new Date());
    const maxDate = addDays(today, 14);

    // Check if a date is a holiday
    const isHoliday = (date: Date) => {
        return doctorHolidays.some(holiday => {
            const start = startOfDay(parseISO(holiday.startDate));
            const end = holiday.endDate ? startOfDay(parseISO(holiday.endDate)) : start;
            const checkDate = startOfDay(date);
            return checkDate >= start && checkDate <= end;
        });
    };

    // Handle date click
    const handleDateSelect = (date: Date | undefined) => {
        if (!date) return;
        
        if (isHoliday(date)) {
            setHolidayMessage(`Dr. ${selectedDoctor?.name} is on holiday on ${format(date, "MMMM do, yyyy")}`);
            setTimeout(() => setHolidayMessage(""), 3000);
            return;
        }
        
        setSelectedDate(date);
        setSelectedSlot("");
        setHolidayMessage("");
    };

    if (bookingSuccess) {
        return (
            <div className="max-w-md mx-auto mt-24 px-4">
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] text-center py-12 px-6">
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                        Appointment with <strong className="text-slate-700">Dr. {selectedDoctor?.name}</strong> on{" "}
                        <strong className="text-slate-700">{selectedDate && format(selectedDate, "MMMM do, yyyy")}</strong> at{" "}
                        <strong className="text-slate-700">{formatTime12Hour(selectedSlot)}</strong>.
                    </p>
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 text-teal-600 text-xs font-semibold bg-teal-50 px-4 py-2 rounded-lg">
                            <div className="w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                            Redirecting...
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 pb-32 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Book Appointment</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Follow the steps below to schedule your visit</p>
            </div>

            {/* ── Step 1: Doctor ── */}
            <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors", selectedDoctor ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500")}>1</div>
                    <h2 className="text-sm font-semibold text-slate-900">Select Doctor</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                    {doctors.map(doc => (
                        <button
                            key={doc.id}
                            className={cn(
                                "rounded-xl border p-4 text-left transition-all",
                                selectedDoctor?.id === doc.id
                                    ? "border-teal-500 bg-teal-50/60 shadow-sm"
                                    : "border-slate-200/60 bg-white hover:border-teal-200 shadow-[var(--shadow-card)]"
                            )}
                            onClick={() => {
                                setSelectedDoctor(doc);
                                setSelectedDate(undefined);
                                setSelectedSlot("");
                            }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors", selectedDoctor?.id === doc.id ? "bg-teal-600 text-white" : "bg-slate-50 text-slate-400")}>
                                        <Stethoscope className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm text-slate-800">{doc.name}</h3>
                                        <p className="text-[10px] text-teal-600 font-medium">{doc.specialization}</p>
                                    </div>
                                </div>
                                {selectedDoctor?.id === doc.id && (
                                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                                )}
                            </div>
                            <div className="pt-2.5 border-t border-slate-100 flex items-start gap-1.5 text-slate-400 text-[10px] font-medium">
                                <GraduationCap className="w-3 h-3 shrink-0 mt-0.5" />
                                <span>{getQualifications(doc.name)}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Step 2: Date ── */}
            <div className={cn("space-y-3 transition-all duration-500", selectedDoctor ? "opacity-100" : "opacity-40 pointer-events-none")}>
                <div className="flex items-center gap-2.5">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors", selectedDate ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500")}>2</div>
                    <h2 className="text-sm font-semibold text-slate-900">Select Date</h2>
                </div>

                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        <div className="p-4 md:p-6 flex justify-center bg-white overflow-x-auto">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={handleDateSelect}
                                modifiers={{
                                    holiday: (date) => isHoliday(date)
                                }}
                                disabled={(d) => {
                                    const dayStart = startOfDay(d);
                                    if (isBefore(dayStart, today) || dayStart > maxDate) return true;
                                    if (!doctorSettings || !doctorSettings.workingDays) return false;

                                    const dayOfWeek = d.getDay() === 0 ? 7 : d.getDay();
                                    let rawWorkingDays: unknown[] = [1, 2, 3, 4, 5, 6, 7];
                                    if (Array.isArray(doctorSettings.workingDays)) {
                                        rawWorkingDays = doctorSettings.workingDays;
                                    } else if (typeof doctorSettings.workingDays === "string") {
                                        try {
                                            const parsed = JSON.parse(doctorSettings.workingDays);
                                            if (Array.isArray(parsed)) rawWorkingDays = parsed;
                                        } catch {
                                            // keep defaults
                                        }
                                    }
                                    const workingDays = rawWorkingDays
                                        .map((x: unknown) => Number(x))
                                        .filter((x: number) => Number.isFinite(x));

                                    return !workingDays.includes(dayOfWeek);
                                }}
                                className="p-0 w-full max-w-full sm:max-w-sm"
                                classNames={{
                                    months: "space-y-4 w-full",
                                    head_row: "flex w-full",
                                    head_cell: "text-slate-400 font-semibold text-[10px] uppercase flex-1 py-2 text-center",
                                    row: "flex w-full mt-2",
                                    cell: "flex-1 text-center text-sm p-0 flex items-center justify-center",
                                    day: "w-8 h-8 md:w-9 md:h-9 rounded-lg font-medium text-xs hover:bg-slate-100 focus:bg-teal-50 text-slate-700 transition-colors mx-auto",
                                    day_selected: "bg-teal-600 text-white hover:bg-teal-700 font-bold",
                                    day_today: "bg-teal-50 text-teal-700 font-bold",
                                    day_disabled: "text-slate-300 opacity-40 cursor-not-allowed hover:bg-transparent",
                                }}
                                modifiersClassNames={{
                                    holiday: "bg-red-500/20 text-red-700 hover:bg-red-500/30 font-semibold rounded-full shadow-[0_0_0_1px_rgba(239,68,68,0.4)]"
                                }}
                            />
                        </div>
                        <div className="p-4 md:p-6 bg-slate-50/50 flex flex-col justify-center min-w-[180px]">
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                <CalendarIcon className="w-3 h-3" /> Selected
                            </p>
                            {selectedDate ? (
                                <>
                                    <p className="text-lg font-bold text-slate-900">{format(selectedDate, "MMM do")}</p>
                                    <p className="text-xs text-slate-500 font-medium">{format(selectedDate, "yyyy, EEEE")}</p>
                                </>
                            ) : (
                                <p className="text-xs text-slate-400 font-medium">Pick a date to view slots</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Holiday Message ── */}
            {holidayMessage && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 animate-fade-in">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0">
                        <CalendarIcon className="w-4 h-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-red-900">{holidayMessage}</p>
                        <p className="text-xs text-red-600 mt-0.5">Please select a different date to book an appointment.</p>
                    </div>
                </div>
            )}

            {/* ── Step 3: Time Slot ── */}
            <div className={cn("space-y-3 transition-all duration-500", selectedDate ? "opacity-100" : "opacity-40 pointer-events-none")}>
                <div className="flex items-center gap-2.5">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors", selectedSlot ? "bg-teal-600 text-white" : "bg-slate-100 text-slate-500")}>3</div>
                    <h2 className="text-sm font-semibold text-slate-900">Select Time Slot</h2>
                </div>

                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] p-4">
                    {availableSlots.length === 0 ? (
                        <div className="text-center py-8">
                            <Clock className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                            <p className="text-sm font-semibold text-slate-600">No Slots Available</p>
                            <p className="text-xs text-slate-400 mt-0.5">Dr. {selectedDoctor?.name} is fully booked on this date.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5">
                            {availableSlots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={() => setSelectedSlot(slot)}
                                    className={cn(
                                        "py-2.5 px-1.5 rounded-lg text-xs font-semibold transition-all border",
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
            </div>

            {/* ── Confirmation Bar ── */}
            <div className={cn(
                "fixed bottom-[70px] md:bottom-0 left-0 right-0 p-3 md:p-4 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 transition-all duration-500",
                selectedSlot ? "translate-y-0" : "translate-y-[150%]"
            )}>
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 bg-teal-50 rounded-lg flex items-center justify-center shrink-0">
                            <Clock className="w-4 h-4 text-teal-600" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">Ready to book</p>
                            <p className="text-sm font-bold text-slate-900 truncate">
                                {selectedDate && format(selectedDate, "MMM do")} at {selectedSlot && formatTime12Hour(selectedSlot)}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleBook}
                        disabled={isBooking || !selectedSlot}
                        className="shrink-0 bg-teal-600 text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-700 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center gap-2"
                    >
                        {isBooking ? (
                            <>
                                <ButtonSpinner />
                                Booking...
                            </>
                        ) : (
                            <>
                                Confirm
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </div>

        </div>
    );
}
