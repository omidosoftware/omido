import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

interface PreFooterCTAProps {
  headline?: string;
  subtitle?: string;
}

export function PreFooterCTA({
  headline = "Klaar om jouw project te starten?",
  subtitle = "Vertel ons over jouw idee en ontvang binnen 24 uur een reactie. Vrijblijvend, altijd.",
}: PreFooterCTAProps) {
  return (
    <section className="border-t border-border-subtle bg-bg-elevated py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                {headline}
              </h2>
              <p className="mt-2 text-text-secondary">
                {subtitle}
              </p>
            </div>
            <Button href="/contact" size="lg" className="shrink-0">
              Plan een kennismaking
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
