"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Phone, MapPin, Clock, ChevronRight, ChevronLeft, CheckCircle, Shield, Award, Heart, Video, Users, TrendingUp, AlertCircle, ChevronDown, Activity, Stethoscope, Baby } from "lucide-react";
import { SiteNav } from "@/components/clinic/SiteNav";
import { SiteFooter } from "@/components/clinic/SiteFooter";
import { BookingModal } from "@/components/clinic/BookingModal";
import { PatientFlowModal } from "@/components/clinic/PatientFlowModal";

/* ─── Dataa ─── */
const stats = [
  { value: "2+", label: "Specialist Doctors", sub: "Board certified" },
  { value: "10+", label: "Years Experience", sub: "In Women's Health" },
  { value: "1000+", label: "Happy Patients", sub: "Treated successfully" },
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
    initial: "AK",
    name: "Dr. Aparna Kalekar",
    qualifications: "MBBS, MS - Obstetrics & Gynaecology",
    title: "Consultant Obstetrician & Gynaecologist | Laparoscopic Surgeon | IVF Specialist",
    fellowship: "Fellowship in Advanced Gynaec Endoscopy",
    experience: "10+ Years Experience",
    color: "rose" as const,
    specs: ["High-Risk Pregnancy Care", "Infertility Treatment", "PCOD/PCOS Treatment", "Menstrual Disorders"],
    description: "Dr. Aparna Kalekar is a dedicated and compassionate Obstetrician and Gynaecologist at Kalekar's Star Ortho & Women Care Clinic in Wakad, Pune. She provides comprehensive and personalized care for women across all stages of life. Her expertise includes pregnancy care, menstrual health, infertility evaluation, and overall women's wellness.",
  },
  {
    initial: "RK",
    name: "Dr. Rahul Kalekar",
    qualifications: "MBBS, DNB, D.ORTHO, FIJR",
    title: "Consultant Orthopaedic Surgeon",
    color: "teal" as const,
    specs: ["Knee Pain Treatment", "Joint Preservation", "Spine Care", "Arthritis Treatment"],
  },
];

const marqueeItems = [
  "Gynecologist in Wakad", "Best Gynecologist Wakad Pune", "PCOD Treatment Wakad",
  "Pregnancy Doctor Wakad", "Infertility Doctor Wakad", "High-Risk Pregnancy Care",
  "Knee Pain Treatment", "Joint Preservation", "Women's Health Clinic Wakad",
];


const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "You can easily book an appointment through our 'Find Your Care' feature on the website, call us at +91 80733 11622, or WhatsApp us. Our team will confirm your appointment within minutes."
  },
  {
    question: "Do you accept insurance?",
    answer: "Yes, we accept most major health insurance plans. Please bring your insurance card during your visit, and our staff will assist you with the claim process."
  },
  {
    question: "What are your clinic hours?",
    answer: "We're open everyday from 5:00 PM to 9:00 PM. We also offer emergency consultations - please call ahead."
  },
  {
    question: "Do you offer video consultations?",
    answer: "Yes! We provide secure video consultations for follow-ups and non-emergency cases. Book through our patient portal or call us to schedule your online appointment."
  },
  {
    question: "What should I bring for my first visit?",
    answer: "Please bring a valid ID, insurance card (if applicable), any previous medical records, current medications list, and relevant test reports for your condition."
  },
  {
    question: "Is parking available at the clinic?",
    answer: "Yes, we have ample parking space available at Sanskruti Arcade. The clinic is easily accessible with dedicated parking for patients."
  }
];

