"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { RingsBackground } from "@/components/backgrounds/RingsBackground";
import { FadeIn } from "@/components/motion/FadeIn";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-22 md:py-30">
      <RingsBackground />
      <Container className="relative z-10" narrow>
        <div className="text-center">
          <FadeIn>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Klaar om te starten?
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-tight tracking-tight text-text-primary">
              Jouw volgende project
              <br />
              <span className="text-accent">begint hier.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="mx-auto mt-5 max-w-md text-text-secondary">
              Vertel ons over jouw project en ontvang binnen 24 uur een reactie
              van ons team.
            </p>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg">
                Start een gesprek
              </Button>
              <Button href="/diensten" variant="ghost" size="lg" arrow>
                Bekijk onze diensten
              </Button>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
