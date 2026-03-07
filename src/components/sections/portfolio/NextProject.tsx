import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { ArrowRight } from "lucide-react";

export function NextProject() {
  return (
    <FadeIn>
      <div className="mt-16 overflow-hidden rounded-[var(--radius-xl)] border border-dashed border-border-hover bg-bg-elevated/50 p-10 text-center md:p-14">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-border-default bg-bg-subtle">
          <ArrowRight className="h-5 w-5 text-accent" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-text-primary">
          Jouw project hier?
        </h3>
        <p className="mb-6 text-sm text-text-secondary">
          Wij hebben ruimte voor nieuwe samenwerkingen.
        </p>
        <Button href="/contact" variant="secondary">
          Bespreek jouw project
        </Button>
      </div>
    </FadeIn>
  );
}
