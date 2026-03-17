"use client";

import { useState } from "react";
import { SiteNav } from "@/components/clinic/SiteNav";
import { SiteFooter } from "@/components/clinic/SiteFooter";
import { BookingModal } from "@/components/clinic/BookingModal";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

/* ── Ultra-Premium Modern SVGs for Orthopaedic Services ── */
function JointPainSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-jp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="glass-bone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="pain-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#f87171" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <filter id="glassmorphism-jp">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
          <feBlend in="SourceGraphic" in2="glow" mode="normal" />
        </filter>
        <radialGradient id="accent-glow" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-jp)" />
      <rect width="400" height="240" fill="url(#accent-glow)" />
      
      {/* Background ambient shapes */}
      <circle cx="200" cy="120" r="110" fill="#ffffff" opacity="0.4" filter="blur(20px)" />
      <path d="M-50,200 Q150,50 450,150" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
      
      <g filter="url(#glassmorphism-jp)">
        {/* Abstract Top Bone Segment */}
        <path d="M 180,40 C 180,70 195,95 195,115 C 195,130 175,135 175,150 C 175,165 200,170 210,150 C 220,170 245,165 245,150 C 245,135 225,130 225,115 C 225,95 240,70 240,40 Z" fill="url(#glass-bone)" stroke="#ffffff" strokeWidth="2" />
        
        {/* Abstract Bottom Bone Segment */}
        <path d="M 175,220 C 175,190 185,170 185,160 C 185,150 175,145 190,145 L 230,145 C 245,145 235,150 235,160 C 235,170 245,190 245,220 Z" fill="url(#glass-bone)" stroke="#ffffff" strokeWidth="2" />
        
        {/* Floating Patella / Joint Capsule */}
        <ellipse cx="210" cy="148" rx="22" ry="14" fill="rgba(255,255,255,0.7)" stroke="#ffffff" strokeWidth="1.5" />
      </g>
      
      {/* Precision UI Elements */}
      <circle cx="210" cy="148" r="45" fill="url(#pain-glow)" />
      <circle cx="210" cy="148" r="8" fill="#ef4444" opacity="0.8" />
      <circle cx="210" cy="148" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.5" strokeDasharray="3 3" />
      
      {/* UI Crosshairs */}
      <path d="M 150 148 L 170 148 M 250 148 L 270 148 M 210 88 L 210 108 M 210 188 L 210 208" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />
      
      {/* Medical Dots */}
      <circle cx="120" cy="80" r="3" fill="#2dd4bf" opacity="0.5" />
      <circle cx="290" cy="180" r="2" fill="#2dd4bf" opacity="0.4" />
      <circle cx="320" cy="90" r="4" fill="#cbd5e1" opacity="0.6" />
    </svg>
  );
}

function FractureSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-fr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="bone-fr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.7" />
        </linearGradient>
        <filter id="shadow-fr" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.05" />
        </filter>
        <radialGradient id="repair-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-fr)" />
      
      {/* Ambient Grid */}
      <pattern id="grid-fr" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#cbd5e1" opacity="0.3" />
      </pattern>
      <rect width="400" height="240" fill="url(#grid-fr)" />
      
      {/* Abstract Split Bone Structure */}
      <g filter="url(#shadow-fr)">
        <path d="M 80 180 C 70 160, 90 140, 110 130 L 170 100 L 160 120 L 190 110 C 190 110, 150 160, 120 180 C 100 195, 90 200, 80 180 Z" fill="url(#bone-fr)" stroke="#ffffff" strokeWidth="2" />
        <path d="M 310 70 C 320 90, 300 110, 280 120 L 220 150 L 230 130 L 200 140 C 200 140, 240 90, 270 70 C 290 55, 300 50, 310 70 Z" fill="url(#bone-fr)" stroke="#ffffff" strokeWidth="2" />
      </g>
      
      {/* Modern Medical Implant / Plate */}
      <g transform="translate(195, 125) rotate(-26)">
        <rect x="-45" y="-8" width="90" height="16" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
        <rect x="-45" y="-8" width="90" height="16" rx="8" fill="url(#repair-glow)" />
        <circle cx="-30" cy="0" r="3" fill="#64748b" />
        <circle cx="-10" cy="0" r="3" fill="#64748b" />
        <circle cx="10" cy="0" r="3" fill="#64748b" />
        <circle cx="30" cy="0" r="3" fill="#64748b" />
        {/* Screw lines */}
        <line x1="-30" y1="-25" x2="-30" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
        <line x1="30" y1="-25" x2="30" y2="25" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
      </g>
      
      {/* Abstract connection lines */}
      <path d="M 130 90 Q 195 60 260 90" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
      <circle cx="195" cy="72" r="3" fill="#3b82f6" opacity="0.6" />
    </svg>
  );
}

function SportsInjurySVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-si" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="glass-muscle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f1f5f9" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="strain-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-si)" />
      
      {/* Dynamic movement lines */}
      <path d="M 50 200 Q 150 150 200 120 T 350 40" fill="none" stroke="#2dd4bf" strokeWidth="2" opacity="0.2" />
      <path d="M 70 220 Q 170 170 220 140 T 370 60" fill="none" stroke="#2dd4bf" strokeWidth="1" opacity="0.1" />
      
      {/* Abstract Joint / Ligament Structure */}
      <g stroke="#ffffff" strokeWidth="1.5">
        <path d="M 160 50 C 160 90, 180 110, 200 120 C 220 130, 250 140, 280 180" fill="none" stroke="url(#glass-muscle)" strokeWidth="30" strokeLinecap="round" />
        <path d="M 160 50 C 160 90, 180 110, 200 120 C 220 130, 250 140, 280 180" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>
      
      {/* Ligament fibers */}
      <path d="M 180 100 Q 200 120 220 125" fill="none" stroke="#94a3b8" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <path d="M 190 115 Q 210 135 230 140" fill="none" stroke="#94a3b8" strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      
      {/* Strain / Microtear visualization */}
      <path d="M 195 110 L 205 125 L 200 130" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M 210 120 L 215 135" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinejoin="round" />
      
      <circle cx="205" cy="125" r="45" fill="url(#strain-glow)" />
      
      {/* UI overlays */}
      <rect x="150" y="30" width="40" height="12" rx="6" fill="#ffffff" opacity="0.8" />
      <circle cx="156" cy="36" r="3" fill="#2dd4bf" />
      <rect x="250" y="190" width="50" height="12" rx="6" fill="#ffffff" opacity="0.8" />
      <circle cx="256" cy="196" r="3" fill="#ef4444" />
    </svg>
  );
}

function KneePainSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-kp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="implant-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <filter id="glow-kp">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      <rect width="400" height="240" fill="url(#bg-kp)" />
      
      {/* Minimalist Grid */}
      <path d="M 50 0 L 50 240 M 150 0 L 150 240 M 250 0 L 250 240 M 350 0 L 350 240" stroke="#e2e8f0" strokeWidth="1" />
      <path d="M 0 60 L 400 60 M 0 120 L 400 120 M 0 180 L 400 180" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* 3D-like Knee Silhouette */}
      <path d="M 150 20 C 150 80, 165 110, 200 120 C 235 130, 250 160, 250 220" fill="none" stroke="#ffffff" strokeWidth="24" strokeLinecap="round" opacity="0.9" />
      <path d="M 150 20 C 150 80, 165 110, 200 120 C 235 130, 250 160, 250 220" fill="none" stroke="#cbd5e1" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      
      {/* Advanced Knee Replacement Implant Overlay */}
      <path d="M 175 95 C 190 95, 205 100, 215 110 C 225 120, 230 135, 230 150" fill="none" stroke="url(#implant-grad)" strokeWidth="12" strokeLinecap="round" />
      <path d="M 175 95 C 190 95, 205 100, 215 110 C 225 120, 230 135, 230 150" fill="none" stroke="#f8fafc" strokeWidth="4" strokeLinecap="round" />
      
      {/* Fixation pins */}
      <circle cx="178" cy="98" r="2.5" fill="#475569" />
      <circle cx="227" cy="147" r="2.5" fill="#475569" />
      
      {/* UI Analysis Elements */}
      <circle cx="205" cy="115" r="35" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 4" />
      <path d="M 205 70 L 205 80 M 205 150 L 205 160 M 160 115 L 170 115 M 240 115 L 250 115" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" filter="url(#glow-kp)" />
      
      <rect x="260" y="80" width="70" height="60" rx="4" fill="rgba(255,255,255,0.7)" stroke="#e2e8f0" />
      <line x1="225" y1="115" x2="260" y2="110" stroke="#94a3b8" strokeWidth="1" />
      <circle cx="270" cy="95" r="4" fill="#2dd4bf" />
      <rect x="280" y="93" width="40" height="4" rx="2" fill="#cbd5e1" />
      <circle cx="270" cy="110" r="4" fill="#cbd5e1" />
      <rect x="280" y="108" width="30" height="4" rx="2" fill="#cbd5e1" />
      <circle cx="270" cy="125" r="4" fill="#cbd5e1" />
      <rect x="280" y="123" width="20" height="4" rx="2" fill="#cbd5e1" />
    </svg>
  );
}

function ShoulderPainSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-sp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <radialGradient id="sp-highlight" cx="60%" cy="40%" r="40%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-sp)" />
      
      {/* Abstract Anatomy */}
      <g opacity="0.9">
        {/* Clavicle */}
        <path d="M 80 80 Q 150 70 200 80 C 220 85 230 100 210 110" fill="none" stroke="#ffffff" strokeWidth="16" strokeLinecap="round" />
        {/* Scapula */}
        <path d="M 180 100 Q 160 140 140 160 Z" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" />
        {/* Humerus Head */}
        <circle cx="220" cy="115" r="22" fill="#ffffff" />
        <path d="M 220 130 C 240 160 250 200 240 240" fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="round" />
      </g>
      
      {/* Rotator Cuff Abstract Bands */}
      <path d="M 180 85 C 200 80, 220 90, 235 110" fill="none" stroke="#94a3b8" strokeWidth="6" opacity="0.6" strokeLinecap="round" />
      <path d="M 190 105 C 210 100, 225 115, 230 130" fill="none" stroke="#94a3b8" strokeWidth="4" opacity="0.5" strokeLinecap="round" />
      
      <circle cx="225" cy="105" r="50" fill="url(#sp-highlight)" />
      
      {/* Targeted Pain Indicator */}
      <g transform="translate(225, 105)">
        <circle cx="0" cy="0" r="6" fill="#ef4444" />
        <circle cx="0" cy="0" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
        <circle cx="0" cy="0" r="24" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
      </g>
      
      {/* UI lines */}
      <path d="M 240 90 L 280 60 L 320 60" fill="none" stroke="#64748b" strokeWidth="1" opacity="0.5" />
      <rect x="325" y="55" width="40" height="10" rx="5" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}

function SpineCareSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-sc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
        <radialGradient id="disc-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-sc)" />
      
      {/* Background Tech Rings */}
      <circle cx="200" cy="120" r="80" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="120" r="100" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
      
      {/* Stylized Vertebrae Stack */}
      <g transform="translate(180, 20)">
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = i * 35;
          const isHerniated = i === 3;
          return (
            <g key={i}>
              {/* Bone body */}
              <path d={`M 0,${y} C 10,${y-5} 30,${y-5} 40,${y} C 45,${y+10} 45,${y+20} 40,${y+25} C 30,${y+30} 10,${y+30} 0,${y+25} C -5,${y+20} -5,${y+10} 0,${y} Z`} fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
              {/* Process */}
              <path d={`M 40,${y+12} L 60,${y+15} L 55,${y+20} Z`} fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
              
              {/* Intervertebral Disc */}
              {i < 5 && (
                <ellipse cx="20" cy={y + 30} rx="18" ry="6" fill={isHerniated ? "#fca5a5" : "#cbd5e1"} opacity="0.9" />
              )}
              
              {/* Herniation effect */}
              {isHerniated && (
                <g>
                  <circle cx="45" cy={y + 30} r="25" fill="url(#disc-glow)" />
                  <ellipse cx="38" cy={y + 30} rx="8" ry="4" fill="#ef4444" />
                  <path d={`M 40,${y+30} Q 60,${y+40} 80,${y+45}`} fill="none" stroke="#fcd34d" strokeWidth="2" strokeLinecap="round" />
                  <path d={`M 40,${y+30} Q 60,${y+40} 80,${y+45}`} fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" strokeLinecap="round" />
                </g>
              )}
            </g>
          );
        })}
      </g>
      
      {/* UI Callout */}
      <rect x="80" y="115" width="60" height="20" rx="4" fill="#ffffff" opacity="0.9" />
      <text x="110" y="129" fontSize="10" fontWeight="bold" fill="#ef4444" textAnchor="middle">L4-L5 Disc</text>
      <line x1="140" y1="125" x2="190" y2="125" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}


