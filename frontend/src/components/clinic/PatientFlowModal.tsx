"use client";

import { useState } from "react";
import { X, ArrowRight, ArrowLeft, Check, Stethoscope, Heart } from "lucide-react";

type Category = "orthopedic" | "gynecology" | null;
type Step = "category" | "symptom" | "recommendation";

interface Symptom {
  id: string;
  name: string;
  icon?: string;
}

const orthopedicSymptoms: Symptom[] = [
  { id: "knee-pain", name: "Knee Pain" },
  { id: "back-pain", name: "Back Pain" },
  { id: "joint-pain", name: "Joint Pain" },
  { id: "fracture", name: "Fracture" },
  { id: "sports-injury", name: "Sports Injury" },
  { id: "arthritis", name: "Arthritis" },
  { id: "neck-pain", name: "Neck Pain" },
  { id: "shoulder-pain", name: "Shoulder Pain" },
];

const gynecologySymptoms: Symptom[] = [
  { id: "irregular-periods", name: "Irregular Periods" },
  { id: "pregnancy", name: "Pregnancy Consultation" },
  { id: "pcos", name: "PCOS / Hormonal Issues" },
  { id: "pelvic-pain", name: "Pelvic Pain" },
  { id: "infertility", name: "Infertility Consultation" },
  { id: "menopause", name: "Menopause Issues" },
  { id: "checkup", name: "General Women's Health Checkup" },
];

const doctorInfo = {
  orthopedic: {
    name: "Dr. Rahul Kalekar",
    qualifications: "MBBS, DNB, D.ORTHO, FIJR",
    title: "Consultant Orthopaedic Surgeon",
    description: "Specialized in joint pain treatment, fracture management, sports injuries, and comprehensive orthopaedic care with over 10 years of experience.",
    color: "teal" as const,
  },
  gynecology: {
    name: "Dr. Aparna Kalekar",
    qualifications: "MBBS, MS OBGY",
    title: "Laparoscopic Surgeon & Gynaecologist",
    description: "Expert in pregnancy care, gynecology consultation, PCOS treatment, and women's health with advanced laparoscopic surgical expertise.",
    color: "rose" as const,
  },
};

interface PatientFlowModalProps {
  open: boolean;
  onClose: () => void;
  onBookAppointment: (category: Category, symptom: string) => void;
}

