"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// --- Node & Connection Definitions ---
const ALL_NODE_IDS = ["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8"];
const ALL_CONN_IDS = ["c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8"];

type NodeDef = { label: string; sub: string; x: number; y: number; color: string; opacity: number };
type ConnDef = { from: string; to: string; opacity: number };

type PhaseData = {
  id: string;
  phaseLabel: string;
  title: string;
  subtitle: string;
  accent: string;
  nodes: Record<string, NodeDef>;
  conns: Record<string, ConnDef>;
  k8s: { opacity: number; x: number; y: number; w: number; h: number };
};

const PHASES: PhaseData[] = [
  {
    id: "data",
    phaseLabel: "Phase 01",
    title: "Data Pipeline Architecture",
    subtitle: "Kafka · Spark · Airflow · Iceberg",
    accent: "#0ea5e9", // Sky Blue
    nodes: {
      n0: { label: "Kafka", sub: "event stream", x: 120, y: 225, color: "#f97316", opacity: 1 },
      n1: { label: "Schema Reg", sub: "avro/protobuf", x: 260, y: 140, color: "#f97316", opacity: 1 },
      n2: { label: "Spark", sub: "batch / stream", x: 260, y: 310, color: "#0ea5e9", opacity: 1 },
      n3: { label: "Airflow", sub: "orchestrator", x: 400, y: 140, color: "#10b981", opacity: 1 },
      n4: { label: "DQ Checks", sub: "expectations", x: 400, y: 310, color: "#10b981", opacity: 1 },
      n5: { label: "Data Lake", sub: "parquet/delta", x: 540, y: 225, color: "#6366f1", opacity: 1 },
      n6: { label: "Hidden", sub: "", x: 350, y: 225, color: "#64748b", opacity: 0 },
      n7: { label: "Hidden", sub: "", x: 350, y: 225, color: "#64748b", opacity: 0 },
      n8: { label: "Hidden", sub: "", x: 350, y: 225, color: "#64748b", opacity: 0 },
    },
    conns: {
      c0: { from: "n0", to: "n1", opacity: 1 }, // Kafka -> Schema
      c1: { from: "n0", to: "n2", opacity: 1 }, // Kafka -> Spark
      c2: { from: "n1", to: "n3", opacity: 1 }, // Schema -> Airflow
      c3: { from: "n2", to: "n4", opacity: 1 }, // Spark -> DQ
      c4: { from: "n3", to: "n5", opacity: 1 }, // Airflow -> Lake
      c5: { from: "n4", to: "n5", opacity: 1 }, // DQ -> Lake
      c6: { from: "n1", to: "n5", opacity: 0 },
      c7: { from: "n6", to: "n7", opacity: 0 },
      c8: { from: "n7", to: "n8", opacity: 0 },
    },
    k8s: { opacity: 0, x: 200, y: 150, w: 300, h: 120 }
  },
  {
    id: "ml",
    phaseLabel: "Phase 02",
    title: "ML Training Pipeline",
    subtitle: "TensorFlow · PyTorch · MLflow · Feature Store",
    accent: "#6366f1", // Indigo
    nodes: {
      n0: { label: "Raw Data", sub: "structured/raw", x: 100, y: 225, color: "#64748b", opacity: 1 },
      n1: { label: "Feature Store", sub: "feast/hopsworks", x: 240, y: 225, color: "#0ea5e9", opacity: 1 },
      n2: { label: "Data Split", sub: "train/val/test", x: 380, y: 225, color: "#6366f1", opacity: 1 },
      n3: { label: "TensorFlow", sub: "gpu training", x: 520, y: 150, color: "#f97316", opacity: 1 },
      n4: { label: "PyTorch", sub: "custom loops", x: 520, y: 300, color: "#6366f1", opacity: 1 },
      n5: { label: "MLflow", sub: "experiment track", x: 660, y: 225, color: "#10b981", opacity: 1 },
      n6: { label: "Hidden", sub: "", x: 350, y: 360, color: "#10b981", opacity: 0 },
      n7: { label: "Hidden", sub: "", x: 350, y: 360, color: "#10b981", opacity: 0 },
      n8: { label: "Hidden", sub: "", x: 350, y: 360, color: "#10b981", opacity: 0 },
    },
    conns: {
      c0: { from: "n0", to: "n1", opacity: 1 },
      c1: { from: "n1", to: "n2", opacity: 1 },
      c2: { from: "n2", to: "n3", opacity: 1 }, // Split up
      c3: { from: "n2", to: "n4", opacity: 1 }, // Split down
      c4: { from: "n3", to: "n5", opacity: 1 }, // Merge down
      c5: { from: "n4", to: "n5", opacity: 1 }, // Merge up
      c6: { from: "n5", to: "n6", opacity: 0 },
      c7: { from: "n6", to: "n7", opacity: 0 },
      c8: { from: "n7", to: "n8", opacity: 0 },
    },
    k8s: { opacity: 0, x: 140, y: 150, w: 420, h: 120 }
  },
  {
    id: "mlops",
    phaseLabel: "Phase 03",
    title: "Cloud + MLOps Infrastructure",
    subtitle: "Docker · Kubernetes · FastAPI · Prometheus",
    accent: "#14b8a6", // Teal
    nodes: {
      n0: { label: "GitHub", sub: "push / PR", x: 100, y: 150, color: "#475569", opacity: 1 },
      n1: { label: "GH Actions", sub: "build & test", x: 250, y: 150, color: "#0ea5e9", opacity: 1 },
      n2: { label: "Registry", sub: "docker / ecr", x: 400, y: 150, color: "#6366f1", opacity: 1 },
      n3: { label: "API Pods", sub: "fastapi", x: 560, y: 150, color: "#14b8a6", opacity: 1 },
      n4: { label: "ML Pods", sub: "inference", x: 560, y: 280, color: "#6366f1", opacity: 1 },
      n5: { label: "Prometheus", sub: "metrics", x: 400, y: 350, color: "#f97316", opacity: 1 },
      n6: { label: "Grafana", sub: "dashboards", x: 250, y: 350, color: "#f97316", opacity: 1 },
      n7: { label: "PagerDuty", sub: "alerts", x: 100, y: 350, color: "#f43f5e", opacity: 1 },
      n8: { label: "Hidden", sub: "", x: 580, y: 350, color: "#f43f5e", opacity: 0 },
    },
    conns: {
      c0: { from: "n0", to: "n1", opacity: 1 },
      c1: { from: "n1", to: "n2", opacity: 1 },
      c2: { from: "n2", to: "n3", opacity: 1 },
      c3: { from: "n3", to: "n4", opacity: 1 },
      c4: { from: "n4", to: "n5", opacity: 1 },
      c5: { from: "n5", to: "n6", opacity: 1 },
      c6: { from: "n6", to: "n7", opacity: 1 },
      c7: { from: "n7", to: "n8", opacity: 0 },
      c8: { from: "n2", to: "n4", opacity: 1 }, // Registry direct to ML Pods
    },
    k8s: { opacity: 1, x: 500, y: 100, w: 120, h: 230 } // Encloses API and ML Pods
  }
];