/* ── Ultra-Premium Modern SVGs for Women's Health Services ── */
function PregnancyCareSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-pc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <radialGradient id="womb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-pc)" />
      
      {/* Soft abstract background waves */}
      <path d="M 0 150 Q 100 80 200 150 T 400 150 L 400 240 L 0 240 Z" fill="#ffffff" opacity="0.4" />
      <path d="M 0 180 Q 150 120 250 180 T 400 160 L 400 240 L 0 240 Z" fill="#ffffff" opacity="0.6" />
      
      {/* Minimalist pregnant silhouette */}
      <path d="M 180 40 C 190 40, 195 50, 195 60 C 195 70, 185 80, 180 80 C 170 80, 160 70, 160 60 C 160 50, 170 40, 180 40 Z" fill="#fda4af" opacity="0.8" />
      <path d="M 180 90 C 200 90, 220 110, 230 140 C 240 180, 230 220, 200 240 L 150 240 C 150 200, 140 160, 140 120 C 140 100, 160 90, 180 90 Z" fill="#fda4af" opacity="0.6" />
      <path d="M 210 150 C 210 180, 190 210, 170 210 C 150 210, 140 180, 140 150 C 140 120, 160 110, 180 110 C 200 110, 210 120, 210 150 Z" fill="#ffffff" />
      
      {/* Womb protection / care glow */}
      <circle cx="175" cy="160" r="35" fill="url(#womb-glow)" />
      <path d="M 175 145 C 185 145, 190 155, 190 165 C 190 175, 180 180, 170 175" stroke="#fb7185" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.8" />
      <circle cx="175" cy="160" r="10" fill="#f43f5e" opacity="0.4" />
      
      {/* Medical UI accents */}
      <path d="M 240 160 L 270 140 L 310 140" fill="none" stroke="#fda4af" strokeWidth="1.5" />
      <circle cx="240" cy="160" r="3" fill="#f43f5e" />
      <rect x="315" y="130" width="50" height="20" rx="10" fill="#ffffff" />
      <text x="340" y="143" fontSize="9" fontWeight="bold" fill="#f43f5e" textAnchor="middle">Ultrasound</text>
    </svg>
  );
}

function GynaeSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-gy" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <linearGradient id="organ-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-gy)" />
      
      {/* Concentric diagnosis rings */}
      <circle cx="200" cy="120" r="90" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" />
      <circle cx="200" cy="120" r="110" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="5 5" opacity="0.3" />
      
      {/* Stylized Uterus & Ovaries */}
      <g filter="drop-shadow(0px 8px 16px rgba(244,63,94,0.15))">
        {/* Uterus Body */}
        <path d="M 200 160 C 240 160, 250 110, 250 80 C 250 60, 220 50, 200 60 C 180 50, 150 60, 150 80 C 150 110, 160 160, 200 160 Z" fill="url(#organ-grad)" stroke="#ffffff" strokeWidth="3" />
        {/* Cervix */}
        <path d="M 185 160 L 185 190 C 185 195, 215 195, 215 190 L 215 160 Z" fill="#ffffff" opacity="0.7" />
        {/* Fallopian Tubes */}
        <path d="M 155 70 C 120 60, 90 80, 80 110" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
        <path d="M 245 70 C 280 60, 310 80, 320 110" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
        {/* Ovaries */}
        <ellipse cx="75" cy="120" rx="16" ry="12" fill="#fda4af" stroke="#ffffff" strokeWidth="2" />
        <ellipse cx="325" cy="120" rx="16" ry="12" fill="#fda4af" stroke="#ffffff" strokeWidth="2" />
      </g>
      
      {/* UI Scanner overlay */}
      <rect x="175" y="45" width="50" height="50" rx="8" fill="none" stroke="#fb7185" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d="M 225 70 L 270 40 L 300 40" fill="none" stroke="#fb7185" strokeWidth="1.5" />
      <circle cx="225" cy="70" r="3" fill="#f43f5e" />
    </svg>
  );
}

function PcosSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-pcos" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <filter id="pcos-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <rect width="400" height="240" fill="url(#bg-pcos)" />
      
      {/* Magnifying Glass Concept */}
      <circle cx="200" cy="120" r="80" fill="#ffffff" opacity="0.6" stroke="#fda4af" strokeWidth="4" />
      <path d="M 260 180 L 320 240" stroke="#fda4af" strokeWidth="12" strokeLinecap="round" opacity="0.5" />
      
      {/* Detailed Ovary Structure */}
      <ellipse cx="200" cy="120" rx="55" ry="40" fill="#ffe4e6" stroke="#ffffff" strokeWidth="3" />
      
      {/* Cysts visualization */}
      {[
        {x: 160, y: 100, r: 8}, {x: 180, y: 95, r: 6}, {x: 200, y: 90, r: 10},
        {x: 220, y: 98, r: 7}, {x: 240, y: 110, r: 9}, {x: 235, y: 130, r: 6},
        {x: 215, y: 145, r: 8}, {x: 190, y: 140, r: 5}, {x: 170, y: 130, r: 7},
        {x: 155, y: 115, r: 5}
      ].map((c, i) => (
        <g key={i}>
          <circle cx={c.x} cy={c.y} r={c.r} fill="#ffffff" stroke="#fb7185" strokeWidth="1.5" />
          <circle cx={c.x} cy={c.y} r={c.r - 2} fill="#fecdd3" />
        </g>
      ))}
      
      {/* Hormonal Graph UI overlay */}
      <rect x="40" y="30" width="100" height="60" rx="8" fill="#ffffff" opacity="0.9" />
      <path d="M 50 70 Q 70 40 90 60 T 130 50" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
      <circle cx="130" cy="50" r="3" fill="#f43f5e" />
    </svg>
  );
}

function MenstrualSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-md" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-md)" />
      
      {/* Modern Cycle Calendar 3D Card */}
      <g transform="translate(60, 40)">
        <rect x="0" y="0" width="140" height="160" rx="12" fill="#ffffff" filter="drop-shadow(0 10px 15px rgba(244,63,94,0.1))" />
        <rect x="0" y="0" width="140" height="40" rx="12" fill="#fb7185" />
        <rect x="0" y="20" width="140" height="20" fill="#fb7185" /> {/* fix bottom corners */}
        <text x="70" y="25" fontSize="12" fontWeight="bold" fill="#ffffff" textAnchor="middle">CYCLE TRACKER</text>
        
        {/* Grid dots */}
        {[0,1,2,3].map(row => 
          [0,1,2,3,4].map(col => {
            const isRed = row === 1 && (col === 2 || col === 3) || row === 2 && col === 0;
            return (
              <circle key={`${row}-${col}`} cx={25 + col*22} cy={65 + row*22} r="6" fill={isRed ? "#f43f5e" : "#f1f5f9"} />
            )
          })
        )}
      </g>
      
      {/* Intersecting Medical Abstract Shapes */}
      <path d="M 220 160 C 260 160, 270 100, 270 70 C 270 50, 240 40, 220 50 C 200 40, 170 50, 170 70 C 170 100, 180 160, 220 160 Z" fill="#ffffff" opacity="0.6" />
      <path d="M 260 180 C 300 180, 310 120, 310 90 C 310 70, 280 60, 260 70 C 240 60, 210 70, 210 90 C 210 120, 220 180, 260 180 Z" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))" />
      
      {/* Endometriosis / Pain nodes */}
      <circle cx="250" cy="120" r="5" fill="#f43f5e" />
      <circle cx="270" cy="100" r="4" fill="#f43f5e" opacity="0.8" />
      <circle cx="280" cy="140" r="6" fill="#f43f5e" opacity="0.6" />
      <circle cx="250" cy="120" r="20" fill="none" stroke="#f43f5e" strokeWidth="1" opacity="0.4" />
      
      {/* Connecting UI line */}
      <path d="M 170 109 Q 200 109 230 120" fill="none" stroke="#fb7185" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}

function LaparoscopicSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-ls" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <radialGradient id="laser-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-ls)" />
      
      {/* Surgical Area Focus */}
      <ellipse cx="200" cy="150" rx="120" ry="60" fill="#ffffff" opacity="0.4" filter="blur(10px)" />
      
      {/* Organ Abstract Silhouette */}
      <path d="M 150 180 Q 200 220 250 180 Q 220 120 150 180 Z" fill="#fda4af" opacity="0.5" />
      <circle cx="220" cy="160" r="15" fill="#f43f5e" opacity="0.6" /> {/* Fibroid/Cyst */}
      
      {/* Futuristic Laparoscopic Instruments */}
      {/* Instrument 1 */}
      <g transform="translate(60, 40) rotate(35)">
        <rect x="0" y="0" width="160" height="8" rx="4" fill="#cbd5e1" stroke="#ffffff" strokeWidth="2" />
        <rect x="0" y="-4" width="40" height="16" rx="4" fill="#94a3b8" />
        <path d="M 160 2 L 175 4 L 160 6 Z" fill="#64748b" />
      </g>
      
      {/* Instrument 2 (Laser/Camera) */}
      <g transform="translate(340, 40) rotate(145)">
        <rect x="0" y="0" width="150" height="10" rx="5" fill="#e2e8f0" stroke="#ffffff" strokeWidth="2" />
        <rect x="0" y="-3" width="30" height="16" rx="4" fill="#64748b" />
        <circle cx="150" cy="5" r="4" fill="#2dd4bf" />
      </g>
      
      {/* Laser Light Effect */}
      <path d="M 235 110 L 222 155" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="5 2" />
      <circle cx="220" cy="160" r="30" fill="url(#laser-glow)" />
      
      {/* UI Crosshair Targeting */}
      <g transform="translate(220, 160)">
        <line x1="-20" y1="0" x2="-10" y2="0" stroke="#2dd4bf" strokeWidth="2" />
        <line x1="10" y1="0" x2="20" y2="0" stroke="#2dd4bf" strokeWidth="2" />
        <line x1="0" y1="-20" x2="0" y2="-10" stroke="#2dd4bf" strokeWidth="2" />
        <line x1="0" y1="10" x2="0" y2="20" stroke="#2dd4bf" strokeWidth="2" />
      </g>
    </svg>
  );
}

function ContraceptiveSVG() {
  return (
    <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
      <defs>
        <linearGradient id="bg-cc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <linearGradient id="pill-pack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f8fafc" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" fill="url(#bg-cc)" />
      
      {/* Elegant floating pill pack */}
      <g transform="translate(80, 50) rotate(-10)">
        <rect x="0" y="0" width="120" height="80" rx="16" fill="url(#pill-pack)" filter="drop-shadow(0 15px 20px rgba(244,63,94,0.15))" />
        {[0, 1].map(row => 
          [0, 1, 2].map(col => (
            <g key={`${row}-${col}`} transform={`translate(${25 + col*35}, ${25 + row*30})`}>
              <circle cx="0" cy="0" r="10" fill="#fecdd3" />
              <circle cx="-2" cy="-2" r="8" fill="#fb7185" />
              <circle cx="-4" cy="-4" r="3" fill="#ffffff" opacity="0.6" />
            </g>
          ))
        )}
      </g>
      
      {/* 3D Modern IUD */}
      <g transform="translate(260, 100) rotate(15)">
        {/* Soft glowing aura */}
        <circle cx="0" cy="20" r="60" fill="#ffffff" opacity="0.5" filter="blur(15px)" />
        
        {/* IUD Body */}
        <path d="M -30 -10 L 30 -10 M 0 -10 L 0 50" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M -30 -10 L 30 -10 M 0 -10 L 0 50" fill="none" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Copper/Hormone coils */}
        <rect x="-4" y="0" width="8" height="35" rx="4" fill="#fb7185" />
        <circle cx="-30" cy="-10" r="5" fill="#fb7185" />
        <circle cx="30" cy="-10" r="5" fill="#fb7185" />
        
        {/* Threads */}
        <path d="M 0 50 Q -10 70 5 90" fill="none" stroke="#fda4af" strokeWidth="2" />
        <path d="M 0 50 Q 10 70 -5 90" fill="none" stroke="#fda4af" strokeWidth="2" />
      </g>
      
      {/* Balance/Choice Abstract Scale */}
      <path d="M 180 150 Q 200 120 230 160" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  );
}


