"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { ArrowRight, Download } from "lucide-react";
import HeroDiagramCarousel from "./HeroDiagramCarousel";

/* ─── GitHub icon ─────────────────────────────────────────────────────────── */
const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* ─── Animated titles ─────────────────────────────────────────────────────── */
const titles = [
  "Machine Learning Engineer",
  "MLOps Enthusiast",
  "Data Engineer",
  "ML Systems Developer",
];

/* ─── Diagram slides config (for phase chips only) ───────────────────────── */
const SLIDES = [
  { id: "data", phase: "Phase 1", color: "#0ea5e9" },
  { id: "ml", phase: "Phase 2", color: "#818cf8" },
  { id: "mlops", phase: "Phase 3", color: "#2dd4bf" },
];

const SLIDE_DURATION = 7; // seconds per slide

/* ─── Interactive Animated Grid ───────────────────────────────── */
function AnimatedGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -999, y: -999 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  // Intersection dots — every 2nd grid cell (80px spacing)
  const dots = useMemo(() => {
    const arr: { id: string; x: number; y: number; delay: number; dur: number; color: string }[] = [];
    const colors = ["#6366f1", "#0ea5e9", "#818cf8", "#2dd4bf"];
    for (let row = 0; row <= 11; row++) {
      for (let col = 0; col <= 14; col++) {
        arr.push({
          id: `${row}-${col}`,
          x: col * 80,
          y: row * 80,
          delay: ((row * 3 + col * 7) % 28) * 0.12,
          dur: 2.2 + ((row + col) % 5) * 0.45,
          color: colors[(row + col) % colors.length],
        });
      }
    }
    return arr;
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={() => setMouse({ x: -999, y: -999 })}
    >
      {/* Scrolling grid lines */}
      <motion.div
        className="absolute left-0 right-0"
        style={{
          top: -40, bottom: -40,
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.10) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,233,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        animate={{ y: [0, 40] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing intersection dots */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="dot-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {dots.map((d) => (
          <motion.circle
            key={d.id}
            cx={d.x} cy={d.y} r={1.8}
            fill={d.color}
            filter="url(#dot-glow)"
            animate={{ opacity: [0.08, 0.65, 0.08] }}
            transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Mouse proximity radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            mouse.x > 0
              ? `radial-gradient(circle 200px at ${mouse.x}px ${mouse.y}px,
                  rgba(99,102,241,0.22) 0%,
                  rgba(14,165,233,0.12) 45%,
                  transparent 75%)`
              : "none",
          transition: "background 60ms linear",
        }}
      />

      {/* Ripple ring on mouse position */}
      {mouse.x > 0 && (
        <motion.div
          className="absolute pointer-events-none rounded-full border border-indigo-400/30"
          style={{ left: mouse.x - 20, top: mouse.y - 20, width: 40, height: 40 }}
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* Left-edge fade to page white */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-white to-transparent pointer-events-none" />
    </div>
  );
}

/* ─── Premium Magnetic Button ─────────────────────────────────────────────── */
function MagneticButton({ children, className, href, target, rel }: any) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  // The HeroDiagramCarousel manages its own slideIndex/progress internally.
  // We still keep a lightweight local timer to sync the phase chips + title color.

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((p) => (p + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Slide timer
  useEffect(() => {
    setProgress(0);
    const tick = 100; // ms
    const steps = (SLIDE_DURATION * 1000) / tick;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress((step / steps) * 100);
      if (step >= steps) {
        setSlideIndex((p) => (p + 1) % SLIDES.length);
        step = 0;
        setProgress(0);
      }
    }, tick);
    return () => clearInterval(timer);
  }, [slideIndex]);

  const slide = SLIDES[slideIndex];

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden pt-20 pb-10 bg-white">

      {/* ── Right Half: Grid + Streams Background ── */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block overflow-hidden z-0">
        <AnimatedGrid />
      </div>

      {/* ── CONTENT GRID ─────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: Text ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex items-center space-x-2">
            <span className="h-px w-8 bg-sky-500" />
            <p className="text-sm font-semibold tracking-wider text-sky-600 uppercase">
              Hello, I&apos;m
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">
            Yohan Shanuka
          </h1>

          <div className="h-10 text-2xl md:text-3xl font-medium text-slate-600 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-block"
                style={{ color: slide.color }}
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
            I design scalable machine learning workflows, production-grade data
            pipelines, and cloud-ready ML systems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* View Projects - Premium Animated Border Button */}
            <MagneticButton
              href="#projects"
              className="group relative rounded-[14px] p-[1px] overflow-hidden shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 block"
            >
              {/* Spinning gradient border */}
              <motion.div
                className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'conic-gradient(from 0deg, transparent 20%, #0ea5e9 40%, #6366f1 60%, #2dd4bf 80%, transparent 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-slate-900 rounded-[14px] group-hover:opacity-0 transition-opacity duration-300" />

              {/* Button inner face */}
              <div className="relative flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 rounded-[13px] text-white font-medium hover:bg-slate-800/90 transition-colors overflow-hidden">
                {/* Shimmer sweep */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out" />
                <span className="relative z-10">View Projects</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </MagneticButton>

            {/* Secondary Buttons */}
            <MagneticButton
              href="#"
              className="group relative px-6 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-[13px] font-medium hover:text-slate-900 hover:border-slate-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] transition-all flex items-center gap-2"
            >
              <span className="relative z-10">Download Resume</span>
              <Download size={18} className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300" />
            </MagneticButton>

            <MagneticButton
              href="https://github.com/yshanukajay"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-3.5 bg-white border border-slate-200 text-slate-700 rounded-[13px] hover:text-slate-900 hover:border-slate-300 hover:shadow-[0_0_20px_rgba(14,165,233,0.1)] transition-all flex items-center justify-center"
            >
              <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                <GithubIcon size={20} />
              </div>
            </MagneticButton>
          </div>
        </motion.div>

        {/* ── RIGHT: Premium 3-Diagram Depth Carousel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
          className="relative hidden lg:flex flex-col h-[540px] w-full"
        >
          <HeroDiagramCarousel />
        </motion.div>

      </div>
    </section>
  );
}
