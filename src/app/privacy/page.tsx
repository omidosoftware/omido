import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { COMPANY } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Lees hoe Omido Software omgaat met jouw persoonsgegevens en privacy.",
};

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://omido.nl" },
              { name: "Privacy Policy", url: "https://omido.nl/privacy" },
            ])
          ),
        }}
      />

      <div className="pt-34 pb-20 md:pt-38 md:pb-28">
        <Container narrow>
          <h1 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-tight text-text-primary">
            Privacy Policy
          </h1>
          <p className="mb-12 text-sm text-text-muted">
            Laatst bijgewerkt: {/* [KLANT: vul datum in] */}—
          </p>

          <div className="prose-legal space-y-10 text-[15px] leading-relaxed text-text-secondary">
            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                1. Wie zijn wij
              </h2>
              <p>
                {COMPANY.name} is verantwoordelijk voor de verwerking van
                persoonsgegevens zoals beschreven in deze privacyverklaring.
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-text-tertiary">
                <li>
                  Bedrijfsnaam: {COMPANY.name}
                </li>
                <li>
                  E-mail:{" "}
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-accent hover:underline"
                  >
                    {COMPANY.email}
                  </a>
                </li>
                {/* [KLANT: voeg KvK-nummer en vestigingsadres toe] */}
              </ul>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                2. Welke gegevens verzamelen wij
              </h2>
              <p>
                Wij verwerken persoonsgegevens die je zelf aan ons verstrekt,
                bijvoorbeeld via het contactformulier op deze website:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-text-tertiary">
                <li>Naam</li>
                <li>E-mailadres</li>
                <li>Inhoud van je bericht</li>
                <li>Type project (optioneel)</li>
              </ul>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                3. Waarom wij gegevens verwerken
              </h2>
              <p>Wij verwerken jouw gegevens voor de volgende doelen:</p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-text-tertiary">
                <li>
                  Om contact met je op te nemen naar aanleiding van jouw
                  verzoek
                </li>
                <li>Om een offerte of voorstel op te stellen</li>
                <li>Om onze dienstverlening te kunnen uitvoeren</li>
              </ul>
              <p className="mt-3">
                De rechtsgrond voor deze verwerking is jouw toestemming of de
                uitvoering van een overeenkomst.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                4. Bewaartermijn
              </h2>
              <p>
                Wij bewaren persoonsgegevens niet langer dan strikt noodzakelijk
                is voor de doelen waarvoor ze zijn verzameld. Contactgegevens
                worden bewaard zolang dat nodig is voor de opvolging van jouw
                verzoek.
                {/* [KLANT: specificeer concrete bewaartermijnen indien gewenst] */}
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                5. Delen met derden
              </h2>
              <p>
                Wij delen jouw persoonsgegevens alleen met derden als dit nodig
                is voor de uitvoering van onze diensten of om te voldoen aan
                wettelijke verplichtingen. Wij maken gebruik van de volgende
                diensten die toegang kunnen hebben tot persoonsgegevens:
              </p>
              <ul className="mt-3 list-inside list-disc space-y-1 text-text-tertiary">
                <li>
                  E-mailverzending via Resend (voor het verwerken van
                  contactformulieren)
                </li>
                {/* [KLANT: voeg eventuele andere verwerkers toe, bijv. hosting, analytics] */}
              </ul>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                6. Cookies
              </h2>
              <p>
                Deze website maakt alleen gebruik van strikt noodzakelijke
                technische cookies. Wij plaatsen geen tracking- of
                marketingcookies.
                {/* [KLANT: pas aan als er analytics of andere cookies worden toegevoegd] */}
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                7. Jouw rechten
              </h2>
              <p>
                Je hebt het recht om jouw persoonsgegevens in te zien, te
                corrigeren of te verwijderen. Daarnaast heb je het recht om
                bezwaar te maken tegen de verwerking en het recht op
                gegevensoverdraagbaarheid. Je kunt een verzoek indienen via{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-accent hover:underline"
                >
                  {COMPANY.email}
                </a>
                .
              </p>
              <p className="mt-3">
                Je hebt ook het recht om een klacht in te dienen bij de
                Autoriteit Persoonsgegevens.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                8. Beveiliging
              </h2>
              <p>
                Wij nemen passende technische en organisatorische maatregelen om
                jouw persoonsgegevens te beschermen tegen verlies of onrechtmatig
                gebruik.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                9. Contact
              </h2>
              <p>
                Heb je vragen over deze privacyverklaring of over hoe wij met
                jouw gegevens omgaan? Neem contact op via{" "}
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="text-accent hover:underline"
                >
                  {COMPANY.email}
                </a>
                .
              </p>
            </section>
          </div>
        </Container>
      </div>
    </>
  );
}
