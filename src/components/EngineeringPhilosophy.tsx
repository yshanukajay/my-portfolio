"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import FluidSimulation, { FluidHandle } from "./FluidSimulation";

/* ─── Data ───────────────────────────────────────────────────────── */
const pillars = [
  {
    title: "Scalability",
    color: "#6366f1",
    border: "rgba(99,102,241,0.22)",
    desc: "Systems that grow with demand. Every pipeline I build is designed to handle 10× the expected load from day one.",
    icon: "⬡",
  },
  {
    title: "Reliability",
    color: "#10b981",
    border: "rgba(16,185,129,0.22)",
    desc: "99.9% uptime is the baseline. I engineer fault-tolerant architectures with graceful degradation and self-healing capabilities.",
    icon: "◈",
  },
  {
    title: "Observability",
    color: "#f59e0b",
    border: "rgba(245,158,11,0.22)",
    desc: "You can't improve what you can't measure. Every system ships with metrics, logs, and alerting baked in from the start.",
    icon: "◎",
  },
];

const articles = [
  "Building an End-to-End ML Pipeline with Kafka & Spark",
  "Deploying ML Models with FastAPI & Docker",
  "Kubernetes for ML Engineers — A Practical Guide",
  "Batch vs Streaming: When to Use Which",
];

/* Light background — warm pearl-white so vivid hues really pop */
const LIGHT_BG = { r: 253, g: 251, b: 255 };

/* ─── Main Component ──────────────────────────────────────────────── */
export default function EngineeringPhilosophy() {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const fluidRef = useRef<FluidHandle>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Soft mouse-spotlight (very subtle on light bg) ── */
  const [spotStyle, setSpotStyle] = useState("none");

  /* ── Mouse motion values for card levitation ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const onSectionMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const rx = e.clientX - rect.left;
      const ry = e.clientY - rect.top;

      if (!isMobile) fluidRef.current?.notifyMove(rx, ry);

      setSpotStyle(
        `radial-gradient(12px circle at ${rx}px ${ry}px, rgba(99,102,241,0.22) 0%, transparent 40%)`
      );
    },
    [isMobile, prefersReduced]
  );

  const onSectionMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || prefersReduced) return;
      fluidRef.current?.notifyEnter(e.clientX - rect.left, e.clientY - rect.top);
    },
    [prefersReduced]
  );

  const onSectionMouseLeave = useCallback(() => {
    setSpotStyle("none");
    rawX.set(0);
    rawY.set(0);
    fluidRef.current?.notifyLeave();
  }, [rawX, rawY]);

  const springX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 80, damping: 20 });
  void springX; void springY; // used via style if needed

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      onMouseMove={onSectionMouseMove}
      onMouseEnter={onSectionMouseEnter}
      onMouseLeave={onSectionMouseLeave}
      className="py-24 relative overflow-hidden"
    >
      {/* ── WebGL Fluid — light background, vivid streaks ── */}
      <FluidSimulation
        ref={fluidRef}
        backColor={LIGHT_BG}
        colorIntensity={1.8}
        initialSplats={12}
        hueRange={[0.57, 0.80]}
        saturation={0.60}
      />

      {/* ── Subtle mouse spotlight overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none transition-[background] duration-100"
        style={{ background: spotStyle, zIndex: 1 }}
      />

      {/* ── Content ── */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
            style={{
              background: "rgba(99,102,241,0.08)",
              borderColor: "rgba(99,102,241,0.22)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <p className="text-[11px] font-bold tracking-[0.22em] text-indigo-600 uppercase">
              How I Think
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Engineering Philosophy
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mb-8" />

          {/* Main quote */}
          <motion.blockquote
            className="max-w-3xl mx-auto text-xl md:text-2xl font-medium text-slate-700 leading-relaxed text-left rounded-2xl p-7 border"
            style={{
              background: "rgba(255,255,255,0.72)",
              backdropFilter: "blur(18px)",
              borderColor: "rgba(99,102,241,0.15)",
              borderLeft: "4px solid #6366f1",
              boxShadow: "0 4px 32px rgba(99,102,241,0.08)",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            I focus on building{" "}
            <span className="text-indigo-600 font-bold">
              scalable, production-ready AI systems
            </span>{" "}
            that combine machine learning, distributed data pipelines, and efficient backend
            infrastructure — not just models, but{" "}
            <span className="text-slate-900 font-bold">intelligent systems</span>.
          </motion.blockquote>
        </motion.div>

        {/* 3 Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: `0 18px 40px ${p.color}18` }}
              className="rounded-2xl p-7 border transition-all duration-300 cursor-default"
              style={{
                background: "rgba(255,255,255,0.70)",
                backdropFilter: "blur(18px)",
                borderColor: p.border,
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${p.color}12`, border: `1px solid ${p.color}28` }}
              >
                {p.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              <div
                className="mt-5 h-px rounded-full"
                style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Technical Writing */}
        <motion.div
          className="max-w-5xl mx-auto rounded-2xl p-8 border"
          style={{
            background: "rgba(255,255,255,0.70)",
            backdropFilter: "blur(18px)",
            borderColor: "rgba(99,102,241,0.13)",
            boxShadow: "0 4px 28px rgba(99,102,241,0.07)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Technical Writing</h3>
            <a href="#" className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {articles.map((a, i) => (
              <a
                key={a}
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/60 transition-all group"
              >
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700 group-hover:text-indigo-700 transition-colors font-medium">
                  {a}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