/* ── Service Data ── */
const orthoServices = [
  {
    name: "Joint Pain Treatment",
    desc: "Comprehensive evaluation and treatment for arthritis, cartilage damage, and chronic joint pain using the latest evidence-based protocols.",
    tags: ["Arthritis", "Cartilage"],
    SvgComponent: JointPainSVG,
    href: "/joint-pain-treatment-wakad",
  },
  {
    name: "Fracture Management",
    desc: "Expert surgical and non-surgical care for all types of fractures — from simple breaks to complex multi-fragment injuries — with rapid recovery focus.",
    tags: ["Surgical", "Non-surgical", "Rapid Recovery"],
    SvgComponent: FractureSVG,
    href: "/joint-pain-treatment-wakad",
  },
  {
    name: "Sports Injury Treatment",
    desc: "Specialized care for athletes and active individuals: ACL tears, meniscus injuries, ligament sprains, and muscle strains.",
    tags: ["ACL", "Meniscus", "Ligaments"],
    SvgComponent: SportsInjurySVG,
    href: "/sports-injury-treatment-wakad",
  },
  {
    name: "Knee Pain Treatment",
    desc: "From conservative physiotherapy to knee replacement surgery — individualized plans for every stage of knee disease.",
    tags: ["Physiotherapy", "Knee Replacement"],
    SvgComponent: KneePainSVG,
    href: "/knee-pain-treatment-wakad",
  },
  {
    name: "Shoulder Pain Treatment",
    desc: "Rotator cuff repairs, shoulder impingement, frozen shoulder (adhesive capsulitis), and instability management.",
    tags: ["Rotator Cuff", "Frozen Shoulder", "Instability"],
    SvgComponent: ShoulderPainSVG,
    href: "/shoulder-pain-treatment-wakad",
  },
  {
    name: "Spine Care",
    desc: "Conservative and surgical management of back pain, disc herniation, sciatica, and spinal deformities.",
    tags: ["Back Pain", "Disc", "Sciatica"],
    SvgComponent: SpineCareSVG,
    href: "/spine-specialist-wakad",
  },
];

const womenServices = [
  {
    name: "Pregnancy Care",
    desc: "Complete antenatal monitoring, high-risk pregnancy management, safe delivery planning, and postnatal care for mother and baby.",
    tags: ["Antenatal", "High-Risk", "Postnatal"],
    SvgComponent: PregnancyCareSVG,
    href: "/pregnancy-care-wakad",
  },
  {
    name: "Gynecology Consultation",
    desc: "Comprehensive evaluations for all gynaecological conditions — from routine check-ups to complex diagnostic workups.",
    tags: ["Check-ups", "Diagnosis", "Women's Health"],
    SvgComponent: GynaeSVG,
    href: "/gynecologist-wakad",
  },
  {
    name: "PCOS Treatment",
    desc: "Holistic, evidence-based management of Polycystic Ovary Syndrome including hormonal therapy, lifestyle intervention, and fertility support.",
    tags: ["Hormonal", "Lifestyle", "Fertility"],
    SvgComponent: PcosSVG,
    href: "/pcos-treatment-wakad",
  },
  {
    name: "Menstrual Disorder Treatment",
    desc: "Diagnosis and treatment of irregular periods, heavy menstrual bleeding, dysmenorrhea, and endometriosis.",
    tags: ["Irregular Periods", "Heavy Bleeding"],
    SvgComponent: MenstrualSVG,
    href: "/menstrual-disorder-treatment-wakad",
  },
  {
    name: "Laparoscopic Surgery",
    desc: "Minimally invasive keyhole surgery for ovarian cysts, fibroids, endometriosis, ectopic pregnancy, and other conditions.",
    tags: ["Minimally Invasive", "Fibroids", "Cysts"],
    SvgComponent: LaparoscopicSVG,
    href: "/laparoscopic-surgery-wakad",
  },
  {
    name: "Contraceptive Counselling",
    desc: "Personalized guidance on contraceptive options — IUDs, hormonal methods, barrier methods — with follow-up support.",
    tags: ["IUD", "Hormonal", "Family Planning"],
    SvgComponent: ContraceptiveSVG,
    href: "/gynecologist-wakad",
  },
];


