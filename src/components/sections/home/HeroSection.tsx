"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroBackground } from "@/components/backgrounds/HeroBackground";

const ease = [0.16, 1, 0.3, 1] as const;

const stagger = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const lineReveal = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1, transition: { duration: 0.9, ease } },
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section className="relative flex min-h-[92vh] items-center overflow-hidden">
        <HeroBackground />
        <Container className="relative z-10">
          <HeroContent />
        </Container>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden">
      <HeroBackground />
      <Container className="relative z-10">
        <motion.div
          className="mx-auto max-w-[52rem] text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Accent line */}
          <motion.div
            className="mx-auto mb-8 h-px w-16 origin-center bg-accent"
            variants={lineReveal}
          />

          {/* Badge */}
          <motion.div className="mb-8" variants={fadeUp}>
            <Badge accent>End-to-end software partner</Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal leading-[0.92] tracking-tight"
            variants={fadeUp}
          >
            Software die werkt.
            <br />
            <span className="text-accent">Strategie die klopt.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-text-secondary md:mt-8"
            variants={fadeUp}
          >
            Omido is jouw technisch partner voor maatwerksoftware, AI-integraties
            en schaalbare platformen. Van strategie tot productie&nbsp;&mdash; in één hand.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10"
            variants={fadeUp}
          >
            <Button href="/contact" size="lg">
              Start een gesprek
            </Button>
            <Button href="/portfolio" variant="secondary" size="lg" arrow>
              Bekijk ons werk
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

function HeroContent() {
  return (
    <div className="mx-auto max-w-[52rem] text-center">
      <div className="mx-auto mb-8 h-px w-16 bg-accent" />
      <div className="mb-8">
        <Badge accent>End-to-end software partner</Badge>
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,5.5rem)] font-normal leading-[0.92] tracking-tight">
        Software die werkt.
        <br />
        <span className="text-accent">Strategie die klopt.</span>
      </h1>
      <p className="mx-auto mt-7 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed text-text-secondary md:mt-8">
        Omido is jouw technisch partner voor maatwerksoftware, AI-integraties
        en schaalbare platformen. Van strategie tot productie&nbsp;&mdash; in één hand.
      </p>
      <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
        <Button href="/contact" size="lg">
          Start een gesprek
        </Button>
        <Button href="/portfolio" variant="secondary" size="lg" arrow>
          Bekijk ons werk
        </Button>
      </div>
    </div>
  );
}
