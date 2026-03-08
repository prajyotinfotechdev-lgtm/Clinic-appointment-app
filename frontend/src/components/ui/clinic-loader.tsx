"use client";

import { Stethoscope, HeartPulse, Activity } from "lucide-react";

type LoaderSize = "sm" | "md" | "lg" | "page";

interface ClinicLoaderProps {
    size?: LoaderSize;
    message?: string;
    showIcon?: boolean;
}

const sizeConfig = {
    sm: {
        container: "py-6",
        ring: "h-8 w-8",
        icon: "h-3.5 w-3.5",
        iconContainer: "h-8 w-8",
        text: "text-xs",
        dotSize: "h-1 w-1",
    },
    md: {
        container: "py-12",
        ring: "h-12 w-12",
        icon: "h-5 w-5",
        iconContainer: "h-12 w-12",
        text: "text-sm",
        dotSize: "h-1.5 w-1.5",
    },
    lg: {
        container: "py-16",
        ring: "h-16 w-16",
        icon: "h-7 w-7",
        iconContainer: "h-16 w-16",
        text: "text-base",
        dotSize: "h-1.5 w-1.5",
    },
    page: {
        container: "py-24 min-h-[60vh] flex flex-col items-center justify-center",
        ring: "h-20 w-20",
        icon: "h-9 w-9",
        iconContainer: "h-20 w-20",
        text: "text-lg",
        dotSize: "h-2 w-2",
    },
};

export function ClinicLoader({
    size = "md",
    message,
    showIcon = true,
}: ClinicLoaderProps) {
    const config = sizeConfig[size];
    const Icons = [Stethoscope, HeartPulse, Activity];
    const Icon = Icons[0];

    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${config.container}`}>
            {/* Animated rings + icon */}
            <div className="relative">
                {/* Outer pulse ring */}
                <div
                    className={`absolute inset-0 rounded-full bg-teal-400/20 animate-ping`}
                    style={{ animationDuration: "2s" }}
                />
                {/* Middle spinning ring */}
                <div
                    className={`${config.ring} rounded-full border-[3px] border-teal-100 border-t-teal-600 animate-spin`}
                    style={{ animationDuration: "1s" }}
                />
                {/* Center icon */}
                {showIcon && (
                    <div className={`absolute inset-0 flex items-center justify-center`}>
                        <div className="animate-pulse" style={{ animationDuration: "2s" }}>
                            <Icon className={`${config.icon} text-teal-600`} />
                        </div>
                    </div>
                )}
            </div>

            {/* Message with animated dots */}
            {message && (
                <div className="flex items-center gap-1.5">
                    <span className={`font-bold text-teal-800 tracking-wide ${config.text}`}>
                        {message}
                    </span>
                    <span className="flex gap-0.5 items-end pb-0.5">
                        <span
                            className={`${config.dotSize} rounded-full bg-teal-600 animate-bounce`}
                            style={{ animationDelay: "0ms", animationDuration: "1.2s" }}
                        />
                        <span
                            className={`${config.dotSize} rounded-full bg-teal-500 animate-bounce`}
                            style={{ animationDelay: "200ms", animationDuration: "1.2s" }}
                        />
                        <span
                            className={`${config.dotSize} rounded-full bg-teal-400 animate-bounce`}
                            style={{ animationDelay: "400ms", animationDuration: "1.2s" }}
                        />
                    </span>
                </div>
            )}
        </div>
    );
}

/**
 * Full-page loader for initial page loads / route transitions.
 */
export function PageLoader({ message = "Loading" }: { message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6">
            <div className="relative">
                {/* Glow */}
                <div className="absolute inset-[-8px] rounded-full bg-teal-500/10 blur-lg animate-pulse" style={{ animationDuration: "2.5s" }} />
                {/* Outer ring */}
                <div className="h-20 w-20 rounded-full border-[3px] border-teal-100 border-t-teal-600 border-r-teal-400 animate-spin" style={{ animationDuration: "1s" }} />
                {/* Inner icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-pulse" style={{ animationDuration: "2s" }}>
                        <Stethoscope className="h-8 w-8 text-teal-600" />
                    </div>
                </div>
            </div>
            <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-1.5">
                    <p className="text-lg font-bold text-teal-800">{message}</p>
                    <span className="flex gap-0.5 items-end pb-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-600 animate-bounce" style={{ animationDelay: "0ms", animationDuration: "1.2s" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "200ms", animationDuration: "1.2s" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-bounce" style={{ animationDelay: "400ms", animationDuration: "1.2s" }} />
                    </span>
                </div>
                <p className="text-sm text-slate-500 font-medium">Star Ortho & Women Care</p>
            </div>
        </div>
    );
}

/**
 * Inline button spinner (replaces text inside buttons during submission).
 */
export function ButtonSpinner() {
    return (
        <div className="h-5 w-5 rounded-full border-[2.5px] border-white/30 border-t-white animate-spin" />
    );
}
