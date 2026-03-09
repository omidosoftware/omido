import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { ContactInfo } from "@/components/sections/contact/ContactInfo";
import { QuickCallCard } from "@/components/sections/contact/QuickCallCard";
import { WhatHappensNext } from "@/components/sections/contact/WhatHappensNext";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met OMIDO Software. Vraag een offerte aan of plan een introductiegesprek voor jouw softwareproject.",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "https://omido.nl" },
            { name: "Contact", url: "https://omido.nl/contact" },
          ])),
        }}
      />

      <PageHeader
        title="Laten we"
        highlight="kennis maken."
        subtitle="Heb je een vraag, wil je een offerte of gewoon brainstormen? Je hoort binnen 24 uur van ons."
      />
      <SectionWrapper>
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="order-2 space-y-6 lg:order-none lg:col-span-1">
              <ContactInfo />
              <QuickCallCard />
              <WhatHappensNext />
            </div>
            <div className="order-1 lg:order-none lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
