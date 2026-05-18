"use client";

import { motion } from "framer-motion";

/* ── Shared helpers ───────────────────────────────────────────────── */
const pulse = {
  animate: { opacity: [0.4, 1, 0.4], scale: [1, 1.06, 1] },
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
};

function Node({
  x, y, w = 110, h = 36, label, color, delay = 0,
}: {
  x: number; y: number; w?: number; h?: number; label: string; color: string; delay?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <rect
        x={x - w / 2} y={y - h / 2} width={w} height={h} rx={8}
        fill={`${color}18`} stroke={color} strokeWidth={1.5}
      />
      <text
        x={x} y={y + 5} textAnchor="middle"
        fontSize={11} fontWeight="600" fill={color} fontFamily="monospace"
      >
        {label}
      </text>
    </motion.g>
  );
}

function Arrow({ x1, y1, x2, y2, color, delay = 0 }: {
  x1: number; y1: number; x2: number; y2: number; color: string; delay?: number;
}) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  return (
    <motion.line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color} strokeWidth={1.5} strokeDasharray={length}
      initial={{ strokeDashoffset: length, opacity: 0 }}
      animate={{ strokeDashoffset: 0, opacity: 0.7 }}
      transition={{ duration: 0.6, delay, ease: "easeInOut" }}
      markerEnd="url(#arrowhead)"
    />
  );
}

