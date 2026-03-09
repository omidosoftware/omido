import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { TopoBackground } from "@/components/backgrounds/TopoBackground";
import { FadeIn } from "@/components/motion/FadeIn";

export function StorySection() {
  return (
    <SectionWrapper>
      <TopoBackground />
      <Container narrow className="relative z-10">
        <FadeIn>
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
            Ons verhaal
          </p>
          <h2 className="mb-8 font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-tight tracking-tight text-text-primary">
            Waarom wij dit anders doen
          </h2>
        </FadeIn>

        <div className="space-y-5 text-[15px] leading-relaxed text-text-secondary">
          <FadeIn delay={0.1}>
            <p>
              Veel IT-projecten lopen stuk op miscommunicatie. Een designer
              maakt iets moois, maar de developer zegt dat het niet kan.
              Vervolgens snapt de developer de business niet, en de
              ondernemer snapt de code niet.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p>
              <strong className="text-text-primary">
                Bij OMIDO lossen we dat op door het hele traject in één hand
                te houden.
              </strong>{" "}
              Strategie, ontwerp, development en oplevering — door hetzelfde
              team, met dezelfde standaard. Geen overdrachten, geen
              vertalingen, geen ruis.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="my-10 border-l-2 border-accent pl-6">
              <p className="font-[family-name:var(--font-display)] text-xl leading-relaxed text-text-primary md:text-2xl">
                Software bouwen die aansluit op jouw bedrijf, snel live
                staat, en meegroeit met je ambities.
              </p>
              <p className="mt-3 text-sm text-text-tertiary">
                — De kern van alles wat we doen
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p>
              Wij begeleiden het creatieve ontwerp, schrijven de code en
              zorgen voor een veilige oplevering. Het resultaat: een product
              dat presteert, aansluit bij je doelen, en groeit met je bedrijf.
            </p>
          </FadeIn>
        </div>
      </Container>
    </SectionWrapper>
  );
}
