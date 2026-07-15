"use client";

import { motion } from "framer-motion";
import { ReactNode, ElementType } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Direction = "up" | "down" | "left" | "right";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
  /** The HTML element to render. Defaults to "div". */
  as?: ElementType;
}

/**
 * Drop-in wrapper that animates children into view on scroll.
 * Preserves layout and structure — animations are additive transforms only.
 *
 * Usage:
 * ```tsx
 * <AnimatedSection direction="up" delay={0.1} className="my-class">
 *   <h2>Section Title</h2>
 * </AnimatedSection>
 * ```
 */
export default function AnimatedSection({
  children,
  className,
  direction = "up",
  distance = 24,
  duration = 0.55,
  delay = 0,
  threshold = 0.12,
  once = true,
  as: Tag = "div",
}: AnimatedSectionProps) {
  const { ref, variants, initial, animate } = useScrollReveal({
    direction,
    distance,
    duration,
    delay,
    threshold,
    once,
  });

  const MotionTag = motion(Tag as "div");

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={variants}
      initial={initial}
      animate={animate}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
