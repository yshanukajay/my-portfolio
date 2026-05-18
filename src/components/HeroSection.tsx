"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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

/* ─── Flowing Data Streams Background ────────────────────────────────────── */
function DataStreamsBg() {
  const streams = Array.from({ length: 10 }).map((_, i) => {
    const pr1 = ((i * 13) % 100) / 100;
    const pr2 = ((i * 27) % 100) / 100;
    const pr3 = ((i * 39) % 100) / 100;
    const pr4 = ((i * 51) % 100) / 100;
    return {
      id: i,
      y: 5 + i * 10,
      duration: 20 + pr1 * 20,
      width: 0.08 + pr2 * 0.18,
      dash: 15 + pr3 * 25,
      gap: 50 + pr4 * 50,
    };
  });

  return (
    <div className="absolute inset-0 pointer-events-none z-0 opacity-40 blur-[0.5px]">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="stream-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {streams.map((s) => (
          <motion.line
            key={s.id}
            x1="0" y1={s.y}
            x2="100" y2={s.y}
            stroke="url(#stream-grad)"
            strokeWidth={s.width}
            strokeDasharray={`${s.dash} ${s.gap}`}
            initial={{ strokeDashoffset: s.dash + s.gap }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
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
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block overflow-hidden pointer-events-none z-0">
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Animated data streams */}
        <DataStreamsBg />
        {/* Soft left-edge fade */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
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
          <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-100 shadow-xl bg-white">

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
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white/80 to-transparent"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{ background: `${slide.color}15`, color: slide.color }}
                  >
                    {slide.phase}
                  </span>
                </div>
                <p className="text-slate-800 font-bold text-sm">{slide.title}</p>
                <p className="text-slate-400 text-xs font-mono mt-0.5">{slide.subtitle}</p>
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
