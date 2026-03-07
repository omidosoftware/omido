import { type ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  elevated?: boolean;
  className?: string;
  spacing?: "default" | "tight" | "loose";
}

const spacingClasses = {
  tight: "py-12 md:py-16 lg:py-20",
  default: "py-16 md:py-22 lg:py-26",
  loose: "py-20 md:py-26 lg:py-34",
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
