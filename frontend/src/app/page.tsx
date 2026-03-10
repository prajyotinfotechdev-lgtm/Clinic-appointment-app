"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MapPin, Clock, ChevronRight, CheckCircle, Shield, Award, Heart } from "lucide-react";
import { SiteNav } from "@/components/clinic/SiteNav";
import { SiteFooter } from "@/components/clinic/SiteFooter";
import { BookingModal } from "@/components/clinic/BookingModal";

/* ─── Data ─── */
const stats = [
  { value: "2+", label: "Specialist Doctors", sub: "Board certified" },
  { value: "10+", label: "Years Experience", sub: "Combined" },
  { value: "5000+", label: "Patients Treated", sub: "And counting" },
  { value: "98%", label: "Satisfaction Rate", sub: "Patient reviews" },
];

const features = [
  { icon: Award, title: "Experienced Specialists", desc: "Years of focused expertise in orthopaedic and women's healthcare." },
  { icon: Shield, title: "Advanced Medical Care", desc: "Modern diagnostic equipment for accurate and effective treatment." },
  { icon: Heart, title: "Patient-First Approach", desc: "Personalized care plans designed around each patient's needs." },
  { icon: CheckCircle, title: "Easy Online Booking", desc: "Book appointments anytime through our seamless patient portal." },
];

const doctors = [
  {
    initial: "RK",
    name: "Dr. Rahul Kalekar",
    qualifications: "MBBS, DNB, D.ORTHO, FIJR",
    title: "Consultant Orthopaedic Surgeon",
    color: "teal" as const,
    specs: ["Joint pain treatment", "Fracture management", "Sports injury care", "Orthopaedic consultation"],
  },
  {
    initial: "AK",
    name: "Dr. Aparna Kalekar",
    qualifications: "MBBS, MS OBGY",
    title: "Laparoscopic Surgeon & Gynaecologist",
    color: "rose" as const,
    specs: ["Pregnancy care", "Gynecology consultation", "PCOS treatment", "Women's health care"],
  },
];

const marqueeItems = [
  "Joint Pain Treatment", "Fracture Management", "Sports Injury",
  "Pregnancy Care", "PCOS Treatment", "Gynecology Consultation",
  "Knee Pain", "Shoulder Pain", "Laparoscopic Surgery", "Women's Health",
];

/* ─── Ultra-Premium Hero SVG Illustration ─── */
function HeroIllustration() {
  return (
    <svg viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <defs>
        <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hero-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <filter id="hero-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="hero-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#000000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Ambient background glow */}
      <circle cx="240" cy="240" r="240" fill="url(#hero-glow)" />

      {/* Elegant concentric orbital rings */}
      <circle cx="240" cy="240" r="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <circle cx="240" cy="240" r="140" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeDasharray="4 8" />
      <circle cx="240" cy="240" r="100" stroke="rgba(45,212,191,0.3)" strokeWidth="1.5" />

      <g filter="url(#hero-shadow)">
        {/* Modern 3D Glass Cross */}
        <g filter="url(#hero-blur)">
          <rect x="210" y="130" width="60" height="220" rx="20" fill="url(#hero-glass)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <rect x="130" y="210" width="220" height="60" rx="20" fill="url(#hero-glass)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </g>
        
        {/* Core solid element */}
        <rect x="220" y="140" width="40" height="200" rx="15" fill="rgba(255,255,255,0.05)" stroke="rgba(45,212,191,0.5)" strokeWidth="1.5" />
        <rect x="140" y="220" width="200" height="40" rx="15" fill="rgba(255,255,255,0.05)" stroke="rgba(45,212,191,0.5)" strokeWidth="1.5" />
      </g>

      {/* Dynamic EKG Pulse */}
      <path d="M40 240 L120 240 L140 210 L160 280 L190 170 L220 310 L250 240 L300 240 L320 220 L340 260 L360 240 L440 240"
        stroke="#2dd4bf" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <path d="M40 240 L120 240 L140 210 L160 280 L190 170 L220 310 L250 240 L300 240 L320 220 L340 260 L360 240 L440 240"
        stroke="#ffffff" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />

      {/* Center brilliance */}
      <circle cx="240" cy="240" r="14" fill="#ffffff" filter="drop-shadow(0 0 10px rgba(45,212,191,0.8))" />
      <circle cx="240" cy="240" r="6" fill="#2dd4bf" />

      {/* Floating UI Elements / Data nodes */}
      <g filter="url(#hero-shadow)">
        <rect x="330" y="100" width="80" height="30" rx="15" fill="url(#hero-glass)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="345" cy="115" r="4" fill="#2dd4bf" />
        <line x1="355" y1="115" x2="395" y2="115" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
        
        <rect x="70" y="320" width="60" height="30" rx="15" fill="url(#hero-glass)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <circle cx="85" cy="335" r="4" fill="#5eead4" />
        <line x1="95" y1="335" x2="115" y2="335" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Particles */}
      {[
        {cx: 372, cy: 342, r: 4}, {cx: 68, cy: 148, r: 3}, {cx: 422, cy: 238, r: 2},
        {cx: 52, cy: 242, r: 3}, {cx: 240, cy: 60, r: 4}, {cx: 240, cy: 420, r: 3}
      ].map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r} fill="#2dd4bf" opacity="0.6" filter="drop-shadow(0 0 4px rgba(45,212,191,1))" />
      ))}
    </svg>
  );
}

