"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GridBackground } from "@/components/backgrounds/GridBackground";
import { FadeIn } from "@/components/motion/FadeIn";
import { Compass, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Compass,
    title: "Ontdek & Ontwerp",
    timeline: "1–2 weken",
    description:
      "We brengen jouw bedrijfslogica in kaart en ontwerpen een interface die klopt. Je ontvangt een klikbaar prototype en een heldere offerte voordat er één regel code wordt geschreven.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Bouw & Test",
    timeline: "2–6 weken",
    description:
      "Gebouwd met Next.js, React, TypeScript en Tailwind — AI-versneld waar het waarde toevoegt. Een eerste SaaS-versie kan vaak al binnen 4 weken live staan. Geen shortcuts, geen technische schuld.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Lanceer & Groei",
    timeline: "Doorlopend",
    description:
      "Hosting, betalingen, monitoring — wij configureren alles en leveren een productie-klaar platform op. Doorontwikkeling en SLA op maat.",
  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

function useGsapTimeline(
  containerRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean
) {
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    let tween: gsap.core.Tween | null = null;

    async function initGsap() {
      try {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");

        gsapModule.gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);

        if (!containerRef.current) return;

        const proxy = { progress: 0 };
        tween = gsapModule.gsap.to(proxy, {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.8,
          },
          onUpdate: () => setLineProgress(proxy.progress),
        });
      } catch {
        setLineProgress(1);
      }
    }

    initGsap();

    return () => {
      if (tween) tween.kill();
    };
  }, [containerRef, enabled]);

  return lineProgress;
}

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const lineProgress = useGsapTimeline(containerRef, isDesktop);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Desktop: steps reveal tied to GSAP scroll progress
  // Mobile: steps reveal tied to IntersectionObserver (isInView)
  const getStepVisible = useCallback(
    (index: number) => {
      if (shouldReduceMotion) return true;
      if (!isInView) return false;
      if (isDesktop) return lineProgress > index * 0.3;
      return true; // Mobile: all visible once section is in view
    },
    [shouldReduceMotion, isInView, isDesktop, lineProgress]
  );

  return (
    <SectionWrapper elevated spacing="generous">
      <GridBackground />
      <Container className="relative z-10">
        <FadeIn>
          <div className="mb-14 text-center md:mb-18">
            <p className="mb-2 md:mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Hoe wij bouwen
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.625rem,3.5vw,2.5rem)] font-normal leading-tight tracking-tight text-text-primary">
              Ontdek. Bouw. Lanceer.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Van eerste gesprek tot livegang — een strak proces zonder
              verrassingen.
            </p>
          </div>
        </FadeIn>

        <div ref={containerRef} className="relative grid gap-8 lg:grid-cols-3 lg:gap-4">
          {/* Connecting line (desktop only, GSAP-driven) */}
          <div className="absolute top-[4.5rem] left-[20%] right-[20%] hidden h-px lg:block">
            <div className="relative h-px w-full bg-border-subtle">
              <motion.div
                className="absolute inset-y-0 left-0 h-px origin-left bg-accent/40"
                style={{
                  scaleX: shouldReduceMotion ? 1 : lineProgress,
                }}
              />
            </div>
          </div>

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isVisible = getStepVisible(i);

            return (
              <motion.div
                key={step.number}
                className="group relative"
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
                }
                transition={{
                  duration: 0.55,
                  // On mobile: stagger with Framer delays. On desktop: GSAP drives timing, no extra delay.
                  delay: isDesktop ? 0 : i * 0.12,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <div className="flex flex-col items-start text-left lg:items-center lg:text-center">
                  {/* Number + Icon */}
                  <div className="relative mb-4 lg:mb-6">
                    {/* Large step number -- mobile only */}
                    <span className="text-3xl font-bold text-accent/20 lg:hidden">
                      {step.number}
                    </span>
                    {/* Icon container -- desktop only */}
                    <div className="hidden lg:flex h-18 w-18 items-center justify-center rounded-2xl border border-border-default bg-bg-primary transition-all duration-300 group-hover:border-border-hover group-hover:shadow-glow-sm">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <span className="absolute -right-2 -top-2 hidden lg:flex h-7 w-7 items-center justify-center rounded-full bg-bg-muted text-[11px] font-bold text-text-muted ring-2 ring-bg-elevated">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-1.5 text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mb-3 text-[12px] font-medium text-accent">
                    {step.timeline}
                  </p>
                  <p className="text-sm leading-relaxed text-text-secondary lg:mx-auto lg:max-w-[300px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Qualifier */}
        <FadeIn delay={0.3}>
          <p className="mt-10 text-center text-[13px] text-text-muted md:mt-14">
            Doorlooptijd hangt af van scope en complexiteit. We geven altijd
            vooraf een realistische planning.
          </p>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}
