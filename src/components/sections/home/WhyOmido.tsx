"use client";

import { Users, TrendingUp, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FadeIn } from "@/components/motion/FadeIn";

const differentiators = [
  {
    icon: Users,
    title: "Eén team, van begin tot eind",
    description:
      "Geen overdracht tussen strategie, ontwerp en development. Je werkt direct met de mensen die bouwen. Dat scheelt tijd, miscommunicatie en frustratie.",
  },
  {
    icon: TrendingUp,
    title: "Gebouwd voor groei, niet voor nu",
    description:
      "Schaalbare architectuur, onderhoudbare code, geen technische schuld. Jouw software groeit mee met je bedrijf — zonder herbouw.",
  },
  {
    icon: Sparkles,
    title: "AI waar het waarde toevoegt",
    description:
      "Wij integreren AI wanneer het écht tijd bespaart of inzicht oplevert. Niet omdat het een trend is, maar omdat het je bedrijf beter maakt.",
  },
];

export function WhyOmido() {
  return (
    <SectionWrapper>
      <Container>
        <FadeIn>
          <div className="mb-12 max-w-xl md:mb-16">
            <p className="mb-2 md:mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Waarom OMIDO
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.875rem,4vw,3.25rem)] font-normal leading-tight tracking-tight text-text-primary">
              Wat ons anders maakt
            </h2>
          </div>
        </FadeIn>

        {/* Horizontal ruled layout — visually distinct from the card grid in ServicesPreview */}
        <div className="divide-y divide-border-subtle">
          {differentiators.map((item, i) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={i * 0.08} variant="fadeUp">
                <div className="grid gap-4 py-8 first:pt-0 last:pb-0 md:grid-cols-[auto_1fr] md:gap-10 lg:grid-cols-[4rem_16rem_1fr]">
                  {/* Number + Icon */}
                  <div className="flex items-start gap-3 md:flex-col md:items-center md:gap-1.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-accent-muted">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex items-start">
                    <h3 className="text-lg font-semibold text-text-primary md:pt-2.5">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[15px] leading-relaxed text-text-secondary md:pt-2.5">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
