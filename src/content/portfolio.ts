export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  projectMeta: { label: string; value: string }[];
  challenge: string;
  approach: string;
  solution: string;
  deliverables: string[];
  url: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "snapklus",
    title: "Snapklus",
    subtitle: "Lokaal klussen platform",
    tags: ["Marketplace", "Payments", "Full-stack"],
    projectMeta: [
      { label: "Type", value: "Tweezijdige marketplace" },
      { label: "Scope", value: "Volledig platform" },
      { label: "Status", value: "Live in productie" },
    ],
    challenge:
      "De klant wilde een betrouwbaar, lokaal platform waar buren elkaar kunnen vinden voor dagelijkse klusjes. De technische uitdaging: een tweezijdig netwerk met veilige, ingebouwde betalingen en een interface die voor iedereen — jong en oud — toegankelijk is.",
    approach:
      "We zijn gestart met een ontdekfase: de doelgroep, de gewenste flows en de technische eisen in kaart brengen. Daarna een klikbaar prototype, gevolgd door iteratieve development met tussentijdse reviews. Betalingsintegratie en beveiligingslagen zijn vroeg in het proces meegenomen.",
    solution:
      "Snapklus is van de grond af opgebouwd met een focus op eenvoud en vertrouwen. Het platform koppelt vragers en aanbieders via een intuïtieve interface, met ingebouwde betalingen, reviews en profielbeheer.",
    deliverables: [
      "Gebruikersportalen met profielbeheer en reviews",
      "Intuïtieve flows voor klussen zoeken en plaatsen",
      "Veilige betalingsintegratie via Stripe",
      "Responsive design voor alle apparaten",
    ],
    url: "https://www.snapklus.nl/",
  },
];