function NodeComponent({ node, id }: { node: NodeDef; id: string }) {
  // Use a pseudo-random seed based on the ID for consistent drift animations
  const seed = id.charCodeAt(1) || 0;

  return (
    <motion.div
      className="absolute flex flex-col items-center justify-center pointer-events-none"
      animate={{
        left: node.x,
        top: node.y,
        opacity: node.opacity,
        y: [0, -3, 0, 3, 0],
        x: [0, 2, 0, -2, 0]
      }}
      transition={{
        left: { type: "spring", stiffness: 40, damping: 15, mass: 1 },
        top: { type: "spring", stiffness: 40, damping: 15, mass: 1 },
        opacity: { duration: 0.5 },
        y: { duration: 8 + (seed % 3), repeat: Infinity, ease: "easeInOut" },
        x: { duration: 9 + (seed % 4), repeat: Infinity, ease: "easeInOut" }
      }}
      style={{ transform: "translate(-50%, -50%)" }} // Center on coordinate
    >
      {/* Glowing Synapse Orb */}
      <div
        className="w-4 h-4 rounded-full"
        style={{
          backgroundColor: node.color,
          boxShadow: `0 0 15px ${node.color}, 0 0 30px ${node.color}60, inset 0 0 8px rgba(255,255,255,0.9)`
        }}
      />
      {/* Floating Free Text */}
      <div className="absolute top-6 flex flex-col items-center w-[160px] text-center" style={{ WebkitFontSmoothing: "antialiased" }}>
        <span className="text-slate-700 font-bold text-[14px] leading-tight tracking-wide drop-shadow-sm">
          {node.label}
        </span>
        <span
          className="text-[10px] font-bold font-mono leading-none mt-1 uppercase tracking-widest opacity-95 drop-shadow-sm"
          style={{ color: node.color }}
        >
          {node.sub}
        </span>
      </div>
    </motion.div>
  );
}

function getPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  if (dx > dy) {
    return `M ${x1} ${y1} C ${x1 + dx / 2} ${y1}, ${x2 - dx / 2} ${y2}, ${x2} ${y2}`;
  } else {
    return `M ${x1} ${y1} C ${x1} ${y1 + dy / 2}, ${x2} ${y2 - dy / 2}, ${x2} ${y2}`;
  }
}

function ConnectionComponent({ conn, nodes, activeColor }: { conn: ConnDef; nodes: Record<string, NodeDef>; activeColor: string }) {
  if (!conn) return null;
  const fromNode = nodes[conn.from];
  const toNode = nodes[conn.to];

  if (!fromNode || !toNode) return null;

  const d = getPath(fromNode.x, fromNode.y, toNode.x, toNode.y);

  // Total length of dash + gap = 160. Offset by -160 to make it flow forward continuously.
  const flowDash = "30 130";
  const flowOffset = [0, -160];

  return (
    <motion.g animate={{ opacity: conn.opacity }} transition={{ duration: 0.4 }}>
      {/* Base faint track */}
      <motion.path
        className="connector-base"
        strokeWidth={1.5}
        fill="none"
        style={{ stroke: `${activeColor}20` }}
        animate={{ d }}
        transition={{ type: "spring", stiffness: 50, damping: 14, mass: 1 }}
      />
      {/* Glowing flowing liquid/comet */}
      <motion.path
        className="connector-active"
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={flowDash}
        style={{
          stroke: activeColor,
          filter: `drop-shadow(0px 0px 8px ${activeColor})`
        }}
        animate={{
          d,
          strokeDashoffset: flowOffset
        }}
        transition={{
          d: { type: "spring", stiffness: 50, damping: 14, mass: 1 },
          strokeDashoffset: { duration: 1.5, repeat: Infinity, ease: "linear" }
        }}
      />
    </motion.g>
  );
}

interface HeroDiagramCarouselProps {
  activeIdx?: number;
  setActiveIdx?: (val: number | ((prev: number) => number)) => void;
  progress?: number;
  setProgress?: (val: number | ((prev: number) => number)) => void;
}

