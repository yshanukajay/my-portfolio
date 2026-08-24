"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { ArrowRight, GitBranch, CheckCircle2, Circle } from "lucide-react";
import { useLenis } from "lenis/react";
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

/* ─── Shifting professional titles ────────────────────────────────────────── */
const shiftingTitles = [
  "ML Engineer · AI Engineer · MLOps",
  "Building Intelligent AI Systems",
  "Deploying Models to Production",
  "Orchestrating MLOps Workflows",
  "Crafting AI-Powered Solutions",
];

/* ─── Diagram slides config ───────────────────────────────────────────────── */
const SLIDES = [
  { id: "data", phase: "Phase 1", color: "var(--color-accent-primary)" },
  { id: "ml", phase: "Phase 2", color: "var(--color-accent-secondary)" },
  { id: "mlops", phase: "Phase 3", color: "var(--color-accent-primary)" },
  { id: "rag", phase: "Phase 4", color: "var(--color-accent-secondary)" },
];

const SLIDE_DURATION = 8;

/* ─── ML Pipeline Code Card ─────────────────────────────────────────────────
   Replaces the patient-data widget. Shows a real Kafka → Spark → Airflow → MLflow
   pipeline code with syntax-highlighted tokens and active status indicators.
─────────────────────────────────────────────────────────────────────────── */
const PIPELINE_STAGES = [
  {
    step: "01",
    file: "kafka_producer.py",
    label: "Ingest",
    color: "var(--color-warning)",
    metric: "10 events/s",
    status: "running",
    code: [
      { t: "kw", v: "from " }, { t: "mod", v: "confluent_kafka " }, { t: "kw", v: "import " }, { t: "cls", v: "Producer" },
      { t: "fn", v: "producer" }, { t: "op", v: "." }, { t: "fn", v: "produce" }, { t: "op", v: "(" },
      { t: "str", v: "'customer-events'" }, { t: "op", v: ", " }, { t: "var", v: "payload" }, { t: "op", v: ")" },
    ],
  },
  {
    step: "02",
    file: "churn_consumer.py",
    label: "Inference",
    color: "var(--color-accent-primary)",
    metric: "sub-10ms latency",
    status: "running",
    code: [
      { t: "var", v: "model" }, { t: "op", v: " = " }, { t: "fn", v: "load_model" }, { t: "op", v: "(" }, { t: "str", v: "'s3://models/'" }, { t: "op", v: ")" },
      { t: "var", v: "pred" }, { t: "op", v: " = " }, { t: "var", v: "model" }, { t: "op", v: "." }, { t: "fn", v: "predict" }, { t: "op", v: "(" }, { t: "var", v: "features" }, { t: "op", v: ")" },
    ],
  },
  {
    step: "03",
    file: "airflow_dag.py",
    label: "Orchestrate",
    color: "var(--color-success)",
    metric: "SLA 99.9%",
    status: "scheduled",
    code: [
      { t: "dec", v: "@dag" }, { t: "op", v: "(" }, { t: "var", v: "schedule" }, { t: "op", v: "=" }, { t: "str", v: "'@weekly'" }, { t: "op", v: ")" },
      { t: "kw", v: "def " }, { t: "fn", v: "ml_pipeline" }, { t: "op", v: "(): ..." },
    ],
  },
  {
    step: "04",
    file: "mlflow_run.py",
    label: "Track & Serve",
    color: "var(--color-accent-secondary)",
    metric: "F1 78.4%",
    status: "complete",
    code: [
      { t: "fn", v: "mlflow" }, { t: "op", v: "." }, { t: "fn", v: "log_metric" }, { t: "op", v: "(" },
      { t: "str", v: "'f1_score'" }, { t: "op", v: ", " }, { t: "num", v: "0.784" }, { t: "op", v: ")" },
    ],
  },
];

const TOKEN_COLORS: Record<string, string> = {
  kw: "#c084fc",  // keyword — purple
  mod: "#7dd3fc",  // module — sky
  cls: "#34d399",  // class — emerald
  fn: "#60a5fa",  // function — blue
  str: "#fbbf24",  // string — amber
  var: "#e2e8f0",  // variable — white
  op: "#64748b",  // operator — slate
  num: "#f87171",  // number — red
  dec: "#a78bfa",  // decorator
};

function AIParserCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const xPercent = useMotionValue(50);
  const xPercentSpring = useSpring(xPercent, { stiffness: 350, damping: 30, mass: 0.5 });

  const clipPath = useTransform(xPercentSpring, (val) => `inset(0 0 0 ${val}%)`);
  const left = useTransform(xPercentSpring, (val) => `${val}%`);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    xPercent.set(percent);
  };

  const handlePointerLeave = () => {
    xPercent.set(50); // Snaps back smoothly via Spring
  };

  const rawInput = `Cust: 15682974 (Active)
Balance: $48,250.00
Tenure: 18 months
Credit: 620 | Products: 2
Churn Threat: Elevated`;

  const structuredOutput = `{
  "customer": 15682974,
  "features": {
    "balance": 48250.0,
    "credit_score": 620,
    "products_count": 2
  },
  "churn_probability": 0.812
}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: 0.5 }}
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[340px] h-[230px] rounded-[16px] border border-[var(--color-border)] overflow-hidden cursor-crosshair select-none shadow-[0_12px_30px_-10px_rgba(0,0,0,0.06),0_8px_16px_-8px_rgba(0,0,0,0.08)] touch-none"
      style={{
        backgroundColor: "var(--color-background)",
        userSelect: "none",
        WebkitUserSelect: "none"
      }}
    >
      {/* Raw Input (Bottom Layer) */}
      <div
        className="absolute inset-0 pt-[16px] px-[16px] pb-[16px] flex flex-col justify-between select-none z-[1]"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <span className="font-mono font-bold text-[8.5px] tracking-[0.08em] uppercase text-slate-400 mb-1.5 self-start">
          Raw input
        </span>
        <pre className="font-mono text-[9.5px] leading-[1.5] text-slate-500 whitespace-pre-wrap text-left">
          {rawInput}
        </pre>
      </div>

      {/* Structured Output (Top Layer, clipped with a smooth ease-out MotionValue) */}
      <motion.div
        className="absolute inset-0 pt-[16px] px-[16px] pb-[16px] flex flex-col justify-between select-none z-[2]"
        style={{
          clipPath,
          backgroundColor: "var(--color-background)",
        }}
      >
        <span className="font-mono font-bold text-[8.5px] tracking-[0.08em] uppercase text-slate-400 mb-1.5 self-end">
          Structured output
        </span>
        <pre className="font-mono text-[9.5px] leading-[1.5] text-slate-800 whitespace-pre-wrap text-left">
          {structuredOutput}
        </pre>
      </motion.div>

      {/* Slider Line (moves smoothly matching the top layer clip-path transition) */}
      <motion.div
        className="absolute top-0 bottom-0 w-[1.5px] z-[10] pointer-events-none"
        style={{
          left,
          backgroundColor: "var(--color-accent-primary)",
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border-2 shadow-sm cursor-col-resize flex items-center justify-center"
          style={{ borderColor: "var(--color-accent-primary)" }}
        >
          <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-accent-primary)" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}


const STATIC_PARTICLES = [
  { id: "p-0", origX: 120, origY: 340, colorIndex: 0, r: 0.8, dur: 8.5 },
  { id: "p-1", origX: 680, origY: 150, colorIndex: 1, r: 1.2, dur: 10.2 },
  { id: "p-2", origX: 430, origY: 520, colorIndex: 2, r: 0.6, dur: 7.8 },
  { id: "p-3", origX: 250, origY: 180, colorIndex: 3, r: 1.4, dur: 11.0 },
  { id: "p-4", origX: 590, origY: 610, colorIndex: 4, r: 0.9, dur: 9.1 },
];

/* ─── Interactive Geometric System Background (Mandala / Rangoli Inspired) ─── */
function InteractiveGeometricBackground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);

  // Consolidate to warning, secondary brand, and primary brand accents
  const colors = useMemo(() => ["var(--color-warning)", "var(--color-warning)", "var(--color-accent-secondary)", "var(--color-accent-primary)", "var(--color-accent-secondary)"], []);

  // 1. Generate Mandala Nodes — reduced: 1 core + 5 inner + 6 mid + 5 outer = 17 nodes (was 31)
  const mandalaNodes = useMemo(() => {
    const arr: { id: number; origX: number; origY: number; color: string; r: number }[] = [];
    const cx = 500;
    const cy = 300;
    // Core
    arr.push({ id: 0, origX: cx, origY: cy, color: colors[0], r: 5 });
    // Inner ring — reduced 6 → 5 nodes
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5;
      arr.push({ id: 10 + i, origX: cx + Math.cos(angle) * 110, origY: cy + Math.sin(angle) * 110, color: colors[1], r: 3 });
    }
    // Mid ring — reduced 12 → 6 nodes
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6 + Math.PI / 6;
      arr.push({ id: 20 + i, origX: cx + Math.cos(angle) * 230, origY: cy + Math.sin(angle) * 230, color: colors[2], r: 2.2 });
    }
    // Outer ring — reduced 12 → 5 nodes
    for (let i = 0; i < 5; i++) {
      const angle = (Math.PI * 2 * i) / 5;
      arr.push({ id: 40 + i, origX: cx + Math.cos(angle) * 365, origY: cy + Math.sin(angle) * 365, color: colors[3], r: 1.5 });
    }
    return arr;
  }, [colors]);

  // 2. Generate Ambient Particles — reduced to 5
  const ambientParticles = useMemo(() => {
    return STATIC_PARTICLES.map((p) => ({
      ...p,
      color: colors[p.colorIndex % colors.length],
    }));
  }, [colors]);

  // 3. Generate Connections — updated for reduced node counts
  const connections = useMemo(() => {
    const conns: { from: number; to: number; type: string }[] = [];
    // Core → inner ring
    for (let i = 0; i < 5; i++) {
      conns.push({ from: 0, to: 10 + i, type: "core" });
      conns.push({ from: 10 + i, to: 10 + ((i + 1) % 5), type: "ring" });
    }
    // Inner ring → mid ring (5 inner → 6 mid)
    for (let i = 0; i < 5; i++) {
      const midIdx = Math.round((i / 5) * 6) % 6;
      conns.push({ from: 10 + i, to: 20 + midIdx, type: "mesh" });
    }
    // Mid ring → outer ring (6 mid → 5 outer)
    for (let i = 0; i < 5; i++) {
      conns.push({ from: 20 + i, to: 40 + i, type: "fade" });
    }
    return conns;
  }, []);

  // 4. RAF-based magnetic effect — mutates SVG elements directly, NO React re-renders
  const nodeEls = useRef<Map<number, SVGCircleElement>>(new Map());
  const connEls = useRef<Map<number, SVGPathElement>>(new Map());
  const shieldEl = useRef<SVGCircleElement>(null);
  // Store spring state per node
  const springState = useRef<Map<number, { x: number; y: number; vx: number; vy: number }>>(new Map());
  // Viewport visibility ref — pauses RAF when section is off-screen
  const isVisibleRef = useRef(true);
  const frameCountRef = useRef(0);

  useEffect(() => {
    // Initialize spring state
    mandalaNodes.forEach((n) => {
      springState.current.set(n.id, { x: n.origX, y: n.origY, vx: 0, vy: 0 });
    });

    const STIFFNESS = 0.06;
    const DAMPING = 0.82;
    const MAGNETIC_RADIUS = 220;
    const MAGNETIC_STRENGTH = 0.35;
    // Throttle: skip every other frame when mouse is idle
    const SKIP_FRAMES = 2;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      // Pause when scrolled out of view
      if (!isVisibleRef.current) return;

      // Throttle: only update every SKIP_FRAMES when mouse is at rest
      frameCountRef.current++;
      const isMouseActive = mouseRef.current.x > 0;
      if (!isMouseActive && frameCountRef.current % SKIP_FRAMES !== 0) return;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      mandalaNodes.forEach((node) => {
        const state = springState.current.get(node.id)!;

        // Compute target with magnetic repulsion
        let tx = node.origX;
        let ty = node.origY;
        if (mx > 0) {
          const dx = mx - node.origX;
          const dy = my - node.origY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAGNETIC_RADIUS) {
            const force = Math.pow((MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS, 2);
            tx -= dx * force * MAGNETIC_STRENGTH;
            ty -= dy * force * MAGNETIC_STRENGTH;
          }
        }

        // Spring integration
        state.vx = state.vx * DAMPING + (tx - state.x) * STIFFNESS;
        state.vy = state.vy * DAMPING + (ty - state.y) * STIFFNESS;
        state.x += state.vx;
        state.y += state.vy;

        // Update DOM directly — no React state
        const el = nodeEls.current.get(node.id);
        if (el) {
          el.setAttribute("cx", String(state.x));
          el.setAttribute("cy", String(state.y));
        }
      });

      // Update shield to follow core node
      const core = springState.current.get(0);
      if (core && shieldEl.current) {
        shieldEl.current.setAttribute("cx", String(core.x));
        shieldEl.current.setAttribute("cy", String(core.y));
      }

      // Update connection paths
      connections.forEach((conn, i) => {
        const n1State = springState.current.get(conn.from);
        const n2State = springState.current.get(conn.to);
        if (!n1State || !n2State) return;
        const dx = n2State.x - n1State.x;
        const dy = n2State.y - n1State.y;
        const cpx = n1State.x + dx / 2 - dy * 0.15;
        const cpy = n1State.y + dy / 2 + dx * 0.15;
        const d = `M ${n1State.x.toFixed(1)} ${n1State.y.toFixed(1)} Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${n2State.x.toFixed(1)} ${n2State.y.toFixed(1)}`;
        const el = connEls.current.get(i);
        if (el) el.setAttribute("d", d);
      });
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mandalaNodes, connections]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const r = svgRef.current?.closest<HTMLDivElement>(".geo-bg-root")?.getBoundingClientRect();
    if (!r) return;
    mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  // Pre-compute initial connection paths
  const initialPaths = useMemo(() => connections.map((conn) => {
    const n1 = mandalaNodes.find((n) => n.id === conn.from);
    const n2 = mandalaNodes.find((n) => n.id === conn.to);
    if (!n1 || !n2) return "";
    const dx = n2.origX - n1.origX;
    const dy = n2.origY - n1.origY;
    const cpx = n1.origX + dx / 2 - dy * 0.15;
    const cpy = n1.origY + dy / 2 + dx * 0.15;
    return `M ${n1.origX} ${n1.origY} Q ${cpx} ${cpy} ${n2.origX} ${n2.origY}`;
  }), [connections, mandalaNodes]);

  // IntersectionObserver — pause RAF when section is out of viewport
  useEffect(() => {
    const root = svgRef.current?.closest<HTMLDivElement>(".geo-bg-root");
    if (!root) return;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="geo-bg-root absolute inset-0 overflow-hidden"
      style={{ willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full opacity-70"
        viewBox="0 0 900 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="core-glass" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251, 191, 36, 0.12)" />
            <stop offset="70%" stopColor="rgba(251, 191, 36, 0.04)" />
            <stop offset="100%" stopColor="rgba(251, 191, 36, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient Particles — CSS keyframe animated, no framer-motion */}
        {ambientParticles.map((p) => (
          <circle
            key={p.id}
            cx={p.origX}
            cy={p.origY}
            r={p.r}
            fill={p.color}
            style={{
              opacity: 0.4,
              animation: `geo-pulse ${p.dur}s ease-in-out infinite`,
              animationDelay: `${((p.origX + p.origY) % 5) * 0.8}s`,
            }}
          />
        ))}

        {/* Connections — DOM-mutated by RAF */}
        {connections.map((conn, i) => {
          let stroke = "rgba(55, 48, 163, 0.15)";
          if (conn.type === "core") stroke = "rgba(251, 191, 36, 0.3)";
          if (conn.type === "ring") stroke = "rgba(245, 158, 11, 0.25)";
          if (conn.type === "fade") stroke = "rgba(20, 184, 166, 0.1)";
          return (
            <path
              key={`conn-${i}`}
              ref={(el) => { if (el) connEls.current.set(i, el); }}
              d={initialPaths[i]}
              fill="none"
              stroke={stroke}
              strokeWidth={1.5}
            />
          );
        })}

        {/* Core Glassmorphic Shield */}
        <circle
          ref={shieldEl}
          r={75}
          cx={mandalaNodes[0]?.origX}
          cy={mandalaNodes[0]?.origY}
          fill="url(#core-glass)"
          stroke="rgba(251, 191, 36, 0.15)"
          strokeWidth={1}
        />

        {/* Geometric Nodes — DOM-mutated by RAF, CSS pulse opacity */}
        {mandalaNodes.map((node) => (
          <circle
            key={`node-${node.id}`}
            ref={(el) => { if (el) nodeEls.current.set(node.id, el); }}
            cx={node.origX}
            cy={node.origY}
            r={node.r}
            fill={node.color}
            style={{
              filter: `drop-shadow(0 0 2px ${node.color})`,
              animation: `geo-pulse ${4 + (node.id % 4)}s ease-in-out infinite`,
              animationDelay: `${(node.id % 5) * 0.5}s`,
            }}
          />
        ))}
      </svg>

      {/* Edge Fade */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#F4F8FC] to-transparent pointer-events-none" />

      <style>{`
        @keyframes geo-pulse {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  download?: string | boolean;
  "aria-label"?: string;
}

