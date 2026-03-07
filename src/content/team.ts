export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  accent: "primary" | "secondary";
}

export const team: TeamMember[] = [
  {
    name: "Omid Fayz",
    role: "Lead Developer & Architect",
    bio: "Met een fundament in traditionele software engineering en een specialisatie in AI-assisted development, bouw ik systemen van A tot Z. Ik vertaal complexe problemen naar strakke ontwerpen en moderne, schaalbare code. Mijn focus: robuuste applicaties zonder vertraging, met een scherp oog voor detail en een absolute prioriteit op security.",
    accent: "primary",
  },
  {
    name: "Denis Dzmali",
    role: "Growth & Strategy Lead",
    bio: "Met een achtergrond in Bedrijfskunde en ruime ervaring in de IT-sector vorm ik de brug tussen jouw bedrijfsproces en onze techniek. Ik begeleid het traject van ontdekking tot oplevering en zorg ervoor dat de software die we bouwen jouw pijnpunten oplost en meetbare ROI levert.",
    accent: "secondary",
  },
];
