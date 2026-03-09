"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FadeIn } from "@/components/motion/FadeIn";
import { faqs } from "@/content/faqs";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <SectionWrapper spacing="tight">
      <Container narrow>
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Veelgestelde vragen
            </p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-text-primary">
              Hoe werkt het?
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="rounded-[var(--radius-md)] border border-border-default bg-bg-primary transition-colors hover:border-border-hover">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                  aria-expanded={openIndex === i}
                >
                  <span className="text-[15px] font-medium text-text-primary">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-4 w-4 text-text-muted" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-text-secondary">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
