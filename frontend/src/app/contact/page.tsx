"use client";

import { useState } from "react";
import { SiteNav } from "@/components/clinic/SiteNav";
import { SiteFooter } from "@/components/clinic/SiteFooter";
import { BookingModal } from "@/components/clinic/BookingModal";
import { Phone, MapPin, Clock, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";

const hours = [
  { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
  { day: "Saturday", time: "9:00 AM – 6:00 PM" },
  { day: "Sunday", time: "10:00 AM – 2:00 PM" },
];

export default function ContactPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white antialiased">
      <SiteNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/15 border border-teal-400/25 rounded-full text-teal-200 text-xs sm:text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            We&apos;re Here to Help
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-5">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400">
              Touch
            </span>
          </h1>
          <p className="text-slate-300/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Have questions or ready to book? Reach out by phone, WhatsApp, or visit us in Wakad.
          </p>
        </div>
      </section>

      {/* Quick action bar */}
      <div className="bg-white border-b border-slate-100 py-6 sm:py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a href="tel:+918073311622"
              className="flex items-center gap-4 p-4 bg-teal-50 hover:bg-teal-100 border border-teal-100 rounded-2xl transition-all group">
              <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-teal-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-teal-500/20">
                <Phone className="h-6 w-6 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-teal-600 uppercase tracking-wide">Call Us</div>
                <div className="font-bold text-slate-900 text-sm">+91 80733 11622</div>
              </div>
            </a>
            <a href="https://wa.me/918073311622" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-green-50 hover:bg-green-100 border border-green-100 rounded-2xl transition-all group">
              <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-md shadow-green-400/20">
                <MessageCircle className="h-6 w-6 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <div className="text-xs font-bold text-green-600 uppercase tracking-wide">WhatsApp</div>
                <div className="font-bold text-slate-900 text-sm">Message Us Now</div>
              </div>
            </a>
            <button onClick={() => setBookingOpen(true)}
              className="flex items-center gap-4 p-4 bg-slate-900 hover:bg-teal-900 border border-slate-800 rounded-2xl transition-all group text-left">
              <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-xl bg-teal-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <svg className="h-6 w-6 sm:h-5 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wide">Appointments</div>
                <div className="font-bold text-white text-sm">Book a Slot</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 lg:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Map */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-5 tracking-tight">Find Our Clinic</h2>
              <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl h-64 sm:h-[440px] mb-5">
                <iframe
                  src="https://maps.google.com/maps?q=Wakad+Pune+Maharashtra+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Star Ortho & Women Care Location"
                />
              </div>
              <a
                href="https://maps.google.com/?q=Wakad+Pune+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-all w-full sm:w-auto"
              >
                <MapPin className="h-4 w-4" /> Get Directions
              </a>
            </div>

            {/* Contact details */}
            <div className="lg:col-span-2 space-y-5">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Contact Details</h2>

              {/* Address */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm mb-1">Clinic Address</div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Sanskruti Arcade,<br />
                      Ground Floor, Shop 6,<br />
                      Wakad, Pune,<br />
                      Maharashtra — 411057
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-sm mb-1">Phone &amp; WhatsApp</div>
                    <p className="text-slate-500 text-sm mb-3">+91 80733 11622</p>
                    <div className="flex gap-2">
                      <a href="tel:+918073311622"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 text-white text-xs font-bold rounded-lg hover:bg-teal-700 transition-colors">
                        <Phone className="h-3 w-3" /> Call
                      </a>
                      <a href="https://wa.me/918073311622" target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors">
                        <MessageCircle className="h-3 w-3" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-slate-900 text-sm mb-3">Clinic Hours</div>
                    <div className="space-y-2">
                      {hours.map((h) => (
                        <div key={h.day} className="flex justify-between items-center">
                          <span className="text-slate-600 text-xs sm:text-sm font-medium">{h.day}</span>
                          <span className="text-teal-700 text-xs sm:text-sm font-bold">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Book CTA */}
              <button
                onClick={() => setBookingOpen(true)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-bold rounded-2xl transition-all hover:scale-[1.01] shadow-lg shadow-teal-500/20 text-sm"
              >
                Book Appointment <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">FAQ</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-3 tracking-tight">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Do I need a referral to visit the clinic?",
                a: "No referral is needed. You can book directly through our online portal or call us to schedule an appointment.",
              },
              {
                q: "How do I book an appointment online?",
                a: "Click 'Book Appointment' on any page, then choose to call us, WhatsApp us, or book through our online patient portal at /register.",
              },
              {
                q: "What should I bring to my first appointment?",
                a: "Please bring any previous medical reports, X-rays or scans, a list of current medications, and your Aadhar/ID card.",
              },
              {
                q: "Is emergency care available?",
                a: "For urgent orthopaedic injuries or obstetric emergencies, please call us immediately at +91 80733 11622.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1.5">{item.q}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
