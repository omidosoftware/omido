"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Monitor, Server, Cable, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/content/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BrainCircuit,
  Monitor,
  Server,
  Cable,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon];

  return (
    <motion.article
      className={`group flex flex-col rounded-[var(--radius-lg)] border bg-bg-subtle transition-all duration-300 hover:shadow-md ${
        service.highlighted
          ? "border-accent/20 shadow-glow-sm hover:border-accent/30"
          : "border-border-default hover:border-border-hover"
      }`}
      id={service.id}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Accent top bar for highlighted */}
      {service.highlighted && (
        <div className="h-[2px] rounded-t-[var(--radius-lg)] bg-gradient-to-r from-transparent via-accent to-transparent" />
      )}

      <div className="flex flex-1 flex-col p-7 md:p-8">
        <div className="mb-5 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] transition-colors ${
              service.highlighted
                ? "bg-accent-muted text-accent"
                : "bg-bg-muted text-text-tertiary group-hover:text-accent"
            }`}
            aria-hidden="true"
          >
            {Icon && <Icon className="h-6 w-6" />}
          </div>
          {service.highlighted && (
            <span className="rounded-full bg-accent/12 px-3 py-1 text-[10px] font-semibold text-accent">
              Meest gevraagd
            </span>
          )}
        </div>

        <h3 className="mb-2 text-xl font-semibold text-text-primary">
          {service.title}
        </h3>

        {/* Problem framing */}
        <p className="mb-3 text-sm font-medium text-accent/80 italic">
          &ldquo;{service.problem}&rdquo;
        </p>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-text-secondary">
          {service.description}
        </p>

        {/* Ideal for */}
        <div className="mb-6 rounded-[var(--radius-md)] border border-border-subtle bg-bg-primary px-5 py-4">
          <p className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-text-muted">
            <Users className="h-3.5 w-3.5" />
            Past bij
          </p>
          <ul className="space-y-1.5">
            {service.idealFor.map((item) => (
              <li key={item} className="text-[13px] text-text-secondary">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ul className="mb-8 space-y-2.5">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
              <span className="text-sm text-text-secondary">{feature}</span>
            </li>
          ))}
        </ul>

        <Button href={service.cta.href} variant="secondary" className="w-full">
          {service.cta.label}
        </Button>
      </div>
    </motion.article>
  );
}
