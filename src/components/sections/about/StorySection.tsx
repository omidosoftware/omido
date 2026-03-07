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
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-text-primary">
            Ontwerp, Bouw &amp; Oplevering in één hand
          </h2>
        </FadeIn>

        <div className="space-y-5 text-[15px] leading-relaxed text-text-secondary">
          <FadeIn delay={0.1}>
            <p>
              Veel IT-projecten lopen stuk op miscommunicatie. Je hebt een
              designer die iets moois maakt, maar developers die zeggen dat het
              niet gebouwd kan worden. Vervolgens snappen de developers de
              business niet, en managers snappen de code niet.
            </p>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p>
              <strong className="text-text-primary">
                Bij Omido Software lossen we dat op door het hele traject van A
                tot Z over te nemen.
              </strong>{" "}
              Wij combineren een ijzersterke technische basis met strategisch
              inzicht.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <blockquote className="my-10 border-l-2 border-accent pl-6 font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-text-primary md:text-2xl">
              &ldquo;Software die razendsnel live staat, feilloos werkt en
              perfect aansluit op jouw zakelijke doelen.&rdquo;
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p>
              Wij begeleiden het creatieve ontwerpproces, schrijven de complexe
              code en zorgen voor een vlekkeloze oplevering op veilige servers.
              Het resultaat? Een product dat aansluit, presteert en groeit met
              je bedrijf.
            </p>
          </FadeIn>
        </div>
      </Container>
    </SectionWrapper>
  );
}
