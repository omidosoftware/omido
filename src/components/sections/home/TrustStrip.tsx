"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";

const techStack = [
  { name: "React", detail: "Frontend" },
  { name: "Next.js", detail: "Framework" },
  { name: "C# / .NET", detail: "Backend" },
  { name: "Azure", detail: "Cloud" },
  { name: "Stripe", detail: "Payments" },
  { name: "OpenAI", detail: "AI" },
];

export function TrustStrip() {
  return (
    <div className="relative border-y border-border-subtle bg-bg-elevated/80">
      <Container>
        <div className="py-10 md:py-12">
          <FadeIn>
            <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Onze technologie
            </p>
          </FadeIn>

          <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-6">
            {techStack.map((tech, i) => (
              <FadeIn key={tech.name} delay={i * 0.06}>
                <motion.div
                  className="group flex flex-col items-center gap-1 rounded-[var(--radius-md)] border border-transparent px-3 py-3 text-center transition-all duration-300 hover:border-border-subtle hover:bg-bg-subtle"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-sm font-semibold text-text-secondary transition-colors group-hover:text-text-primary">
                    {tech.name}
                  </span>
                  <span className="text-[10px] font-medium text-text-muted">
                    {tech.detail}
                  </span>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
