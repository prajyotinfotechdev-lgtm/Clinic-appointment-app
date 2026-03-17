"use client";

import { useState } from "react";
import { SiteNav } from "@/components/clinic/SiteNav";
import { SiteFooter } from "@/components/clinic/SiteFooter";
import { BookingModal } from "@/components/clinic/BookingModal";
import { ArrowRight, Heart, Shield, Award, Users, CheckCircle, MapPin } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    desc: "Every patient is treated with empathy, respect, and individualized attention throughout their healthcare journey.",
  },
  {
    icon: Award,
    title: "Clinical Excellence",
    desc: "We maintain the highest standards of medical practice, staying current with the latest advances in orthopaedic and gynaecological care.",
  },
  {
    icon: Shield,
    title: "Patient Safety First",
    desc: "Rigorous protocols and evidence-based medicine ensure every treatment decision is safe, effective, and tailored to you.",
  },
  {
    icon: Users,
    title: "Community Trust",
    desc: "Rooted in Wakad for years, we've built lasting relationships with thousands of families who trust us with their health.",
  },
];

const milestones = [
  { year: "2012", title: "Clinic Founded", desc: "Star Ortho & Women Care opens its doors in Wakad, Pune." },
  { year: "2015", title: "Orthopaedic Wing Expanded", desc: "Added advanced joint care and sports injury treatment facilities." },
  { year: "2018", title: "Women's Health Centre", desc: "Launched dedicated women's health services with laparoscopic capabilities." },
  { year: "2021", title: "Digital Patient Portal", desc: "Introduced online appointment booking and digital health records." },
  { year: "2024", title: "5000+ Patients Milestone", desc: "Achieved a milestone of over 5000 patients successfully treated." },
];

function ClinicIllustration() {
  return (
    <svg viewBox="0 0 400 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Building base */}
      <rect x="80" y="120" width="240" height="180" rx="8" fill="rgba(20,184,166,0.1)" stroke="#0d9488" strokeWidth="1.5" />
      {/* Roof */}
      <path d="M60 120 L200 40 L340 120Z" fill="rgba(20,184,166,0.15)" stroke="#0d9488" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Door */}
      <rect x="170" y="220" width="60" height="80" rx="6" fill="rgba(20,184,166,0.2)" stroke="#0d9488" strokeWidth="1.5" />
      {/* Windows */}
      <rect x="100" y="150" width="50" height="45" rx="5" fill="rgba(20,184,166,0.15)" stroke="#0d9488" strokeWidth="1.2" />
      <rect x="250" y="150" width="50" height="45" rx="5" fill="rgba(20,184,166,0.15)" stroke="#0d9488" strokeWidth="1.2" />
      {/* Cross on building */}
      <rect x="188" y="70" width="24" height="60" rx="5" fill="rgba(20,184,166,0.35)" />
      <rect x="170" y="88" width="60" height="24" rx="5" fill="rgba(20,184,166,0.35)" />
      {/* Ground */}
      <line x1="40" y1="300" x2="360" y2="300" stroke="#0d9488" strokeWidth="1.5" opacity="0.3" />
      {/* Trees */}
      <circle cx="50" cy="240" r="22" fill="rgba(20,184,166,0.12)" stroke="#0d9488" strokeWidth="1" />
      <rect x="47" y="258" width="6" height="20" rx="2" fill="#0d9488" opacity="0.3" />
      <circle cx="350" cy="245" r="18" fill="rgba(20,184,166,0.12)" stroke="#0d9488" strokeWidth="1" />
      <rect x="347" y="260" width="6" height="18" rx="2" fill="#0d9488" opacity="0.3" />
      {/* Dots */}
      <circle cx="200" cy="30" r="4" fill="rgba(45,212,191,0.5)" />
      <circle cx="370" cy="120" r="5" fill="rgba(45,212,191,0.3)" />
      <circle cx="30" cy="180" r="4" fill="rgba(45,212,191,0.35)" />
    </svg>
  );
}

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white antialiased">
      <SiteNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/15 border border-teal-400/25 rounded-full text-teal-200 text-xs sm:text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                About Us
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4 sm:mb-6">
                Dedicated to Your<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400">
                  Health &amp; Wellbeing
                </span>
              </h1>
              <p className="text-slate-300/75 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Star Ortho &amp; Women Care is a premier specialist clinic in Wakad, Pune — delivering
                world-class orthopaedic and women&apos;s healthcare with compassion and precision.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setBookingOpen(true)}
                  className="flex items-center justify-center gap-2 px-7 py-3.5 bg-teal-500 hover:bg-teal-400 text-white font-bold rounded-xl transition-all hover:scale-[1.02] text-sm shadow-xl shadow-teal-500/20 w-full sm:w-auto"
                >
                  Book Appointment <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-center lg:block mt-6 lg:mt-0">
              <div className="w-full max-w-[260px] sm:max-w-[320px] lg:max-w-none h-[200px] sm:h-[260px] lg:h-full">
                <ClinicIllustration />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">Our Mission</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 mb-6 tracking-tight">
                Redefining Healthcare in Wakad
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Our mission is simple: provide every patient with the same quality of specialist care
                that was previously only available in big city hospitals — right in their neighborhood.
              </p>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Founded by Dr. Rahul Kalekar and Dr. Aparna Kalekar, our clinic combines deep
                clinical expertise with a warm, patient-first approach that has earned the trust of
                over 5000 families across Wakad and Pune.
              </p>
              <div className="space-y-3">
                {[
                  "Board-certified orthopaedic and gynaecological care",
                  "Modern diagnostic and surgical equipment",
                  "Transparent pricing and personalized treatment plans",
                  "Online booking and digital health records",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "2+", label: "Specialist Doctors" },
                { value: "10+", label: "Years Experience" },
                { value: "5000+", label: "Patients Treated" },
                { value: "98%", label: "Satisfaction Rate" },
              ].map((s) => (
                <div key={s.label}
                  className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-100 text-center hover:border-teal-200 hover:bg-teal-50/30 transition-all">
                  <div className="text-3xl sm:text-4xl font-extrabold text-teal-700 mb-1">{s.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">Our Values</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              What Drives Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-4 group-hover:bg-teal-100 transition-colors">
                  <v.icon className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-[15px] mb-2">{v.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-14">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">Our Journey</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight">
              A Decade of Care
            </h2>
          </div>
          <div className="relative pl-0">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-teal-100" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex gap-4 sm:gap-8">
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-extrabold z-10 relative ${
                      i === milestones.length - 1
                        ? "bg-teal-600 border-teal-600 text-white"
                        : "bg-white border-teal-200 text-teal-700"
                    }`}>
                      {m.year.slice(2)}
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-100 flex-1 hover:border-teal-100 transition-colors">
                    <div className="text-xs font-bold text-teal-600 uppercase tracking-wide mb-1">{m.year}</div>
                    <h3 className="font-bold text-slate-900 mb-1">{m.title}</h3>
                    <p className="text-slate-500 text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
              <MapPin className="h-6 w-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-lg mb-1">Visit Us</h3>
              <p className="text-slate-500 text-sm">
                Sanskruti Arcade, Ground Floor, Shop 6, Wakad, Pune, Maharashtra
              </p>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all text-sm w-full sm:w-auto"
            >
              Book Appointment <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <SiteFooter />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
