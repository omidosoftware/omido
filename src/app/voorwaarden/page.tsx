import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { COMPANY } from "@/lib/constants";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Algemene Voorwaarden",
  description:
    "De algemene voorwaarden van OMIDO Software voor onze dienstverlening.",
};

export default function VoorwaardenPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", url: "https://omido.nl" },
              {
                name: "Algemene Voorwaarden",
                url: "https://omido.nl/voorwaarden",
              },
            ])
          ),
        }}
      />

      <div className="pt-34 pb-20 md:pt-38 md:pb-28">
        <Container narrow>
          <h1 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] font-normal leading-tight tracking-tight text-text-primary">
            Algemene Voorwaarden
          </h1>
          <p className="mb-12 text-sm text-text-muted">
            Laatst bijgewerkt: {/* [KLANT: vul datum in] */}—
          </p>

          <div className="space-y-10 text-[15px] leading-relaxed text-text-secondary">
            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                1. Definities
              </h2>
              <ul className="list-inside list-disc space-y-1 text-text-tertiary">
                <li>
                  <strong className="text-text-secondary">Opdrachtnemer:</strong>{" "}
                  {COMPANY.name}, gevestigd te {COMPANY.location}.
                  {/* [KLANT: voeg KvK-nummer toe] */}
                </li>
                <li>
                  <strong className="text-text-secondary">Opdrachtgever:</strong>{" "}
                  de partij die een overeenkomst aangaat met Opdrachtnemer.
                </li>
                <li>
                  <strong className="text-text-secondary">Overeenkomst:</strong>{" "}
                  elke afspraak tussen Opdrachtnemer en Opdrachtgever tot het
                  verrichten van werkzaamheden.
                </li>
              </ul>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                2. Toepasselijkheid
              </h2>
              <p>
                Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen,
                offertes en overeenkomsten tussen {COMPANY.name} en
                Opdrachtgever. Afwijkingen zijn alleen geldig als deze
                schriftelijk zijn overeengekomen.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                3. Offertes en aanbiedingen
              </h2>
              <p>
                Alle offertes en aanbiedingen zijn vrijblijvend, tenzij
                uitdrukkelijk anders vermeld. Een overeenkomst komt tot stand op
                het moment dat de Opdrachtgever de offerte schriftelijk of per
                e-mail accepteert.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                4. Uitvoering van de overeenkomst
              </h2>
              <p>
                {COMPANY.name} zal de overeenkomst naar beste inzicht en
                vermogen uitvoeren, in overeenstemming met de eisen van goed
                vakmanschap. De verplichting betreft een inspanningsverplichting,
                geen resultaatsverplichting.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                5. Oplevering en acceptatie
              </h2>
              <p>
                Na oplevering heeft de Opdrachtgever een acceptatieperiode van
                14 dagen om eventuele gebreken te melden. Kleine afwijkingen die
                het functioneren niet wezenlijk beïnvloeden, vormen geen reden
                voor afkeuring.
                {/* [KLANT: pas acceptatieperiode aan indien gewenst] */}
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                6. Intellectueel eigendom
              </h2>
              <p>
                Na volledige betaling worden de intellectuele eigendomsrechten op
                de specifiek voor Opdrachtgever ontwikkelde software overgedragen
                aan Opdrachtgever, tenzij schriftelijk anders overeengekomen.
                Generieke componenten, frameworks en tools die niet specifiek
                voor de opdracht zijn ontwikkeld, blijven eigendom van{" "}
                {COMPANY.name}.
                {/* [KLANT: laat juridisch controleren of deze formulering past bij het bedrijfsmodel] */}
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                7. Betaling
              </h2>
              <p>
                Betaling dient te geschieden binnen 14 dagen na factuurdatum,
                tenzij anders overeengekomen. Bij niet-tijdige betaling is
                Opdrachtgever van rechtswege in verzuim en is wettelijke rente
                verschuldigd.
                {/* [KLANT: pas betalingstermijn aan indien gewenst] */}
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                8. Aansprakelijkheid
              </h2>
              <p>
                De aansprakelijkheid van {COMPANY.name} is beperkt tot het
                bedrag dat in het betreffende geval door de
                aansprakelijkheidsverzekering wordt uitbetaald, dan wel tot het
                factuurbedrag van de betreffende opdracht. {COMPANY.name} is
                niet aansprakelijk voor indirecte schade, waaronder gevolgschade,
                gederfde winst of gemiste besparingen.
                {/* [KLANT: laat juridisch controleren] */}
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                9. Geheimhouding
              </h2>
              <p>
                Beide partijen zijn verplicht tot geheimhouding van alle
                vertrouwelijke informatie die zij in het kader van de
                overeenkomst van elkaar ontvangen. Deze verplichting geldt ook
                na beëindiging van de overeenkomst.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                10. Overmacht
              </h2>
              <p>
                In geval van overmacht is {COMPANY.name} niet gehouden tot het
                nakomen van enige verplichting. Onder overmacht wordt onder meer
                verstaan: storingen in infrastructuur, overheidsmaatregelen, en
                andere onvoorziene omstandigheden buiten de macht van{" "}
                {COMPANY.name}.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                11. Toepasselijk recht
              </h2>
              <p>
                Op alle overeenkomsten is Nederlands recht van toepassing.
                Geschillen worden voorgelegd aan de bevoegde rechter in het
                arrondissement waar {COMPANY.name} is gevestigd.
              </p>
            </section>

            {/* ---------------------------------------------------------- */}
            <section>
              <h2 className="mb-3 text-lg font-semibold text-text-primary">
                12. Contact
              </h2>
              <p>
                Vragen over deze voorwaarden? Neem contact op via{" "}
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
