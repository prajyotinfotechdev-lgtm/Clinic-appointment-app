"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLINIC } from "@/lib/clinic-data";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

export function GlobalNavigation({ items, title }: { items: NavigationItem[], title: string }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
        } finally {
            setIsLoggingOut(false);
        }
    };

    const isActive = (href: string) => {
        return pathname === href || (pathname.startsWith(href) && href.split('/').length > 2);
    };

    const fallbackName = user?.name && user.name.trim().length > 0
        ? user.name.trim()
        : (user?.email?.split("@")[0] || "User");
    const userInitial = fallbackName.charAt(0).toUpperCase();
    const displayName = user?.role === "DOCTOR"
        ? ` ${fallbackName}`
        : fallbackName;

    // Short labels for mobile bottom nav
    const getMobileLabel = (name: string) => {
        const map: Record<string, string> = {
            "Book Appointment": "Book",
            "My Appointments": "Visits",
            "Today's Queue": "Queue",
            "7-Day Overview": "Overview",
            "Patient History": "History",
            "Availability": "Schedule",
        };
        return map[name] || name.split(" ")[0];
    };

    return (
        <>
            {/* ═══════════════════════════════════════════════════════
                DESKTOP SIDEBAR — Linear / Stripe inspired
               ═══════════════════════════════════════════════════════ */}
            <aside
                suppressHydrationWarning
                className="hidden md:flex flex-col fixed inset-y-0 left-0 w-[232px] bg-white/80 backdrop-blur-xl border-r border-slate-200/60 z-50"
            >
                {/* ── Brand ── */}
                <div className="h-14 flex items-center px-4 shrink-0">
                    <div className="flex items-center gap-2.5">
                        <Image src="/logo.png" alt="Logo" width={28} height={28} className="rounded-lg object-contain bg-white border border-slate-200 shadow-sm" />
                        <div className="min-w-0">
                            <span className="font-extrabold text-[13px] text-slate-900 tracking-tight block leading-none truncate">
                                Star Ortho & Women Care
                            </span>
                            <span className="text-[10px] font-medium text-slate-400 block mt-0.5 truncate">
                                {CLINIC.brandName}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Navigation Links ── */}
                <nav className="flex-1 px-2.5 pt-2 pb-3 space-y-0.5 overflow-y-auto scrollbar-none">
                    <p className="px-2.5 pt-2 pb-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{title}</p>
                    {items.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg text-[13px] font-semibold transition-all duration-150 group relative",
                                    active
                                        ? "bg-teal-50/80 text-teal-700"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                )}
                            >
                                {active && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 bg-teal-600 rounded-r-full" />
                                )}
                                <item.icon
                                    className={cn(
                                        "h-[16px] w-[16px] shrink-0 transition-colors duration-150",
                                        active ? "text-teal-600" : "text-slate-400 group-hover:text-slate-500"
                                    )}
                                    strokeWidth={active ? 2.5 : 2}
                                />
                                <span className="truncate">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* ── User + Logout ── */}
                <div className="p-2.5 border-t border-slate-100 shrink-0">
                    <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors group">
                        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-bold text-white">{userInitial}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[12px] font-semibold text-slate-800 truncate leading-none">{displayName}</p>
                            <p className="text-[10px] text-slate-400 truncate mt-0.5">{user?.email}</p>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    className="h-6 w-6 rounded-md flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all shrink-0"
                                    disabled={isLoggingOut}
                                    title="Sign Out"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="max-w-sm p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
                                <div className="bg-gradient-to-br from-red-50 via-white to-white p-7">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-5 mx-auto">
                                        <LogOut className="h-6 w-6 text-red-600" />
                                    </div>
                                    <AlertDialogHeader className="text-center">
                                        <AlertDialogTitle className="text-xl font-bold text-slate-900">Sign out?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-slate-500 text-sm mt-1.5">
                                            You&apos;ll need your credentials to log back in.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className="flex gap-3 mt-6">
                                        <AlertDialogCancel className="flex-1 h-10 border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-all">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white border-transparent font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]"
                                        >
                                            {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Out"}
                                        </AlertDialogAction>
                                    </div>
                                </div>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </aside>

            {/* ═══════════════════════════════════════════════════════
                MOBILE TOP BAR — Clean, native-app feel
               ═══════════════════════════════════════════════════════ */}
            <header
                suppressHydrationWarning
                className="fixed top-0 z-40 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/50 md:hidden"
            >
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-2.5 min-w-0">
                        <div className="bg-teal-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[11px] shadow-sm shrink-0">
                            CF
                        </div>
                        <div className="min-w-0">
                            <span className="font-bold text-[15px] text-slate-900 tracking-tight leading-none block truncate">
                                {title}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    className="h-8 w-8 rounded-lg bg-slate-100/80 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                                    disabled={isLoggingOut}
                                >
                                    {isLoggingOut ? (
                                        <Loader2 className="h-4 w-4 animate-spin text-red-500" />
                                    ) : (
                                        <LogOut className="h-4 w-4" />
                                    )}
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[92%] max-w-sm p-0 overflow-hidden border-none shadow-2xl rounded-2xl mx-auto">
                                <div className="bg-gradient-to-br from-red-50 via-white to-white p-7">
                                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-5 mx-auto">
                                        <LogOut className="h-6 w-6 text-red-600" />
                                    </div>
                                    <AlertDialogHeader className="text-center">
                                        <AlertDialogTitle className="text-xl font-bold text-slate-900">Sign out?</AlertDialogTitle>
                                        <AlertDialogDescription className="text-slate-500 text-sm mt-1.5">
                                            You&apos;ll need your credentials to log back in.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div className="flex gap-3 mt-6">
                                        <AlertDialogCancel className="flex-1 h-10 border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-all">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleLogout}
                                            disabled={isLoggingOut}
                                            className="flex-1 h-10 bg-red-600 hover:bg-red-700 text-white border-transparent font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]"
                                        >
                                            {isLoggingOut ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Out"}
                                        </AlertDialogAction>
                                    </div>
                                </div>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </div>
            </header>

            {/* ═══════════════════════════════════════════════════════
                MOBILE BOTTOM TAB BAR — Native iOS/Android feel
               ═══════════════════════════════════════════════════════ */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-200/60 pb-safe">
                <div className="flex h-[56px] items-center justify-around px-1">
                    {items.slice(0, 5).map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 rounded-xl transition-all duration-200",
                                    active ? "text-teal-600" : "text-slate-400 active:text-slate-600"
                                )}
                            >
                                {active && (
                                    <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-teal-600 rounded-b-full" />
                                )}
                                <item.icon
                                    className={cn(
                                        "h-[20px] w-[20px] transition-all duration-200",
                                        active && "scale-105"
                                    )}
                                    strokeWidth={active ? 2.5 : 1.8}
                                />
                                <span
                                    className={cn(
                                        "text-[10px] leading-none transition-all duration-200",
                                        active ? "font-bold text-teal-700" : "font-medium"
                                    )}
                                >
                                    {getMobileLabel(item.name)}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
