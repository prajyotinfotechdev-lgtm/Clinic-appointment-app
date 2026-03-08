"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { User, Mail, Phone, Calendar, ShieldCheck, CreditCard, Clock, Activity, Settings, Bell, BellOff, Save } from "lucide-react";
import { format } from "date-fns";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { cn } from "@/lib/utils";

interface PatientProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    googleId: string;
    phoneVerified: boolean;
    createdAt: string;
}

export default function PatientProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<PatientProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [editPhone, setEditPhone] = useState("");

    const { isSubscribed, isSupported, subscribe, unsubscribe, testNotification, permission } = usePushNotifications();
    const [isTogglingNotifications, setIsTogglingNotifications] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get<{ data: PatientProfile }>("/patients/me");
                setProfile(res.data);
                setEditPhone(res.data.phone || "");
            } catch (err) {
                console.error("Failed to load profile", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSaveProfile = async () => {
        if (!profile) return;
        setIsSavingProfile(true);
        try {
            await api.put(`/patients/${profile.id}`, { phone: editPhone });
            setProfile({ ...profile, phone: editPhone, phoneVerified: editPhone === profile.phone ? profile.phoneVerified : false });
            setIsEditing(false);
        } catch (err) {
            alert("Failed to update profile");
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleToggleNotifications = async () => {
        setIsTogglingNotifications(true);
        try {
            if (isSubscribed) {
                await unsubscribe();
            } else {
                await subscribe();
            }
        } catch (err) {
            console.error("Failed to toggle notifications", err);
        } finally {
            setIsTogglingNotifications(false);
        }
    };

    const handleTestNotification = async () => {
        try {
            await testNotification();
            alert("Test notification sent! Check your notifications.");
        } catch (err) {
            console.error("Failed to send test notification", err);
            alert("Failed to send test notification");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto pt-8 px-4 space-y-4">
                <div className="skeleton h-8 w-40 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="skeleton h-64 rounded-xl" />
                    <div className="md:col-span-2 space-y-4">
                        <div className="skeleton h-40 rounded-xl" />
                        <div className="skeleton h-40 rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto pt-8 px-4">
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] py-16 text-center">
                    <User className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-slate-600">Failed to load profile data.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-5 pb-20 md:pb-6 pt-2 md:pt-4 px-4">
            {/* ── Header ── */}
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">My Profile</h1>
                <p className="text-slate-500 text-xs md:text-sm mt-0.5">Personal information and account settings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left Column: Avatar & Preferences */}
                <div className="md:col-span-1 space-y-4">
                    {/* Avatar Card */}
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden text-center">
                        <div className="h-16 bg-gradient-to-r from-teal-500 to-teal-600" />
                        <div className="px-4 pb-4 relative">
                            <div className="w-16 h-16 mx-auto -mt-8 rounded-full border-3 border-white bg-teal-50 flex items-center justify-center shadow-sm">
                                <span className="text-2xl font-bold text-teal-600">{profile.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-sm font-bold text-slate-900 mt-2">{profile.name}</h2>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Patient</p>

                            <div className="mt-3">
                                {profile.phoneVerified ? (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-semibold rounded-md">
                                        <ShieldCheck className="h-3 w-3" /> Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-semibold rounded-md">
                                        Verify Phone
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preferences */}
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                <Settings className="h-3 w-3" /> Preferences
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-50">
                            {isSupported && (
                                <div className="px-4 py-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            {isSubscribed ? (
                                                <Bell className="h-4 w-4 text-teal-600" />
                                            ) : (
                                                <BellOff className="h-4 w-4 text-slate-400" />
                                            )}
                                            <div>
                                                <span className="font-semibold text-slate-800 text-xs block">Push Notifications</span>
                                                <span className="text-[10px] text-slate-400 font-medium">
                                                    {isSubscribed ? 'Enabled' : permission === 'denied' ? 'Blocked' : 'Disabled'}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleToggleNotifications}
                                            disabled={isTogglingNotifications || permission === 'denied'}
                                            className={cn(
                                                "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                                                isSubscribed ? 'bg-teal-600' : 'bg-slate-300',
                                                permission === 'denied' && 'opacity-50 cursor-not-allowed'
                                            )}
                                        >
                                            <span className={cn(
                                                "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                                                isSubscribed ? 'translate-x-[18px]' : 'translate-x-[3px]'
                                            )} />
                                        </button>
                                    </div>
                                    {isSubscribed && (
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-slate-400 font-medium">Reminders 1hr and 10min before appointments</p>
                                            <button
                                                onClick={handleTestNotification}
                                                className="text-[10px] font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                                            >
                                                Send Test
                                            </button>
                                        </div>
                                    )}
                                    {permission === 'denied' && (
                                        <p className="text-[10px] text-amber-600 font-medium mt-1">Enable in browser settings</p>
                                    )}
                                </div>
                            )}
                            <button className="w-full text-left px-4 py-3 flex items-center gap-2.5 hover:bg-slate-50/50 transition-colors">
                                <CreditCard className="h-4 w-4 text-slate-400" />
                                <span className="font-semibold text-slate-700 text-xs">Payment Methods</span>
                            </button>
                            <button className="w-full text-left px-4 py-3 flex items-center gap-2.5 hover:bg-slate-50/50 transition-colors">
                                <Activity className="h-4 w-4 text-slate-400" />
                                <span className="font-semibold text-slate-700 text-xs">Medical Records</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-2 space-y-4">
                    {/* Contact Info */}
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-900">Contact Information</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Mail className="h-3 w-3" /> Email
                                    </label>
                                    <div className="h-9 px-3 flex items-center bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700">
                                        {profile.email}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            <Phone className="h-3 w-3" /> Phone
                                        </label>
                                        {!isEditing && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="text-[9px] font-semibold text-teal-600 hover:text-teal-700 uppercase tracking-wider"
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                    {isEditing ? (
                                        <div className="flex gap-1.5">
                                            <input
                                                type="tel"
                                                value={editPhone}
                                                onChange={(e) => setEditPhone(e.target.value)}
                                                className="flex-1 h-9 px-3 bg-white border border-teal-200 rounded-lg text-sm font-medium text-slate-700 focus:border-teal-400 outline-none transition-colors"
                                                placeholder="Phone number"
                                            />
                                            <button
                                                onClick={() => setIsEditing(false)}
                                                className="h-9 px-2.5 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-semibold"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="h-9 px-3 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700">
                                            {profile.phone || <span className="text-slate-400 italic text-xs">Not provided</span>}
                                            {profile.phoneVerified && <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Details */}
                    <div className="bg-white rounded-xl border border-slate-200/60 shadow-[var(--shadow-card)] overflow-hidden">
                        <div className="px-4 py-3 border-b border-slate-100">
                            <h3 className="text-sm font-semibold text-slate-900">Account Details</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <User className="h-3 w-3" /> Full Name
                                    </label>
                                    <div className="h-9 px-3 flex items-center bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700">
                                        {profile.name}
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                        <Calendar className="h-3 w-3" /> Member Since
                                    </label>
                                    <div className="h-9 px-3 flex items-center bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-700">
                                        {profile.createdAt ? format(new Date(profile.createdAt), "MMMM do, yyyy") : "N/A"}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-slate-50">
                                <div className="flex items-start gap-2 text-xs">
                                    <Clock className="w-3.5 h-3.5 text-teal-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-slate-700">Google Single Sign-On Active</p>
                                        <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                            Linked to Google ID <span className="font-mono bg-slate-50 px-1 py-0.5 rounded text-[9px]">{profile.googleId}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Save button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleSaveProfile}
                            disabled={isSavingProfile || !isEditing}
                            className="h-9 px-4 bg-teal-600 text-white font-semibold text-xs rounded-lg hover:bg-teal-700 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-1.5"
                        >
                            <Save className="w-3.5 h-3.5" />
                            {isSavingProfile ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
