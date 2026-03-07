import { COMPANY } from "./constants";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    url: COMPANY.url,
    logo: `${COMPANY.url}/logo.png`,
    description:
      "Omido Software is een premium softwarestudio gespecialiseerd in maatwerksoftware, AI-integraties en schaalbare platformen.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Zuid-Holland",
      addressCountry: "NL",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: COMPANY.phone,
      email: COMPANY.email,
      contactType: "sales",
      availableLanguage: ["Dutch", "English"],
    },
    sameAs: [],
    knowsAbout: [
      "Maatwerksoftware",
      "AI-integraties",
      "SaaS-platformen",
      "API-integraties",
      "Web applicaties",
      "React",
      "Next.js",
      "C#",
      "Azure",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: COMPANY.name,
    url: COMPANY.url,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Zuid-Holland",
      addressCountry: "NL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.92",
      longitude: "4.48",
    },
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
    serviceType: [
      "Maatwerksoftware ontwikkeling",
      "AI-integratie",
      "SaaS-platform ontwikkeling",
      "API-integratie",
    ],
  };
}

export function serviceSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: COMPANY.name,
      url: COMPANY.url,
    },
    url,
    areaServed: {
      "@type": "Country",
      name: "Nederland",
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
