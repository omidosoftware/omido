import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  arrow?: boolean;
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants = {
  primary:
    "bg-accent text-bg-primary hover:bg-accent-hover hover:shadow-glow-sm font-semibold",
  secondary:
    "bg-transparent text-text-primary border border-border-default hover:border-border-hover hover:bg-bg-hover font-medium",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary font-medium",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-[15px]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  arrow,
  external,
  className = "",
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = `group inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`;

  const arrowEl = arrow && (
    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
          {arrowEl}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
        {arrowEl}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
      {arrowEl}
    </button>
  );
}
