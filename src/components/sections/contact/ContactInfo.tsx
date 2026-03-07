import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { COMPANY } from "@/lib/constants";
import { FadeIn } from "@/components/motion/FadeIn";

const info = [
  {
    icon: Mail,
    label: "E-mail",
    value: COMPANY.email,
    href: `mailto:${COMPANY.email}`,
  },
  {
    icon: Phone,
    label: "Telefoon",
    value: COMPANY.phone,
    href: `tel:${COMPANY.phone.replace(/\s/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Locatie",
    value: COMPANY.location,
  },
];

export function ContactInfo() {
  return (
    <FadeIn>
      <Card>
        <h3 className="mb-6 text-lg font-semibold text-text-primary">
          Contact informatie
        </h3>
        <div className="space-y-5">
          {info.map((item) => (
            <div key={item.label} className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-bg-muted">
                <item.icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-[15px] text-text-primary transition-colors hover:text-accent"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-[15px] text-text-primary">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </FadeIn>
  );
}
