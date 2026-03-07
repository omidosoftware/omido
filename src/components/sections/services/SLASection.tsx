import { Shield, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { FadeIn } from "@/components/motion/FadeIn";

const benefits = [
  "Actieve beveiligingsupdates",
  "Server monitoring & back-ups",
  "Prioriteit bij doorontwikkeling",
  "Directe communicatielijn",
];

export function SLASection() {
  return (
    <section className="border-t border-border-subtle bg-bg-elevated py-16 md:py-20">
      <Container>
        <FadeIn>
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-accent-muted">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <Badge accent>Doorlopende support</Badge>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-text-primary">
                Zorgeloos Onderhoud (SLA)
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-secondary">
                Software is nooit écht af. Na de livegang bieden wij op maat
                gemaakte Service Level Agreements aan. Hiermee houden we je
                applicatie veilig, snel en up-to-date.
              </p>
            </div>

            <ul className="flex shrink-0 flex-col gap-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-muted">
                    <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-medium text-text-secondary">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
