"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone, MapPin, Clock, CheckCircle, ArrowRight, ChevronRight,
  Shield, Award, Star, Users, Activity, Heart, Stethoscope, CalendarCheck,
} from "lucide-react";
import { SiteNav } from "@/components/clinic/SiteNav";
import { SiteFooter } from "@/components/clinic/SiteFooter";
import { BookingModal } from "@/components/clinic/BookingModal";

export interface ServiceSection {
  heading: string;
  content: string;
  list?: string[];
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface ServicePageProps {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  intro: string;
  sections: ServiceSection[];
  doctorName: string;
  doctorQual: string;
  doctorTitle: string;
  doctorInitial: string;
  color: "teal" | "rose";
  relatedLinks: RelatedLink[];
  whyPoints: string[];
}

const SECTION_ICONS = [Activity, Stethoscope, Heart, Shield, Award, Star, Users, CalendarCheck];

export function ServicePageLayout({
  heroTitle,
  heroSubtitle,
  heroBadge,
  intro,
  sections,
  doctorName,
  doctorQual,
  doctorTitle,
  doctorInitial,
  color,
  relatedLinks,
  whyPoints,
}: ServicePageProps) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const isTeal = color === "teal";
  const a = isTeal ? {
    heroBg: "from-teal-800 via-teal-700 to-teal-600",
    heroAccent: "bg-teal-500/20",
    badgeBg: "bg-teal-500/20 border-teal-400/40 text-teal-100",
    statsBg: "bg-teal-900/50",
    btnPrimary: "bg-white text-teal-800 hover:bg-teal-50",
    btnSecondary: "bg-teal-500/20 border border-teal-400/40 text-white hover:bg-teal-500/30",
    sectionBorder: "border-l-teal-500",
    sectionNumBg: "bg-teal-50 text-teal-700",
    listCheck: "text-teal-600",
    listItemBg: "bg-teal-50/60 border-teal-100",
    whyCard: "bg-teal-50 border-teal-100",
    whyIcon: "bg-teal-600 text-white",
    whyText: "text-teal-800",
    doctorGrad: "from-teal-900 via-teal-800 to-slate-900",
    doctorBadge: "bg-teal-500/20 text-teal-200 border-teal-500/30",
    doctorAvatar: "from-teal-400 to-teal-700",
    doctorBtn: "bg-teal-500 hover:bg-teal-400 text-white",
    infoCard: "border-teal-100",
    infoIcon: "text-teal-600 bg-teal-50",
    relatedLink: "hover:bg-teal-50 text-teal-700 hover:text-teal-800",
    ctaBg: "from-teal-800 to-teal-700",
    ctaBtn: "bg-white text-teal-900 hover:bg-teal-50",
    ctaBtnSec: "bg-teal-500/20 border-teal-400/40 text-white hover:bg-teal-500/30",
    accent: "text-teal-600",
    accentBg: "bg-teal-600",
    tagBg: "bg-teal-50 text-teal-700 border-teal-100",
  } : {
    heroBg: "from-rose-800 via-rose-700 to-pink-600",
    heroAccent: "bg-rose-500/20",
    badgeBg: "bg-rose-500/20 border-rose-400/40 text-rose-100",
    statsBg: "bg-rose-900/50",
    btnPrimary: "bg-white text-rose-800 hover:bg-rose-50",
    btnSecondary: "bg-rose-500/20 border border-rose-400/40 text-white hover:bg-rose-500/30",
    sectionBorder: "border-l-rose-500",
    sectionNumBg: "bg-rose-50 text-rose-700",
    listCheck: "text-rose-600",
    listItemBg: "bg-rose-50/60 border-rose-100",
    whyCard: "bg-rose-50 border-rose-100",
    whyIcon: "bg-rose-600 text-white",
    whyText: "text-rose-800",
    doctorGrad: "from-rose-900 via-rose-800 to-slate-900",
    doctorBadge: "bg-rose-500/20 text-rose-200 border-rose-500/30",
    doctorAvatar: "from-rose-400 to-rose-700",
    doctorBtn: "bg-rose-500 hover:bg-rose-400 text-white",
    infoCard: "border-rose-100",
    infoIcon: "text-rose-600 bg-rose-50",
    relatedLink: "hover:bg-rose-50 text-rose-700 hover:text-rose-800",
    ctaBg: "from-rose-800 to-rose-700",
    ctaBtn: "bg-white text-rose-900 hover:bg-rose-50",
    ctaBtnSec: "bg-rose-500/20 border-rose-400/40 text-white hover:bg-rose-500/30",
    accent: "text-rose-600",
    accentBg: "bg-rose-600",
    tagBg: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="min-h-screen bg-white antialiased">
      <SiteNav />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />

      {/* ── HERO ── */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${a.heroBg} pt-16 pb-10 sm:pt-24 sm:pb-16 lg:pt-28 lg:pb-20`}>
        {/* decorative circles */}
        <div className={`absolute -top-20 -right-20 w-96 h-96 rounded-full ${a.heroAccent} blur-3xl pointer-events-none`} />
        <div className={`absolute bottom-0 left-0 w-72 h-72 rounded-full ${a.heroAccent} blur-3xl pointer-events-none`} />
        {/* grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/90 font-semibold">{heroTitle}</span>
          </nav>

          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-5 border ${a.badgeBg}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {heroBadge}
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-5 leading-tight">
              {heroTitle}
            </h1>
            <p className="text-white/75 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-2xl leading-relaxed">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setBookingOpen(true)}
                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 font-bold rounded-xl shadow-xl transition-all hover:scale-105 w-full sm:w-auto ${a.btnPrimary}`}
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="tel:+918073311622"
                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 font-semibold rounded-xl backdrop-blur-sm transition-all hover:scale-105 w-full sm:w-auto ${a.btnSecondary}`}
              >
                <Phone className="h-4 w-4" /> Call: 8073311622
              </a>
            </div>
          </div>

          {/* Quick info bar */}
          <div className={`mt-8 sm:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4`}>
            {[
              { icon: MapPin, label: "Location", value: "Wakad, Pune" },
              { icon: Clock, label: "Clinic Hours", value: "5 PM – 9 PM Daily" },
              { icon: Phone, label: "Contact", value: "+91 80733 11622" },
              { icon: CalendarCheck, label: "Booking", value: "Available Online" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl ${a.statsBg} backdrop-blur-sm border border-white/10`}>
                <Icon className="h-4 w-4 text-white/70 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-wider">{label}</p>
                  <p className="text-xs font-bold text-white">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO BAND ── */}
      <section className="bg-white border-b border-slate-100 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{intro}</p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Article */}
            <article className="lg:col-span-2 space-y-6">
              {sections.map((section, i) => {
                const Icon = SECTION_ICONS[i % SECTION_ICONS.length];
                return (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl border border-l-4 ${a.sectionBorder} border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className="p-6 sm:p-8">
                      {/* Section header */}
                      <div className="flex items-start gap-4 mb-5">
                        <div className={`w-10 h-10 rounded-xl ${a.sectionNumBg} flex items-center justify-center shrink-0`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug pt-1">
                          {section.heading}
                        </h2>
                      </div>

                      <p className="text-slate-600 leading-relaxed text-sm sm:text-base mb-5">
                        {section.content}
                      </p>

                      {section.list && (
                        <ul className="space-y-2.5">
                          {section.list.map((item, j) => (
                            <li
                              key={j}
                              className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${a.listItemBg}`}
                            >
                              <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${a.listCheck}`} />
                              <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Why Choose Section */}
              <div className={`bg-white rounded-2xl border border-l-4 ${a.sectionBorder} border-slate-100 shadow-sm p-6 sm:p-8`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-10 h-10 rounded-xl ${a.sectionNumBg} flex items-center justify-center shrink-0`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 pt-1">
                    Why Choose Kalekar&apos;s Star Clinic in Wakad?
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {whyPoints.map((point, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl border ${a.listItemBg}`}>
                      <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${a.listCheck}`} />
                      <span className="text-slate-700 text-sm leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5 lg:sticky lg:top-24 self-start">
              {/* Doctor Card */}
              <div className={`rounded-2xl overflow-hidden bg-gradient-to-br ${a.doctorGrad} text-white`}>
                <div className="p-6">
                  <p className={`text-[10px] font-bold uppercase tracking-widest mb-4 border rounded-full px-3 py-1 inline-block ${a.doctorBadge}`}>
                    Your Specialist
                  </p>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${a.doctorAvatar} flex items-center justify-center font-extrabold text-2xl shadow-lg shrink-0`}>
                      {doctorInitial}
                    </div>
                    <div>
                      <p className="font-extrabold text-lg leading-tight">{doctorName}</p>
                      <p className="text-white/60 text-xs font-bold mt-0.5">{doctorQual}</p>
                      <p className="text-white/50 text-xs mt-0.5">{doctorTitle}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mb-5 text-xs text-white/70">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      <span>Wakad, Pune – 411057</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      <span>5:00 PM – 9:00 PM, Everyday</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingOpen(true)}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${a.doctorBtn}`}
                  >
                    Book Appointment <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Contact Card */}
              <div className={`bg-white rounded-2xl border ${a.infoCard} p-5 space-y-4`}>
                <p className="font-extrabold text-slate-900 text-sm">Clinic Contact</p>
                <div className="flex gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.infoIcon}`}>
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-slate-600 text-xs leading-snug">Sanskruti Arcade, Ground Floor, Shop 6, Wakad, Pune – 411057</span>
                </div>
                <div className="flex gap-3 items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.infoIcon}`}>
                    <Phone className="h-4 w-4" />
                  </div>
                  <a href="tel:+918073311622" className={`font-bold text-sm ${a.accent}`}>+91 80733 11622</a>
                </div>
                <div className="flex gap-3 items-center">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.infoIcon}`}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <span className="text-slate-600 text-xs font-semibold">Everyday: 5:00 PM – 9:00 PM</span>
                </div>
              </div>

              {/* Related Services */}
              {relatedLinks.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-100 p-5">
                  <p className="font-extrabold text-slate-900 text-sm mb-3">Related Services</p>
                  <ul className="space-y-1">
                    {relatedLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className={`flex items-center justify-between gap-2 text-sm font-semibold px-3 py-2.5 rounded-xl transition-colors ${a.relatedLink}`}
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* ── TRUST FEATURES ── */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Award, title: "Qualified Specialists", desc: "Board certified doctors" },
              { icon: Shield, title: "Evidence-Based Care", desc: "Latest medical protocols" },
              { icon: Users, title: "Patient-Centred", desc: "Personalised treatment plans" },
              { icon: MapPin, title: "Wakad, Pune", desc: "Serving nearby communities" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className={`flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl border ${a.whyCard}`}>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${a.whyIcon}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className={`font-extrabold text-sm mb-1 ${a.whyText}`}>{title}</p>
                <p className="text-slate-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className={`py-16 bg-gradient-to-br ${a.ctaBg} relative overflow-hidden`}>
        <div className={`absolute -top-16 -right-16 w-64 h-64 rounded-full ${a.heroAccent} blur-3xl pointer-events-none`} />
        <div className="relative max-w-3xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Book a Consultation with {doctorName}
          </h2>
          <p className="text-white/70 mb-8 text-sm sm:text-base">
            Kalekar&apos;s Star Ortho &amp; Women Care Clinic — Sanskruti Arcade, Wakad, Pune – 411057
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setBookingOpen(true)}
              className={`inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 font-bold rounded-xl shadow-xl transition-all hover:scale-105 w-full sm:w-auto ${a.ctaBtn}`}
            >
              Book Appointment <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="tel:+918073311622"
              className={`inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 border font-bold rounded-xl backdrop-blur-sm transition-all hover:scale-105 w-full sm:w-auto ${a.ctaBtnSec}`}
            >
              <Phone className="h-4 w-4" /> 8073311622
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
