"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BrainCircuit, Monitor, Server, Cable, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { StaggerChildren, staggerItemVariants } from "@/components/motion/StaggerChildren";
import { FadeIn } from "@/components/motion/FadeIn";
import { services } from "@/content/services";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BrainCircuit,
  Monitor,
  Server,
  Cable,
};

export function ServicesPreview() {
  return (
    <SectionWrapper>
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn>
            <div className="max-w-lg">
              <p className="mb-2 md:mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
                Expertise
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.625rem,3.5vw,2.5rem)] font-normal tracking-tight text-text-primary">
                Wat we bouwen
              </h2>
              <p className="mt-3 text-text-secondary">
                Elke oplossing begint met jouw specifieke uitdaging.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/diensten"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              Alle diensten bekijken
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </FadeIn>
        </div>

        <StaggerChildren className="mt-10 grid gap-3 md:grid-cols-2 md:mt-12">
          {services.map((service) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div key={service.id} variants={staggerItemVariants}>
                <Link
                  href="/diensten"
                  className={`group relative flex gap-5 rounded-[var(--radius-lg)] border p-6 transition-all duration-300 md:hover:-translate-y-0.5 md:hover:shadow-md md:p-7 ${
                    service.highlighted
                      ? "border-accent/20 bg-accent-subtle hover:border-accent/30 md:hover:shadow-glow-sm"
                      : "border-border-default bg-bg-subtle hover:border-border-hover"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`hidden md:flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] ${
                      service.highlighted
                        ? "bg-accent-muted text-accent"
                        : "bg-bg-muted text-text-tertiary group-hover:text-accent"
                    } transition-colors`}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-semibold text-text-primary">
                        {service.title}
                      </h3>
                      {service.highlighted && (
                        <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
                          Populair
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent" />
                </Link>
              </motion.div>
            );
          })}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  );
}