export function PatientFlowModal({ open, onClose, onBookAppointment }: PatientFlowModalProps) {
  const [step, setStep] = useState<Step>("category");
  const [selectedCategory, setSelectedCategory] = useState<Category>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<string>("");

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setStep("symptom");
  };

  const handleSymptomSelect = (symptomId: string) => {
    setSelectedSymptom(symptomId);
  };

  const handleSubmit = () => {
    if (selectedSymptom) {
      setStep("recommendation");
    }
  };

  const handleBooking = () => {
    onBookAppointment(selectedCategory, selectedSymptom);
    handleClose();
  };

  const handleClose = () => {
    setStep("category");
    setSelectedCategory(null);
    setSelectedSymptom("");
    onClose();
  };

  const handleBack = () => {
    if (step === "symptom") {
      setStep("category");
      setSelectedCategory(null);
      setSelectedSymptom("");
    } else if (step === "recommendation") {
      setStep("symptom");
      setSelectedSymptom("");
    }
  };

  const symptoms = selectedCategory === "orthopedic" ? orthopedicSymptoms : gynecologySymptoms;
  const doctor = selectedCategory ? doctorInfo[selectedCategory] : null;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-4 sm:px-6 sm:py-5 text-white flex-shrink-0">
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold">Find Your Care</h2>
              <p className="text-xs sm:text-sm text-teal-100">We'll guide you to the right specialist</p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-1 sm:gap-2">
            {["category", "symptom", "recommendation"].map((s, idx) => (
              <div key={s} className="flex items-center flex-1">
                <div className={`flex items-center gap-1.5 sm:gap-2 flex-1 ${
                  step === s ? "opacity-100" : step === "symptom" && s === "category" || step === "recommendation" && s !== "recommendation" ? "opacity-100" : "opacity-40"
                }`}>
                  <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                    step === s ? "bg-white text-teal-600" : 
                    step === "symptom" && s === "category" || step === "recommendation" && s !== "recommendation" ? "bg-white/30 text-white" : "bg-white/20 text-white/60"
                  }`}>
                    {step === "symptom" && s === "category" || step === "recommendation" && s !== "recommendation" ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : idx + 1}
                  </div>
                  <span className="text-[10px] sm:text-xs font-semibold hidden sm:block">
                    {s === "category" ? "Choose Care" : s === "symptom" ? "Select Issue" : "Get Recommendation"}
                  </span>
                </div>
                {idx < 2 && <div className="w-4 sm:w-8 h-0.5 bg-white/30 mx-0.5 sm:mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-1">
          {/* Step 1: Category Selection */}
          {step === "category" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 px-2">What type of care do you need?</h3>
                <p className="text-sm sm:text-base text-slate-500 px-2">Select the healthcare category that matches your needs</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Orthopedic Card */}
                <button
                  onClick={() => handleCategorySelect("orthopedic")}
                  className="group relative bg-gradient-to-br from-teal-50 to-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-teal-100 hover:border-teal-400 hover:shadow-xl transition-all duration-300 text-left"
                >
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-100 group-hover:bg-teal-200 flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 pr-12">Orthopedic Care</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 pr-12">Joint pain, fractures, sports injuries, and bone-related issues</p>
                  <div className="flex items-center gap-2 text-teal-600 font-bold text-xs sm:text-sm">
                    Select <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>

                {/* Gynecology Card */}
                <button
                  onClick={() => handleCategorySelect("gynecology")}
                  className="group relative bg-gradient-to-br from-rose-50 to-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-rose-100 hover:border-rose-400 hover:shadow-xl transition-all duration-300 text-left"
                >
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 group-hover:bg-rose-200 flex items-center justify-center transition-colors">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-rose-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-2 pr-12">Women's Care</h4>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4 pr-12">Gynecology, pregnancy care, PCOS, and women's health issues</p>
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs sm:text-sm">
                    Select <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Symptom Selection */}
          {step === "symptom" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 px-2">What brings you in today?</h3>
                <p className="text-sm sm:text-base text-slate-500 px-2">Select the issue you're experiencing</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {symptoms.map((symptom) => (
                  <button
                    key={symptom.id}
                    onClick={() => handleSymptomSelect(symptom.id)}
                    className={`relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-left ${
                      selectedSymptom === symptom.id
                        ? selectedCategory === "orthopedic"
                          ? "border-teal-500 bg-teal-50 shadow-md"
                          : "border-rose-500 bg-rose-50 shadow-md"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm sm:text-base text-slate-900">{symptom.name}</span>
                      {selectedSymptom === symptom.id && (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 ${
                          selectedCategory === "orthopedic" ? "bg-teal-500" : "bg-rose-500"
                        }`}>
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-2.5 sm:gap-3 pt-3 sm:pt-4">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg sm:rounded-xl transition-all text-sm sm:text-base"
                >
                  <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!selectedSymptom}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 font-bold rounded-lg sm:rounded-xl transition-all text-sm sm:text-base ${
                    selectedSymptom
                      ? selectedCategory === "orthopedic"
                        ? "bg-teal-600 hover:bg-teal-700 text-white shadow-lg"
                        : "bg-rose-600 hover:bg-rose-700 text-white shadow-lg"
                      : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Continue <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Doctor Recommendation */}
          {step === "recommendation" && doctor && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-4 sm:mb-6">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-green-50 border border-green-200 rounded-full mb-3 sm:mb-4">
                  <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600" />
                  <span className="text-xs sm:text-sm font-bold text-green-700">Perfect Match Found!</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-2 px-2">We recommend</h3>
                <p className="text-sm sm:text-base text-slate-500 px-2">Based on your needs, here's the best specialist for you</p>
              </div>

              <div className={`relative bg-gradient-to-br rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border-2 ${
                doctor.color === "teal"
                  ? "from-teal-50 to-white border-teal-200"
                  : "from-rose-50 to-white border-rose-200"
              }`}>
                <div className="flex items-start gap-3 sm:gap-5 mb-4 sm:mb-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl flex items-center justify-center font-extrabold text-xl sm:text-2xl text-white shrink-0 shadow-lg ${
                    doctor.color === "teal"
                      ? "bg-gradient-to-br from-teal-400 to-teal-700"
                      : "bg-gradient-to-br from-rose-400 to-pink-600"
                  }`}>
                    {doctor.name.split(" ")[1][0]}{doctor.name.split(" ")[2][0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-2xl font-extrabold text-slate-900 mb-1">{doctor.name}</h4>
                    <p className={`text-xs sm:text-sm font-bold mb-1 ${
                      doctor.color === "teal" ? "text-teal-600" : "text-rose-600"
                    }`}>
                      {doctor.qualifications}
                    </p>
                    <p className="text-slate-600 text-xs sm:text-sm font-semibold">{doctor.title}</p>
                  </div>
                </div>

                <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl mb-4 sm:mb-6 ${
                  doctor.color === "teal" ? "bg-teal-50/50" : "bg-rose-50/50"
                }`}>
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{doctor.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                  <button
                    onClick={handleBack}
                    className="flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg sm:rounded-xl transition-all text-sm sm:text-base order-2 sm:order-1"
                  >
                    <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Back
                  </button>
                  <button
                    onClick={handleBooking}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-extrabold rounded-lg sm:rounded-xl transition-all shadow-xl text-sm sm:text-base order-1 sm:order-2 ${
                      doctor.color === "teal"
                        ? "bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white"
                        : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white"
                    }`}
                  >
                    <Check className="h-4 w-4 sm:h-5 sm:w-5" /> 
                    <span className="hidden sm:inline">Book Appointment with {doctor.name.split(" ")[1]}</span>
                    <span className="sm:hidden">Book with {doctor.name.split(" ")[1]}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