function PremiumServiceCard({ service, color }: {
  service: any;
  color: "teal" | "rose";
}) {
  const isTeal = color === "teal";
  return (
    <Link
      href={service.href}
      className={`bg-white rounded-[2rem] overflow-hidden border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full cursor-pointer ${
        isTeal ? "border-teal-50 hover:border-teal-200" : "border-rose-50 hover:border-rose-200"
      }`}
    >
      {/* Top Image Area */}
      <div className="w-full h-40 sm:h-48 lg:h-56 relative bg-slate-50 overflow-hidden">
        <service.SvgComponent />
        <div className="absolute inset-0 shadow-[inset_0_-10px_20px_rgba(255,255,255,1)]" />
        {/* Hover overlay */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ${
          isTeal ? "bg-teal-600/8" : "bg-rose-600/8"
        }`} />
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow bg-white relative z-10">
        <h3 className="text-base sm:text-xl font-extrabold text-slate-900 mb-2 sm:mb-3 leading-tight tracking-tight">
          {service.name}
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-5 flex-grow">
          {service.desc}
        </p>

        {/* Pill Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-5">
          {service.tags.map((tag: string) => (
            <span key={tag} className={`px-3 py-1 rounded-full text-[11px] font-bold border ${
              isTeal
                ? "bg-teal-50 text-teal-800 border-teal-100"
                : "bg-rose-50 text-rose-800 border-rose-100"
            }`}>
              {tag}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className={`flex items-center gap-2 text-sm font-bold mt-auto ${
          isTeal ? "text-teal-600" : "text-rose-600"
        }`}>
          <span>Learn More</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

export default function ServicesPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white antialiased">
      <SiteNav />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-teal-500/15 border border-teal-400/25 rounded-full text-teal-200 text-xs sm:text-sm font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            Comprehensive Medical Services
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-5">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-teal-400">
              Services
            </span>
          </h1>
          <p className="text-slate-300/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Specialist care across two disciplines — orthopaedics and women&apos;s health — under one roof.
          </p>
        </div>
      </section>

      {/* Process strip */}
      <div className="bg-white border-b border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 text-center">
            {[
              { step: "01", label: "Book Appointment" },
              { step: "02", label: "Consultation" },
              { step: "03", label: "Diagnosis & Plan" },
              { step: "04", label: "Treatment & Recovery" },
            ].map((s, i) => (
              <div key={s.step} className="relative flex flex-col items-center group">
                <div className="w-12 h-12 sm:w-10 sm:h-10 rounded-full bg-teal-600 text-white text-sm font-extrabold flex items-center justify-center mb-3 sm:mb-2 shadow-md shadow-teal-500/20 group-hover:scale-110 transition-transform">
                  {s.step}
                </div>
                <span className="text-xs sm:text-xs font-bold text-slate-700">{s.label}</span>
                {i < 3 && (
                  <div className="hidden sm:block absolute top-5 left-[calc(50%+20px)] right-0 h-px bg-teal-100" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orthopaedic Services */}
      <section className="py-10 sm:py-16 lg:py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-14">
            <div>
              <span className="text-xs font-bold text-teal-600 uppercase tracking-[0.15em]">Dr. Rahul Kalekar</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                Orthopaedic Care
              </h2>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="shrink-0 flex items-center justify-center gap-1.5 px-5 py-3 sm:py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold rounded-xl transition-all w-full sm:w-auto shadow-lg shadow-teal-500/20"
            >
              Book Consultation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {orthoServices.map((s) => (
              <PremiumServiceCard key={s.name} service={s} color="teal" />
            ))}
          </div>
        </div>
      </section>

      {/* Women's Health Services */}
      <section className="py-10 sm:py-16 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-14">
            <div>
              <span className="text-xs font-bold text-rose-500 uppercase tracking-[0.15em]">Dr. Aparna Kalekar</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">
                Women&apos;s Health
              </h2>
            </div>
            <button
              onClick={() => setBookingOpen(true)}
              className="shrink-0 flex items-center justify-center gap-1.5 px-5 py-3 sm:py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-rose-400/20 w-full sm:w-auto"
            >
              Book Consultation <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {womenServices.map((s) => (
              <PremiumServiceCard key={s.name} service={s} color="rose" />
            ))}
          </div>
        </div>
      </section>

      {/* Why us strip */}
      <section className="py-12 sm:py-14 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Evidence-Based Treatment" },
              { label: "Latest Medical Equipment" },
              { label: "Personalised Care Plans" },
              { label: "Easy Online Booking" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 sm:gap-2.5 p-3 sm:p-0 bg-white sm:bg-transparent rounded-xl sm:rounded-none border sm:border-none border-slate-100 sm:shadow-none shadow-sm">
                <CheckCircle className="h-5 w-5 sm:h-4 sm:w-4 text-teal-500 shrink-0" />
                <span className="text-sm font-bold sm:font-semibold text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-teal-700 to-teal-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">Not Sure Which Service You Need?</h2>
          <p className="text-teal-100/65 text-sm sm:text-base mb-8 leading-relaxed max-w-lg mx-auto">
            Book a general consultation and our specialists will guide you to the right treatment path.
          </p>
          <button
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-900 font-extrabold rounded-xl hover:bg-teal-50 shadow-xl transition-all hover:scale-[1.02] text-sm w-full sm:w-auto justify-center"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      <SiteFooter />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

