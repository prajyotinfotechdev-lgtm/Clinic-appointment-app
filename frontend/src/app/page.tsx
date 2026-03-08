import Link from "next/link";
import { Stethoscope, ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))] p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-teal-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-slate-100/60 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="text-center space-y-8 p-6 max-w-lg mx-auto z-10">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/20">
          <Stethoscope className="w-8 h-8 text-white" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Star Ortho & <br className="md:hidden" />Women Care
          </h1>
          <p className="text-sm md:text-base text-slate-500 max-w-md mx-auto leading-relaxed">
            Book, manage, and track your medical appointments with ease.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-xl font-semibold text-sm hover:bg-teal-700 transition-all"
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/register"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-700 border border-slate-200/60 shadow-[var(--shadow-card)] rounded-xl font-semibold text-sm hover:border-teal-200 transition-all"
          >
            Register as Patient
          </Link>
        </div>
      </div>
    </main>
  );
}
