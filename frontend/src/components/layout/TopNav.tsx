"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Bell, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLINIC } from "@/lib/clinic-data";

interface NavigationItem {
    name: string;
    href: string;
    icon: React.ElementType;
}

export function TopNav({ items, title }: { items: NavigationItem[], title: string }) {
    const pathname = usePathname();
    const { logout, user } = useAuth();

    const isActive = (href: string) => {
        return pathname === href || (pathname.startsWith(href) && href.split('/').length > 2);
    };

    return (
        <>
            {/* ── Desktop / Tablet Top Bar ── */}
            <header suppressHydrationWarning className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-[hsl(214,30%,92%)] hidden md:block">
                <div className="flex h-20 items-center justify-between px-6 lg:px-8 max-w-7xl mx-auto">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-3">
                        <div className="bg-[hsl(190,95%,15%)] text-white w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-md shadow-[hsl(190,95%,15%)]/20">
                            C
                        </div>
                        <div>
                            <span className="font-extrabold text-xl text-[hsl(195,90%,12%)] tracking-tight block leading-tight">
                                {CLINIC.brandName}
                            </span>
                            <span className="text-xs font-medium text-[hsl(215,15%,55%)] flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {CLINIC.address.area}
                            </span>
                        </div>
                        <span className="ml-4 text-sm font-semibold text-[hsl(215,15%,55%)] hidden lg:block border-l pl-4 border-[hsl(214,30%,92%)]">
                            {title}
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="flex items-center gap-1 bg-[hsl(210,20%,95%)]/70 p-1.5 rounded-full border border-[hsl(214,30%,92%)]/50">
                        {items.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "px-4 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2",
                                    isActive(item.href)
                                        ? "bg-[hsl(190,95%,15%)] text-white shadow-md shadow-[hsl(190,95%,15%)]/20"
                                        : "text-[hsl(215,15%,50%)] hover:bg-white hover:text-[hsl(195,90%,12%)] hover:shadow-sm"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="hidden xl:block">{item.name}</span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3">
                        <button className="h-11 w-11 rounded-full bg-white flex items-center justify-center text-[hsl(195,90%,12%)] hover:shadow-md transition-all relative border border-[hsl(214,30%,92%)]">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                        </button>
                        <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[hsl(190,40%,85%)] to-[hsl(190,40%,75%)] border-2 border-white shadow-sm flex items-center justify-center">
                            <span className="text-sm font-extrabold text-[hsl(190,95%,15%)]">{user?.email?.[0].toUpperCase() || 'U'}</span>
                        </div>
                        <button
                            onClick={logout}
                            className="h-11 w-11 rounded-full bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Top Bar (ultra-compact & native) ── */}
            <header suppressHydrationWarning className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-[hsl(214,30%,92%)] md:hidden">
                <div className="flex h-16 items-center justify-between px-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-[hsl(190,95%,15%)] text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-base shadow-sm">
                            C
                        </div>
                        <div>
                            <span className="font-extrabold text-lg text-[hsl(195,90%,12%)] tracking-tight leading-none block">
                                {title}
                            </span>
                            <span className="text-[10px] font-bold text-[hsl(215,15%,55%)] uppercase tracking-widest">{CLINIC.brandName}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="h-10 w-10 rounded-full bg-[hsl(210,20%,97%)] flex items-center justify-center text-[hsl(195,90%,12%)] relative shadow-sm border border-slate-100">
                            <Bell className="h-[18px] w-[18px]" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <button
                            onClick={logout}
                            className="h-10 w-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors border border-slate-100 shadow-sm"
                            title="Sign Out"
                        >
                            <LogOut className="h-[18px] w-[18px]" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── Mobile Bottom Tab Bar (iOS Floating Style) ── */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur-2xl border-t border-slate-100 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.1)] pb-safe pt-2">
                <div className="flex items-center justify-evenly px-2 gap-1 mb-2">
                    {items.slice(0, 5).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center w-[20%] py-1"
                        >
                            {/* Active Indicator Pill positioned absolutely behind the icon */}
                            {isActive(item.href) && (
                                <div className="absolute top-0 bottom-6 left-1/2 -translate-x-1/2 w-12 bg-teal-50 rounded-2xl -z-10 animate-in fade-in zoom-in-95 duration-200"></div>
                            )}

                            <item.icon
                                className={cn(
                                    "h-6 w-6 mb-1 transition-all duration-300",
                                    isActive(item.href)
                                        ? "text-teal-700 scale-110"
                                        : "text-slate-400 hover:text-slate-600"
                                )}
                                strokeWidth={isActive(item.href) ? 2.5 : 2}
                            />
                            <span
                                className={cn(
                                    "text-[10px] text-center w-full leading-tight transition-all duration-300",
                                    isActive(item.href)
                                        ? "font-extrabold text-teal-900"
                                        : "font-semibold text-slate-500"
                                )}
                            >
                                {item.name.replace('Book Appointment', 'Book').replace('My Appointments', 'Visits').replace("Today's Queue", 'Queue')}
                            </span>
                        </Link>
                    ))}
                </div>
                {/* Safe Area Spacer for iOS Home Indicator */}
                <div className="h-6 w-full bg-transparent"></div>
            </nav>
        </>
    );
}