function Dot({ cx, cy, color, delay = 0 }: { cx: number; cy: number; color: string; delay?: number }) {
  return (
    <motion.circle
      cx={cx} cy={cy} r={4} fill={color}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0], cx: [cx - 40, cx + 40] }}
      transition={{ duration: 1.8, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Phase 1 – Data Engineering Pipeline
   Kafka → Spark → Airflow → Data Lake
═══════════════════════════════════════════════════════════════════ */
export function DataEngineeringDiagram() {
  const color = "#0ea5e9";
  const nodes = [
    { x: 70,  label: "Kafka",     c: "#f59e0b" },
    { x: 200, label: "Spark",     c: "#0ea5e9" },
    { x: 330, label: "Airflow",   c: "#10b981" },
    { x: 460, label: "Data Lake", c: "#818cf8" },
  ];
  const sideNodes = [
    { x: 200, y: 130, label: "Schema\nRegistry", c: "#f59e0b" },
    { x: 330, y: 130, label: "DQ Checks",        c: "#10b981" },
    { x: 460, y: 130, label: "Parquet /\nDelta",  c: "#818cf8" },
  ];

  return (
    <svg viewBox="0 0 560 220" className="w-full h-full" aria-label="Data Engineering Pipeline">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={color} opacity={0.6} />
        </marker>
        <radialGradient id="bg1" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0ea5e910" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Background glow */}
      <rect x={0} y={0} width={560} height={220} fill="url(#bg1)" />

      {/* Main pipeline row */}
      {nodes.map((n, i) => (
        <Node key={n.label} x={n.x} y={75} label={n.label} color={n.c} delay={i * 0.15} />
      ))}

      {/* Horizontal arrows */}
      {nodes.slice(0, -1).map((n, i) => (
        <Arrow key={i} x1={n.x + 56} y1={75} x2={nodes[i + 1].x - 56} y2={75} color={nodes[i + 1].c} delay={0.3 + i * 0.2} />
      ))}

      {/* Animated data packets */}
      {nodes.slice(0, -1).map((n, i) => (
        <Dot key={`dot-${i}`} cx={n.x + 56} cy={75} color={nodes[i + 1].c} delay={0.8 + i * 0.6} />
      ))}

      {/* Side nodes dropping down */}
      {sideNodes.map((n, i) => (
        <g key={n.label}>
          <motion.line
            x1={nodes[i + 1].x} y1={93} x2={n.x} y2={n.y - 18}
            stroke={n.c} strokeWidth={1} strokeDasharray="4 3" opacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
          />
          <Node x={n.x} y={n.y} w={90} label={n.label} color={n.c} delay={0.6 + i * 0.2} />
        </g>
      ))}

      {/* Label */}
      <motion.text x={280} y={200} textAnchor="middle" fontSize={10} fill="#94a3b8" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        // High-throughput streaming → structured analytics
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Phase 2 – Machine Learning Pipeline
═══════════════════════════════════════════════════════════════════ */
export function MLPipelineDiagram() {
  const color = "#818cf8";

  return (
    <svg viewBox="0 0 560 240" className="w-full h-full" aria-label="ML Pipeline">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={color} opacity={0.6} />
        </marker>
        <radialGradient id="bg2" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#818cf810" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={560} height={240} fill="url(#bg2)" />

      {/* Top row */}
      <Node x={90}  y={55} label="Raw Data"      color="#94a3b8" delay={0} />
      <Node x={220} y={55} label="Feature Store" color="#f59e0b" delay={0.1} w={120} />
      <Node x={350} y={55} label="Data Split"    color="#818cf8" delay={0.2} />
      <Arrow x1={146} y1={55} x2={160} y2={55} color="#f59e0b" delay={0.3} />
      <Arrow x1={280} y1={55} x2={294} y2={55} color="#818cf8" delay={0.45} />
      <Dot cx={146} cy={55} color="#f59e0b" delay={0.7} />
      <Dot cx={280} cy={55} color="#818cf8" delay={1.1} />

      {/* Branch: TensorFlow + PyTorch */}
      <motion.line x1={350} y1={74} x2={270} y2={108} stroke="#818cf8" strokeWidth={1} strokeDasharray="4 3" opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />
      <motion.line x1={350} y1={74} x2={430} y2={108} stroke="#818cf8" strokeWidth={1} strokeDasharray="4 3" opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6 }} />

      <Node x={270} y={130} label="TensorFlow"  color="#f97316" delay={0.7} w={110} />
      <Node x={430} y={130} label="PyTorch"     color="#818cf8" delay={0.7} w={100} />

      {/* Converge to MLflow */}
      <motion.line x1={270} y1={149} x2={350} y2={175} stroke="#10b981" strokeWidth={1.2} opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />
      <motion.line x1={430} y1={149} x2={350} y2={175} stroke="#10b981" strokeWidth={1.2} opacity={0.5}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9 }} />

      <Node x={350} y={190} label="MLflow Tracking" color="#10b981" delay={1.0} w={140} />

      {/* Model Registry */}
      <Arrow x1={350} y1={208} x2={350} y2={222} color="#10b981" delay={1.2} />
      <Node x={350} y={232} label="Model Registry" color="#818cf8" delay={1.3} w={130} />

      {/* Pulsing dot on MLflow */}
      <motion.circle cx={350} cy={190} r={6} fill="#10b981"
        animate={pulse.animate} transition={pulse.transition} opacity={0.5} />

      <motion.text x={280} y={14} textAnchor="middle" fontSize={10} fill="#94a3b8" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
        // Experiment tracking → versioned model registry
      </motion.text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Phase 3 – MLOps Deployment Pipeline
═══════════════════════════════════════════════════════════════════ */
export function MLOpsDeployDiagram() {
  const color = "#2dd4bf";

  // Kubernetes pods grid
  const pods = [
    { x: 350, y: 95,  label: "API Pod 1" },
    { x: 460, y: 95,  label: "API Pod 2" },
    { x: 350, y: 145, label: "ML  Pod 1" },
    { x: 460, y: 145, label: "ML  Pod 2" },
  ];

  return (
    <svg viewBox="0 0 560 230" className="w-full h-full" aria-label="MLOps Deployment Pipeline">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill={color} opacity={0.6} />
        </marker>
        <radialGradient id="bg3" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#2dd4bf10" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      <rect x={0} y={0} width={560} height={230} fill="url(#bg3)" />

      {/* CI/CD Source */}
      <Node x={70}  y={60} label="GitHub Actions" color="#94a3b8" delay={0} w={130} />
      <Node x={70}  y={120} label="Docker Build"  color="#0ea5e9" delay={0.15} w={120} />
      <Arrow x1={70} y1={79} x2={70} y2={101} color="#0ea5e9" delay={0.3} />
      <Dot cx={70} cy={79} color="#0ea5e9" delay={0.5} />

      {/* Registry */}
      <Node x={210} y={90} label="Registry" color="#818cf8" delay={0.4} w={100} />
      <Arrow x1={132} y1={90} x2={160} y2={90} color="#818cf8" delay={0.55} />
      <Dot cx={132} cy={90} color="#818cf8" delay={0.9} />

      {/* K8s cluster box */}
      <motion.rect
        x={305} y={60} width={215} height={110} rx={12}
        fill="#2dd4bf08" stroke="#2dd4bf" strokeWidth={1} strokeDasharray="6 3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
      />
      <motion.text x={412} y={77} textAnchor="middle" fontSize={9} fill="#2dd4bf" fontFamily="monospace" fontWeight="700"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        Kubernetes Cluster
      </motion.text>

      {/* Arrow to cluster */}
      <Arrow x1={262} y1={90} x2={305} y2={90} color={color} delay={0.75} />
      <Dot cx={262} cy={90} color={color} delay={1.1} />

      {/* Pods */}
      {pods.map((p, i) => (
        <Node key={p.label} x={p.x} y={p.y} w={95} h={30} label={p.label}
          color={i < 2 ? "#818cf8" : "#10b981"} delay={0.9 + i * 0.1} />
      ))}

      {/* FastAPI → Monitoring */}
      <Node x={130} y={185} label="FastAPI" color="#f97316" delay={1.3} w={100} />
      <Node x={290} y={185} label="Prometheus" color="#f59e0b" delay={1.4} w={110} />
      <Node x={440} y={185} label="Grafana"    color="#10b981" delay={1.5} w={100} />

      <Arrow x1={182} y1={185} x2={234} y2={185} color="#f59e0b" delay={1.55} />
      <Arrow x1={346} y1={185} x2={389} y2={185} color="#10b981" delay={1.7} />
      <Dot cx={182} cy={185} color="#f59e0b" delay={2} />
      <Dot cx={346} cy={185} color="#10b981" delay={2.3} />

      {/* Line from cluster to fastapi */}
      <motion.line x1={350} y1={165} x2={130} y2={173} stroke="#f97316" strokeWidth={1} strokeDasharray="4 3" opacity={0.4}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.3 }} />

      {/* Pulsing on Grafana */}
      <motion.circle cx={440} cy={185} r={6} fill="#10b981"
        animate={pulse.animate} transition={pulse.transition} opacity={0.5} />

      <motion.text x={280} y={218} textAnchor="middle" fontSize={10} fill="#94a3b8" fontFamily="monospace"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        // Zero-downtime rollout · real-time observability
      </motion.text>
    </svg>
  );
}
