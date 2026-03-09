"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

type MotionVariant = "fadeUp" | "scaleSettle" | "blurEmerge" | "softEnter" | "fadeLeft" | "fadeRight";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  variant?: MotionVariant;
  /** Legacy props still supported */
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const variants: Record<MotionVariant, { initial: Record<string, string | number>; duration: number }> = {
  fadeUp: { initial: { opacity: 0, y: 20 }, duration: 0.5 },
  scaleSettle: { initial: { opacity: 0, scale: 0.97, y: 8 }, duration: 0.5 },
  blurEmerge: { initial: { opacity: 0, filter: "blur(8px)", y: 12 }, duration: 0.6 },
  softEnter: { initial: { opacity: 0 }, duration: 0.4 },
  fadeLeft: { initial: { opacity: 0, x: 20 }, duration: 0.5 },
  fadeRight: { initial: { opacity: 0, x: -20 }, duration: 0.5 },
};

export function FadeIn({
  children,
  delay = 0,
  variant,
  direction = "up",
  distance = 20,
  duration,
  className,
  once = true,
  amount = 0.15,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount, margin: "0px 0px -60px 0px" });
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // If a named variant is specified, use it
  if (variant) {
    const v = variants[variant];
    return (
      <motion.div
        ref={ref}
        initial={v.initial}
        animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" } : undefined}
        transition={{ duration: duration ?? v.duration, delay, ease: EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  // Legacy direction-based behavior (backwards compatible)
  const directions: Record<string, Record<string, number>> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: duration ?? 0.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
