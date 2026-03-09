"use client";

import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FadeIn } from "@/components/motion/FadeIn";

const differentiators = [
  {
    num: "01",
    title: "Eén team, van begin tot eind",
    description:
      "Geen overdracht tussen strategie, ontwerp en development. Je werkt direct met de mensen die bouwen. Dat scheelt tijd, miscommunicatie en frustratie.",
  },
  {
    num: "02",
    title: "Gebouwd voor groei, niet voor nu",
    description:
      "Schaalbare architectuur, onderhoudbare code, geen technische schuld. Jouw software groeit mee met je bedrijf — zonder herbouw.",
  },
  {
    num: "03",
    title: "AI waar het waarde toevoegt",
    description:
      "Wij integreren AI wanneer het écht tijd bespaart of inzicht oplevert. Niet omdat het een trend is, maar omdat het je bedrijf beter maakt.",
  },
];

export function WhyOmido() {
  return (
    <SectionWrapper>
      <Container>
        <FadeIn variant="blurEmerge">
          <div className="mb-14 max-w-xl md:mb-16">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-tight tracking-tight text-text-primary">
              Waarom OMIDO
            </h2>
          </div>
        </FadeIn>

        <div className="flex flex-col">
          {differentiators.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.12} variant="softEnter">
              <div className="py-10 first:pt-0 last:pb-0">
                {/* Mobile: ordinal + accent mark layout */}
                <div className="flex items-start gap-5 md:hidden">
                  <span
                    className="font-[family-name:var(--font-display)] text-[3rem] leading-none text-text-primary/[0.07] select-none"
                    aria-hidden="true"
                  >
                    {item.num}
                  </span>
                  <div className="flex-1 pt-1.5">
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-[2px] rounded-full bg-accent/25" />
                      <h3 className="text-[19px] font-semibold leading-snug text-text-primary">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-3 pl-[14px] text-[15px] leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Desktop: horizontal ruled layout */}
                <div className="hidden md:grid md:grid-cols-[auto_1fr] md:gap-10 lg:grid-cols-[4rem_16rem_1fr]">
                  <div className="flex items-start">
                    <span className="font-mono text-[13px] text-text-muted pt-1">{item.num}</span>
                  </div>
                  <div className="flex items-start">
                    <h3 className="text-lg font-semibold text-text-primary md:pt-0">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[15px] leading-relaxed text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </div>
              {i < differentiators.length - 1 && (
                <div className="hidden h-px bg-border-subtle md:block" />
              )}
            </FadeIn>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
