"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { StaggerChildren, staggerItemVariants } from "@/components/motion/StaggerChildren";
import { FadeIn } from "@/components/motion/FadeIn";
import { team } from "@/content/team";

export function TeamSection() {
  return (
    <SectionWrapper>
      <Container>
        <FadeIn>
          <div className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-text-muted">
              Team
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-tight tracking-tight text-text-primary">
              Het team achter de code
            </h2>
          </div>
        </FadeIn>

        <StaggerChildren className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={staggerItemVariants}
              className={`group relative overflow-hidden rounded-[var(--radius-lg)] border border-border-default bg-bg-primary p-7 transition-all duration-300 hover:border-border-hover hover:shadow-md md:p-8`}
            >
              {/* Accent indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                  member.accent === "primary"
                    ? "bg-accent"
                    : "bg-text-muted"
                }`}
              />

              <div className="pl-4">
                <h3 className="text-xl font-semibold text-text-primary">
                  {member.name}
                </h3>
                <p
                  className={`mt-1 text-sm font-medium ${
                    member.accent === "primary"
                      ? "text-accent"
                      : "text-text-tertiary"
                  }`}
                >
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {member.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </StaggerChildren>
      </Container>
    </SectionWrapper>
  );
}
