"use client";

import { useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useRef } from "react";

interface UseParallaxOptions {
  inputRange?: [number, number];
  outputRange?: [number, number];
}

export function useParallax({
  outputRange = [0, -60],
}: UseParallaxOptions = {}): { ref: React.RefObject<HTMLElement | null>; y: MotionValue<number> } {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [0, 0] : outputRange
  );

  return { ref, y };
}
