import { Target, ShieldCheck, Gauge, Lightbulb } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { FadeIn } from "@/components/motion/FadeIn";

const values = [
  {
    icon: Target,
    title: "Resultaatgericht",
    description:
      "We bouwen software om problemen op te lossen, niet om technologie te demonstreren.",
  },
  {
    icon: ShieldCheck,
    title: "Veilig en solide",
    description:
      "Security en kwaliteit zijn geen afterthoughts. Ze zitten in elke regel code.",
  },
  {
    icon: Gauge,
    title: "Snel en realistisch",
    description:
      "We bewegen snel, maar beloven alleen wat we kunnen waarmaken.",
  },
  {
    icon: Lightbulb,
    title: "Helder en eerlijk",
    description:
      "Transparante communicatie, vaste prijzen, en geen verborgen verrassingen.",
  },
];

export function ValuesSection() {
  return (
    <SectionWrapper elevated>
      <Container>
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Onze principes
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-tight tracking-tight text-text-primary">
              Waar we voor staan
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <FadeIn key={value.title} delay={i * 0.08}>
                <div className="flex items-start gap-4 rounded-[var(--radius-md)] border border-border-subtle bg-bg-primary p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-accent-muted">
                    <Icon className="h-[18px] w-[18px] text-accent" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-text-primary">
                      {value.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-tertiary">
                      {value.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </SectionWrapper>
  );
}
