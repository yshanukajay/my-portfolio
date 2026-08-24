"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface UseCounterAnimationOptions {
  target: number;
  duration?: number;
  delay?: number;
  decimals?: number;
}

export function useCounterAnimation({
  target,
  duration = 1.8,
  delay = 0,
  decimals = 0,
}: UseCounterAnimationOptions) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    if (prefersReduced) {
      hasAnimated.current = true;
      requestAnimationFrame(() => {
        setValue(target);
      });
      return;
    }

    hasAnimated.current = true;
    const startTime = performance.now() + delay * 1000;
    const endTime = startTime + duration * 1000;

    const tick = (now: number) => {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const totalDuration = endTime - startTime;
      const progress = Math.min(elapsed / totalDuration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, duration, delay, decimals, prefersReduced]);

  return { ref, value };
}
