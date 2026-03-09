export interface Service {
  id: string;
  icon: string;
  title: string;
  problem: string;
  description: string;
  idealFor: string[];
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export const services: Service[] = [
  {
    id: "ai-automation",
    icon: "BrainCircuit",
    title: "AI Agents & Automatisering",
    problem:
      "Je team besteedt uren aan taken die slim geautomatiseerd kunnen worden.",
    description:
      "Wij bouwen en integreren AI-agents direct in jouw bedrijfsprocessen. Documenten die zichzelf verwerken, klantvragen die automatisch beantwoord worden, data die zichzelf organiseert. Minder handwerk, meer focus op wat ertoe doet.",
    idealFor: [
      "Bedrijven met repetitieve handmatige processen",
      "Teams die sneller willen werken zonder extra personeel",
    ],
    features: [
      "Procesautomatisering op maat",
      "AI-assistenten getraind op jouw data",
      "Integratie met bestaande bedrijfssoftware",
    ],
    cta: { label: "Bespreek automatisering", href: "/contact" },
    highlighted: true,
  },
  {
    id: "web-apps",
    icon: "Monitor",
    title: "Maatwerk Web Applicaties",
    problem:
      "Standaardsoftware past niet bij jouw werkproces of schaalt niet mee.",
    description:
      "Van interne dashboards en klantportalen tot volledige B2B-software. Wij ontwerpen en bouwen applicaties die precies doen wat jouw bedrijf nodig heeft — niet meer, niet minder.",
    idealFor: [
      "Bedrijven die standaardsoftware ontgroeien",
      "Organisaties met complexe interne processen",
    ],
    features: [
      "Interne bedrijfssoftware en dashboards",
      "Beveiligde klant- en partnerportalen",
      "Real-time data-inzichten en rapportages",
    ],
    cta: { label: "Plan een technisch gesprek", href: "/contact" },
  },
  {
    id: "saas-platforms",
    icon: "Server",
    title: "Complete SaaS Platformen",
    problem:
      "Je hebt een idee voor een softwareproduct maar mist het technisch team om het te bouwen.",
    description:
      "Wij bouwen schaalbare Software-as-a-Service platformen van concept tot markt. Inclusief gebruikersbeheer, abonnementen, betalingsintegratie en de architectuur om door te groeien.",
    idealFor: [
      "Ondernemers met een SaaS-idee",
      "Bedrijven die een bestaand proces als product willen aanbieden",
    ],
    features: [
      "Schaalbare multi-tenant architectuur",
      "Betaalintegratie via Stripe of Mollie",
      "Gebruikersbeheer en onboarding-flows",
    ],
    cta: { label: "Start jouw SaaS-traject", href: "/contact" },
  },
  {
    id: "api-integrations",
    icon: "Cable",
    title: "API's & Systeemintegraties",
    problem:
      "Je systemen praten niet met elkaar en je team vult handmatig data over.",
    description:
      "Wij bouwen veilige koppelingen die data automatisch synchroniseren tussen je CRM, boekhouding, webshop of eigen software. Geen handmatig overtypen, geen fouten, geen vertraging.",
    idealFor: [
      "Bedrijven met meerdere losse softwaresystemen",
      "Teams die tijd verliezen aan handmatige datasynchronisatie",
    ],
    features: [
      "Custom API-ontwikkeling",
      "Koppelingen met bestaande bedrijfssoftware",
      "Real-time of geplande datasynchronisatie",
    ],
    cta: { label: "Koppel jouw systemen", href: "/contact" },
  },
];