export default function HeroDiagramCarousel({
  activeIdx: controlledActiveIdx,
  setActiveIdx: controlledSetActiveIdx,
  progress: controlledProgress,
  setProgress: controlledSetProgress
}: HeroDiagramCarouselProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [localActiveIdx, localSetActiveIdx] = useState(0);
  const [localProgress, localSetProgress] = useState(0);

  const activeIdx = controlledActiveIdx !== undefined ? controlledActiveIdx : localActiveIdx;
  const setActiveIdx = controlledSetActiveIdx || localSetActiveIdx;
  const progress = controlledProgress !== undefined ? controlledProgress : localProgress;
  const setProgress = controlledSetProgress || localSetProgress;

  const DURATION = 8000;

  useEffect(() => {
    if (controlledActiveIdx !== undefined) return;

    const startTimer = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      setProgress(0);
      const tick = 50;
      const steps = DURATION / tick;
      let step = 0;
      timerRef.current = setInterval(() => {
        step++;
        setProgress((step / steps) * 100);
        if (step >= steps) {
          setActiveIdx((prev) => (prev + 1) % PHASES.length);
        }
      }, tick);
    };

    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIdx, controlledActiveIdx, setActiveIdx, setProgress]);

  const phase = PHASES[activeIdx];

  return (
    <div className="group relative w-full max-w-[800px] aspect-[16/10] flex flex-col overflow-visible select-none items-center justify-center">

      {/* --- Header Content --- */}
      <div className="absolute top-6 left-8 z-10 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
            style={{ WebkitFontSmoothing: "antialiased" }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="phase-badge text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {phase.phaseLabel}
              </span>
            </div>
            <h3 className="diagram-title text-2xl font-bold tracking-tight text-slate-700">{phase.title}</h3>
            <p className="diagram-subtitle text-[13px] font-medium font-mono mt-0.5 tracking-wide" style={{ color: phase.accent }}>
              {phase.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative w-[700px] h-[450px]">
        {/* --- LAYER 0.5: Frosted Blur — tight cluster area only --- */}
        <div
          className="absolute pointer-events-none"
          style={{
            inset: "10% 8%",
            zIndex: 0,
            backdropFilter: "blur(10px) saturate(1.2)",
            WebkitBackdropFilter: "blur(10px) saturate(1.2)",
            background: "rgba(255,255,255,0.42)",
            maskImage: "radial-gradient(ellipse 80% 75% at 50% 50%, black 30%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 75% at 50% 50%, black 30%, transparent 100%)",
            borderRadius: "50%",
          }}
        />

        {/* --- LAYER 1: Background --- */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg viewBox="0 0 700 450" className="w-full h-full overflow-visible">
            {/* Kubernetes Cluster Box for MLOps */}
            <motion.g animate={{ opacity: phase.k8s.opacity }} transition={{ duration: 0.6 }}>
              <motion.rect
                animate={{ x: phase.k8s.x, y: phase.k8s.y, width: phase.k8s.w, height: phase.k8s.h }}
                rx={16} fill="rgba(20, 184, 166, 0.05)" stroke="#14b8a6" strokeWidth={1.5} strokeDasharray="6 6"
                transition={{ type: "spring", stiffness: 50, damping: 14 }}
              />
              <motion.text
                animate={{ x: phase.k8s.x + 16, y: phase.k8s.y + 24 }}
                fill="#14b8a6" fontSize={12} fontWeight={600} fontFamily="Inter, sans-serif"
                transition={{ type: "spring", stiffness: 50, damping: 14 }}
              >
                ⎈ Kubernetes Cluster
              </motion.text>
            </motion.g>
          </svg>
        </div>

        {/* --- LAYER 2: Connections --- */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <svg viewBox="0 0 700 450" className="w-full h-full overflow-visible">
            {ALL_CONN_IDS.map(id => (
              <ConnectionComponent key={id} conn={phase.conns[id]} nodes={phase.nodes} activeColor={phase.accent} />
            ))}
          </svg>
        </div>

        {/* --- LAYER 3: Floating Cinematic Nodes --- */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {ALL_NODE_IDS.map(id => (
            <NodeComponent key={id} id={id} node={phase.nodes[id]} />
          ))}
        </div>

      </div>

      {/* --- Progress Indicator --- */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-4 z-20 py-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 ease-in-out cursor-pointer">
        {PHASES.map((p, i) => (
          <div
            key={p.id}
            className="flex flex-col items-center gap-2 cursor-pointer p-2"
            onClick={() => { setActiveIdx(i); setProgress(0); }}
          >
            <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 bottom-0 rounded-full"
                style={{ backgroundColor: p.accent }}
                animate={{ width: i === activeIdx ? `${progress}%` : i < activeIdx ? "100%" : "0%" }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
