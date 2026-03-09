"use client";

import { ArrowRight, Check, Zap, Layers } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

const entryFeatures = [
  "Afgebakende scope en deliverable",
  "Doorlooptijd: 1–2 weken",
  "Vaste prijs, duidelijke offerte vooraf",
  "Geen verplichtingen daarna",
];

const growthFeatures = [
  "Complete maatwerksoftware of SaaS",
  "Doorlooptijd: 4–8 weken",
  "Schaalbare architectuur van dag één",
  "Doorontwikkeling en SLA mogelijk",
];

export function EntryOfferSection() {
  return (
    <SectionWrapper elevated spacing="generous">
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-xl text-center mx-auto md:mb-14">
            <p className="mb-2 md:mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Trajecten
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.875rem,4vw,3.25rem)] font-normal leading-tight tracking-tight text-text-primary">
              Begin klein.{" "}
              <span className="text-accent">Groei verder.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Niet elk project begint groot. Soms is het slimste wat je kunt
              doen: klein starten, valideren, en dan pas opschalen.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {/* Entry trajectory */}
          <FadeIn delay={0.1} variant="scaleSettle">
            <div className="flex h-full flex-col rounded-[var(--radius-lg)] border-t-2 border-accent/15 bg-bg-primary p-7 transition-all duration-300 hover:border-border-hover md:border md:border-border-default md:p-8">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-bg-muted">
                <Zap className="h-5 w-5 text-text-tertiary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Instaptraject
              </h3>
              <p className="mt-1 text-sm text-text-tertiary">
                Snel valideren en resultaat zien
              </p>
              <div className="mt-4 mb-6">
                <span className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-text-primary">
                  Vanaf €995
                </span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {entryFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant="secondary" arrow>
                Meer informatie
              </Button>
            </div>
          </FadeIn>

          {/* Growth trajectory */}
          <FadeIn delay={0.15} variant="scaleSettle">
            <div className="flex h-full flex-col rounded-[var(--radius-lg)] border border-accent/20 bg-accent-subtle p-7 transition-all duration-300 hover:border-accent/30 hover:shadow-glow-sm md:p-8">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-accent-muted">
                <Layers className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Maatwerktraject
              </h3>
              <p className="mt-1 text-sm text-text-tertiary">
                Complete software die meegroeit
              </p>
              <div className="mt-4 mb-6">
                <span className="text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-text-primary">
                  Op maat
                </span>
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {growthFeatures.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-text-secondary"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button href="/contact" arrow>
                Plan een gesprek
              </Button>
            </div>
          </FadeIn>
        </div>

        {/* Bottom helper */}
        <FadeIn delay={0.2}>
          <p className="mt-8 text-center text-sm text-text-tertiary">
            Niet zeker welk traject past?{" "}
            <a
              href="/contact"
              className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent-hover"
            >
              We denken graag mee
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </p>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}
