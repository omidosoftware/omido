import { Phone } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { COMPANY } from "@/lib/constants";

export function QuickCallCard() {
  return (
    <FadeIn delay={0.15}>
      <div className="rounded-[var(--radius-lg)] border border-accent/15 bg-accent-muted p-7 shadow-glow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-accent/15">
          <Phone className="h-5 w-5 text-accent" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-text-primary">
          Liever direct bellen?
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-text-secondary">
          Bel ons voor een kort oriënterend gesprek. Geen verplichtingen, gewoon
          even sparren over je idee.
        </p>
        <a
          href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
          className="group inline-flex w-full items-center justify-center rounded-[var(--radius-sm)] bg-accent px-5 py-3 text-[15px] font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-hover hover:shadow-glow-sm"
        >
          {COMPANY.phone}
        </a>
      </div>
    </FadeIn>
  );
}
