"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { BookingModal } from "./BookingModal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Doctors", href: "/doctors" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export function SiteNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-2" 
            : "bg-white/40 backdrop-blur-md border-b border-white/20 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">
            {/* Logo - Left */}
            <Link href="/" className="flex items-center gap-3.5 shrink-0 group z-[101] relative" onClick={() => setMobileOpen(false)}>
              <div className="relative w-[46px] h-[46px] rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all">
                <Image
                  src="/logo.png"
                  alt="Dr. Kalekar Star Clinic"
                  fill
                  sizes="46px"
                  className="object-contain p-1.5"
                />
              </div>
              <div className="hidden lg:block leading-[1.15]">
                <span className="font-extrabold text-[15px] bg-clip-text text-transparent bg-gradient-to-r from-teal-950 to-teal-800 tracking-tight block">
                  Dr. Kalekar Star Clinic
                </span>
              </div>
            </Link>

            {/* Clinic Name - Center (Mobile Only) */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:hidden">
              <div className="text-center leading-tight">
                <div className="font-extrabold text-[14px] bg-clip-text text-transparent bg-gradient-to-r from-teal-950 to-teal-800 tracking-tight whitespace-nowrap">
                  Dr. Kalekar Star Clinic
                </div>
              </div>
            </div>

            {/* Desktop nav - Center */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-slate-200/50 shadow-sm absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive(link.href)
                      ? "bg-white text-teal-700 shadow-sm ring-1 ring-slate-100"
                      : "text-slate-600 hover:text-teal-700 hover:bg-white/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Desktop CTAs - Right */}
            <div className="hidden lg:flex items-center gap-3 ml-auto">
              <Link
                href="/login"
                className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-teal-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-teal-200 rounded-xl transition-all shadow-sm"
              >
                Patient Portal
              </Link>
              <button
                onClick={() => setBookingOpen(true)}
                className="group relative flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl overflow-hidden transition-all shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Book Appointment</span>
                <ArrowRight className="relative h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 shadow-sm active:scale-95 transition-all z-[101] relative"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        <div 
          className={`lg:hidden fixed left-0 right-0 z-[80] bg-white/98 backdrop-blur-2xl border-b border-slate-200/50 shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] overflow-y-auto ${
            mobileOpen ? "opacity-100 translate-y-0 top-[92px]" : "opacity-0 -translate-y-full top-[92px] pointer-events-none"
          }`}
          style={{ maxHeight: 'calc(100vh - 92px)' }}
        >
          <div className="max-w-7xl mx-auto px-5 py-8">
            <div className="flex flex-col gap-5 max-w-full">
            {navLinks.map((link, idx) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative py-4 px-5 rounded-2xl font-bold text-lg tracking-tight transition-all duration-300 ${
                  isActive(link.href) 
                    ? "bg-gradient-to-r from-teal-50 to-teal-100/50 text-teal-700 shadow-sm" 
                    : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                }`}
                style={{
                  transitionDelay: mobileOpen ? `${idx * 50}ms` : '0ms',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
                }}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive(link.href) && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal-500" />
                )}
              </Link>
            ))}
            </div>

            <div 
              className="mt-8 pt-6 border-t border-slate-200 flex flex-col gap-3 max-w-full"
              style={{
                transitionDelay: mobileOpen ? '250ms' : '0ms',
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-20px)',
              }}
            >
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full py-4 px-5 text-center text-base font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl active:scale-[0.98] transition-all"
              >
                Patient Portal
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setBookingOpen(true);
                }}
                className="w-full flex justify-center items-center gap-2 py-4 px-5 text-base font-bold text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 rounded-2xl shadow-lg shadow-teal-500/25 active:scale-[0.98] transition-all"
              >
                Book Appointment <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-[92px]" />

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
