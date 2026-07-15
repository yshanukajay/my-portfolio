"use client";

import { useReducedMotion, Variants } from "framer-motion";

interface UseStaggerAnimationOptions {
  staggerChildren?: number;
  delayChildren?: number;
  childDistance?: number;
  childDuration?: number;
  direction?: "up" | "down" | "left" | "right";
}

interface StaggerResult {
  containerVariants: Variants;
  itemVariants: Variants;
}

export function useStaggerAnimation({
  staggerChildren = 0.08,
  delayChildren = 0.1,
  childDistance = 20,
  childDuration = 0.5,
  direction = "up",
}: UseStaggerAnimationOptions = {}): StaggerResult {
  const prefersReduced = useReducedMotion();

  const getOffset = () => {
    if (prefersReduced) return {};
    switch (direction) {
      case "up":    return { y: childDistance };
      case "down":  return { y: -childDistance };
      case "left":  return { x: childDistance };
      case "right": return { x: -childDistance };
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReduced ? 0 : staggerChildren,
        delayChildren: prefersReduced ? 0 : delayChildren,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: prefersReduced ? 1 : 0,
      ...getOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : childDuration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return { containerVariants, itemVariants };
}
