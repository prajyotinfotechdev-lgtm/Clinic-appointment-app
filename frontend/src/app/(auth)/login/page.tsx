"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { Stethoscope, ArrowRight, Mail, Lock } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"DOCTOR" | "RECEPTIONIST">("DOCTOR");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    // ── Staff Login (real backend call) ──
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const endpoint =
                role === "DOCTOR"
                    ? "/auth/doctor/login"
                    : "/auth/receptionist/login";

            const res = await api.post<{ data: { token: string } }>(endpoint, {
                email,
                password,
            });

            login(res.data.token);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // ── Patient Google OAuth (via Google Identity Services) ──
    const handleGoogleSuccess = async (response: CredentialResponse) => {
        if (!response.credential) return;

        setError("");
        setIsLoading(true);

        try {
            const res = await api.post<{ data: { token: string } }>('/auth/google', {
                token: response.credential
            });
            // Calling login hook saves the JWT token to React context & localstorage,
            // which handles the redirect automatically.
            login(res.data.token);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Google Login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] p-4">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-slate-100/50 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm space-y-6">
                {/* Brand */}
                <div className="text-center space-y-2">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/20">
                        <Stethoscope className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Star Ortho & Women Care</h1>
                    <p className="text-slate-500 text-xs">Welcome back! Let&apos;s get you in.</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-xl shadow-[var(--shadow-card)] border border-slate-200/60 p-6 space-y-5">

                    {/* Patient Google Login */}
                    <div className="w-full flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google Authentication failed")}
                            theme="outline"
                            size="large"
                            text="continue_with"
                            width="100%"
                        />
                    </div>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="px-3 bg-white text-slate-400 font-medium">Staff Login</span>
                        </div>
                    </div>

                    {error && (
                        <div className="px-3 py-2.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    {/* Role Toggle */}
                    <div className="flex gap-1.5 bg-slate-50 p-1 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setRole("DOCTOR")}
                            className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all ${role === "DOCTOR"
                                ? "bg-teal-600 text-white shadow-sm"
                                : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            Doctor
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("RECEPTIONIST")}
                            className={`flex-1 py-2 rounded-md text-xs font-semibold transition-all ${role === "RECEPTIONIST"
                                ? "bg-teal-600 text-white shadow-sm"
                                : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            Receptionist
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleEmailLogin} className="space-y-3">
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-9 pr-3 h-9 bg-slate-50 border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                                placeholder="you@clinic.com"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-9 pr-3 h-9 bg-slate-50 border border-slate-200/60 rounded-lg text-sm text-slate-700 font-medium placeholder:text-slate-400 focus:outline-none focus:border-teal-400 focus:bg-white transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-9 bg-teal-600 text-white rounded-lg font-semibold text-sm hover:bg-teal-700 transition-all disabled:opacity-70 flex justify-center items-center gap-2 active:scale-[0.98]"
                        >
                            {isLoading ? (
                                <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="h-4 w-4" /></>
                            )}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-slate-400 font-medium">
                    New patient?{" "}
                    <Link href="/register" className="text-teal-600 hover:underline font-semibold">
                        Register with Google
                    </Link>
                </p>
            </div>
        </main>
    );
}
