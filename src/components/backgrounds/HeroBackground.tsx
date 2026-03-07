"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        viewBox="0 0 1440 800"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#131315" />
            <stop offset="100%" stopColor="#0A0A0B" />
          </radialGradient>
          <linearGradient id="hero-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#232328" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#D4A853" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#232328" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#hero-glow)" />

        {/* Network lines */}
        <g strokeWidth="0.5" fill="none" opacity="0.7">
          <path d="M120 150 L340 280 L500 120 L750 350 L1020 180 L1300 400" stroke="#1A1A1E" />
          <path d="M200 600 L450 480 L600 650 L900 450 L1150 680" stroke="#161618" />
          <path d="M500 120 L600 650 M120 150 L200 600" stroke="#1A1A1E" opacity="0.3" />
        </g>

        {/* Gold accent paths */}
        <g strokeWidth="0.5" fill="none">
          <motion.path
            d="M340 280 L450 480 M750 350 L900 450 M1020 180 L900 450"
            stroke="url(#hero-gold)"
            style={{ pathLength: shouldReduceMotion ? 1 : undefined }}
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.8 }}
          />
        </g>

        {/* Subtle nodes */}
        <g fill="#0A0A0B" strokeWidth="1">
          <circle cx="120" cy="150" r="2" stroke="#232328" />
          <circle cx="500" cy="120" r="2" stroke="#232328" />
          <circle cx="600" cy="650" r="2" stroke="#232328" />
          <circle cx="1150" cy="680" r="2" stroke="#232328" />
          <circle cx="1300" cy="400" r="2" stroke="#232328" />
        </g>

        {/* Gold accent nodes */}
        <g fill="#0A0A0B" strokeWidth="1.5">
          <motion.circle
            cx="340" cy="280" r="3"
            stroke="#D4A853"
            initial={shouldReduceMotion ? { opacity: 0.6 } : { opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <motion.circle
            cx="750" cy="350" r="3.5"
            stroke="#D4A853"
            initial={shouldReduceMotion ? { opacity: 0.8 } : { opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          />
          <motion.circle
            cx="1020" cy="180" r="3"
            stroke="#D4A853"
            initial={shouldReduceMotion ? { opacity: 0.6 } : { opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          />
          <motion.circle
            cx="450" cy="480" r="3"
            stroke="#D4A853"
            initial={shouldReduceMotion ? { opacity: 0.4 } : { opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 0.8, delay: 2 }}
          />
          <motion.circle
            cx="900" cy="450" r="3"
            stroke="#D4A853"
            initial={shouldReduceMotion ? { opacity: 0.5 } : { opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 2.2 }}
          />
        </g>

        {/* Ambient glow rings */}
        <circle cx="750" cy="350" r="80" fill="none" stroke="#D4A853" strokeWidth="0.3" opacity="0.08" />
        <circle cx="750" cy="350" r="160" fill="none" stroke="#D4A853" strokeWidth="0.2" opacity="0.04" />
      </svg>

      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg-primary to-transparent" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg-primary to-transparent" />
    </div>
  );
}
