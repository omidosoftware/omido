"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Badge } from "./Badge";

interface PageHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHeader({ badge, title, highlight, subtitle }: PageHeaderProps) {
  const shouldReduceMotion = useReducedMotion();

  const Wrapper = shouldReduceMotion ? "div" : motion.div;
  const getProps = (delay: number) =>
    shouldReduceMotion ? {} : {
      initial: { opacity: 0, y: 20 } as const,
      animate: { opacity: 1, y: 0 } as const,
      transition: { duration: 0.6, delay, ease },
    };

  return (
    <div className="relative pt-24 pb-10 md:pt-34 md:pb-16 lg:pb-22">
      <Container narrow>
        <div className="text-center">
          {badge && (
            <Wrapper {...getProps(0)} className="mb-6">
              <Badge accent>{badge}</Badge>
            </Wrapper>
          )}

          <Wrapper {...getProps(badge ? 0.08 : 0)}>
            <div className="mx-auto mb-4 h-px w-12 bg-accent opacity-60 md:mb-6" />
          </Wrapper>

          <Wrapper {...getProps(badge ? 0.12 : 0.06)}>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight text-text-primary">
              {title}
              {highlight && (
                <>
                  {" "}
                  <span className="text-accent">{highlight}</span>
                </>
              )}
            </h1>
          </Wrapper>

          {subtitle && (
            <Wrapper {...getProps(badge ? 0.2 : 0.14)}>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-text-secondary md:mt-5 md:text-lg">
                {subtitle}
              </p>
            </Wrapper>
          )}
        </div>
      </Container>
    </div>
  );
}
