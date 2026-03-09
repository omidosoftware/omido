"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Shield, Zap, Code2, Handshake } from "lucide-react";
import { Container } from "@/components/layout/Container";

const pillars = [
  { icon: Zap, label: "Snelle oplevering", detail: "Eerste versie vaak binnen weken" },
  { icon: Shield, label: "Veilig gebouwd", detail: "Security-first architectuur" },
  { icon: Code2, label: "Jouw eigendom", detail: "100% broncode overdracht" },
  { icon: Handshake, label: "Vaste prijs", detail: "Transparante offerte vooraf" },
];

export function TrustMetrics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative border-y border-border-subtle bg-bg-elevated/80">
      <Container>
        <div ref={ref} className="py-10 md:py-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.label}
                  className="flex flex-col items-center text-center"
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-accent-muted">
                    <Icon className="h-[18px] w-[18px] text-accent" />
                  </div>
                  <span className="text-[14px] font-semibold text-text-primary">
                    {pillar.label}
                  </span>
                  <span className="mt-0.5 text-[12px] text-text-tertiary">
                    {pillar.detail}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
