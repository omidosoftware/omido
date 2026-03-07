export interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  highlighted?: boolean;
}

export const services: Service[] = [
  {
    id: "ai-automation",
    icon: "BrainCircuit",
    title: "AI Agents & Automatisering",
    description:
      "Stop met repetitief handwerk. Wij bouwen en integreren slimme AI-agents direct in jouw bedrijfsprocessen. Van automatische documentverwerking tot intelligente assistenten voor je klantenservice.",
    features: [
      "Automatisering van interne processen",
      "Custom AI-assistenten op eigen data",
      "LLM API-integraties",
    ],
    cta: { label: "Bespreek automatisering", href: "/contact" },
    highlighted: true,
  },
  {
    id: "web-apps",
    icon: "Monitor",
    title: "Maatwerk Web Applicaties",
    description:
      "Van interactieve dashboards en portalen tot volledige B2B-software. Wij ontwerpen en bouwen 100% custom web applicaties die precies doen wat jouw bedrijf nodig heeft.",
    features: [
      "Interne bedrijfssoftware & dashboards",
      "Veilige klantportalen",
      "Complexe datavisualisatie",
    ],
    cta: { label: "Plan een technisch gesprek", href: "/contact" },
  },
  {
    id: "saas-platforms",
    icon: "Server",
    title: "Complete SaaS Platformen",
    description:
      "Jouw eigen idee op de markt brengen? Wij bouwen schaalbare Software-as-a-Service architecturen inclusief abonnementen, gebruikersbeheer en veilige betalingsintegraties.",
    features: [
      "Tweezijdige marktplaatsen",
      "Stripe / Mollie betaalintegraties",
      "Premium SEO-optimalisatie",
    ],
    cta: { label: "Start jouw SaaS-traject", href: "/contact" },
  },
  {
    id: "api-integrations",
    icon: "Cable",
    title: "API's & Systeemintegraties",
    description:
      "Werkt jouw bedrijf met systemen die niet met elkaar praten? Wij bouwen veilige, onzichtbare bruggen die data volautomatisch synchroniseren tussen al je softwarepakketten.",
    features: [
      "Custom API-ontwikkeling",
      "Koppelingen met bestaande software",
      "Real-time datasynchronisatie",
    ],
    cta: { label: "Koppel jouw systemen", href: "/contact" },
  },
];
