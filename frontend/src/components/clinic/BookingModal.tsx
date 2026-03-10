"use client";

import { Phone, Calendar, X, MessageCircle } from "lucide-react";
import Link from "next/link";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

export function BookingModal({ open, onClose }: BookingModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 z-10"
        style={{ animation: "modalIn 0.2s ease-out" }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(20px) scale(0.97); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
        >
          <X className="h-4 w-4 text-slate-500" />
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-teal-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/30">
            <Calendar className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Book Appointment</h2>
          <p className="text-slate-400 text-sm mt-1.5">Choose how you&apos;d like to connect with us</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <a
            href="tel:+918073311622"
            className="flex flex-col items-center gap-3 p-5 bg-teal-50 hover:bg-teal-100 border-2 border-teal-100 hover:border-teal-300 rounded-2xl transition-all group"
          >
            <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/30 group-hover:scale-110 transition-transform">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <div className="text-center">
              <div className="font-bold text-slate-900 text-sm">Call Now</div>
              <div className="text-[11px] text-slate-400 mt-0.5 font-medium">+91 80733 11622</div>
            </div>
          </a>

          <Link
            href="/register"
            onClick={onClose}
            className="flex flex-col items-center gap-3 p-5 bg-slate-900 hover:bg-teal-900 border-2 border-slate-900 hover:border-teal-800 rounded-2xl transition-all group"
          >
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div className="text-center">
              <div className="font-bold text-white text-sm">Book Online</div>
              <div className="text-[11px] text-white/50 mt-0.5 font-medium">Patient portal</div>
            </div>
          </Link>
        </div>

        <a
          href="https://wa.me/918073311622"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 hover:bg-green-600 text-white text-sm font-bold rounded-xl transition-colors"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp Us
        </a>
      </div>
    </div>
  );
}
