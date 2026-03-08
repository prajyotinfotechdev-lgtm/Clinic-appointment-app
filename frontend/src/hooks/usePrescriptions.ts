import useSWR from 'swr';
import { api } from '@/lib/api';

interface Medication {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
}

interface Prescription {
    id: string;
    diagnosis: string | null;
    medicines: Medication[];
    notes: string | null;
    createdAt: string;
    doctor: {
        name: string;
        specialization: string;
    };
    appointment: {
        appointmentDate: string;
        timeSlot: string;
    };
}

const fetcher = (url: string) => api.get(url).then((res: any) => res.data);

export function usePrescriptions(patientId?: string) {
    const { data, error, isLoading, mutate } = useSWR<Prescription[]>(
        patientId ? `/prescriptions/patient/${patientId}` : null,
        fetcher
    );

    return {
        prescriptions: data || [],
        isLoading,
        isError: error,
        refetch: mutate
    };
}
