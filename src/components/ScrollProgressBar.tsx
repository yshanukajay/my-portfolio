"use client";

import { useScroll, useSpring, motion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        background: "linear-gradient(90deg, #0ea5e9, #6366f1, #2dd4bf)",
        zIndex: 9999,
        willChange: "transform",
      }}
    />
  );
}
