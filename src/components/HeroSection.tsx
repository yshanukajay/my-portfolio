"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { ArrowRight, Database, Wind, Layers, Network, Play, Pause, RotateCcw, Terminal, type LucideIcon } from "lucide-react";
import HeroDiagramCarousel from "./HeroDiagramCarousel";

/* ─── GitHub icon ─────────────────────────────────────────────────────────── */
const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* ─── LinkedIn icon ───────────────────────────────────────────────────────── */
const LinkedinIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ─── CV icon ─────────────────────────────────────────────────────────────── */
const CvIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

/* ─── Animated titles ─────────────────────────────────────────────────────── */
const titles = [
  "ML Engineer",
  "Data Engineer",
  "MLOps Enthusiast",
  "Pipeline Architect",
  "Distributed Systems Builder",
  "Realtime Data Engineer",
];

/* ─── Diagram slides config (for phase chips only) ───────────────────────── */
const SLIDES = [
  { id: "data", phase: "Phase 1", color: "#0ea5e9" },
  { id: "ml", phase: "Phase 2", color: "#6366f1" },
  { id: "mlops", phase: "Phase 3", color: "#14b8a6" },
];

const SLIDE_DURATION = 8; // seconds per slide (matches carousel DURATION)

const getTagStyles = (tag: string) => {
  switch (tag) {
    case "SYS": return "bg-slate-800/80 text-slate-300 border border-slate-700/40";
    case "DB": return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    case "KFK": return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
    case "SPK": return "bg-sky-500/10 text-sky-400 border border-sky-500/20";
    case "MDL": return "bg-violet-500/10 text-violet-400 border border-violet-500/20";
    case "DKR": return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    case "K8S": return "bg-teal-500/10 text-teal-400 border border-teal-500/20";
    case "GTW": return "bg-pink-500/10 text-pink-400 border border-pink-500/20";
    default: return "bg-slate-800 text-slate-400";
  }
};

interface LogLine {
  time: string;
  tag: string;
  msg: string;
  color: string;
  delay: number;
}

const PIPELINE_LOGS: LogLine[] = [
  { time: "18:45:21", tag: "SYS", msg: "python run_pipeline.py --env prod", color: "text-slate-400 font-semibold", delay: 100 },
  { time: "18:45:21", tag: "SYS", msg: "checking database connection pools...", color: "text-slate-400/80", delay: 350 },
  { time: "18:45:21", tag: "DB", msg: "connection pool established [16 active]", color: "text-emerald-400", delay: 200 },
  { time: "18:45:22", tag: "KFK", msg: "bootstrap servers: kafka-cluster.prod:9092", color: "text-slate-500", delay: 150 },
  { time: "18:45:22", tag: "KFK", msg: "listening on 'user-events' [partition 0-7]", color: "text-cyan-400", delay: 250 },
  { time: "18:45:23", tag: "KFK", msg: "message stream: ACTIVE (1.2M msg/sec)", color: "text-emerald-400 font-semibold", delay: 400 },
  { time: "18:45:23", tag: "SPK", msg: "initializing Spark session ID: spark-ml-executor", color: "text-slate-500", delay: 200 },
  { time: "18:45:24", tag: "SPK", msg: "reading batch #812,042 [Delta Lake, 12.4 GB]", color: "text-slate-300", delay: 350 },
  { time: "18:45:24", tag: "SPK", msg: "feature scaling & outlier removal: OK", color: "text-slate-300", delay: 250 },
  { time: "18:45:25", tag: "SPK", msg: "cache hit: feature store populated (latency < 2ms)", color: "text-emerald-400", delay: 300 },
  { time: "18:45:25", tag: "MDL", msg: "training: gradient boosted trees...", color: "text-indigo-400 font-semibold", delay: 450 },
  { time: "18:45:26", tag: "MDL", msg: "epoch 1/3: train_loss: 0.284 | val_loss: 0.312", color: "text-amber-500 font-mono", delay: 450 },
  { time: "18:45:26", tag: "MDL", msg: "epoch 2/3: train_loss: 0.198 | val_loss: 0.204", color: "text-amber-500 font-mono", delay: 400 },
  { time: "18:45:27", tag: "MDL", msg: "epoch 3/3: train_loss: 0.082 | val_loss: 0.091", color: "text-amber-500 font-mono", delay: 400 },
  { time: "18:45:27", tag: "MDL", msg: "metrics: Accuracy: 98.42% | ROC-AUC: 0.991", color: "text-emerald-400 font-bold", delay: 350 },
  { time: "18:45:28", tag: "DKR", msg: "building container image: ml-service:v2.4.1", color: "text-blue-400", delay: 250 },
  { time: "18:45:28", tag: "DKR", msg: "pushing to ECR registry... Done.", color: "text-slate-400/80", delay: 300 },
  { time: "18:45:29", tag: "K8S", msg: "rolling update: deployment/ml-service [3 replicas]", color: "text-teal-400", delay: 400 },
  { time: "18:45:29", tag: "K8S", msg: "health checks: SUCCESS (canary routing 100%)", color: "text-emerald-400 font-semibold", delay: 450 },
  { time: "18:45:30", tag: "GTW", msg: "latency p95: 18ms | status: ACTIVE", color: "text-cyan-400 font-semibold", delay: 300 },
  { time: "18:45:30", tag: "SYS", msg: "PIPELINE SUCCEEDED. MONITORING ALIVE.", color: "text-emerald-400 font-bold", delay: 400 }
];

