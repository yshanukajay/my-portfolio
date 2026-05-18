"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ─── Shared Design Tokens ──────────────────────────────────────── */
const BG = "#080d14";

/* ─── Dot-grid Background ──────────────────────────────────────── */
function BgGrid({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <pattern id={`dot-${uid}`} width={24} height={24} patternUnits="userSpaceOnUse">
          <circle cx={12} cy={12} r={0.9} fill="rgba(148,163,184,0.15)" />
        </pattern>
        <filter id={`glow-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id={`soft-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <rect width={560} height={340} fill={BG} />
      <rect width={560} height={340} fill={`url(#dot-${uid})`} />
    </>
  );
}

/* ─── Interactive Node ───────────────────────────────────────────── */
function Node({
  x, y, w = 120, h = 40, label, sub, color, delay = 0,
}: {
  x: number; y: number; w?: number; h?: number;
  label: string; sub?: string; color: string; delay?: number;
}) {
  const [hov, setHov] = useState(false);
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, delay, ease: "backOut" }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: "pointer" }}
    >
      {/* Ambient glow */}
      <motion.rect
        x={x - w / 2 - 8} y={y - h / 2 - 8} width={w + 16} height={h + 16} rx={18}
        fill={color}
        animate={{ opacity: hov ? 0.22 : 0.07 }}
        transition={{ duration: 0.25 }}
      />
      {/* Glass body */}
      <motion.rect
        x={x - w / 2} y={y - h / 2} width={w} height={h} rx={11}
        fill={`${color}1a`}
        stroke={color}
        animate={{ strokeWidth: hov ? 1.8 : 1, strokeOpacity: hov ? 1 : 0.45 }}
        transition={{ duration: 0.2 }}
        style={{ filter: hov ? `drop-shadow(0 0 10px ${color}70)` : "none" }}
      />
      {/* Top shimmer */}
      <rect x={x - w / 2 + 2} y={y - h / 2 + 2} width={w - 4} height={h * 0.4} rx={9}
        fill="rgba(255,255,255,0.05)" />
      {/* Pulsing status dot */}
      <motion.circle cx={x - w / 2 + 13} cy={y} r={3.5} fill={color}
        animate={{ opacity: [0.5, 1, 0.5], scale: hov ? [1, 1.4, 1] : 1 }}
        transition={{ duration: 1.6, repeat: Infinity }} />
      {/* Label */}
      <text x={x + 6} y={sub ? y - 4 : y + 5} textAnchor="middle"
        fontSize={11} fontWeight="700" fill="rgba(255,255,255,0.92)"
        fontFamily="'Fira Code',monospace" style={{ letterSpacing: "0.03em" }}>
        {label}
      </text>
      {sub && (
        <text x={x + 6} y={y + 11} textAnchor="middle" fontSize={8} fill={color}
          fontFamily="monospace" opacity={0.75}>{sub}</text>
      )}
    </motion.g>
  );
}

