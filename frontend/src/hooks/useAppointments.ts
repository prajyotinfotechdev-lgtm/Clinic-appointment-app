"use client";

import { api } from "@/lib/api";
import useSWR from "swr";

export interface Appointment {
    id: string;
    appointmentDate: string;
    timeSlot: string;
    status: string;
    createdBy: string;
    patient: { id: string; name: string; phone?: string };
    doctor: { id: string; name: string; specialization?: string };
    symptoms?: string | null;
    weight?: number | null;
    bloodPressure?: string | null;
    temperature?: number | null;
}

interface UseAppointmentsOptions {
    doctorId?: string;
    patientId?: string;
    status?: string;
    date?: string;
}

const fetcher = async (url: string) => {
    const res = await api.get<{ data: Appointment[] }>(url);
    return res.data;
};

export function useAppointments(options: UseAppointmentsOptions = {}) {
    const params = new URLSearchParams();
    if (options.doctorId) params.set("doctorId", options.doctorId);
    if (options.patientId) params.set("patientId", options.patientId);
    if (options.status) params.set("status", options.status);
    if (options.date) params.set("date", options.date);

    const query = params.toString() ? `?${params.toString()}` : "";
    const endpoint = `/appointments${query}`;

    const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher, {
        revalidateOnFocus: true,
        fallbackData: []
    });

    return {
        appointments: data || [],
        isLoading,
        error: error ? error.message : null,
        refetch: mutate
    };
}
