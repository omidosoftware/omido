import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustMetrics } from "@/components/sections/home/TrustMetrics";
import { WhyOmido } from "@/components/sections/home/WhyOmido";
import { SectionDivider } from "@/components/layout/SectionDivider";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { ResultsSection } from "@/components/sections/home/ResultsSection";
import { EntryOfferSection } from "@/components/sections/home/EntryOfferSection";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { CTASection } from "@/components/sections/home/CTASection";
import { faqs } from "@/content/faqs";
import { faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqs)),
        }}
      />
      <HeroSection />
      <TrustMetrics />
      <WhyOmido />
      <SectionDivider />
      <ServicesPreview />
      <ProcessSection />
      <ResultsSection />
      <SectionDivider />
      <EntryOfferSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
