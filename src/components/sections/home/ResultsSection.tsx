"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Shield, FileCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FadeIn } from "@/components/motion/FadeIn";

const guarantees = [
  { icon: FileCheck, text: "Vaste prijs afspraken" },
  { icon: Shield, text: "Geen verrassingen achteraf" },
];

const deliverables = [
  "Gebruikersportalen met profielbeheer en reviews",
  "Intuïtieve flows voor klussen zoeken en plaatsen",
  "Veilige betalingsintegratie via Stripe",
];

const projectMeta = [
  { label: "Type", value: "Tweezijdige marketplace" },
  { label: "Scope", value: "Volledig platform" },
  { label: "Status", value: "Live in productie" },
];

export function ResultsSection() {
  return (
    <SectionWrapper spacing="generous">
      <Container>
        <FadeIn>
          <div className="mb-12 text-center md:mb-16">
            <p className="mb-2 md:mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Resultaten
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.625rem,3.5vw,2.5rem)] font-normal leading-tight tracking-tight text-text-primary">
              Wat we opleveren
            </h2>
          </div>
        </FadeIn>

        {/* Featured case study */}
        <FadeIn delay={0.1} variant="scaleSettle">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-default bg-bg-subtle">
            <div className="grid lg:grid-cols-2">
              {/* Left: structured project summary */}
              <div className="flex flex-col justify-center border-b border-border-subtle p-6 md:p-8 lg:border-b-0 lg:border-r lg:p-12">
                <div className="mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                    Case study
                  </p>
                  <h3 className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-tight text-text-primary">
                    Snapklus
                  </h3>
                  <p className="mt-1 text-sm text-text-tertiary">
                    Lokaal klussen platform
                  </p>
                </div>

                {/* Project meta grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-[var(--radius-md)] border border-border-subtle bg-bg-primary px-5 py-4">
                  {projectMeta.map((meta) => (
                    <div key={meta.label}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                        {meta.label}
                      </p>
                      <p className="mt-0.5 text-[13px] font-medium text-text-secondary">
                        {meta.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <Link
                    href="/portfolio"
                    className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
                  >
                    Volledige case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <a
                    href="https://www.snapklus.nl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                  >
                    Bezoek live
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Right: what was delivered */}
              <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-accent-muted px-3 py-1 text-[11px] font-semibold text-accent">
                    Marketplace
                  </span>
                  <span className="rounded-full bg-bg-muted px-3 py-1 text-[11px] font-semibold text-text-tertiary">
                    Payments
                  </span>
                </div>

                <p className="text-[15px] leading-relaxed text-text-secondary">
                  Een tweezijdig platform waar buren klusjes aan elkaar
                  aanbieden. Gebouwd met veilige betalingsintegratie,
                  gebruikersbeheer en een interface die voor iedereen
                  toegankelijk is.
                </p>

                <ul className="mt-5 space-y-2.5">
                  {deliverables.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-text-secondary"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Guarantees strip */}
        <FadeIn delay={0.2} variant="softEnter">
          <div className="mt-8 flex flex-col items-center justify-center gap-6 rounded-[var(--radius-md)] border border-border-subtle bg-bg-subtle px-6 py-5 sm:flex-row sm:gap-8 md:mt-10">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <div
                  key={g.text}
                  className="flex items-center gap-2.5 text-sm font-medium text-text-secondary"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {g.text}
                </div>
              );
            })}
          </div>
        </FadeIn>
      </Container>
    </SectionWrapper>
  );
}
