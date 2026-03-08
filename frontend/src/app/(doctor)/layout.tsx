"use client";

import { RoleGuard } from "@/components/auth/RoleGuard";
import { GlobalNavigation } from "@/components/layout/GlobalNavigation";
import { doctorNavigation } from "@/components/layout/nav-data";

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["DOCTOR"]}>
            <div className="min-h-screen bg-slate-50 flex font-sans" suppressHydrationWarning>
                <GlobalNavigation items={doctorNavigation} title="Doctor Hub" />
                <div className="flex-1 flex flex-col min-w-0 md:ml-60">
                    <div className="h-16 md:hidden shrink-0"></div>
                    <main className="flex-1 w-full max-w-7xl mx-auto p-4 pb-28 md:p-8">
                        {children}
                    </main>
                </div>
            </div>
        </RoleGuard>
    );
}
