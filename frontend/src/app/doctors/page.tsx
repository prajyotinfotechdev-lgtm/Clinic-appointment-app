"use client";

import { useState } from "react";
import { SiteNav } from "@/components/clinic/SiteNav";
import { SiteFooter } from "@/components/clinic/SiteFooter";
import { BookingModal } from "@/components/clinic/BookingModal";
import { ArrowRight, CheckCircle, Award, Clock, Star } from "lucide-react";

const doctors = [
  {
    initial: "RK",
    name: "Dr. Rahul Kalekar",
    qualifications: "MBBS, DNB, D.ORTHO, FIJR",
    title: "Consultant Orthopaedic Surgeon",
    color: "teal" as const,
    experience: "10+ Years",
    expertise: "Orthopaedic Surgery & Joint Replacement",
    about:
      "Dr. Rahul Kalekar is a highly skilled orthopaedic surgeon with extensive training in joint replacement, fracture management, and sports medicine. He completed his DNB in Orthopaedics and holds the prestigious FIJR fellowship in Joint Replacement surgery.",
    specializations: [
      { name: "Joint Pain Treatment", desc: "Comprehensive diagnosis and treatment of all joint-related conditions including arthritis." },
      { name: "Fracture Management", desc: "Advanced surgical and non-surgical fracture care with rapid recovery protocols." },
      { name: "Sports Injury Care", desc: "Specialized treatment for ligament tears, muscle injuries, and sports-related trauma." },
      { name: "Knee Pain Treatment", desc: "From conservative management to knee replacement for all stages of knee disorders." },
      { name: "Shoulder Pain Treatment", desc: "Rotator cuff repairs, impingement syndrome, and shoulder instability treatment." },
      { name: "Orthopaedic Consultation", desc: "Expert second opinions and comprehensive musculoskeletal evaluations." },
    ],
    achievements: [
      "FIJR Fellowship — Joint Replacement Surgery",
      "DNB Orthopaedics — Board Certified",
      "D.ORTHO — Diploma in Orthopaedics",
      "Member, Indian Orthopaedic Association",
    ],
  },
  {
    initial: "AK",
    name: "Dr. Aparna Kalekar",
    qualifications: "MBBS, MS OBGY",
    title: "Laparoscopic Surgeon & Consultant Obstetrician & Gynaecologist",
    color: "rose" as const,
    experience: "10+ Years",
    expertise: "Obstetrics, Gynaecology & Laparoscopic Surgery",
    about:
      "Dr. Aparna Kalekar is a compassionate obstetrician and gynaecologist with a master's degree in OB-GYN. She specializes in high-risk pregnancies, minimally invasive laparoscopic surgery, and comprehensive women's health care throughout all life stages.",
    specializations: [
      { name: "Pregnancy Care", desc: "Complete antenatal, intrapartum, and postnatal care for normal and high-risk pregnancies." },
      { name: "Gynecology Consultation", desc: "Comprehensive women's health assessments covering all gynaecological concerns." },
      { name: "PCOS Treatment", desc: "Evidence-based management of polycystic ovary syndrome with lifestyle and medical therapy." },
      { name: "Menstrual Disorders", desc: "Diagnosis and treatment of irregular periods, heavy bleeding, and menstrual pain." },
      { name: "Laparoscopic Surgery", desc: "Minimally invasive surgical procedures including fibroids, cysts, and endometriosis." },
      { name: "Women's Health Care", desc: "Preventive screenings, contraceptive counselling, and menopause management." },
    ],
    achievements: [
      "MS OB-GYN — Master of Surgery",
      "MBBS — Bachelor of Medicine & Surgery",
      "Advanced Laparoscopic Surgery Training",
      "Member, Federation of Obstetric and Gynaecological Societies of India",
    ],
  },
];

function DoctorSVG({ color }: { color: "teal" | "rose" }) {
  const c = color === "teal" ? { ring: "rgba(20,184,166,0.2)", dot: "#2dd4bf", fill: "rgba(20,184,166,0.12)" }
    : { ring: "rgba(244,63,94,0.2)", dot: "#f43f5e", fill: "rgba(244,63,94,0.1)" };
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="60" cy="60" r="55" stroke={c.ring} strokeWidth="1.5" />
      <circle cx="60" cy="60" r="42" fill={c.fill} />
      {/* Head */}
      <circle cx="60" cy="42" r="16" fill={c.fill} stroke={c.dot} strokeWidth="1.5" />
      {/* Body */}
      <path d="M32 95 C32 78 44 68 60 68 C76 68 88 78 88 95" fill={c.fill} stroke={c.dot} strokeWidth="1.5" strokeLinecap="round" />
      {/* Stethoscope */}
      <path d="M52 80 Q50 88 54 92 Q58 96 60 96 Q62 96 66 92 Q70 88 68 80" stroke={c.dot} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="98" r="3" fill={c.dot} opacity="0.7" />
    </svg>
  );
}

