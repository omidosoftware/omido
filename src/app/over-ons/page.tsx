import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { StorySection } from "@/components/sections/about/StorySection";
import { ValuesSection } from "@/components/sections/about/ValuesSection";
import { TeamSection } from "@/components/sections/about/TeamSection";
import { PreFooterCTA } from "@/components/layout/PreFooterCTA";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Over Ons",
  description:
    "OMIDO Software combineert technische excellentie met strategisch inzicht. Maak kennis met het team achter de code.",
};

export default function OverOnsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "https://omido.nl" },
            { name: "Over Ons", url: "https://omido.nl/over-ons" },
          ])),
        }}
      />

      <PageHeader
        title="Wij zijn"
        highlight="OMIDO."
        subtitle="Een modern tech-bureau dat snapt dat software een middel is — geen doel op zich."
      />
      <StorySection />
      <ValuesSection />
      <TeamSection />
      <PreFooterCTA
        headline="Zin om samen te bouwen?"
        subtitle="Vertel ons over jouw project — we denken graag mee."
      />
    </>
  );
}
