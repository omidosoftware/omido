"use client";

import { ExternalLink, Check, Zap, Shield, Compass } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import type { CaseStudy as CaseStudyType } from "@/content/portfolio";

export function CaseStudy({ study }: { study: CaseStudyType }) {
  return (
    <div className="space-y-10 lg:space-y-14">
      {/* Top: Project identity card */}
      <FadeIn>
        <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-default bg-bg-subtle">
          <div className="grid lg:grid-cols-2">
            {/* Left: project identity */}
            <div className="flex flex-col justify-center border-b border-border-subtle p-8 lg:border-b-0 lg:border-r lg:p-12">
              <div className="mb-4 flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
              <h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold tracking-tight text-text-primary">
                {study.title}
              </h2>
              <p className="mt-1 text-text-tertiary">{study.subtitle}</p>

              {/* Project meta */}
              <div className="mt-6 grid grid-cols-3 gap-4 rounded-[var(--radius-md)] border border-border-subtle bg-bg-primary px-5 py-4">
                {study.projectMeta.map((meta) => (
                  <div key={meta.label}>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
                      {meta.label}
                    </p>
                    <p className="mt-0.5 text-[13px] font-medium text-text-secondary">
                      {meta.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button href={study.url} external size="sm" arrow>
                  Bekijk live
                </Button>
                <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15">
                    <Check className="h-3 w-3 text-success" strokeWidth={3} />
                  </span>
                  Live opgeleverd
                </span>
              </div>
            </div>

            {/* Right: deliverables */}
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                Opgeleverd
              </p>
              <ul className="space-y-3">
                {study.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                    <span className="text-[15px] text-text-secondary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Bottom: challenge → approach → solution */}
      <div className="grid gap-6 md:grid-cols-3 md:gap-8">
        <FadeIn delay={0.05}>
          <div className="rounded-[var(--radius-md)] border border-border-default bg-bg-subtle p-6 md:p-7">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-accent-muted">
                <Zap className="h-3.5 w-3.5 text-accent" />
              </div>
              <h4 className="text-sm font-semibold text-text-primary">
                De uitdaging
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {study.challenge}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="rounded-[var(--radius-md)] border border-border-default bg-bg-subtle p-6 md:p-7">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-accent-muted">
                <Compass className="h-3.5 w-3.5 text-accent" />
              </div>
              <h4 className="text-sm font-semibold text-text-primary">
                Onze aanpak
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {study.approach}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="rounded-[var(--radius-md)] border border-border-default bg-bg-subtle p-6 md:p-7">
            <div className="mb-3 flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-accent-muted">
                <Shield className="h-3.5 w-3.5 text-accent" />
              </div>
              <h4 className="text-sm font-semibold text-text-primary">
                Het resultaat
              </h4>
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              {study.solution}
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
