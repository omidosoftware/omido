"use client";

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
          {/* Beat 1 — Accent line */}
          <motion.div
            className="mx-auto mb-5 h-px w-16 origin-center bg-accent md:mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease }}
          />

          {/* Beat 3 — Badge (soft enter, visually above headline) */}
          <motion.div
            className="mb-5 md:mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <Badge accent>Software & AI partner voor groeiende bedrijven</Badge>
          </motion.div>

          {/* Beat 2 — Headline (blur emerge, signature moment) */}
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal leading-[0.92] tracking-tight"
            initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          >
            Wij bouwen de software
            <br />
            <span className="text-accent">waar jouw groei op draait.</span>
          </motion.h1>

          {/* Beat 4 — Subtitle */}
          <motion.p
            className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-text-secondary md:mt-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3, ease }}
          >
            Van AI-integraties en maatwerksoftware tot complete
            SaaS-platformen. Eén team, van strategie tot
            productie&nbsp;&mdash; gebouwd om te schalen.
          </motion.p>

          {/* Beat 5 — CTAs */}
          <motion.div
            className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-9"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease }}
          >
            <Button href="/contact" size="lg" className="w-full sm:w-auto">
              Plan een kennismaking
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg" arrow className="w-full sm:w-auto">
              Bekijk ons werk
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll hint - mobile only, respects reduced motion */}
      {!shouldReduceMotion && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden">
          <motion.div
            className="h-8 w-px bg-gradient-to-b from-text-muted/40 to-transparent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
}

function HeroContent() {
  return (
    <div className="mx-auto max-w-[52rem] text-center">
      <div className="mx-auto mb-5 h-px w-16 bg-accent md:mb-8" />
      <div className="mb-5 md:mb-8">
        <Badge accent>Software & AI partner voor groeiende bedrijven</Badge>
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal leading-[0.92] tracking-tight">
        Wij bouwen de software
        <br />
        <span className="text-accent">waar jouw groei op draait.</span>
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-text-secondary md:mt-7">
        Van AI-integraties en maatwerksoftware tot complete
        SaaS-platformen. Eén team, van strategie tot
        productie&nbsp;&mdash; gebouwd om te schalen.
      </p>
      <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-9">
        <Button href="/contact" size="lg" className="w-full sm:w-auto">
          Plan een kennismaking
        </Button>
        <Button href="/portfolio" variant="secondary" size="lg" arrow className="w-full sm:w-auto">
          Bekijk ons werk
        </Button>
      </div>
    </div>
  );
}
