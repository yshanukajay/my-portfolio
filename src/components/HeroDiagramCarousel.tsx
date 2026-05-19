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
      n0: { label: "Kafka", sub: "event stream", x: 120, y: 120, color: "#f97316", opacity: 1 },
      n1: { label: "Spark", sub: "batch / stream", x: 350, y: 120, color: "#0ea5e9", opacity: 1 },
      n2: { label: "Airflow", sub: "orchestrator", x: 580, y: 120, color: "#10b981", opacity: 1 },
      n3: { label: "Data Lake", sub: "parquet/delta", x: 580, y: 260, color: "#6366f1", opacity: 1 },
      n4: { label: "Schema Reg", sub: "avro/protobuf", x: 120, y: 260, color: "#f97316", opacity: 1 },
      n5: { label: "DQ Checks", sub: "expectations", x: 350, y: 260, color: "#10b981", opacity: 1 },
      n6: { label: "Hidden", sub: "", x: 350, y: 260, color: "#64748b", opacity: 0 },
      n7: { label: "Hidden", sub: "", x: 350, y: 260, color: "#64748b", opacity: 0 },
      n8: { label: "Hidden", sub: "", x: 350, y: 260, color: "#64748b", opacity: 0 },
    },
    conns: {
      c0: { from: "n0", to: "n1", opacity: 1 },
      c1: { from: "n1", to: "n2", opacity: 1 },
      c2: { from: "n1", to: "n3", opacity: 1 },
      c3: { from: "n0", to: "n4", opacity: 1 },
      c4: { from: "n4", to: "n5", opacity: 1 },
      c5: { from: "n5", to: "n3", opacity: 1 },
      c6: { from: "n2", to: "n3", opacity: 1 },
      c7: { from: "n6", to: "n7", opacity: 0 },
      c8: { from: "n7", to: "n8", opacity: 0 },
    },
    k8s: { opacity: 0, x: 140, y: 150, w: 420, h: 120 }
  },
  {
    id: "ml",
    phaseLabel: "Phase 02",
    title: "ML Training Pipeline",
    subtitle: "TensorFlow · PyTorch · MLflow · Feature Store",
    accent: "#6366f1", // Indigo
    nodes: {
      n0: { label: "Raw Data", sub: "structured/raw", x: 120, y: 100, color: "#64748b", opacity: 1 },
      n1: { label: "Feature Store", sub: "feast/hopsworks", x: 350, y: 100, color: "#0ea5e9", opacity: 1 },
      n2: { label: "Data Split", sub: "train/val/test", x: 580, y: 100, color: "#6366f1", opacity: 1 },
      n3: { label: "TensorFlow", sub: "gpu training", x: 230, y: 240, color: "#f97316", opacity: 1 },
      n4: { label: "PyTorch", sub: "custom loops", x: 470, y: 240, color: "#6366f1", opacity: 1 },
      n5: { label: "MLflow", sub: "experiment track", x: 350, y: 360, color: "#10b981", opacity: 1 },
      n6: { label: "Hidden", sub: "", x: 350, y: 360, color: "#10b981", opacity: 0 },
      n7: { label: "Hidden", sub: "", x: 350, y: 360, color: "#10b981", opacity: 0 },
      n8: { label: "Hidden", sub: "", x: 350, y: 360, color: "#10b981", opacity: 0 },
    },
    conns: {
      c0: { from: "n0", to: "n1", opacity: 1 },
      c1: { from: "n1", to: "n2", opacity: 1 },
      c2: { from: "n2", to: "n3", opacity: 1 },
      c3: { from: "n2", to: "n4", opacity: 1 },
      c4: { from: "n3", to: "n5", opacity: 1 },
      c5: { from: "n4", to: "n5", opacity: 1 },
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
      n0: { label: "GitHub", sub: "push / PR", x: 120, y: 80, color: "#475569", opacity: 1 },
      n1: { label: "GH Actions", sub: "build & test", x: 350, y: 80, color: "#0ea5e9", opacity: 1 },
      n2: { label: "Registry", sub: "docker / ecr", x: 580, y: 80, color: "#6366f1", opacity: 1 },
      n3: { label: "API Pods", sub: "fastapi", x: 230, y: 210, color: "#14b8a6", opacity: 1 },
      n4: { label: "ML Pods", sub: "inference", x: 470, y: 210, color: "#6366f1", opacity: 1 },
      n5: { label: "Prometheus", sub: "metrics", x: 120, y: 350, color: "#f97316", opacity: 1 },
      n6: { label: "Grafana", sub: "dashboards", x: 350, y: 350, color: "#f97316", opacity: 1 },
      n7: { label: "PagerDuty", sub: "alerts", x: 580, y: 350, color: "#f43f5e", opacity: 1 },
      n8: { label: "Hidden", sub: "", x: 580, y: 350, color: "#f43f5e", opacity: 0 },
    },
    conns: {
      c0: { from: "n0", to: "n1", opacity: 1 },
      c1: { from: "n1", to: "n2", opacity: 1 },
      c2: { from: "n2", to: "n3", opacity: 1 },
      c3: { from: "n2", to: "n4", opacity: 1 },
      c4: { from: "n3", to: "n5", opacity: 1 },
      c5: { from: "n4", to: "n5", opacity: 1 },
      c6: { from: "n5", to: "n6", opacity: 1 },
      c7: { from: "n6", to: "n7", opacity: 1 },
      c8: { from: "n7", to: "n8", opacity: 0 },
    },
    k8s: { opacity: 1, x: 140, y: 140, w: 420, h: 140 }
  }
];

