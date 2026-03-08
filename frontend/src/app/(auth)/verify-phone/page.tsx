"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { ShieldCheck, Phone, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

declare global {
    interface Window {
        initSendOTP?: any;
        sendOtp?: any;
        verifyOtp?: any;
    }
}

export default function VerifyOtp() {
    const [countryCode, setCountryCode] = useState("91");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);

    const { login } = useAuth(); // ensure session is active
    const router = useRouter();
    const isLocalhost = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    );

    useEffect(() => {
        const urls = [
            'https://verify.msg91.com/otp-provider.js',
            'https://verify.phone91.com/otp-provider.js'
        ];

        let i = 0;
        function attempt() {
            if (document.querySelector(`script[src="${urls[i]}"]`)) return;
            const s = document.createElement('script');
            s.src = urls[i];
            s.async = true;
            s.onerror = () => {
                i++;
                if (i < urls.length) {
                    attempt();
                }
            };
            document.head.appendChild(s);
        }
        attempt();
    }, []);

    const fullPhone = `+${countryCode}${phone.replace(/\D/g, '')}`;
    const identifier = `${countryCode}${phone.replace(/\D/g, '')}`;
    const hasMsg91Config = Boolean(process.env.NEXT_PUBLIC_MSG91_WIDGET_ID && process.env.NEXT_PUBLIC_MSG91_TOKEN);
    const useMsg91Flow = hasMsg91Config && !isLocalhost;

    console.log("[OTP] Environment Check:", {
        isLocalhost,
        hasMsg91Config,
        useMsg91Flow,
        widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID ? "Configured" : "Missing"
    });

    const extractAccessToken = (data: any) => {
        if (typeof data === "string") return data;
        return data?.accessToken || data?.access_token || data?.token || data?.message || data?.authToken || null;
    };

    const getErrorMessage = (error: any, fallback: string) => {
        if (!error) return fallback;
        if (typeof error === 'string') return error;
        return error?.message || error?.error || error?.type || fallback;
    };

    const handleSendOtp = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!useMsg91Flow) {
            setIsLoading(true);
            try {
                await api.post("/auth/send-otp", { phone: fullPhone });
                setIsOtpSent(true);
            } catch (error) {
                console.error('send local otp error', error);
                alert("Failed to send OTP");
            } finally {
                setIsLoading(false);
            }
            return;
        }

        if (typeof window === 'undefined' || !window.initSendOTP) {
            alert("OTP service is still loading, please wait...");
            return;
        }

        setIsLoading(true);

        const configuration = {
            widgetId: process.env.NEXT_PUBLIC_MSG91_WIDGET_ID || "366367687052313231373039",
            tokenAuth: process.env.NEXT_PUBLIC_MSG91_TOKEN || "",
            identifier,
            exposeMethods: true,
            success: () => { },
            failure: (error: any) => {
                console.error('failure reason', error);
                if (error?.message !== "Widget Closed") {
                    alert(error?.message || "Failed to verify OTP with provider");
                }
                setIsLoading(false);
            },
        };

        window.initSendOTP(configuration);

        setTimeout(() => {
            if (!window.sendOtp) {
                setIsLoading(false);
                alert("OTP service is not ready yet. Please try again.");
                return;
            }

            window.sendOtp(
                identifier,
                () => {
                    setIsOtpSent(true);
                    setIsLoading(false);
                },
                (error: any) => {
                    console.error('sendOtp error', error);
                    alert(getErrorMessage(error, "Failed to send OTP"));
                    setIsLoading(false);
                }
            );
        }, 500);
    };

    const handleVerifyOtp = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!useMsg91Flow) {
            setIsLoading(true);
            try {
                const res = await api.post<{ data: { token: string } }>("/auth/verify-otp", {
                    phone: fullPhone,
                    otp,
                });
                login(res.data.token);
                router.push("/patient/dashboard");
            } catch (error) {
                console.error('verify local otp error', error);
                alert("Invalid or expired OTP");
                setIsLoading(false);
            }
            return;
        }

        if (typeof window === 'undefined' || !window.verifyOtp) {
            alert("OTP verification service is still loading, please wait...");
            return;
        }

        setIsLoading(true);

        window.verifyOtp(
            otp,
            async (data: any) => {
                try {
                    const accessToken = extractAccessToken(data);

                    if (!accessToken) {
                        console.error('MSG91 verifyOtp response missing access token', data);
                        alert("OTP verified with provider, but access token was missing.");
                        setIsLoading(false);
                        return;
                    }

                    const res = await api.post<{ data: { token: string } }>("/auth/verify-otp", {
                        phone: fullPhone,
                        accessToken,
                    });

                    login(res.data.token);
                    router.push("/patient/dashboard");
                } catch (error) {
                    console.error('verify otp backend error', error);
                    alert("Invalid or expired OTP");
                    setIsLoading(false);
                }
            },
            (error: any) => {
                console.error('verifyOtp error', error);
                alert(getErrorMessage(error, "Failed to verify OTP"));
                setIsLoading(false);
            }
        );
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] p-4">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-slate-100/50 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="bg-white rounded-xl shadow-[var(--shadow-card)] border border-slate-200/60 p-6 space-y-6">

                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-teal-50 rounded-xl mx-auto flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Security Verification</h2>
                            <p className="text-slate-400 text-xs mt-1">
                                {isOtpSent
                                    ? `Code sent to +${countryCode} ${phone}`
                                    : "Verify your mobile number to secure your account."}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
                        {!isOtpSent ? (
                            <div className="space-y-4 animate-fade-in">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Mobile Number</label>
                                    <div className="flex gap-1.5">
                                        <Select value={countryCode} onValueChange={setCountryCode}>
                                            <SelectTrigger className="w-[90px] h-9 bg-slate-50 border border-slate-200/60 rounded-lg text-sm font-semibold text-slate-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-lg border border-slate-200/60 shadow-lg">
                                                <SelectItem value="91">🇮🇳 +91</SelectItem>
                                                <SelectItem value="1">🇺🇸 +1</SelectItem>
                                                <SelectItem value="44">🇬🇧 +44</SelectItem>
                                                <SelectItem value="971">🇦🇪 +971</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <div className="relative flex-1">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                                            <input
                                                type="tel"
                                                placeholder="70207 08747"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full h-9 pl-9 pr-3 bg-slate-50 border border-slate-200/60 rounded-lg text-sm font-semibold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3 animate-fade-in text-center">
                                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Enter 4-Digit Code</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={4}
                                    autoFocus
                                    placeholder="0 0 0 0"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    className="w-full h-12 text-center text-2xl tracking-[0.5em] bg-slate-50 border border-slate-200/60 rounded-lg text-slate-800 font-bold placeholder:text-slate-300 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setIsOtpSent(false)}
                                    className="text-[10px] font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                                >
                                    Edit Number?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading || (!phone && !isOtpSent) || (isOtpSent && otp.length !== 4)}
                            className="w-full h-9 bg-teal-600 text-white rounded-lg font-semibold text-sm hover:bg-teal-700 transition-all disabled:opacity-50 flex justify-center items-center gap-2 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            ) : (
                                <>
                                    <span>{isOtpSent ? "Verify Code" : "Send Code"}</span>
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>

                        {!isOtpSent && (
                            <p className="text-center text-[9px] text-slate-400 font-medium">
                                You'll receive a one-time SMS code. Standard rates may apply.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </main>
    );
}
