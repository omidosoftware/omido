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
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative border-y border-border-subtle" aria-label="Onze beloften">
      <Container>
        <div ref={ref} className="py-8 md:py-12">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-8">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                className="flex flex-col items-center text-center"
                initial={shouldReduceMotion ? undefined : { opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : undefined}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
