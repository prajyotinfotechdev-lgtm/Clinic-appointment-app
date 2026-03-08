"use client";

import { Stethoscope } from "lucide-react";
import Link from "next/link";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleGoogleSuccess = async (response: CredentialResponse) => {
        if (!response.credential) return;
        setError("");
        setIsLoading(true);

        try {
            const res = await api.post<{ data: { token: string } }>('/auth/google', {
                token: response.credential
            });
            login(res.data.token);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Google Registration failed.");
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
                <div className="text-center space-y-2">
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/20">
                        <Stethoscope className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Star Ortho & Women Care</h1>
                    <p className="text-slate-500 text-xs">Create your patient account</p>
                </div>

                <div className="bg-white rounded-xl shadow-[var(--shadow-card)] border border-slate-200/60 p-6 space-y-5">

                    <div className="text-center">
                        <h2 className="text-base font-bold text-slate-900">Sign Up</h2>
                        <p className="text-slate-400 text-xs mt-0.5">Register securely with your Google account</p>
                    </div>

                    {error && (
                        <div className="px-3 py-2.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <div className="w-full flex justify-center pt-1 pb-2">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google Authentication failed")}
                            theme="outline"
                            size="large"
                            text="signup_with"
                            width="100%"
                        />
                    </div>

                    {isLoading && (
                        <div className="flex justify-center">
                            <div className="h-5 w-5 rounded-full border-2 border-teal-200 border-t-teal-600 animate-spin" />
                        </div>
                    )}

                </div>

                <p className="text-center text-xs text-slate-400 font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-teal-600 hover:underline font-semibold">
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}
