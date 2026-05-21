"use client";

import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, useRef, useMemo } from "react";
import { ArrowRight, Database, Wind, Layers, Network, type LucideIcon } from "lucide-react";
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
  { id: "ml", phase: "Phase 2", color: "#818cf8" },
  { id: "mlops", phase: "Phase 3", color: "#2dd4bf" },
];

const SLIDE_DURATION = 7; // seconds per slide

const HERO_METRICS: {
  label: string;
  tag: string;
  color: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: "Kafka Streaming", tag: "Realtime Ingestion", color: "#f97316", icon: Database, href: "#stack" },
  { label: "Airflow DAGs", tag: "Workflow Orchestration", color: "#ef4444", icon: Wind, href: "#stack" },
  { label: "Dockerized ML Systems", tag: "Container Deployments", color: "#3b82f6", icon: Layers, href: "#architecture" },
  { label: "Distributed Pipelines", tag: "Cloud-Native Arch", color: "#6366f1", icon: Network, href: "#architecture" },
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

      {/* ── Right Half: Geometric System Background ── */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block overflow-hidden z-0">
        <InteractiveGeometricBackground />
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

          {/* ── Mini Metrics Panel ── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
          >
            {HERO_METRICS.map((metric) => {
              const Icon = metric.icon;
              return (
                <motion.a
                  key={metric.label}
                  href={metric.href}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  className="group flex items-start gap-3 px-3.5 py-3 rounded-xl border border-slate-200/80 bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-200"
                  style={
                    {
                      "--metric": metric.color,
                    } as React.CSSProperties
                  }
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = `color-mix(in srgb, ${metric.color} 35%, transparent)`;
                    el.style.boxShadow = `0 4px 20px color-mix(in srgb, ${metric.color} 14%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "";
                    el.style.boxShadow = "";
                  }}
                >
                  <span
                    className="relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200"
                    style={{ backgroundColor: `${metric.color}14`, color: metric.color }}
                  >
                    <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 animate-ping"
                      style={{ backgroundColor: `${metric.color}20` }} />
                    <Icon size={15} className="relative z-10" strokeWidth={2.25} />
                  </span>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[13px] font-semibold text-slate-800 leading-tight group-hover:text-slate-900">
                      {metric.label}
                    </span>
                    <span
                      className="text-[10px] font-semibold tracking-wide uppercase mt-0.5"
                      style={{ color: metric.color }}
                    >
                      {metric.tag}
                    </span>
                  </div>
                  <span className="relative flex-shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span
                      className="block w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: metric.color }}
                    />
                  </span>
                </motion.a>
              );
            })}
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
              href="#"
              className="group relative w-[52px] h-[52px] flex items-center justify-center bg-white border border-slate-200 text-slate-700 rounded-[13px] hover:text-emerald-600 hover:border-slate-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all"
              aria-label="View Resume"
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
          <HeroDiagramCarousel />
        </motion.div>

      </div>
    </section>
  );
}
