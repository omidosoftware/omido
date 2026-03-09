"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Container } from "@/components/layout/Container";

const pillars = [
  { num: "01", label: "Snelle oplevering", detail: "Eerste versie vaak binnen weken" },
  { num: "02", label: "Veilig gebouwd", detail: "Security-first architectuur" },
  { num: "03", label: "Jouw eigendom", detail: "100% broncode overdracht" },
  { num: "04", label: "Vaste prijs", detail: "Transparante offerte vooraf" },
];

export function TrustMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-y border-border-subtle" aria-label="Onze beloften">
      <Container>
        <motion.div
          ref={ref}
          className="py-8 md:py-12"
          initial={shouldReduceMotion ? undefined : { opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Mobile: horizontal scroll strip with fade edge. Desktop: 4-col grid */}
          <div className="relative md:contents">
            <div className="-mx-6 flex gap-8 overflow-x-auto px-6 pb-1 snap-x snap-proximity scrollbar-hide md:mx-0 md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:px-0 md:pb-0">
              {pillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="flex min-w-[152px] shrink-0 snap-start flex-col md:min-w-0 md:items-center md:text-center"
                >
                  <span className="mb-1.5 font-mono text-[11px] tracking-wide text-text-tertiary">
                    {pillar.num}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[18px] leading-snug text-text-primary">
                    {pillar.label}
                  </span>
                  <span className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                    {pillar.detail}
                  </span>
                </div>
              ))}
            </div>
            {/* Right fade — scroll affordance on mobile */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-primary to-transparent md:hidden"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
