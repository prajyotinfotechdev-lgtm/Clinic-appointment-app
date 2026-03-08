"use client";

import { useEffect, useState } from "react";
import { X, Download, Share } from "lucide-react";

export function InstallPrompt() {
    const [isIOS, setIsIOS] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Check if app is already installed
        const isAppStandalone = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;
        setIsStandalone(isAppStandalone);

        if (isAppStandalone) return;

        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIOSDevice);

        if (isIOSDevice && !isAppStandalone) {
            // Show prompt for iOS after a small delay
            const timer = setTimeout(() => setShowPrompt(true), 3000);
            return () => clearTimeout(timer);
        }

        // Handle Android / Desktop Chrome PWA prompt
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowPrompt(false);
        }
        setDeferredPrompt(null);
    };

    if (!showPrompt || isStandalone) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-[hsl(214,30%,92%)] z-[100] p-6 animate-in slide-in-from-bottom-5 duration-500">
            <button
                onClick={() => setShowPrompt(false)}
                className="absolute top-4 right-4 text-[hsl(215,15%,50%)] hover:text-[hsl(190,95%,15%)] hover:bg-[hsl(210,40%,96%)] p-1 rounded-full transition-all"
                aria-label="Close"
            >
                <X className="h-5 w-5" />
            </button>

            <div className="flex gap-4">
                <div className="w-16 h-16 bg-[hsl(190,95%,15%)] rounded-[1.2rem] flex items-center justify-center shrink-0 shadow-lg shadow-[hsl(190,95%,15%)]/20 border-2 border-white">
                    <Download className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-1">
                    <h3 className="font-bold text-lg text-[hsl(195,90%,12%)] leading-tight">Install Clinic App</h3>
                    <p className="text-sm text-[hsl(215,15%,50%)] font-medium leading-relaxed pr-6">
                        {isIOS
                            ? "Install the app on your home screen for quick access."
                            : "Install our app on your device for quick and easy access."}
                    </p>
                </div>
            </div>

            {isIOS ? (
                <div className="mt-6 p-4 bg-[hsl(210,40%,98%)] rounded-xl border border-[hsl(214,30%,92%)] flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm font-bold text-[hsl(195,90%,12%)]">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-[hsl(214,30%,92%)]">1</div>
                        <p>Tap the <Share className="inline w-4 h-4 mx-1" /> Share button</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-bold text-[hsl(195,90%,12%)]">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center border border-[hsl(214,30%,92%)]">2</div>
                        <p>Select <span className="text-[hsl(190,95%,15%)]">Add to Home Screen</span></p>
                    </div>
                </div>
            ) : (
                <button
                    onClick={handleInstall}
                    className="w-full mt-6 py-3 bg-[hsl(190,95%,15%)] text-white rounded-xl font-bold text-[15px] hover:shadow-xl hover:shadow-[hsl(190,95%,15%)]/20 transition-all duration-300"
                >
                    Add to Home Screen
                </button>
            )}
        </div>
    );
}
