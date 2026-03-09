"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { RingsBackground } from "@/components/backgrounds/RingsBackground";
import { FadeIn } from "@/components/motion/FadeIn";
import { COMPANY } from "@/lib/constants";
import { isValidPhone } from "@/lib/utils";

export function CTASection() {
  return (
    <section data-hide-sticky-cta className="relative overflow-hidden py-22 md:py-30">
      <RingsBackground />
      <Container className="relative z-10" narrow>
        <div className="text-center">
          <FadeIn variant="blurEmerge">
            <p className="mb-2 md:mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Klaar om te starten?
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.875rem,4vw,3.25rem)] font-normal leading-tight tracking-tight text-text-primary">
              Jouw volgende project
              <br />
              <span className="text-accent">begint hier.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-text-secondary">
              Vertel ons over jouw project en ontvang binnen 24 uur een
              reactie van ons team. Vrijblijvend, altijd.
            </p>
          </FadeIn>
          <FadeIn variant="softEnter" delay={0.3}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Plan een kennismaking
              </Button>
              <Button href="/diensten" variant="ghost" size="lg" arrow className="w-full sm:w-auto">
                Bekijk onze diensten
              </Button>
            </div>
            {isValidPhone(COMPANY.phone) && (
              <p className="mt-6 text-sm text-text-muted">
                Of bel direct:{" "}
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                  className="font-medium text-text-tertiary transition-colors hover:text-accent"
                >
                  {COMPANY.phone}
                </a>
              </p>
            )}
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
