import { Clock, MessageSquare, FileText } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

const steps = [
  {
    icon: Clock,
    title: "Reactie binnen 24 uur",
    description: "We lezen je bericht en reageren snel.",
  },
  {
    icon: MessageSquare,
    title: "Vrijblijvend gesprek",
    description: "We bespreken je idee en de mogelijkheden.",
  },
  {
    icon: FileText,
    title: "Helder voorstel",
    description: "Je ontvangt een offerte met scope en planning.",
  },
];

export function WhatHappensNext() {
  return (
    <FadeIn delay={0.2}>
      <div className="rounded-[var(--radius-lg)] border border-border-default bg-bg-subtle p-7">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
          Wat je kunt verwachten
        </p>
        <div className="space-y-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex items-start gap-3.5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-bg-muted">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-text-primary">
                    {step.title}
                  </p>
                  <p className="text-[13px] text-text-tertiary">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FadeIn>
  );
}
