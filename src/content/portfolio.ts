export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  challenge: string;
  solution: string;
  deliverables: string[];
  url: string;
  techStack: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "snapklus",
    title: "Snapklus",
    subtitle: "Lokaal klussen platform",
    tags: ["Marketplace", "Payments"],
    challenge:
      "De klant wilde een betrouwbaar, lokaal platform waar buren elkaar kunnen vinden voor dagelijkse klusjes. De technische uitdaging: een tweezijdig netwerk gecombineerd met 100% veilige, ingebouwde betalingen.",
    solution:
      "Wij hebben Snapklus van de grond af opgebouwd. We ontwikkelden het designconcept voor een gebruiksvriendelijke interface waar zowel jong als oud makkelijk mee overweg kan.",
    deliverables: [
      "Gebruikersportalen met profielbeheer en reviews",
      "Intuïtieve flows voor klussen zoeken en plaatsen",
      "Integratie van veilige betalingsgateways",
    ],
    url: "https://www.snapklus.nl/",
    techStack: ["React", "C#", "Stripe", "Azure"],
  },
];
