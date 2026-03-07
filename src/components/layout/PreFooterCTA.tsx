import { Container } from "./Container";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";

export function PreFooterCTA() {
  return (
    <section className="border-t border-border-subtle bg-bg-elevated py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-text-primary md:text-2xl">
                Klaar om jouw project te starten?
              </h2>
              <p className="mt-2 text-text-secondary">
                Van het eerste ontwerp tot de livegang — wij regelen het complete traject.
              </p>
            </div>
            <Button href="/contact" size="lg" className="shrink-0">
              Start een gesprek
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
