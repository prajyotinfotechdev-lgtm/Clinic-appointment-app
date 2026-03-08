"use client";

import { use } from "react";
import PrescriptionWriter from "@/app/(doctor)/doctor/prescriptions/page";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ConsultationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    return (
        <div className="space-y-4 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            <Link href="/doctor/queue" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                Back to Queue
            </Link>

            {/* We just drop in the PrescriptionWriter as it naturally fetches the active consultation */}
            <PrescriptionWriter />
        </div>
    );
}