/* ─── Interactive Geometric System Background (Mandala / Rangoli Inspired) ─── */
function InteractiveGeometricBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const onLeave = () => setMouse({ x: -1000, y: -1000 });

  // Saffron, Deep Indigo, Gold, Neon Teal
  const colors = ["#fbbf24", "#f59e0b", "#3730a3", "#14b8a6", "#6366f1"];

  // 1. Generate Mandala Nodes
  const mandalaNodes = useMemo(() => {
    const arr = [];
    const cx = 500;
    const cy = 300;

    // Core
    arr.push({ id: 0, origX: cx, origY: cy, color: colors[0], r: 6 });

    // Inner Hexagon
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      arr.push({ id: 10 + i, origX: cx + Math.cos(angle) * 110, origY: cy + Math.sin(angle) * 110, color: colors[1], r: 4 });
    }

    // Middle Dodecagon
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + Math.PI / 12;
      arr.push({ id: 20 + i, origX: cx + Math.cos(angle) * 230, origY: cy + Math.sin(angle) * 230, color: colors[2], r: 3 });
    }

    // Outer Orbit
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      // Use 40 + i to avoid overlapping with Middle Dodecagon (which goes up to 31)
      arr.push({ id: 40 + i, origX: cx + Math.cos(angle) * 380, origY: cy + Math.sin(angle) * 380, color: colors[3], r: 2 });
    }

    return arr;
  }, []);

  // 2. Generate Ambient Particles
  const ambientParticles = useMemo(() => {
    if (!mounted) return [];
    const arr = [];
    for (let i = 0; i < 25; i++) {
      arr.push({
        id: `p-${i}`,
        origX: Math.random() * 800,
        origY: Math.random() * 700,
        color: colors[Math.floor(Math.random() * colors.length)],
        r: Math.random() * 2 + 1,
        dur: 4 + Math.random() * 3,
      });
    }
    return arr;
  }, [mounted]);

  // 3. Generate Connections
  const connections = useMemo(() => {
    const conns = [];
    // Center to Inner
    for (let i = 0; i < 6; i++) {
      conns.push({ from: 0, to: 10 + i, type: "core" });
      conns.push({ from: 10 + i, to: 10 + ((i + 1) % 6), type: "ring" });
    }
    // Inner to Middle
    for (let i = 0; i < 6; i++) {
      conns.push({ from: 10 + i, to: 20 + i * 2, type: "mesh" });
      conns.push({ from: 10 + i, to: 20 + ((i * 2 + 1) % 12), type: "mesh" });
    }
    // Middle to Outer
    for (let i = 0; i < 12; i++) {
      conns.push({ from: 20 + i, to: 40 + i, type: "fade" });
      conns.push({ from: 20 + i, to: 40 + ((i + 1) % 12), type: "fade" });
    }
    return conns;
  }, []);

  // 4. Calculate Magnetic Hover Physics
  const processMagnetic = (items: any[]) => {
    return items.map((item) => {
      let nx = item.origX;
      let ny = item.origY;
      if (mouse.x > 0) {
        const dx = mouse.x - nx;
        const dy = mouse.y - ny;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const force = Math.pow((220 - dist) / 220, 2);
          nx -= dx * force * 0.35;
          ny -= dy * force * 0.35;
        }
      }
      return { ...item, x: nx, y: ny };
    });
  };

  const activeNodes = processMagnetic(mandalaNodes);
  const activeParticles = processMagnetic(ambientParticles);

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <svg className="absolute inset-0 w-full h-full opacity-70" viewBox="0 0 900 700" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="mandala-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="core-glass" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.12)" />
            <stop offset="70%" stopColor="rgba(251, 191, 36, 0.04)" />
            <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient Particles */}
        {activeParticles.map((p) => (
          <motion.circle
            key={p.id}
            r={p.r}
            fill={p.color}
            filter="url(#mandala-glow)"
            animate={{ cx: p.x, cy: p.y, opacity: [0.2, 0.8, 0.2] }}
            transition={{
              cx: { type: "spring", stiffness: 60, damping: 20 },
              cy: { type: "spring", stiffness: 60, damping: 20 },
              opacity: { duration: p.dur, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}

        {/* Dynamic Connections */}
        {connections.map((conn, i) => {
          const n1 = activeNodes.find((n) => n.id === conn.from);
          const n2 = activeNodes.find((n) => n.id === conn.to);
          if (!n1 || !n2) return null;

          // Rangoli-style elegant curved paths
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const cx = n1.x + dx / 2 - dy * 0.15;
          const cy = n1.y + dy / 2 + dx * 0.15;
          const d = `M ${n1.x} ${n1.y} Q ${cx} ${cy} ${n2.x} ${n2.y}`;

          let stroke = "rgba(55, 48, 163, 0.15)"; // Deep Indigo Mesh
          if (conn.type === "core") stroke = "rgba(251, 191, 36, 0.3)"; // Gold
          if (conn.type === "ring") stroke = "rgba(245, 158, 11, 0.25)"; // Saffron
          if (conn.type === "fade") stroke = "rgba(20, 184, 166, 0.1)"; // Neon Teal

          return (
            <motion.path
              key={`conn-${i}`}
              d={d}
              fill="none"
              stroke={stroke}
              strokeWidth={1.5}
              animate={{ d }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
            />
          );
        })}

        {/* Core Glassmorphic Shield */}
        <motion.circle
          r={75}
          fill="url(#core-glass)"
          stroke="rgba(251, 191, 36, 0.15)"
          strokeWidth={1}
          animate={{ cx: activeNodes[0].x, cy: activeNodes[0].y }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
        />

        {/* Geometric Nodes */}
        {activeNodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            r={node.r}
            fill={node.color}
            filter="url(#mandala-glow)"
            animate={{ cx: node.x, cy: node.y, opacity: [0.6, 1, 0.6] }}
            transition={{
              cx: { type: "spring", stiffness: 60, damping: 20 },
              cy: { type: "spring", stiffness: 60, damping: 20 },
              opacity: { duration: 3 + (node.id % 3), repeat: Infinity, ease: "easeInOut" },
            }}
          />
        ))}
      </svg>

      {/* Edge Fade */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent pointer-events-none" />
    </div>
  );
}

/* ─── Premium Magnetic Button ─────────────────────────────────────────────── */
function MagneticButton({ children, className, href, target, rel, download, "aria-label": ariaLabel }: any) {
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
      download={download}
      aria-label={ariaLabel}
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

  const [displayedLogs, setDisplayedLogs] = useState<LogLine[]>([]);
  const [logIndex, setLogIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<1 | 2 | 5>(1);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of terminal container only (avoids page scroll hijacking)
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  // Log streaming typing simulation effect
  useEffect(() => {
    if (!isPlaying) return;
    if (logIndex >= PIPELINE_LOGS.length) {
      // Pause at the end for a few seconds before restarting loop
      const timeout = setTimeout(() => {
        setDisplayedLogs([]);
        setLogIndex(0);
      }, 4000);
      return () => clearTimeout(timeout);
    }

    const currentLog = PIPELINE_LOGS[logIndex];
    const scaledDelay = currentLog.delay / speed;

    const timer = setTimeout(() => {
      setDisplayedLogs((prev) => [...prev, currentLog]);
      setLogIndex((prev) => prev + 1);
    }, scaledDelay);

    return () => clearTimeout(timer);
  }, [logIndex, isPlaying, speed]);

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

      {/* ── Right Half: Geometric System Background ── */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block overflow-hidden z-0">
        <InteractiveGeometricBackground />
      </div>

      {/* ── CONTENT GRID ─────────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-1 items-center">

        {/* ── LEFT: Text ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex items-center space-x-2">
            <span className="h-px w-8 bg-sky-500" />
            <p className="text-[11px] font-bold tracking-[0.18em] text-sky-600 uppercase">
              ML Engineering&nbsp;•&nbsp;Data Systems&nbsp;•&nbsp;MLOps
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
            Engineering scalable data pipelines, MLOps workflows, and cloud-native ML systems.
          </p>

          {/* ── Simulated Pipeline Micro-Terminal Console ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: 1,
              y: 0,
              borderColor: `${slide.color}25`,
              boxShadow: `0 20px 50px rgba(0,0,0,0.35), 0 0 25px ${slide.color}15`,
            }}
            transition={{
              opacity: { duration: 0.7, delay: 0.15 },
              y: { duration: 0.7, delay: 0.15 },
              borderColor: { duration: 0.8 },
              boxShadow: { duration: 0.8 }
            }}
            className="w-full max-w-[420px] bg-slate-950/85 backdrop-blur-md border rounded-2xl flex flex-col overflow-hidden font-mono text-[10.5px] leading-relaxed relative"
          >
            {/* Top delicate neon light glow effect */}
            <div
              className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent transition-colors duration-500"
              style={{ background: `linear-gradient(90deg, transparent, ${slide.color}60, transparent)` }}
            />

            {/* Terminal Header Chrome */}
            <div className="flex items-center justify-between px-3.5 py-2 border-b border-slate-900/60 bg-slate-950/40 select-none">
              {/* Left: window dots */}
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ff5f56]/90 shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]/90 shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
                <div className="w-2 h-2 rounded-full bg-[#27c93f]/90 shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
              </div>
              {/* Center: title */}
              <div className="text-slate-400 font-medium text-[9px] tracking-wide flex items-center gap-1.5">
                <Terminal size={10} className="opacity-80" style={{ color: slide.color }} />
                <span>pipeline-runner</span>
              </div>
              {/* Right: status indicator */}
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  {isPlaying && logIndex < PIPELINE_LOGS.length ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: slide.color }} />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: slide.color }} />
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500" />
                  )}
                </span>
                <span className="text-[8.5px] font-bold uppercase tracking-wider transition-colors duration-500" style={{ color: isPlaying && logIndex < PIPELINE_LOGS.length ? slide.color : "#f59e0b" }}>
                  {logIndex >= PIPELINE_LOGS.length ? "IDLE" : isPlaying ? "RUNNING" : "PAUSED"}
                </span>
              </div>
            </div>

            {/* Tab header bar */}
            <div className="flex items-center bg-slate-950/60 border-b border-slate-900/60 text-[9px] text-slate-500 select-none">
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border-r border-slate-900 text-slate-300 border-t"
                style={{ borderTopColor: slide.color }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>pipeline.py</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 border-r border-slate-900 hover:bg-slate-900/40 hover:text-slate-400 cursor-pointer">
                <span>canary_monitor.log</span>
              </div>
              <div className="flex-1" />
            </div>

            {/* Loop progress line */}
            <div className="w-full h-[1px] bg-slate-900 relative select-none">
              <motion.div
                className="absolute top-0 left-0 bottom-0"
                style={{ backgroundColor: slide.color }}
                animate={{ width: `${(logIndex / PIPELINE_LOGS.length) * 100}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>

            {/* Terminal Body */}
            <div ref={terminalBodyRef} className="h-44 overflow-y-auto px-3.5 py-2.5 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {displayedLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2 py-0.5 leading-relaxed font-mono">
                  {/* Timestamp */}
                  <span className="text-slate-600 select-none text-[9px] shrink-0">{log.time}</span>
                  {/* Tag badge */}
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider select-none shrink-0 ${getTagStyles(log.tag)}`}>
                    {log.tag}
                  </span>
                  {/* Message */}
                  <span className={`text-[10px] break-all ${log.color}`}>
                    {log.msg}
                  </span>
                </div>
              ))}

              {isPlaying && logIndex < PIPELINE_LOGS.length && (
                <div className="flex items-center gap-2 py-0.5 leading-relaxed font-mono select-none">
                  <span className="text-slate-600 text-[9px] shrink-0">{PIPELINE_LOGS[logIndex]?.time}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider shrink-0 ${getTagStyles(PIPELINE_LOGS[logIndex]?.tag)}`}>
                    {PIPELINE_LOGS[logIndex]?.tag}
                  </span>
                  <span className="text-slate-500 animate-pulse text-[10px] italic">executing...</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-1.5 h-3.5"
                    style={{ backgroundColor: slide.color }}
                  />
                </div>
              )}
              {logIndex >= PIPELINE_LOGS.length && (
                <div className="text-slate-500 italic text-[9.5px] pt-1 flex items-center gap-2 select-none">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-500" />
                  </span>
                  <span>Restarting execution loop in 4s...</span>
                </div>
              )}
            </div>

            {/* Terminal Control Footer Strip */}
            <div className="flex items-center justify-between px-3.5 py-1.5 border-t border-slate-900 bg-slate-950/20 select-none">
              {/* Play / Pause Toggle */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all duration-300 text-[9px]"
                title={isPlaying ? "Pause Stream" : "Resume Stream"}
              >
                {isPlaying ? <Pause size={9} style={{ color: slide.color }} /> : <Play size={9} style={{ color: slide.color }} />}
                <span>{isPlaying ? "Pause" : "Resume"}</span>
              </button>

              {/* Speed Multiplier */}
              <div className="flex items-center gap-1 text-[9px]">
                <span className="text-slate-500 mr-1 select-none">Speed:</span>
                {([1, 2, 5] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className="px-1.5 py-0.5 rounded transition-all font-semibold"
                    style={{
                      backgroundColor: speed === s ? `${slide.color}15` : "transparent",
                      color: speed === s ? slide.color : "#64748b",
                      border: speed === s ? `1px solid ${slide.color}30` : "1px solid transparent"
                    }}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Restart Button */}
              <button
                onClick={() => {
                  setDisplayedLogs([]);
                  setLogIndex(0);
                  setIsPlaying(true);
                }}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all duration-300 text-[9px]"
                title="Restart Pipeline"
              >
                <RotateCcw size={9} style={{ color: slide.color }} />
                <span>Restart</span>
              </button>
            </div>
          </motion.div>

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
                <span className="relative z-10">View Systems</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
              </div>
            </MagneticButton>

            <MagneticButton
              href="/YohanShanuka_CV.pdf"
              download="YohanShanuka_CV.pdf"
              className="group relative w-[52px] h-[52px] flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-[13px] hover:text-emerald-600 hover:border-slate-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all"
              aria-label="Download CV"
            >
              <CvIcon size={20} className="relative z-10 opacity-90 group-hover:scale-110 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              href="https://github.com/yshanukajay"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[52px] h-[52px] flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-[13px] hover:text-slate-900 hover:border-slate-300 hover:shadow-[0_0_20px_rgba(15,23,42,0.08)] transition-all"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={20} className="relative z-10 opacity-90 group-hover:scale-110 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/yohanshanukajay/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[52px] h-[52px] flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-[13px] hover:text-[#0077b5] hover:border-slate-300 hover:shadow-[0_0_20px_rgba(0,119,181,0.15)] transition-all"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={20} className="relative z-10 opacity-90 group-hover:scale-110 transition-transform duration-200" />
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
          <HeroDiagramCarousel
            activeIdx={slideIndex}
            setActiveIdx={setSlideIndex}
            progress={progress}
            setProgress={setProgress}
          />
        </motion.div>

      </div>
    </section>
  );
}
