"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { GridBackground } from "@/components/backgrounds/GridBackground";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerChildren, staggerItemVariants } from "@/components/motion/StaggerChildren";
import { Paintbrush, Code2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Paintbrush,
    title: "Ontwerp",
    description:
      "We brengen jouw bedrijfslogica in kaart en ontwerpen een interface die klopt. Je ontvangt een klikbaar prototype voordat er één regel code wordt geschreven.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Development",
    description:
      "Moderne, veilige code in React en C#. AI-versneld waar het waarde toevoegt. Geen shortcuts, geen technische schuld.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Oplevering",
    description:
      "Hosting, betalingen, monitoring — wij configureren alles en leveren een productie-klaar platform op dat direct waarde levert.",
  },
];

export function ProcessSection() {
  return (
    <SectionWrapper elevated>
      <GridBackground />
      <Container className="relative z-10">
        <FadeIn>
          <div className="mb-14 text-center md:mb-18">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Werkwijze
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.25rem)] font-normal leading-tight tracking-tight text-text-primary">
              Ontwerp. Bouw. Lanceer.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-text-secondary">
              Van eerste gesprek tot livegang — een strak proces zonder verrassingen.
            </p>
          </div>
        </FadeIn>

        <StaggerChildren className="relative grid gap-6 lg:grid-cols-3 lg:gap-4">
          {/* Connecting line (desktop) */}
          <div className="absolute top-[4.5rem] left-[20%] right-[20%] hidden h-px lg:block">
            <FadeIn delay={0.4}>
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border-hover to-transparent" />
            </FadeIn>
          </div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={staggerItemVariants}
                className="group relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Number + Icon */}
                  <div className="relative mb-6">
                    <div className="flex h-18 w-18 items-center justify-center rounded-2xl border border-border-default bg-bg-primary transition-all duration-300 group-hover:border-border-hover group-hover:shadow-glow-sm">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-bg-muted text-[11px] font-bold text-text-muted ring-2 ring-bg-elevated">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mx-auto max-w-[280px] text-sm leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  );
}
