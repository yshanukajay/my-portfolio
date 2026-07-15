"use client";

import { useRef } from "react";
import { useInView, useReducedMotion, Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right";

interface UseScrollRevealOptions {
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
  threshold?: number;
}

interface ScrollRevealResult {
  ref: React.RefObject<HTMLElement | null>;
  variants: Variants;
  initial: string;
  animate: string;
}

export function useScrollReveal({
  direction = "up",
  distance = 24,
  duration = 0.55,
  delay = 0,
  once = true,
  threshold = 0.15,
}: UseScrollRevealOptions = {}): ScrollRevealResult {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, { once, amount: threshold });

  const getOffset = () => {
    if (prefersReduced) return {};
    switch (direction) {
      case "up":    return { y: distance };
      case "down":  return { y: -distance };
      case "left":  return { x: distance };
      case "right": return { x: -distance };
    }
  };

  const variants: Variants = {
    hidden: {
      opacity: prefersReduced ? 1 : 0,
      ...getOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : duration,
        delay: prefersReduced ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return {
    ref,
    variants,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
  };
}
