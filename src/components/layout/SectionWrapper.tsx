import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  elevated?: boolean;
  className?: string;
  spacing?: "compact" | "snug" | "default" | "generous" | "statement";
}

const spacingClasses = {
  compact: "py-8 md:py-12 lg:py-16",
  snug: "py-12 md:py-16 lg:py-20",
  default: "py-14 md:py-22 lg:py-26",
  generous: "py-18 md:py-26 lg:py-30",
  statement: "py-22 md:py-30 lg:py-34",
};

export function SectionWrapper({
  children,
  id,
  elevated,
  className = "",
  spacing = "default",
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative ${spacingClasses[spacing]} ${
        elevated
          ? "bg-bg-elevated border-y border-border-subtle"
          : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
