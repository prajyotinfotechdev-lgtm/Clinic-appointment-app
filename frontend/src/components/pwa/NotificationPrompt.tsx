"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useAuth } from "@/hooks/useAuth";

export function NotificationPrompt() {
    const [showPrompt, setShowPrompt] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);
    const { isSubscribed, isSupported, subscribe, permission } = usePushNotifications();
    const { user } = useAuth();

    useEffect(() => {
        if (!user || user.role !== 'PATIENT') {
            return;
        }

        if (!isSupported) {
            return;
        }

        if (isSubscribed || permission === 'denied') {
            return;
        }

        const dismissed = localStorage.getItem('notification-prompt-dismissed');
        if (dismissed === 'true') {
            setIsDismissed(true);
            return;
        }

        const timer = setTimeout(() => {
            setShowPrompt(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, [user, isSupported, isSubscribed, permission]);

    const handleEnable = async () => {
        const success = await subscribe();
        if (success) {
            setShowPrompt(false);
        }
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        setIsDismissed(true);
        localStorage.setItem('notification-prompt-dismissed', 'true');
    };

    if (!showPrompt || isDismissed || !user || user.role !== 'PATIENT') {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-200 z-[100] p-6 animate-in slide-in-from-bottom-5 duration-500">
            <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 text-slate-400 hover:text-teal-900 hover:bg-slate-50 p-1 rounded-full transition-all"
                aria-label="Close"
            >
                <X className="h-5 w-5" />
            </button>

            <div className="flex gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-teal-900/20">
                    <Bell className="h-7 w-7 text-white" />
                </div>
                <div className="space-y-1 flex-1">
                    <h3 className="font-extrabold text-lg text-teal-950 leading-tight">
                        Enable Notifications
                    </h3>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed pr-6">
                        Get appointment reminders 1 hour and 10 minutes before your scheduled visits.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex gap-3">
                <button
                    onClick={handleEnable}
                    className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-xl font-bold text-sm hover:shadow-xl hover:shadow-teal-900/20 transition-all duration-300 active:scale-95"
                >
                    Enable Notifications
                </button>
                <button
                    onClick={handleDismiss}
                    className="px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all active:scale-95"
                >
                    Not Now
                </button>
            </div>

            <p className="mt-4 text-xs text-slate-400 text-center font-medium">
                You can change this anytime in your profile settings
            </p>
        </div>
    );
}