/* ─── Orthopaedic Service SVG ─── */
function OrthoSVG() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 mx-auto">
      <circle cx="80" cy="80" r="72" fill="rgba(20,184,166,0.07)" />
      <circle cx="80" cy="80" r="52" fill="rgba(20,184,166,0.1)" />
      <ellipse cx="80" cy="36" rx="19" ry="23" fill="rgba(20,184,166,0.2)" stroke="#0d9488" strokeWidth="2" />
      <ellipse cx="80" cy="124" rx="15" ry="19" fill="rgba(20,184,166,0.2)" stroke="#0d9488" strokeWidth="2" />
      <rect x="73" y="54" width="14" height="52" rx="5" fill="rgba(20,184,166,0.15)" stroke="#0d9488" strokeWidth="1.5" />
      <line x1="54" y1="80" x2="106" y2="80" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" />
      <ellipse cx="80" cy="80" rx="11" ry="4" fill="#2dd4bf" opacity="0.55" />
      <circle cx="36" cy="54" r="4" fill="rgba(45,212,191,0.4)" />
      <circle cx="124" cy="106" r="4" fill="rgba(45,212,191,0.4)" />
      <circle cx="36" cy="106" r="3" fill="rgba(45,212,191,0.3)" />
      <circle cx="124" cy="54" r="3" fill="rgba(45,212,191,0.3)" />
    </svg>
  );
}

/* ─── Women's Health SVG ─── */
function WomenSVG() {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-32 h-32 mx-auto">
      <circle cx="80" cy="80" r="72" fill="rgba(244,63,94,0.05)" />
      <circle cx="80" cy="80" r="52" fill="rgba(244,63,94,0.08)" />
      <path d="M80 110 C80 110 34 82 34 56 C34 42 46 32 58 32 C67 32 75 37 80 46 C85 37 93 32 102 32 C114 32 126 42 126 56 C126 82 80 110 80 110Z"
        fill="rgba(244,63,94,0.18)" stroke="#f43f5e" strokeWidth="2" strokeLinejoin="round" />
      <path d="M50 70 L62 70 L68 54 L74 88 L80 63 L86 82 L92 70 L110 70"
        stroke="#f43f5e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      <circle cx="80" cy="132" r="9" fill="none" stroke="rgba(244,63,94,0.35)" strokeWidth="1.8" />
      <path d="M74 132 Q80 124 86 132" stroke="rgba(244,63,94,0.4)" strokeWidth="1.5" fill="none" />
      <line x1="74" y1="132" x2="74" y2="120" stroke="rgba(244,63,94,0.35)" strokeWidth="1.5" />
      <line x1="86" y1="132" x2="86" y2="120" stroke="rgba(244,63,94,0.35)" strokeWidth="1.5" />
      <circle cx="34" cy="100" r="4" fill="rgba(244,63,94,0.3)" />
      <circle cx="126" cy="100" r="4" fill="rgba(244,63,94,0.3)" />
    </svg>
  );
}

