import { type ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  accent?: boolean;
  className?: string;
}

export function Badge({ children, accent, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] ${
        accent
          ? "bg-accent-muted text-accent-text border border-accent/15"
          : "bg-bg-subtle text-text-secondary border border-border-subtle"
      } ${className}`}
    >
      {children}
    </span>
  );
}
