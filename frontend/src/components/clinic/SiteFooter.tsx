import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, MessageCircle, Clock, ChevronRight, ArrowRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative bg-slate-950 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Soft top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-16 mb-10 md:mb-12 lg:mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12 rounded-2xl bg-white/10 backdrop-blur border border-white/10 flex items-center justify-center p-2 shadow-xl">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-[17px] text-white block tracking-tight">
                  Star Ortho &amp; Women Care
                </span>
                <span className="text-teal-400/80 text-[11px] font-bold tracking-widest uppercase mt-0.5 block">
                  Wakad, Pune
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-8 font-medium">
              A premium specialist clinic delivering world-class orthopaedic and women&apos;s healthcare with compassion, precision, and modern technology.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+918073311622"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/30 text-white text-xs font-bold rounded-xl transition-all group"
              >
                <Phone className="h-4 w-4 text-teal-400 group-hover:text-teal-300" /> Call Clinic
              </a>
              <a
                href="https://wa.me/918073311622"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-green-500/20 border border-white/10 hover:border-green-500/30 text-white text-xs font-bold rounded-xl transition-all group"
              >
                <MessageCircle className="h-4 w-4 text-green-400 group-hover:text-green-300" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-[0.2em] mb-6">
              Explore
            </h4>
            <div className="space-y-3.5">
              {[
                { name: "About Clinic", href: "/about" },
                { name: "Our Doctors", href: "/doctors" },
                { name: "Treatments", href: "/services" },
                { name: "Contact Us", href: "/contact" },
                { name: "Patient Portal", href: "/login" },
              ].map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="group flex items-center gap-2 text-slate-400 text-sm hover:text-teal-300 transition-colors font-semibold"
                >
                  <ChevronRight className="h-3.5 w-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all text-teal-500" />
                  {l.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-extrabold text-xs uppercase tracking-[0.2em] mb-6">
              Visit Us
            </h4>
            <div className="space-y-5">
              <div className="flex gap-3.5 text-slate-400 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="h-4 w-4 text-teal-400" />
                </div>
                <span className="leading-relaxed font-medium pt-1">
                  Sanskruti Arcade, Shop 6,
                  <br />
                  Wakad, Pune, Maharashtra
                </span>
              </div>
              
              <div className="flex gap-3.5 text-slate-400 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <Clock className="h-4 w-4 text-teal-400" />
                </div>
                <div className="space-y-1 font-medium pt-1">
                  <div>Everyday: <span className="text-slate-300">5pm – 9pm</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-slate-500 text-xs font-semibold">
            © {new Date().getFullYear()} Star Ortho &amp; Women Care. All rights reserved.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 text-teal-400 text-xs font-bold hover:text-teal-300 transition-colors">
            Access Patient Portal <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
