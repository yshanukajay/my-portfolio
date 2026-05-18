"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { ArrowRight, Download } from "lucide-react";
import { DataEngineeringDiagram, MLPipelineDiagram, MLOpsDeployDiagram } from "./DiagramSlides";

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

/* ─── Diagram slides config ───────────────────────────────────────────────── */
const SLIDES = [
  {
    id: "data",
    phase: "Phase 1",
    title: "Data Engineering Pipeline",
    subtitle: "Kafka · Spark · Airflow · Data Lake",
    color: "#0ea5e9",
    Diagram: DataEngineeringDiagram,
  },
  {
    id: "ml",
    phase: "Phase 2",
    title: "Machine Learning Pipeline",
    subtitle: "TensorFlow · PyTorch · MLflow · Feature Store",
    color: "#818cf8",
    Diagram: MLPipelineDiagram,
  },
  {
    id: "mlops",
    phase: "Phase 3",
    title: "MLOps Deployment Pipeline",
    subtitle: "Docker · Kubernetes · FastAPI · Monitoring",
    color: "#2dd4bf",
    Diagram: MLOpsDeployDiagram,
  },
];

const SLIDE_DURATION = 8; // seconds per slide

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

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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

          {/* Phase indicator chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSlideIndex(i)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300"
                style={{
                  borderColor: i === slideIndex ? s.color : "rgba(15,23,42,0.1)",
                  color: i === slideIndex ? s.color : "#94a3b8",
                  background: i === slideIndex ? `${s.color}10` : "transparent",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: i === slideIndex ? s.color : "#cbd5e1" }}
                />
                {s.phase}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors flex items-center gap-2"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              Download Resume <Download size={18} />
            </a>
            <a
              href="https://github.com/yshanukajay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-200 text-slate-800 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              <GithubIcon size={20} />
            </a>
          </div>
        </motion.div>

        {/* ── RIGHT: Diagram Carousel ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:flex flex-col gap-4 h-[520px] w-full"
        >
          {/* Card container */}
          <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "#080d14", border: "1px solid rgba(148,163,184,0.12)" }}>

            {/* Live animated diagram */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIndex}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-4"
              >
                <slide.Diagram />
              </motion.div>
            </AnimatePresence>

            {/* Slide label */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`label-${slideIndex}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: "linear-gradient(to top, #080d14 60%, transparent)" }}
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${slide.color}20`, color: slide.color, border: `1px solid ${slide.color}40` }}
                  >
                    {slide.phase}
                  </span>
                </div>
                <p className="text-white font-bold text-sm" style={{ opacity: 0.9 }}>{slide.title}</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: slide.color, opacity: 0.7 }}>{slide.subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <div
                key={s.id}
                className="flex-1 h-0.5 rounded-full bg-slate-100 overflow-hidden cursor-pointer"
                onClick={() => setSlideIndex(i)}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: s.color }}
                  animate={{ width: i === slideIndex ? `${progress}%` : i < slideIndex ? "100%" : "0%" }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSlideIndex(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === slideIndex ? 20 : 6,
                  height: 6,
                  background: i === slideIndex ? s.color : "#e2e8f0",
                }}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
