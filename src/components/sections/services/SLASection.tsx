import { Shield, Check, Clock, RefreshCw, HeadphonesIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FadeIn } from "@/components/motion/FadeIn";

const commitments = [
  {
    icon: Shield,
    title: "Beveiligingsupdates",
    description: "Proactieve patches en security-monitoring. Geen verrassingen.",
  },
  {
    icon: Clock,
    title: "Monitoring & uptime",
    description: "Server-monitoring, back-ups en performance-bewaking.",
  },
  {
    icon: RefreshCw,
    title: "Doorontwikkeling",
    description: "Prioriteit bij nieuwe functionaliteit en verbeteringen.",
  },
  {
    icon: HeadphonesIcon,
    title: "Directe communicatie",
    description: "Vast aanspreekpunt. Geen tickets, geen wachtrij.",
  },
];

export function SLASection() {
  return (
    <SectionWrapper elevated>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          {/* Left: narrative */}
          <FadeIn>
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                Na oplevering
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-tight tracking-tight text-text-primary">
                Zorgeloos doorgroeien
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-text-secondary">
                Software is nooit écht af. Na de livegang bieden wij op maat
                gemaakte Service Level Agreements aan — zodat jouw applicatie
                veilig, snel en up-to-date blijft terwijl jij je richt op je
                bedrijf.
              </p>
              <p className="mt-4 text-sm text-text-tertiary">
                Elke SLA wordt afgestemd op jouw situatie. Geen standaardpakket,
                maar afspraken die passen bij de omvang en het belang van je software.
              </p>
            </div>
          </FadeIn>

          {/* Right: commitments grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {commitments.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.08}>
                  <div className="rounded-[var(--radius-md)] border border-border-subtle bg-bg-primary p-5">
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] bg-accent-muted">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <h4 className="text-[15px] font-semibold text-text-primary">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-sm text-text-tertiary">
                      {item.description}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
