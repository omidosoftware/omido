import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { CaseStudy } from "@/components/sections/portfolio/CaseStudy";
import { NextProject } from "@/components/sections/portfolio/NextProject";
import { caseStudies } from "@/content/portfolio";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Bekijk hoe OMIDO Software echte producten bouwt. Van concept tot live platform — case studies van ons werk.",
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "https://omido.nl" },
            { name: "Portfolio", url: "https://omido.nl/portfolio" },
          ])),
        }}
      />

      <PageHeader
        badge="Case Studies"
        title="Ons"
        highlight="Werk."
        subtitle="Hoe wij ideeën omzetten in werkende, live producten."
      />
      <SectionWrapper>
        <Container>
          <div className="space-y-20">
            {caseStudies.map((study) => (
              <CaseStudy key={study.slug} study={study} />
            ))}
          </div>
          <NextProject />
        </Container>
      </SectionWrapper>
      <PreFooterCTA
        headline="Jouw project als volgende case study?"
        subtitle="Vertel ons over jouw idee — we laten je graag zien wat we kunnen bouwen."
      />
    </>
  );
}
