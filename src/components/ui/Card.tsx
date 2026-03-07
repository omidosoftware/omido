import { type ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  className?: string;
  padding?: "compact" | "standard" | "spacious";
}

const paddings = {
  compact: "p-5 md:p-6",
  standard: "p-6 md:p-8",
  spacious: "p-8 md:p-10",
};

export function Card({
  children,
  hover = false,
  glow = false,
  className = "",
  padding = "standard",
}: CardProps) {
  return (
    <div
      className={`rounded-[var(--radius-lg)] border border-border-default bg-bg-subtle ${
        paddings[padding]
      } ${
        hover
          ? "transition-all duration-300 hover:-translate-y-0.5 hover:border-border-hover hover:shadow-md"
          : ""
      } ${
        glow ? "shadow-glow-sm" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