/* ─── Page ─── */
export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      <SiteNav />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white min-h-[100vh] sm:min-h-[92vh] flex items-center">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-teal-500/8 rounded-full blur-[120px] pointer-events-none max-w-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/6 rounded-full blur-[100px] pointer-events-none max-w-full" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 lg:py-0 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[auto] lg:min-h-[92vh] pt-20 pb-8 sm:pt-24 sm:pb-12 lg:py-20">
            {/* Left – Content */}
            <div className="flex flex-col items-start text-left max-w-xl mx-auto lg:mx-0 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-teal-500/15 border border-teal-400/25 rounded-full text-teal-200 text-xs sm:text-sm font-semibold mb-5 sm:mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Wakad&apos;s Leading Specialist Clinic
              </div>

              <h1 className="text-[2.25rem] sm:text-5xl lg:text-[64px] font-extrabold tracking-tight leading-[1.15] sm:leading-[1.04] mb-5 sm:mb-6">
                Exceptional Care<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400">
                  for Every Stage
                </span>
                <br />of Life
              </h1>

              <p className="text-base sm:text-lg text-slate-300/80 leading-relaxed mb-6 sm:mb-8 max-w-md">
                Expert orthopaedic and women&apos;s healthcare by board-certified specialists,
                right in the heart of Wakad.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 sm:mb-10 w-full sm:w-auto">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="flex items-center justify-center gap-2 px-6 py-4 sm:px-7 sm:py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl shadow-xl shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] text-base sm:text-[15px] w-full sm:w-auto"
                >
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </button>
                <Link href="/login"
                  className="flex items-center justify-center gap-2 px-6 py-4 sm:px-7 sm:py-4 bg-white/8 hover:bg-white/14 border border-white/15 text-white font-semibold rounded-xl transition-all text-base sm:text-[15px] w-full sm:w-auto">
                  Patient Portal
                </Link>
                <a href="tel:+918073311622"
                  className="flex items-center justify-center gap-2 px-6 py-4 sm:py-4 border border-white/12 hover:bg-white/8 text-white/80 font-semibold rounded-xl transition-all text-base sm:text-[15px] w-full sm:w-auto">
                  <Phone className="h-4 w-4" /> Call Now
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {["Board Certified", "5000+ Patients", "Wakad, Pune"].map((b) => (
                  <div key={b} className="flex items-center gap-1.5 text-sm text-teal-200/70 font-medium">
                    <CheckCircle className="h-3.5 w-3.5 text-teal-400" /> {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Right – SVG illustration */}
            <div className="flex items-center justify-center relative mt-8 lg:mt-0 mb-0 lg:mb-0">
              <div className="w-[240px] h-[240px] sm:w-[340px] sm:h-[340px] lg:w-[440px] lg:h-[440px] relative animate-float">
                <HeroIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div className="bg-teal-600 text-white py-3.5 overflow-hidden">
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .marquee-inner { animation: marquee 22s linear infinite; }
          .marquee-inner:hover { animation-play-state: paused; }
        `}</style>
        <div className="flex whitespace-nowrap marquee-inner">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-2 mx-4 sm:mx-6 text-xs sm:text-sm font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-200/80" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ STATS ══════════════ */}
      <section className="py-10 sm:py-14 lg:py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center group py-2">
                <div className="text-4xl sm:text-5xl font-extrabold text-teal-700 tracking-tight mb-2 group-hover:text-teal-600 transition-colors">
                  {s.value}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-800">{s.label}</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE US ══════════════ */}
      <section className="py-12 sm:py-16 lg:py-28 relative bg-[#f8fafc] overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-100/40 rounded-[100%] blur-[100px] pointer-events-none max-w-full" />
        
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-teal-100 rounded-full shadow-sm mb-4">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[11px] font-extrabold text-teal-700 uppercase tracking-widest">Why Choose Us</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Healthcare You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Trust</span>
            </h2>
            <p className="text-slate-500 mt-4 sm:mt-5 text-sm sm:text-base lg:text-[17px] leading-relaxed">
              Combining clinical expertise with modern facilities for the best possible patient outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((f) => (
              <div key={f.title}
                className="relative bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 group z-10 overflow-hidden">
                {/* Glass reflection */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent opacity-50" />
                
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 flex items-center justify-center mb-5 sm:mb-6 border border-teal-100/50 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <f.icon className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 drop-shadow-sm" />
                </div>
                <h3 className="relative font-extrabold text-slate-900 text-base sm:text-lg mb-2 sm:mb-2.5 tracking-tight">{f.title}</h3>
                <p className="relative text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DOCTORS PREVIEW ══════════════ */}
      <section className="py-12 sm:py-16 lg:py-28 bg-slate-900">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-14">
            <div>
              <span className="text-xs font-bold text-teal-400 uppercase tracking-[0.15em]">Our Specialists</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 sm:mt-3 tracking-tight">
                Meet Our Doctors
              </h2>
            </div>
            <Link href="/doctors"
              className="inline-flex items-center gap-1.5 text-teal-400 text-sm font-bold hover:text-teal-300 transition-colors shrink-0">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {doctors.map((doc) => (
              <div key={doc.name}
                className="bg-white/5 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 transition-all group">
                <div className="flex items-start gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center font-extrabold text-lg sm:text-xl text-white shrink-0 shadow-lg ${
                    doc.color === "teal"
                      ? "bg-gradient-to-br from-teal-400 to-teal-700"
                      : "bg-gradient-to-br from-rose-400 to-pink-600"
                  }`}>
                    {doc.initial}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base sm:text-lg leading-tight">{doc.name}</h3>
                    <p className={`text-xs sm:text-sm font-bold mt-0.5 ${doc.color === "teal" ? "text-teal-400" : "text-rose-400"}`}>
                      {doc.qualifications}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5 sm:mt-1">{doc.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-1.5 mb-5 sm:mb-6">
                  {doc.specs.map((s) => (
                    <div key={s} className="flex items-center gap-2 sm:gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${doc.color === "teal" ? "bg-teal-400" : "bg-rose-400"}`} />
                      <span className="text-slate-300 text-xs sm:text-xs font-medium">{s}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookingOpen(true)}
                  className={`flex items-center justify-center gap-2 w-full py-3 sm:py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${
                    doc.color === "teal"
                      ? "bg-teal-600 hover:bg-teal-500 text-white"
                      : "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white"
                  }`}
                >
                  Book Appointment <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES PREVIEW ══════════════ */}
      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 lg:mb-14">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">What We Treat</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 sm:mt-3 tracking-tight">
                Our Services
              </h2>
            </div>
            <Link href="/services"
              className="inline-flex items-center gap-1.5 text-teal-600 text-sm font-bold hover:text-teal-700 transition-colors shrink-0">
              View All Services <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Orthopaedic */}
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl sm:rounded-3xl border border-teal-100 p-5 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group">
              <OrthoSVG />
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 text-center mt-3 sm:mt-4 mb-1">Orthopaedic Care</h3>
              <p className="text-teal-600 text-sm font-semibold text-center mb-5 sm:mb-6">Dr. Rahul Kalekar</p>
              <div className="space-y-2 sm:space-y-2.5">
                {["Joint Pain Treatment", "Fracture Management", "Sports Injury Treatment", "Knee & Shoulder Pain"].map((s) => (
                  <div key={s} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white/70 rounded-lg sm:rounded-xl hover:bg-teal-50 transition-colors">
                    <CheckCircle className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-teal-500 shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">{s}</span>
                  </div>
                ))}
              </div>
              <Link href="/services" className="flex items-center justify-center gap-1.5 mt-5 sm:mt-6 text-teal-600 text-sm font-bold hover:gap-2.5 transition-all">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Women's Health */}
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl sm:rounded-3xl border border-rose-100 p-5 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-300 group">
              <WomenSVG />
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 text-center mt-3 sm:mt-4 mb-1">Women&apos;s Health</h3>
              <p className="text-rose-500 text-sm font-semibold text-center mb-5 sm:mb-6">Dr. Aparna Kalekar</p>
              <div className="space-y-2 sm:space-y-2.5">
                {["Pregnancy Care", "Gynecology Consultation", "PCOS Treatment", "Laparoscopic Surgery"].map((s) => (
                  <div key={s} className="flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 bg-white/70 rounded-lg sm:rounded-xl hover:bg-rose-50 transition-colors">
                    <CheckCircle className="h-4 w-4 sm:h-3.5 sm:w-3.5 text-rose-400 shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">{s}</span>
                  </div>
                ))}
              </div>
              <Link href="/services" className="flex items-center justify-center gap-1.5 mt-5 sm:mt-6 text-rose-500 text-sm font-bold hover:gap-2.5 transition-all">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="py-12 sm:py-16 lg:py-28 relative overflow-hidden bg-gradient-to-br from-teal-700 to-teal-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold text-teal-200 uppercase tracking-[0.15em]">Get Started Today</span>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mt-3 sm:mt-4 mb-4 sm:mb-5 tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Experience<br className="hidden sm:block" /><span className="sm:hidden"> </span>Premium Healthcare?
          </h2>
          <p className="text-teal-100/65 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed">
            Schedule your appointment with our specialists in just a few clicks — or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto">
            <button
              onClick={() => setBookingOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-4 bg-white text-teal-900 font-extrabold rounded-xl hover:bg-teal-50 shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.98] text-base sm:text-[15px] w-full sm:w-auto">
              <CheckCircle className="h-4 w-4" /> Book Appointment
            </button>
            <a href="tel:+918073311622"
              className="flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-4 border-2 border-white/25 text-white font-bold rounded-xl hover:bg-white/8 transition-all text-base sm:text-[15px] w-full sm:w-auto">
              <Phone className="h-4 w-4" /> Call +91 80733 11622
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════ LOCATION ══════════════ */}
      <section className="py-12 sm:py-16 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 lg:mb-14">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">Find Us</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 sm:mt-3 tracking-tight">Visit Our Clinic</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-3 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-xl h-56 sm:h-80 lg:h-[420px]">
              <iframe
                src="https://maps.google.com/maps?q=Wakad+Pune+Maharashtra+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Star Ortho & Women Care Location"
              />
            </div>
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {[
                { icon: MapPin, title: "Address", body: "Sanskruti Arcade, Ground Floor, Shop 6, Wakad, Pune, Maharashtra", extra: null },
                { icon: Phone, title: "Phone", body: "+91 80733 11622", extra: "call" },
                { icon: Clock, title: "Clinic Hours", body: "Mon – Sat: 9:00 AM – 8:00 PM\nSunday: 10:00 AM – 2:00 PM", extra: null },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm mb-1">{item.title}</div>
                      <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{item.body}</p>
                      {item.extra === "call" && (
                        <div className="flex gap-2 mt-3">
                          <a href="tel:+918073311622"
                            className="px-3 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition-colors">
                            Call
                          </a>
                          <a href="https://wa.me/918073311622" target="_blank" rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors">
                            WhatsApp
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />

      {/* Floating action buttons */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-4 z-50 flex flex-col gap-2.5 sm:gap-3">
        <a href="https://wa.me/918073311622" target="_blank" rel="noopener noreferrer" title="WhatsApp"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/35 transition-all hover:scale-110 active:scale-95">
          <svg className="h-5 w-5 sm:h-6 sm:w-6 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.554 4.127 1.527 5.86L.057 23.95l6.264-1.644A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.819 9.819 0 01-5.012-1.374l-.36-.214-3.72.976 1.002-3.634-.234-.373A9.82 9.82 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
        </a>
        <a href="tel:+918073311622" title="Call"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-lg shadow-teal-500/35 transition-all hover:scale-110 active:scale-95">
          <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
        </a>
        <button onClick={() => setBookingOpen(true)} title="Book Appointment"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-900 hover:bg-teal-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/35 transition-all hover:scale-110 active:scale-95">
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