function NodeComponent({ node }: { node: NodeDef }) {
  return (
    <motion.g
      animate={{ x: node.x, y: node.y, opacity: node.opacity }}
      transition={{ type: "spring", stiffness: 50, damping: 14, mass: 1 }}
    >
      <motion.rect
        x={-70} y={-24} width={140} height={48} rx={8}
        className="node"
        style={{ filter: "drop-shadow(0px 4px 12px rgba(0,0,0,0.06))" }}
        transition={{ duration: 0.5 }}
      />
      <motion.circle
        cx={-50} cy={0} r={5}
        fill={node.color}
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <text x={-35} y={-2} className="node-title" fontSize={13} fontWeight={600} fontFamily="Inter, sans-serif">
        {node.label}
      </text>
      <text x={-35} y={14} className="node-subtitle" fontSize={11} fontFamily="Inter, sans-serif">
        {node.sub}
      </text>
    </motion.g>
  );
}

function ConnectionComponent({ conn, nodes, activeColor }: { conn: ConnDef; nodes: Record<string, NodeDef>; activeColor: string }) {
  const fromNode = nodes[conn.from];
  const toNode = nodes[conn.to];

  if (!fromNode || !toNode) return null;

  return (
    <motion.g animate={{ opacity: conn.opacity }} transition={{ duration: 0.4 }}>
      <motion.line
        className="connector-base"
        strokeWidth={2}
        animate={{ x1: fromNode.x, y1: fromNode.y, x2: toNode.x, y2: toNode.y }}
        transition={{ type: "spring", stiffness: 50, damping: 14, mass: 1 }}
      />
      <motion.line
        className="connector-active"
        strokeWidth={2}
        strokeDasharray="6 8"
        animate={{
          x1: fromNode.x, y1: fromNode.y,
          x2: toNode.x, y2: toNode.y,
          strokeDashoffset: [0, -14]
        }}
        transition={{
          x1: { type: "spring", stiffness: 50, damping: 14, mass: 1 },
          y1: { type: "spring", stiffness: 50, damping: 14, mass: 1 },
          x2: { type: "spring", stiffness: 50, damping: 14, mass: 1 },
          y2: { type: "spring", stiffness: 50, damping: 14, mass: 1 },
          strokeDashoffset: { duration: 0.6, repeat: Infinity, ease: "linear" }
        }}
      />
    </motion.g>
  );
}

export default function HeroDiagramCarousel() {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const DURATION = 8000;

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIdx]);

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

  const phase = PHASES[activeIdx];

  return (
    <div className="diagram-card relative w-full h-full flex flex-col overflow-hidden select-none">
      
      {/* --- Ambient Blobs --- */}
      <motion.div
        className="absolute pointer-events-none rounded-full blur-[90px] opacity-20"
        animate={{
          backgroundColor: phase.accent,
          scale: [1, 1.2, 0.9, 1],
          x: [0, 60, -30, 0],
          y: [0, -40, 50, 0],
        }}
        transition={{
          backgroundColor: { duration: 1.5 },
          scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          y: { duration: 18, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{ width: 350, height: 350, top: '10%', left: '20%' }}
      />
      <motion.div
        className="absolute pointer-events-none rounded-full blur-[90px] opacity-10"
        animate={{
          backgroundColor: phase.accent,
          scale: [0.9, 1.3, 1, 0.9],
          x: [0, -50, 40, 0],
          y: [0, 60, -30, 0],
        }}
        transition={{
          backgroundColor: { duration: 1.5 },
          scale: { duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 },
          x: { duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1 },
          y: { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 },
        }}
        style={{ width: 300, height: 300, bottom: '5%', right: '15%' }}
      />

      {/* --- Header Content --- */}
      <div className="absolute top-6 left-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span 
                className="phase-badge text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              >
                {phase.phaseLabel}
              </span>
            </div>
            <h3 className="diagram-title text-xl font-bold">{phase.title}</h3>
            <p className="diagram-subtitle text-xs font-mono mt-1">{phase.subtitle}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* --- Dynamic SVG Canvas --- */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 700 450" className="w-full h-full overflow-visible">
          {/* Grid Pattern Removed -> Replaced by .diagram-card background */}

          {/* Kubernetes Cluster Box */}
          <motion.g animate={{ opacity: phase.k8s.opacity }} transition={{ duration: 0.6 }}>
            <motion.rect
              animate={{ x: phase.k8s.x, y: phase.k8s.y, width: phase.k8s.w, height: phase.k8s.h }}
              rx={16}
              fill="rgba(20, 184, 166, 0.04)"
              stroke="#14b8a6" 
              strokeWidth={1.5} 
              strokeDasharray="6 6"
              transition={{ type: "spring", stiffness: 50, damping: 14 }}
            />
            <motion.text
              animate={{ x: phase.k8s.x + 16, y: phase.k8s.y + 24 }}
              fill="#0d9488" 
              fontSize={12} 
              fontWeight={600} 
              fontFamily="Inter, sans-serif"
              transition={{ type: "spring", stiffness: 50, damping: 14 }}
            >
              ⎈ Kubernetes Cluster
            </motion.text>
          </motion.g>

          {/* Connections (Rendered below nodes) */}
          {ALL_CONN_IDS.map(id => (
            <ConnectionComponent key={id} conn={phase.conns[id]} nodes={phase.nodes} activeColor={phase.accent} />
          ))}

          {/* Nodes */}
          {ALL_NODE_IDS.map(id => (
            <NodeComponent key={id} node={phase.nodes[id]} />
          ))}
        </svg>
      </motion.div>

      {/* --- Progress Indicator --- */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10">
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
