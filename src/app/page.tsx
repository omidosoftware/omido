import { HeroSection } from "@/components/sections/home/HeroSection";
import { TrustStrip } from "@/components/sections/home/TrustStrip";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { FAQSection } from "@/components/sections/home/FAQSection";
import { faqs } from "@/content/faqs";
import { CTASection } from "@/components/sections/home/CTASection";
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
      <TrustStrip />
      <ProcessSection />
      <ServicesPreview />
      <FAQSection />
      <CTASection />
    </>
  );
}
