import Link from "next/link";
import Image from "next/image";
import { Container } from "./Container";
import { COMPANY, NAV_ITEMS } from "@/lib/constants";
import { isValidPhone } from "@/lib/utils";

const serviceLinks = [
  { label: "AI Agents & Automatisering", href: "/diensten#ai-automation" },
  { label: "Maatwerk Web Applicaties", href: "/diensten#web-apps" },
  { label: "SaaS Platformen", href: "/diensten#saas-platforms" },
  { label: "API-integraties", href: "/diensten#api-integrations" },
];

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-bg-elevated">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-2 md:gap-12 md:py-16 lg:grid-cols-4 lg:py-20">
          {/* Brand */}
          <div className="order-4 lg:order-none lg:col-span-1">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="OMIDO Software"
                width={110}
                height={36}
                className="h-8 w-auto lg:h-9"
              />
            </Link>
            <p className="mt-4 hidden max-w-xs text-sm leading-relaxed text-text-tertiary lg:block">
              Jouw technisch partner voor maatwerksoftware, AI-integraties en schaalbare platformen.
            </p>
          </div>

          {/* Navigation */}
          <div className="order-1 lg:order-none">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Navigatie
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="order-2 lg:order-none">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Diensten
            </h4>
            <ul className="space-y-2 lg:space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="order-3 lg:order-none">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-text-tertiary lg:space-y-3">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-accent">
                  {COMPANY.email}
                </a>
              </li>
              {isValidPhone(COMPANY.phone) && (
                <li>
                  <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-accent">
                    {COMPANY.phone}
                  </a>
                </li>
              )}
              <li>{COMPANY.location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border-subtle py-5 md:flex-row lg:py-8">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {COMPANY.name}. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
            <Link href="/privacy" className="transition-colors hover:text-text-tertiary">
              Privacy Policy
            </Link>
            <Link href="/voorwaarden" className="transition-colors hover:text-text-tertiary">
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
