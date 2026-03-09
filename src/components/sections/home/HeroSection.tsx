"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section className="relative flex min-h-[88svh] items-center overflow-hidden md:min-h-[92vh]">
        <HeroBackground />
        <Container className="relative z-10">
          <HeroContent />
        </Container>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden md:min-h-[92vh]">
      <HeroBackground />
      <Container className="relative z-10">
        <div className="mx-auto max-w-[52rem] text-center">
          {/* Desktop: accent line + badge above headline */}
          <motion.div
            className="mx-auto mb-5 hidden h-px w-16 origin-center bg-accent md:mb-8 md:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease }}
          />

          <motion.div
            className="mb-5 hidden md:mb-8 md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Badge accent>Software & AI partner voor groeiende bedrijven</Badge>
          </motion.div>

          {/* Headline — signature blur-emerge moment */}
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.92] tracking-tight"
            initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            Wij bouwen de software
            <br />
            <span className="text-accent">waar jouw groei op draait.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-[clamp(0.9375rem,2vw,1.2rem)] leading-relaxed text-text-secondary md:mt-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease }}
          >
            Van AI-integraties en maatwerksoftware tot complete
            SaaS-platformen. Eén team, van strategie tot
            productie&nbsp;&mdash; gebouwd om te schalen.
          </motion.p>

          {/* Mobile: descriptor below subtitle (replaces badge) */}
          <motion.p
            className="mt-4 text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            Software & AI partner voor groeiende bedrijven
          </motion.p>

          {/* CTAs — auto-width primary, text link secondary on mobile */}
          <motion.div
            className="mt-8 flex flex-col items-center gap-3 md:mt-9 md:flex-row md:justify-center md:gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease }}
          >
            <Button href="/contact" size="lg">
              Plan een kennismaking
            </Button>
            {/* Mobile: text link. Desktop: bordered button */}
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary transition-colors active:text-text-primary md:hidden"
            >
              Bekijk ons werk
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Button href="/portfolio" variant="secondary" size="lg" arrow className="hidden md:inline-flex">
              Bekijk ons werk
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll hint — mobile only */}
      {!shouldReduceMotion && (
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted/40">
            Scroll
          </span>
          <motion.div
            className="h-6 w-px bg-gradient-to-b from-text-muted/30 to-transparent"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
}

function HeroContent() {
  return (
    <div className="mx-auto max-w-[52rem] text-center">
      <div className="mx-auto mb-5 hidden h-px w-16 bg-accent md:mb-8 md:block" />
      <div className="mb-5 hidden md:mb-8 md:block">
        <Badge accent>Software & AI partner voor groeiende bedrijven</Badge>
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.92] tracking-tight">
        Wij bouwen de software
        <br />
        <span className="text-accent">waar jouw groei op draait.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-[clamp(0.9375rem,2vw,1.2rem)] leading-relaxed text-text-secondary md:mt-7">
        Van AI-integraties en maatwerksoftware tot complete
        SaaS-platformen. Eén team, van strategie tot
        productie&nbsp;&mdash; gebouwd om te schalen.
      </p>
      <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.15em] text-text-tertiary md:hidden">
        Software & AI partner voor groeiende bedrijven
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 md:mt-9 md:flex-row md:justify-center md:gap-4">
        <Button href="/contact" size="lg">
          Plan een kennismaking
        </Button>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-secondary md:hidden"
        >
          Bekijk ons werk
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Button href="/portfolio" variant="secondary" size="lg" arrow className="hidden md:inline-flex">
          Bekijk ons werk
        </Button>
      </div>
    </div>
  );
}
