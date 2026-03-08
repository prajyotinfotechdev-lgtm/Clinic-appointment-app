"use client";

import { RoleGuard } from "@/components/auth/RoleGuard";
import { GlobalNavigation } from "@/components/layout/GlobalNavigation";
import { receptionistNavigation } from "@/components/layout/nav-data";

export default function ReceptionistLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGuard allowedRoles={["RECEPTIONIST"]}>
            <div className="min-h-screen bg-slate-50 flex font-sans" suppressHydrationWarning>
                <GlobalNavigation items={receptionistNavigation} title="Front Desk" />
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