export default function DoctorsPage() {
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
            <Star className="h-3.5 w-3.5 fill-teal-300 text-teal-300" />
            Board-Certified Specialists
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-4 sm:mb-5">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400">
              Expert Doctors
            </span>
          </h1>
          <p className="text-slate-300/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Highly qualified specialists dedicated to delivering the best possible outcomes for every patient.
          </p>
        </div>
      </section>

      {/* Doctor Cards */}
      <section className="py-10 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 lg:space-y-16">
          {doctors.map((doc, idx) => (
            <div key={doc.name} className={`grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Profile card */}
              <div className={`rounded-3xl overflow-hidden border shadow-sm ${doc.color === "teal" ? "border-teal-100" : "border-rose-100"}`}>
                <div className={`h-2 ${doc.color === "teal" ? "bg-gradient-to-r from-teal-500 to-teal-600" : "bg-gradient-to-r from-rose-400 to-pink-500"}`} />
                <div className="p-5 sm:p-8">
                  {/* Header: side-by-side on mobile, centered column on sm+ */}
                  <div className="flex items-center gap-4 sm:flex-col sm:items-center sm:text-center mb-4 sm:mb-5">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 shrink-0">
                      <DoctorSVG color={doc.color} />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-slate-900 text-lg sm:text-xl">{doc.name}</h2>
                      <p className={`text-sm font-bold mt-0.5 ${doc.color === "teal" ? "text-teal-600" : "text-rose-500"}`}>
                        {doc.qualifications}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5 font-medium leading-snug">{doc.title}</p>
                    </div>
                  </div>
                  <div className="flex sm:justify-center gap-4 mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-slate-100">
                    <div className="text-center">
                      <div className={`text-lg font-extrabold ${doc.color === "teal" ? "text-teal-700" : "text-rose-600"}`}>{doc.experience}</div>
                      <div className="text-xs text-slate-400 font-medium">Experience</div>
                    </div>
                    <div className="w-px bg-slate-100" />
                    <div className="text-center">
                      <div className="flex items-center gap-0.5 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3.5 w-3.5 ${i < 5 ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                        ))}
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">Top Rated</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setBookingOpen(true)}
                    className={`flex items-center justify-center gap-2 w-full mt-4 sm:mt-5 py-3 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] ${
                      doc.color === "teal"
                        ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/20"
                        : "bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-400/20"
                    }`}
                  >
                    Book with {doc.name.split(" ")[1]} <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-[0.15em] ${doc.color === "teal" ? "text-teal-600" : "text-rose-500"}`}>
                    {doc.expertise}
                  </span>
                  <h3 className="text-2xl font-extrabold text-slate-900 mt-2 mb-3">About {doc.name}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{doc.about}</p>
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className={`h-5 w-5 ${doc.color === "teal" ? "text-teal-600" : "text-rose-500"}`} />
                    <h4 className="font-bold text-slate-900">Qualifications &amp; Achievements</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {doc.achievements.map((a) => (
                      <div key={a} className={`flex items-center gap-2.5 p-3 rounded-xl border text-sm font-medium ${
                        doc.color === "teal" ? "bg-teal-50/50 border-teal-100 text-teal-900" : "bg-rose-50/50 border-rose-100 text-rose-900"
                      }`}>
                        <CheckCircle className={`h-3.5 w-3.5 shrink-0 ${doc.color === "teal" ? "text-teal-500" : "text-rose-400"}`} />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specializations */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className={`h-5 w-5 ${doc.color === "teal" ? "text-teal-600" : "text-rose-500"}`} />
                    <h4 className="font-bold text-slate-900">Areas of Specialization</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {doc.specializations.map((s) => (
                      <div key={s.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <h5 className="font-bold text-slate-900 text-sm mb-1">{s.name}</h5>
                        <p className="text-slate-500 text-xs leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-700 to-teal-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Ready to Meet Our Specialists?</h2>
          <p className="text-teal-100/65 mb-8 text-sm sm:text-base leading-relaxed">Book your consultation today and take the first step toward better health.</p>
          <button
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-900 font-extrabold rounded-xl hover:bg-teal-50 shadow-xl transition-all hover:scale-[1.02] text-sm w-full sm:w-auto justify-center"
          >
            Book Appointment <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <SiteFooter />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}