/* ─── Premium Magnetic Button ─────────────────────────────────────────────── */
function MagneticButton({ children, className, href, target, rel, download, "aria-label": ariaLabel }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const lenis = useLenis();

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        if (lenis) {
          lenis.scrollTo(element, { offset: -20, duration: 1.2 });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      download={download}
      aria-label={ariaLabel}
      onClick={handleClick}
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
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [titleIndex, setTitleIndex] = useState(0);

  // Shifting titles timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((p) => (p + 1) % shiftingTitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Slide timer — 500ms tick, drives right-side carousel sync
  useEffect(() => {
    const tick = 500;
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
  }, []);

  const slide = SLIDES[slideIndex];

  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden pt-16 pb-8 bg-[#F4F8FC]">

      {/* ── Right Half: Geometric System Background ── */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block overflow-hidden z-0">
        <InteractiveGeometricBackground />
      </div>

      {/* ── CONTENT GRID ─────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-50 items-center">

        {/* ── LEFT: Text — proper visual hierarchy ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col space-y-5"
        >

          {/* 1. Category badge */}
          <div className="flex items-center space-x-2">
            <span className="h-px w-6 bg-sky-500" />
            <p className="text-[10px] font-bold tracking-[0.2em] text-sky-600 uppercase">
              ML Engineering&nbsp;·&nbsp;AI Engineering&nbsp;·&nbsp;MLOps
            </p>
          </div>

          {/* 2. Name — biggest, dominant */}
          <h1 className="text-[2.4rem] sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 tracking-tight leading-[1.05] whitespace-nowrap">
            Yohan Shanuka
          </h1>

          {/* 3. Shifting professional title — clear at a glance, no layout shifts */}
          <div className="h-8 md:h-10 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h2
                key={titleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-xl md:text-2xl font-semibold tracking-tight"
                style={{ color: slide.color }}
              >
                {shiftingTitles[titleIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* 4. Recruiter-focused description */}
          <p className="text-base md:text-lg text-slate-500 max-w-[460px] leading-relaxed">
            Designing production-grade data pipelines, ML training systems, and MLOps workflows
            that scale from prototype to millions of events per second.
          </p>

          {/* 5. CTA buttons — immediately after description */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Primary CTA */}
            <MagneticButton
              href="#projects"
              className="group relative rounded-[13px] p-[1px] overflow-hidden shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_0_28px_rgba(99,102,241,0.35)] transition-all duration-300 block"
            >
              <motion.div
                className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: 'conic-gradient(from 0deg, transparent 20%, #0ea5e9 40%, #6366f1 60%, #2dd4bf 80%, transparent 100%)' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-slate-900 rounded-[13px] group-hover:opacity-0 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 rounded-[12px] text-white text-sm font-semibold overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                <span className="relative z-10">View Projects</span>
                <ArrowRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </MagneticButton>

            {/* Icon buttons */}
            <MagneticButton
              href="/YohanShanuka_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[46px] h-[46px] flex items-center justify-center bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 rounded-[12px] hover:text-emerald-600 hover:border-emerald-200/80 hover:shadow-[0_4px_16px_rgba(16,185,129,0.12)] transition-all duration-200"
              aria-label="View CV"
            >
              <CvIcon size={18} className="group-hover:scale-110 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              href="https://github.com/yshanukajay"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[46px] h-[46px] flex items-center justify-center bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 rounded-[12px] hover:text-slate-900 hover:border-slate-300 hover:shadow-[0_4px_16px_rgba(15,23,42,0.08)] transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} className="group-hover:scale-110 transition-transform duration-200" />
            </MagneticButton>

            <MagneticButton
              href="https://www.linkedin.com/in/yohanshanukajay/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[46px] h-[46px] flex items-center justify-center bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 rounded-[12px] hover:text-[#0077b5] hover:border-sky-200/80 hover:shadow-[0_4px_16px_rgba(0,119,181,0.12)] transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} className="group-hover:scale-110 transition-transform duration-200" />
            </MagneticButton>
          </div>

          {/* 6. AI Parser comparison card — supporting illustration */}
          <AIParserCard />
        </motion.div>

        {/* ── RIGHT: 3-Phase Diagram Carousel ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: "easeOut" }}
          className="relative hidden lg:flex flex-col h-[500px] w-full"
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
