"use client";

import { ExternalLink, Check, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import type { CaseStudy as CaseStudyType } from "@/content/portfolio";

export function CaseStudy({ study }: { study: CaseStudyType }) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center">
      {/* Visual mockup */}
      <FadeIn direction="left" distance={30}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-border-default bg-bg-elevated md:aspect-video">
          {/* Decorative grid lines */}
          <div className="absolute inset-0 opacity-30">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="case-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1A1A1E" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#case-grid)" />
            </svg>
          </div>

          <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-border-default bg-bg-subtle shadow-glow-sm">
              <ExternalLink className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {study.title}
              <span className="text-accent">.nl</span>
            </h3>
            <p className="mt-2 text-sm text-text-tertiary">{study.subtitle}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border-subtle bg-bg-muted px-3 py-1 text-[11px] font-medium text-text-tertiary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Content */}
      <FadeIn delay={0.12}>
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <h2 className="mb-6 text-2xl font-semibold tracking-tight text-text-primary">
            {study.subtitle}
          </h2>

          {/* Challenge */}
          <div className="mb-6">
            <h4 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-muted">
                <Zap className="h-3.5 w-3.5 text-accent" />
              </div>
              De uitdaging
            </h4>
            <p className="text-sm leading-relaxed text-text-secondary">
              {study.challenge}
            </p>
          </div>

          {/* Solution */}
          <div className="mb-6">
            <h4 className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-text-primary">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-muted">
                <Shield className="h-3.5 w-3.5 text-accent" />
              </div>
              Onze oplossing
            </h4>
            <p className="mb-3 text-sm leading-relaxed text-text-secondary">
              {study.solution}
            </p>
            <ul className="space-y-2">
              {study.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button href={study.url} external arrow>
              Bekijk live website
            </Button>
            <span className="flex items-center gap-1.5 text-sm text-text-tertiary">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15">
                <Check className="h-3 w-3 text-success" strokeWidth={3} />
              </span>
              Live opgeleverd
            </span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
