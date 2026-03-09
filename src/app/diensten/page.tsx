import type { Metadata } from "next";
import { Zap, Shield } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { ServiceGrid } from "@/components/sections/services/ServiceGrid";
import { SLASection } from "@/components/sections/services/SLASection";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";
import { FadeIn } from "@/components/motion/FadeIn";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "AI-agents, maatwerk web applicaties, SaaS-platformen en API-integraties. Bekijk wat Omido Software voor jouw bedrijf kan bouwen.",
};

export default function DienstenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "https://omido.nl" },
            { name: "Diensten", url: "https://omido.nl/diensten" },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(
            "Maatwerksoftware & AI-integraties",
            "AI-agents, maatwerk web applicaties, SaaS-platformen en API-integraties op maat.",
            "https://omido.nl/diensten"
          )),
        }}
      />

      <PageHeader
        title="Onze"
        highlight="Diensten."
        subtitle="Software en AI-oplossingen die passen bij jouw bedrijf — niet andersom."
      />

      {/* Trust indicators */}
      <Container>
        <FadeIn>
          <div className="-mt-6 mb-14 flex flex-wrap items-center justify-center gap-4 rounded-[var(--radius-md)] border border-border-subtle bg-bg-elevated px-6 py-3.5 md:gap-6">
            <span className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Zap className="h-4 w-4 text-accent" />
              Eerste versie vaak live binnen weken
            </span>
            <span className="hidden text-text-muted md:block">&middot;</span>
            <span className="flex items-center gap-2 text-sm font-medium text-text-secondary">
              <Shield className="h-4 w-4 text-accent" />
              Instaptrajecten vanaf &euro;995
            </span>
          </div>
        </FadeIn>
      </Container>

      <Container>
        <ServiceGrid />
      </Container>

      <div className="mt-16">
        <SLASection />
      </div>

      <PreFooterCTA
        headline="Weten welke dienst bij jou past?"
        subtitle="Vertel ons over je situatie — we denken graag mee over de beste aanpak."
      />
    </>
  );
}