const trustBadges = [
  { icon: Shield, title: "Board Certified", desc: "Recognized specialists" },
  { icon: Award, title: "10+ Years", desc: "Combined experience" },
  { icon: Users, title: "5000+ Patients", desc: "Successfully treated" },
  { icon: TrendingUp, title: "98% Success", desc: "Patient satisfaction" }
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
  const [patientFlowOpen, setPatientFlowOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2;

  const handlePatientFlowComplete = (category: any, symptom: string) => {
    setSelectedCategory(category);
    setSelectedSymptom(symptom);
    setBookingOpen(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 7 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "@id": "https://drkalekarstarclinic.com",
            "name": "Kalekar's Star Ortho & Women Care Clinic",
            "alternateName": "Kalekar Star Clinic Wakad",
            "description": "Best Gynecologist in Wakad, Pune offering comprehensive women's healthcare, pregnancy care, PCOD treatment, infertility consultation, and orthopaedic services. Expert care by Dr. Aparna Kalekar and Dr. Rahul Kalekar.",
            "url": "https://drkalekarstarclinic.com",
            "logo": "https://drkalekarstarclinic.com/logo.png",
            "image": "https://drkalekarstarclinic.com/logo.png",
            "telephone": "+91-80733-11622",
            "email": "info@drkalekarstarclinic.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Sanskruti Arcade, Ground Floor, Shop 6",
              "addressLocality": "Wakad",
              "addressRegion": "Maharashtra",
              "postalCode": "411057",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "18.6123",
              "longitude": "73.7654"
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                "opens": "17:00",
                "closes": "21:00"
              }
            ],
            "priceRange": "$$",
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, Credit Card, Debit Card, UPI, Insurance",
            "medicalSpecialty": ["Orthopedic", "Gynecology", "Obstetrics"],
            "availableService": [
              { "@type": "MedicalProcedure", "name": "Joint Pain Treatment in Wakad", "url": "https://drkalekarstarclinic.com/joint-pain-treatment-wakad" },
              { "@type": "MedicalProcedure", "name": "Knee Pain Treatment in Wakad", "url": "https://drkalekarstarclinic.com/knee-pain-treatment-wakad" },
              { "@type": "MedicalProcedure", "name": "Spine Specialist in Wakad", "url": "https://drkalekarstarclinic.com/spine-specialist-wakad" },
              { "@type": "MedicalProcedure", "name": "Sports Injury Treatment in Wakad", "url": "https://drkalekarstarclinic.com/sports-injury-treatment-wakad" },
              { "@type": "MedicalProcedure", "name": "Shoulder Pain Treatment in Wakad", "url": "https://drkalekarstarclinic.com/shoulder-pain-treatment-wakad" },
              { "@type": "MedicalProcedure", "name": "Gynecologist Consultation in Wakad", "url": "https://drkalekarstarclinic.com/gynecologist-wakad" },
              { "@type": "MedicalProcedure", "name": "PCOS Treatment in Wakad", "url": "https://drkalekarstarclinic.com/pcos-treatment-wakad" },
              { "@type": "MedicalProcedure", "name": "Pregnancy Care in Wakad", "url": "https://drkalekarstarclinic.com/pregnancy-care-wakad" },
              { "@type": "MedicalProcedure", "name": "Menstrual Disorder Treatment in Wakad", "url": "https://drkalekarstarclinic.com/menstrual-disorder-treatment-wakad" },
              { "@type": "MedicalProcedure", "name": "Laparoscopic Surgery in Wakad", "url": "https://drkalekarstarclinic.com/laparoscopic-surgery-wakad" }
            ],
            "hasMap": "https://maps.app.goo.gl/EuFotrL9pr4GEsu28",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            },
            "sameAs": [
              "https://www.facebook.com/drkalekarstarclinic",
              "https://www.instagram.com/drkalekarstarclinic"
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Rahul Kalekar",
              "honorificPrefix": "Dr.",
              "jobTitle": "Consultant Orthopaedic Surgeon",
              "worksFor": {
                "@type": "MedicalClinic",
                "name": "Dr. Kalekar Star Clinic"
              },
              "medicalSpecialty": "Orthopedic Surgery",
              "hasCredential": "MBBS, DNB, D.ORTHO, FIJR",
              "knowsAbout": ["Joint Pain Treatment", "Fracture Management", "Sports Injury", "Orthopedic Surgery"],
              "telephone": "+91-80733-11622",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Wakad, Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "Physician",
              "name": "Dr. Aparna Kalekar",
              "honorificPrefix": "Dr.",
              "jobTitle": "Laparoscopic Surgeon & Gynaecologist",
              "worksFor": {
                "@type": "MedicalClinic",
                "name": "Dr. Kalekar Star Clinic"
              },
              "medicalSpecialty": ["Gynecology", "Obstetrics", "Laparoscopic Surgery"],
              "hasCredential": "MBBS, MS OBGY",
              "knowsAbout": ["Pregnancy Care", "PCOS Treatment", "Gynecology Consultation", "Laparoscopic Surgery"],
              "telephone": "+91-80733-11622",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Wakad, Pune",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              }
            }
          ])
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://drkalekarstarclinic.com",
            "name": "Kalekar's Star Ortho & Women Care Clinic",
            "description": "Best Gynecologist in Wakad, Pune - Comprehensive Women's Healthcare & Orthopaedic Services",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://drkalekarstarclinic.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

    <div className="min-h-screen bg-white text-slate-800 antialiased">
      <SiteNav />

      {/* ══════════════ HERO CAROUSEL ══════════════ */}
      <section className="relative overflow-hidden min-h-[100vh] sm:min-h-[85vh]">
        {/* Slide 1 - Orthopaedic Care */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0">
            <img
              src="/assets/img1.png"
              alt="Orthopaedic Care"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-sm border border-blue-200 rounded-full mb-4 sm:mb-6">
                  <Activity className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-600" />
                  <span className="text-xs sm:text-sm font-bold text-blue-600">Orthopaedic Department</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                  Orthopaedic Care
                </h1>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8 text-sm text-white/90 font-semibold">
                  <span>Knee Pain</span>
                  <span className="text-white/40">•</span>
                  <span>Spine Care</span>
                  <span className="text-white/40">•</span>
                  <span>Arthritis</span>
                  <span className="text-white/40">•</span>
                  <span>Sports Injuries</span>
                  <span className="text-white/40">•</span>
                  <span>Joint Treatment</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setPatientFlowOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm"
                  >
                    Find Your Care
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link href="/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-all hover:scale-105 text-sm">
                    Patient Portal
                  </Link>
                  <a href="tel:+918073311622"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-all hover:scale-105 text-sm">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 - Women's Health Care */}
        <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0">
            <img
              src="/assets/img2.png"
              alt="Women's Health Care"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/90 backdrop-blur-sm border border-rose-200 rounded-full mb-4 sm:mb-6">
                  <Baby className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-600" />
                  <span className="text-xs sm:text-sm font-bold text-rose-600">Women's Health Department</span>
                </div>
                
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                  Women's Health &amp; Pregnancy Care
                </h1>
                
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-5 sm:mb-8 text-sm text-white/90 font-semibold">
                  <span>PCOD Treatment</span>
                  <span className="text-white/40">•</span>
                  <span>Infertility Consultation</span>
                  <span className="text-white/40">•</span>
                  <span>Pregnancy Care</span>
                  <span className="text-white/40">•</span>
                  <span>Menstrual Health</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => setPatientFlowOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm"
                  >
                    Find Your Care
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link href="/login"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-all hover:scale-105 text-sm">
                    Patient Portal
                  </Link>
                  <a href="tel:+918073311622"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-lg transition-all hover:scale-105 text-sm">
                    <Phone className="h-4 w-4" />
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-slate-700 w-8' : 'bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
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

      {/* ══════════════ EMERGENCY BANNER ══════════════ */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-3 text-center flex-wrap">
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
            <p className="text-sm font-bold text-slate-800">
              <span className="text-red-600">Emergency?</span> Call us immediately at{" "}
              <a href="tel:+918073311622" className="text-teal-700 hover:text-teal-800 underline">+91 80733 11622</a>
              {" "}for urgent medical assistance
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════ WHY CHOOSE US ══════════════ */}
      <section className="py-16 sm:py-20 lg:py-32 relative bg-[#f8fafc] overflow-hidden">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-teal-100/40 rounded-[100%] blur-[100px] pointer-events-none max-w-full" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-20">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white border border-teal-100 rounded-full shadow-sm mb-5 sm:mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-teal-700 uppercase tracking-widest">Why Choose Us</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] px-4">
              Healthcare You Can <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Trust</span>
            </h2>
            <p className="text-slate-500 mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] leading-relaxed px-4">
              Combining clinical expertise with modern facilities for the best possible patient outcomes.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7">
            {features.map((f) => (
              <div key={f.title}
                className="relative bg-white/70 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 lg:p-8 border border-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-300 group z-10 overflow-hidden">
                {/* Glass reflection */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 to-transparent opacity-50" />
                
                <div className="relative w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100/50 flex items-center justify-center mb-3 sm:mb-6 border border-teal-100/50 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <f.icon className="h-5 w-5 sm:h-7 sm:w-7 text-teal-600 drop-shadow-sm" />
                </div>
                <h3 className="relative font-extrabold text-slate-900 text-sm sm:text-lg mb-1.5 sm:mb-3 tracking-tight leading-tight">{f.title}</h3>
                <p className="relative text-slate-500 text-xs sm:text-[15px] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ DOCTORS PREVIEW ══════════════ */}
      <section className="py-16 sm:py-20 lg:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-4 mb-10 sm:mb-12 lg:mb-16">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-teal-400 uppercase tracking-[0.15em]">Our Specialists</span>
              <h2 className="text-[1.75rem] sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 sm:mt-3 tracking-tight">
                Meet Our Doctors
              </h2>
            </div>
            <Link href="/doctors"
              className="inline-flex items-center gap-1.5 text-teal-400 text-sm font-bold hover:text-teal-300 transition-colors shrink-0">
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {doctors.map((doc) => (
              <div key={doc.name}
                className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 transition-all duration-300 group hover:-translate-y-1 shadow-xl hover:shadow-2xl">
                <div className="flex items-start gap-4 sm:gap-5 mb-5 sm:mb-6">
                  <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-2xl flex items-center justify-center font-extrabold text-xl sm:text-2xl text-white shrink-0 shadow-lg ${
                    doc.color === "teal"
                      ? "bg-gradient-to-br from-teal-400 to-teal-700"
                      : "bg-gradient-to-br from-rose-400 to-pink-600"
                  }`}>
                    {doc.initial}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base sm:text-lg lg:text-xl leading-tight">{doc.name}</h3>
                    <p className={`text-xs sm:text-sm font-bold mt-1 ${doc.color === "teal" ? "text-teal-400" : "text-rose-400"}`}>
                      {doc.qualifications}
                    </p>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1">{doc.title}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-2 mb-6 sm:mb-7">
                  {doc.specs.map((s) => (
                    <div key={s} className="flex items-center gap-2.5">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${doc.color === "teal" ? "bg-teal-400" : "bg-rose-400"}`} />
                      <span className="text-slate-300 text-xs sm:text-sm font-medium">{s}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setBookingOpen(true)}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base transition-all hover:scale-[1.02] shadow-lg ${
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
      <section className="py-16 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-4 mb-10 sm:mb-12 lg:mb-16">
            <div>
              <span className="text-[10px] sm:text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">What We Treat</span>
              <h2 className="text-[1.75rem] sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 sm:mt-3 tracking-tight">
                Our Services
              </h2>
            </div>
            <Link href="/services"
              className="inline-flex items-center gap-1.5 text-teal-600 text-sm font-bold hover:text-teal-700 transition-colors shrink-0">
              View All Services <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Orthopaedic Services */}
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shrink-0">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Orthopaedic Care</h3>
                  <p className="text-teal-600 text-sm font-bold">Dr. Rahul Kalekar — MBBS, DNB, D.ORTHO, FIJR</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Expert orthopedic care in Wakad, Pune for joint pain, sports injuries, spine problems, and musculoskeletal conditions.
              </p>
              <div className="space-y-2">
                {[
                  { label: "Joint Pain Treatment in Wakad", href: "/joint-pain-treatment-wakad" },
                  { label: "Knee Pain Treatment in Wakad", href: "/knee-pain-treatment-wakad" },
                  { label: "Spine Specialist in Wakad", href: "/spine-specialist-wakad" },
                  { label: "Sports Injury Treatment in Wakad", href: "/sports-injury-treatment-wakad" },
                  { label: "Shoulder Pain Treatment in Wakad", href: "/shoulder-pain-treatment-wakad" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-teal-100 hover:border-teal-300 hover:bg-teal-50 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-teal-500 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-teal-700">{item.label}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-teal-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Women's Health Services */}
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl border border-rose-100 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0">
                  <Baby className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Women&apos;s Health</h3>
                  <p className="text-rose-600 text-sm font-bold">Dr. Aparna Kalekar — MBBS, MS OBGY</p>
                </div>
              </div>
              <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                Best gynecologist in Wakad, Pune — expert in pregnancy care, PCOS treatment, laparoscopic surgery, and women&apos;s health.
              </p>
              <div className="space-y-2">
                {[
                  { label: "Gynecologist in Wakad Pune", href: "/gynecologist-wakad" },
                  { label: "PCOS / PCOD Treatment in Wakad", href: "/pcos-treatment-wakad" },
                  { label: "Pregnancy Care in Wakad", href: "/pregnancy-care-wakad" },
                  { label: "Menstrual Disorder Treatment", href: "/menstrual-disorder-treatment-wakad" },
                  { label: "Laparoscopic Surgery in Wakad", href: "/laparoscopic-surgery-wakad" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between gap-3 p-3 bg-white rounded-xl border border-rose-100 hover:border-rose-300 hover:bg-rose-50 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <CheckCircle className="h-4 w-4 text-rose-400 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-rose-700">{item.label}</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-rose-400 group-hover:translate-x-1 transition-transform shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* ══════════════ FAQ ══════════════ */}
      <section className="py-16 sm:py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-14 lg:mb-20">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full shadow-sm mb-5 sm:mb-6">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span className="text-[10px] sm:text-[11px] font-extrabold text-teal-700 uppercase tracking-widest">Common Questions</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] px-4">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Questions</span>
            </h2>
            <p className="text-slate-500 mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] leading-relaxed px-4">
              Everything you need to know about our services and appointments.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border-2 border-slate-200 rounded-2xl overflow-hidden hover:border-teal-300 hover:shadow-md transition-all">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 lg:p-7 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="font-extrabold text-slate-900 text-sm sm:text-base lg:text-lg pr-4 leading-tight">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 text-teal-600 shrink-0 transition-transform duration-300 ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaqIndex === idx ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-5 sm:px-6 lg:px-7 pb-5 sm:pb-6 lg:pb-7 pt-0">
                    <p className="text-slate-600 leading-[1.7] text-sm sm:text-base font-medium">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 sm:mt-12">
            <p className="text-slate-500 mb-4 text-sm sm:text-base">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:+918073311622"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition-all">
                <Phone className="w-4 h-4" /> Call Us Now
              </a>
              <a href="https://wa.me/918073311622" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.554 4.127 1.527 5.86L.057 23.95l6.264-1.644A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.819 9.819 0 01-5.012-1.374l-.36-.214-3.72.976 1.002-3.634-.234-.373A9.82 9.82 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section className="py-16 sm:py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10px] sm:text-xs font-bold text-teal-200 uppercase tracking-[0.15em]">Get Started Today</span>
          <h2 className="text-[1.75rem] sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 sm:mt-5 mb-5 sm:mb-6 tracking-tight max-w-2xl mx-auto leading-[1.15] px-4">
            Ready to Experience<br className="hidden sm:block" /><span className="sm:hidden"> </span>Premium Healthcare?
          </h2>
          <p className="text-teal-100/70 text-sm sm:text-base lg:text-lg max-w-lg mx-auto mb-8 sm:mb-10 leading-relaxed px-4">
            Schedule your appointment with our specialists in just a few clicks — or give us a call.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => setPatientFlowOpen(true)}
              className="flex items-center justify-center gap-2.5 px-7 py-4 sm:px-9 sm:py-4.5 bg-white text-teal-900 font-extrabold rounded-xl hover:bg-teal-50 shadow-2xl transition-all hover:scale-[1.03] active:scale-[0.98] text-base sm:text-base w-full sm:w-auto">
              <CheckCircle className="h-5 w-5" /> Find Your Care
            </button>
            <a href="tel:+918073311622"
              className="flex items-center justify-center gap-2.5 px-7 py-4 sm:px-9 sm:py-4.5 border-2 border-white/30 hover:border-white/50 text-white font-bold rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all text-base sm:text-base w-full sm:w-auto shadow-lg">
              <Phone className="h-5 w-5" /> Call +91 80733 11622
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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15124.936!2d73.7654!3d18.6123!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDM2JzQ0LjQiTiA3M8KwNDUnNTUuNiJF!5e0!3m2!1sen!2sin!4v1710328800000!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Dr. Kalekar Star Clinic Location"
              />
            </div>
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {[
                { icon: MapPin, title: "Address", body: "Sanskruti Arcade, Ground Floor, Shop 6, Wakad, Pune - 411057", extra: null },
                { icon: Phone, title: "Phone", body: "+91 80733 11622", extra: "call" },
                { icon: Clock, title: "Clinic Hours", body: "Everyday: 5:00 PM – 9:00 PM", extra: null },
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
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-3">
        <a href="https://wa.me/918073311622" target="_blank" rel="noopener noreferrer" title="WhatsApp"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-2xl shadow-green-500/40 transition-all hover:scale-110 active:scale-95 backdrop-blur-sm">
          <svg className="h-6 w-6 sm:h-7 sm:w-7 fill-white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.554 4.127 1.527 5.86L.057 23.95l6.264-1.644A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.819 9.819 0 01-5.012-1.374l-.36-.214-3.72.976 1.002-3.634-.234-.373A9.82 9.82 0 012.182 12C2.182 6.579 6.579 2.182 12 2.182S21.818 6.579 21.818 12 17.421 21.818 12 21.818z"/></svg>
        </a>
        <a href="tel:+918073311622" title="Call"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-2xl shadow-teal-500/40 transition-all hover:scale-110 active:scale-95 backdrop-blur-sm">
          <Phone className="h-6 w-6 sm:h-7 sm:w-7" />
        </a>
        <button onClick={() => setPatientFlowOpen(true)} title="Find Your Care"
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-900 hover:bg-teal-900 text-white flex items-center justify-center shadow-2xl shadow-slate-900/40 transition-all hover:scale-110 active:scale-95 backdrop-blur-sm">
          <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      <PatientFlowModal 
        open={patientFlowOpen} 
        onClose={() => setPatientFlowOpen(false)}
        onBookAppointment={handlePatientFlowComplete}
      />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
    </>
  );
}

