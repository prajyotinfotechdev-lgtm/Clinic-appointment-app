"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getDashboardPath, UserRole } from "@/lib/auth";

interface RoleGuardProps {
    children: React.ReactNode;
    allowedRoles: UserRole[];
}

export function RoleGuard({ children, allowedRoles }: RoleGuardProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.replace("/login");
            } else if (!allowedRoles.includes(user.role)) {
                router.replace(getDashboardPath(user));
            }
        }
    }, [user, isLoading, allowedRoles, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[hsl(210,40%,95%)]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-10 w-10 rounded-full border-4 border-[hsl(190,95%,15%)] border-t-transparent animate-spin"></div>
                    <p className="text-sm font-semibold text-[hsl(215,15%,55%)]">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user || !allowedRoles.includes(user.role)) {
        return null;
    }

    return <>{children}</>;
}