/* ─── Animated Connector ─────────────────────────────────────────── */
function Conn({
  x1, y1, x2, y2, color, delay = 0, vert = false,
}: {
  x1: number; y1: number; x2: number; y2: number;
  color: string; delay?: number; vert?: boolean;
}) {
  const d = vert
    ? `M${x1},${y1} C${x1},${(y1 + y2) / 2} ${x2},${(y1 + y2) / 2} ${x2},${y2}`
    : `M${x1},${y1} L${x2},${y2}`;

  const dotPath = vert
    ? [{ cx: x1, cy: y1 }, { cx: x2, cy: (y1 + y2) / 2 }, { cx: x2, cy: y2 }]
    : [{ cx: x1, cy: y1 }, { cx: x2, cy: y2 }];

  return (
    <g>
      {/* Glow trace */}
      <motion.path d={d} fill="none" stroke={color} strokeWidth={5} opacity={0.12}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay }} />
      {/* Line */}
      <motion.path d={d} fill="none" stroke={color} strokeWidth={1.5} opacity={0.55}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.7, delay, ease: "easeOut" }} />
      {/* Traveling particle */}
      <motion.circle r={3.5} fill={color}
        style={{ filter: `drop-shadow(0 0 5px ${color})` }}
        animate={{ cx: dotPath.map(p => p.cx), cy: dotPath.map(p => p.cy) }}
        transition={{ duration: 2.2, delay: delay + 0.9, repeat: Infinity, ease: "linear",
          times: dotPath.map((_, i) => i / (dotPath.length - 1)) }} />
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PHASE 1 — Data Engineering Pipeline
═══════════════════════════════════════════════════════════════════ */
export function DataEngineeringDiagram() {
  return (
    <svg viewBox="0 0 560 340" className="w-full h-full" style={{ fontFamily: "monospace" }}>
      <BgGrid uid="d1" />

      {/* Section label */}
      <motion.text x={280} y={24} textAnchor="middle" fontSize={9} fill="rgba(14,165,233,0.5)"
        fontFamily="monospace" fontWeight="700" letterSpacing="3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        DATA INGESTION · TRANSFORMATION · STORAGE
      </motion.text>

      {/* Main pipeline row y=110 */}
      <Node x={72}  y={110} w={118} label="Kafka"     sub="event stream" color="#f59e0b" delay={0.1} />
      <Node x={200} y={110} w={118} label="Spark"     sub="batch / stream" color="#0ea5e9" delay={0.2} />
      <Node x={330} y={110} w={118} label="Airflow"   sub="orchestrator"  color="#10b981" delay={0.3} />
      <Node x={460} y={110} w={118} label="Data Lake" sub="parquet/delta"  color="#818cf8" delay={0.4} />

      {/* Main arrows */}
      <Conn x1={133} y1={110} x2={141} y2={110} color="#0ea5e9" delay={0.5} />
      <Conn x1={261} y1={110} x2={271} y2={110} color="#10b981" delay={0.65} />
      <Conn x1={391} y1={110} x2={401} y2={110} color="#818cf8" delay={0.8} />

      {/* Sub-nodes row y=200 */}
      <Node x={136} y={205} w={120} label="Schema Reg." sub="avro / protobuf" color="#f59e0b" delay={0.6} />
      <Node x={265} y={205} w={110} label="DQ Checks"  sub="great expectations" color="#10b981" delay={0.7} />
      <Node x={394} y={205} w={110} label="Iceberg"    sub="table format" color="#818cf8" delay={0.8} />

      {/* Vertical drop lines */}
      <Conn x1={136} y1={129} x2={136} y2={185} color="#f59e0b" delay={0.7} vert />
      <Conn x1={265} y1={129} x2={265} y2={185} color="#10b981" delay={0.8} vert />
      <Conn x1={394} y1={129} x2={394} y2={185} color="#818cf8" delay={0.95} vert />

      {/* Status metrics */}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PHASE 2 — Machine Learning Pipeline
═══════════════════════════════════════════════════════════════════ */
export function MLPipelineDiagram() {
  return (
    <svg viewBox="0 0 560 340" className="w-full h-full" style={{ fontFamily: "monospace" }}>
      <BgGrid uid="d2" />

      <motion.text x={280} y={24} textAnchor="middle" fontSize={9} fill="rgba(129,140,248,0.5)"
        fontFamily="monospace" fontWeight="700" letterSpacing="3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        FEATURE ENGINEERING · TRAINING · VERSIONING
      </motion.text>

      {/* Top row */}
      <Node x={80}  y={95}  w={120} label="Raw Data"      sub="structured + raw" color="#94a3b8" delay={0.1} />
      <Node x={220} y={95}  w={125} label="Feature Store" sub="feast / hopsworks"  color="#f59e0b" delay={0.2} />
      <Node x={360} y={95}  w={115} label="Data Split"    sub="train/val/test"     color="#818cf8" delay={0.3} />

      <Conn x1={141} y1={95} x2={157} y2={95} color="#f59e0b" delay={0.45} />
      <Conn x1={283} y1={95} x2={302} y2={95} color="#818cf8" delay={0.6} />

      {/* Branch from Data Split */}
      <Conn x1={360} y1={116} x2={245} y2={183} color="#f97316" delay={0.75} vert />
      <Conn x1={360} y1={116} x2={420} y2={183} color="#818cf8" delay={0.75} vert />

      {/* Training nodes */}
      <Node x={245} y={205} w={130} label="TensorFlow"  sub="GPU training" color="#f97316" delay={0.8} />
      <Node x={420} y={205} w={120} label="PyTorch"     sub="custom loops"  color="#818cf8" delay={0.8} />

      {/* Converge to MLflow */}
      <Conn x1={245} y1={226} x2={310} y2={272} color="#10b981" delay={0.95} vert />
      <Conn x1={420} y1={226} x2={340} y2={272} color="#10b981" delay={0.95} vert />

      <Node x={320} y={285} w={140} label="MLflow"  sub="experiment tracking" color="#10b981" delay={1.0} />

      {/* Pulsing ring on MLflow */}
      <motion.circle cx={320} cy={285} r={32} fill="none" stroke="#10b981" strokeWidth={1}
        animate={{ r: [32, 42, 32], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }} />

    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   PHASE 3 — MLOps Deployment Pipeline
═══════════════════════════════════════════════════════════════════ */
export function MLOpsDeployDiagram() {
  return (
    <svg viewBox="0 0 560 340" className="w-full h-full" style={{ fontFamily: "monospace" }}>
      <BgGrid uid="d3" />

      <motion.text x={280} y={24} textAnchor="middle" fontSize={9} fill="rgba(45,212,191,0.5)"
        fontFamily="monospace" fontWeight="700" letterSpacing="3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        CI/CD · KUBERNETES · OBSERVABILITY
      </motion.text>

      {/* CI/CD Row y=80 */}
      <Node x={75}  y={80} w={118} label="GitHub"   sub="push / PR"     color="#94a3b8" delay={0.1} />
      <Node x={205} y={80} w={118} label="Actions"  sub="build & test"  color="#0ea5e9" delay={0.2} />
      <Node x={340} y={80} w={118} label="Registry" sub="ECR / GHCR"    color="#818cf8" delay={0.3} />

      <Conn x1={135} y1={80} x2={146} y2={80} color="#0ea5e9" delay={0.4} />
      <Conn x1={265} y1={80} x2={281} y2={80} color="#818cf8" delay={0.55} />

      {/* K8s cluster box */}
      <motion.rect x={148} y={118} width={300} height={100} rx={14}
        fill="rgba(45,212,191,0.05)" stroke="#2dd4bf" strokeWidth={1} strokeDasharray="6 3"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} />
      <motion.text x={298} y={136} textAnchor="middle" fontSize={8.5} fill="#2dd4bf"
        fontFamily="monospace" fontWeight="700" opacity={0.7}
        initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 0.7 }}>
        ⎈  Kubernetes Cluster
      </motion.text>

      {/* Pods inside cluster */}
      <Node x={210} y={183} w={100} h={36} label="API Pod ×3" sub="FastAPI"  color="#2dd4bf" delay={0.8} />
      <Node x={360} y={183} w={100} h={36} label="ML Pod ×2"  sub="inference" color="#818cf8" delay={0.85} />

      {/* Registry → Cluster */}
      <Conn x1={340} y1={100} x2={298} y2={118} color="#2dd4bf" delay={0.7} vert />

      {/* Bottom observability row y=278 */}
      <Node x={150} y={278} w={120} label="Prometheus" sub="metrics scrape" color="#f59e0b" delay={1.0} />
      <Node x={300} y={278} w={110} label="Grafana"    sub="dashboards"     color="#f97316" delay={1.05} />
      <Node x={440} y={278} w={110} label="PagerDuty"  sub="alerting"       color="#ef4444" delay={1.1} />

      <Conn x1={211} y1={278} x2={244} y2={278} color="#f97316" delay={1.2} />
      <Conn x1={356} y1={278} x2={384} y2={278} color="#ef4444" delay={1.35} />

      {/* Cluster → Prometheus */}
      <Conn x1={210} y1={202} x2={150} y2={258} color="#f59e0b" delay={1.0} vert />

      {/* Pulsing alert on PagerDuty */}
      <motion.circle cx={440} cy={278} r={28} fill="none" stroke="#ef4444" strokeWidth={1}
        animate={{ r: [28, 38, 28], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }} />

    </svg>
  );
}
