"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Activity, Server, Radio, Cpu, ChevronRight, Terminal,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   BLUEPRINT TAGS
───────────────────────────────────────────────────────────── */

const BLUEPRINT_TAGS = [
  "Distributed Data Systems",
  "Real-Time Analytics",
  "ML Infrastructure",
  "Cloud-Native Deployment",
];

/* ─────────────────────────────────────────────────────────────
   STREAMING PIPELINE DIAGRAM
   Layout (SVG viewBox 0 0 900 380):
   
   Layer labels on left (x=0→90)
   
   INGEST  (y≈75):  [Producer] ──► [Kafka Cluster]
   PROCESS (y≈175): [Schema Reg] ◄─ [Kafka] ──► [Spark Streaming] ──► [DQ Pipeline]
   STORE   (y≈275): [MongoDB] ◄── [Spark]            [Redis Cache] ◄── [Spark]
   SERVE   (y≈175, right): [REST API] ──► [Dashboard] ──► [Grafana]
───────────────────────────────────────────────────────────── */

function StreamingDiagram() {
  const [hov, setHov] = useState<string | null>(null);

  // Colour tokens
  const C = {
    kafka:  "#f59e0b",
    spark:  "#f97316",
    mongo:  "#10b981",
    dash:   "#8b5cf6",
    schema: "#0ea5e9",
    dq:     "#ec4899",
    redis:  "#ef4444",
    api:    "#06b6d4",
    prod:   "#64748b",
    layer:  "rgba(14,165,233,0.06)",
    border: "rgba(203,213,225,0.8)",
  };

  const H = (id: string) => hov === id;

  // Shared node renderer
  const Node = ({
    id, x, y, w = 104, h = 52, color, icon, label, sub,
  }: {
    id: string; x: number; y: number; w?: number; h?: number;
    color: string; icon: string; label: string; sub: string;
  }) => (
    <g
      transform={`translate(${x - w / 2},${y - h / 2})`}
      onMouseEnter={() => setHov(id)}
      onMouseLeave={() => setHov(null)}
      style={{ cursor: "default" }}
    >
      {/* Glow on hover */}
      {H(id) && (
        <rect
          x={-6} y={-6} width={w + 12} height={h + 12}
          rx={14} fill={color} opacity={0.12}
          style={{ filter: "blur(8px)" }}
        />
      )}
      {/* Card */}
      <rect
        x={0} y={0} width={w} height={h} rx={10}
        fill={H(id) ? `${color}12` : "white"}
        stroke={H(id) ? color : "rgba(203,213,225,0.9)"}
        strokeWidth={H(id) ? 1.5 : 1}
        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }}
      />
      {/* Top colour bar */}
      <rect x={0} y={0} width={w} height={3} rx={2} fill={color} opacity={0.7} />
      {/* Icon circle */}
      <circle cx={22} cy={h / 2} r={14} fill={`${color}15`} stroke={`${color}30`} strokeWidth={1} />
      <text x={22} y={h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={12}>{icon}</text>
      {/* Label */}
      <text x={36} y={h / 2 - 7} fontSize={9.5} fontWeight="700" fill="#0f172a" fontFamily="system-ui">{label}</text>
      <text x={36} y={h / 2 + 7} fontSize={7.5} fill={color} fontWeight="600" fontFamily="system-ui">{sub}</text>
      {/* Pulse dot */}
      <circle cx={w - 8} cy={8} r={3} fill={color} opacity={0.7}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="r" values="2.5;3.5;2.5" dur="1.8s" repeatCount="indefinite" />
      </circle>
    </g>
  );

  // Arrow with label
  const Arrow = ({
    d, color, label, labelX, labelY, animated = true, dashed = false,
  }: {
    d: string; color: string; label?: string; labelX?: number; labelY?: number;
    animated?: boolean; dashed?: boolean;
  }) => (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? "5 3" : undefined}
        opacity={0.25} markerEnd={`url(#arr-${color.replace("#", "")})`} />
      {animated && (
        <path d={d} fill="none" stroke={color} strokeWidth={2}
          strokeDasharray="8 6" opacity={0.85}
          markerEnd={`url(#arr-${color.replace("#", "")})`}>
          <animate attributeName="stroke-dashoffset" values="28;0" dur="1.2s" repeatCount="indefinite" />
        </path>
      )}
      {!animated && dashed && (
        <path d={d} fill="none" stroke={color} strokeWidth={1.5}
          strokeDasharray="5 3" opacity={0.6}
          markerEnd={`url(#arr-${color.replace("#", "")})`} />
      )}
      {label && labelX !== undefined && labelY !== undefined && (
        <text x={labelX} y={labelY} fontSize={7} fill={color} fontWeight="600"
          textAnchor="middle" fontFamily="monospace" opacity={0.85}
          style={{ backgroundColor: "white" }}>
          {label}
        </text>
      )}
    </g>
  );

  const colors = [C.kafka, C.spark, C.mongo, C.dash, C.schema, C.dq, C.redis, C.api, C.prod];

  return (
    <svg viewBox="0 0 900 370" width="100%" height="100%"
      style={{ overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        {colors.map(c => (
          <marker key={c} id={`arr-${c.replace("#", "")}`}
            markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill={c} opacity={0.85} />
          </marker>
        ))}
        <marker id="arr-dashed" markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
          <polygon points="0 0, 8 3.5, 0 7" fill="#94a3b8" opacity={0.6} />
        </marker>
      </defs>

      {/* ── Swim lane backgrounds ── */}
      {/* INGEST */}
      <rect x={80} y={20} width={820} height={80} rx={10}
        fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.15)" strokeWidth={1} strokeDasharray="4 3" />
      <text x={90} y={40} fontSize={7.5} fontWeight="800" fill="#f59e0b" opacity={0.7}
        letterSpacing="2" fontFamily="monospace">INGEST</text>

      {/* PROCESS */}
      <rect x={80} y={115} width={820} height={100} rx={10}
        fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.15)" strokeWidth={1} strokeDasharray="4 3" />
      <text x={90} y={133} fontSize={7.5} fontWeight="800" fill="#f97316" opacity={0.7}
        letterSpacing="2" fontFamily="monospace">PROCESS</text>

      {/* STORE */}
      <rect x={80} y={230} width={510} height={120} rx={10}
        fill="rgba(16,185,129,0.04)" stroke="rgba(16,185,129,0.15)" strokeWidth={1} strokeDasharray="4 3" />
      <text x={90} y={248} fontSize={7.5} fontWeight="800" fill="#10b981" opacity={0.7}
        letterSpacing="2" fontFamily="monospace">STORE</text>

      {/* SERVE */}
      <rect x={610} y={230} width={290} height={120} rx={10}
        fill="rgba(139,92,246,0.04)" stroke="rgba(139,92,246,0.15)" strokeWidth={1} strokeDasharray="4 3" />
      <text x={620} y={248} fontSize={7.5} fontWeight="800" fill="#8b5cf6" opacity={0.7}
        letterSpacing="2" fontFamily="monospace">SERVE</text>

      {/* ── Edges ── */}

      {/* Producer → Kafka */}
      <Arrow d="M 238 62 L 308 62" color={C.prod} label="events" labelX={273} labelY={55} />

      {/* Kafka → Spark */}
      <Arrow d="M 480 62 L 480 140 L 520 165" color={C.kafka} label="Avro" labelX={500} labelY={108} />

      {/* Kafka → Schema Reg (dashed) */}
      <Arrow d="M 395 75 C 395 100 260 118 260 135" color={C.schema} label="validate" labelX={310} labelY={112} animated={false} dashed />

      {/* Spark → DQ Pipeline */}
      <Arrow d="M 640 165 L 695 165" color={C.spark} label="stream" labelX={667} labelY={157} />

      {/* Spark → MongoDB */}
      <Arrow d="M 545 193 C 545 220 320 242 320 255" color={C.spark} label="write" labelX={395} labelY={228} />

      {/* Spark → Redis */}
      <Arrow d="M 570 193 C 570 225 445 248 445 258" color={C.redis} label="cache" labelX={520} labelY={230} animated={false} dashed />

      {/* MongoDB → REST API */}
      <Arrow d="M 380 282 C 480 282 570 282 638 282" color={C.mongo} label="query" labelX={520} labelY={274} animated={false} dashed />

      {/* REST API → Dashboard */}
      <Arrow d="M 730 282 L 798 282" color={C.api} label="JSON" labelX={764} labelY={274} />

      {/* ── Nodes ── */}

      {/* INGEST */}
      <Node id="producer" x={170} y={62} w={110} h={48}
        color={C.prod} icon="📡" label="Producers" sub="Event Sources" />
      <Node id="kafka" x={395} y={62} w={160} h={52}
        color={C.kafka} icon="⚡" label="Kafka Cluster" sub="Event Streaming / 64 partitions" />

      {/* PROCESS */}
      <Node id="schema" x={260} y={165} w={110} h={48}
        color={C.schema} icon="🛡" label="Schema Reg." sub="Avro Validation" />
      <Node id="spark" x={580} y={165} w={160} h={52}
        color={C.spark} icon="🔥" label="Spark Streaming" sub="Micro-batch · 42ms latency" />
      <Node id="dq" x={760} y={165} w={110} h={48}
        color={C.dq} icon="✅" label="DQ Pipeline" sub="Data Quality" />

      {/* STORE */}
      <Node id="mongo" x={320} y={282} w={130} h={52}
        color={C.mongo} icon="🍃" label="MongoDB" sub="Primary Store · Sharded" />
      <Node id="redis" x={460} y={298} w={110} h={44}
        color={C.redis} icon="🔴" label="Redis Cache" sub="Hot-path · TTL 5m" />

      {/* SERVE */}
      <Node id="api" x={680} y={282} w={100} h={48}
        color={C.api} icon="🔌" label="REST API" sub="FastAPI" />
      <Node id="dash" x={810} y={282} w={100} h={48}
        color={C.dash} icon="📊" label="Dashboard" sub="Real-time" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   DEPLOYMENT STACK DIAGRAM
   Stages (left→right):
   SOURCE → CI/CD → BUILD → REGISTRY → ORCHESTRATE → OBSERVE
───────────────────────────────────────────────────────────── */

function DeploymentDiagram() {
  const [hov, setHov] = useState<string | null>(null);

  const C = {
    gh:    "#6366f1",
    test:  "#f59e0b",
    build: "#0ea5e9",
    reg:   "#f97316",
    k8s:   "#3b82f6",
    api:   "#10b981",
    prom:  "#f59e0b",
    graf:  "#f97316",
    alert: "#ef4444",
  };

  const H = (id: string) => hov === id;

  const Node = ({
    id, x, y, w = 100, h = 50, color, icon, label, sub,
  }: {
    id: string; x: number; y: number; w?: number; h?: number;
    color: string; icon: string; label: string; sub: string;
  }) => (
    <g
      transform={`translate(${x - w / 2},${y - h / 2})`}
      onMouseEnter={() => setHov(id)}
      onMouseLeave={() => setHov(null)}
      style={{ cursor: "default" }}
    >
      {H(id) && (
        <rect x={-6} y={-6} width={w + 12} height={h + 12} rx={14}
          fill={color} opacity={0.12} style={{ filter: "blur(8px)" }} />
      )}
      <rect x={0} y={0} width={w} height={h} rx={10}
        fill={H(id) ? `${color}12` : "white"}
        stroke={H(id) ? color : "rgba(203,213,225,0.9)"}
        strokeWidth={H(id) ? 1.5 : 1}
        style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.06))" }} />
      <rect x={0} y={0} width={w} height={3} rx={2} fill={color} opacity={0.7} />
      <circle cx={22} cy={h / 2} r={13} fill={`${color}15`} stroke={`${color}30`} strokeWidth={1} />
      <text x={22} y={h / 2 + 1} textAnchor="middle" dominantBaseline="middle" fontSize={11}>{icon}</text>
      <text x={36} y={h / 2 - 7} fontSize={9} fontWeight="700" fill="#0f172a" fontFamily="system-ui">{label}</text>
      <text x={36} y={h / 2 + 7} fontSize={7} fill={color} fontWeight="600" fontFamily="system-ui">{sub}</text>
      <circle cx={w - 8} cy={8} r={3} fill={color} opacity={0.7}>
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
      </circle>
    </g>
  );

  const Arrow = ({
    d, color, label, labelX, labelY, animated = true, dashed = false,
  }: {
    d: string; color: string; label?: string; labelX?: number; labelY?: number;
    animated?: boolean; dashed?: boolean;
  }) => (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth={1.5}
        strokeDasharray={dashed ? "5 3" : undefined}
        opacity={0.25} markerEnd={`url(#darr-${color.replace("#", "")})`} />
      {animated && (
        <path d={d} fill="none" stroke={color} strokeWidth={2}
          strokeDasharray="8 6" opacity={0.85}
          markerEnd={`url(#darr-${color.replace("#", "")})`}>
          <animate attributeName="stroke-dashoffset" values="28;0" dur="1.4s" repeatCount="indefinite" />
        </path>
      )}
      {!animated && dashed && (
        <path d={d} fill="none" stroke={color} strokeWidth={1.5}
          strokeDasharray="5 3" opacity={0.6}
          markerEnd={`url(#darr-${color.replace("#", "")})`} />
      )}
      {label && labelX !== undefined && labelY !== undefined && (
        <text x={labelX} y={labelY} fontSize={7} fill={color} fontWeight="600"
          textAnchor="middle" fontFamily="monospace" opacity={0.85}>{label}</text>
      )}
    </g>
  );

  const allColors = Object.values(C);

  return (
    <svg viewBox="0 0 900 380" width="100%" height="100%"
      style={{ overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg">
      <defs>
        {allColors.map(c => (
          <marker key={c} id={`darr-${c.replace("#", "")}`}
            markerWidth="8" markerHeight="8" refX="7" refY="3.5" orient="auto">
            <polygon points="0 0, 8 3.5, 0 7" fill={c} opacity={0.85} />
          </marker>
        ))}
      </defs>

      {/* ── Stage lane backgrounds ── */}
      {/* SOURCE */}
      <rect x={10} y={20} width={130} height={340} rx={10}
        fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.15)"
        strokeWidth={1} strokeDasharray="4 3" />
      <text x={30} y={36} fontSize={7} fontWeight="800" fill="#6366f1" opacity={0.7}
        letterSpacing="1.5" fontFamily="monospace">SOURCE</text>

      {/* CI / CD */}
      <rect x={155} y={20} width={140} height={340} rx={10}
        fill="rgba(245,158,11,0.04)" stroke="rgba(245,158,11,0.15)"
        strokeWidth={1} strokeDasharray="4 3" />
      <text x={172} y={36} fontSize={7} fontWeight="800" fill="#f59e0b" opacity={0.7}
        letterSpacing="1.5" fontFamily="monospace">CI / CD</text>

      {/* BUILD */}
      <rect x={310} y={20} width={140} height={340} rx={10}
        fill="rgba(14,165,233,0.04)" stroke="rgba(14,165,233,0.15)"
        strokeWidth={1} strokeDasharray="4 3" />
      <text x={328} y={36} fontSize={7} fontWeight="800" fill="#0ea5e9" opacity={0.7}
        letterSpacing="1.5" fontFamily="monospace">BUILD</text>

      {/* REGISTRY */}
      <rect x={465} y={20} width={130} height={340} rx={10}
        fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.15)"
        strokeWidth={1} strokeDasharray="4 3" />
      <text x={480} y={36} fontSize={7} fontWeight="800" fill="#f97316" opacity={0.7}
        letterSpacing="1.5" fontFamily="monospace">REGISTRY</text>

      {/* ORCHESTRATE */}
      <rect x={608} y={20} width={145} height={220} rx={10}
        fill="rgba(59,130,246,0.04)" stroke="rgba(59,130,246,0.15)"
        strokeWidth={1} strokeDasharray="4 3" />
      <text x={622} y={36} fontSize={7} fontWeight="800" fill="#3b82f6" opacity={0.7}
        letterSpacing="1.5" fontFamily="monospace">ORCHESTRATE</text>

      {/* OBSERVE */}
      <rect x={765} y={20} width={125} height={340} rx={10}
        fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.15)"
        strokeWidth={1} strokeDasharray="4 3" />
      <text x={777} y={36} fontSize={7} fontWeight="800" fill="#f97316" opacity={0.7}
        letterSpacing="1.5" fontFamily="monospace">OBSERVE</text>

      {/* ── Edges ── */}

      {/* GitHub → Test */}
      <Arrow d="M 142 105 L 158 105" color={C.gh} label="push" labelX={150} labelY={97} />

      {/* Test → Build */}
      <Arrow d="M 142 180 L 158 180" color={C.test} label="pass" labelX={150} labelY={172} />

      {/* Test → Build (Docker) */}
      <Arrow d="M 293 105 L 313 125" color={C.test} label="CI ✓" labelX={304} labelY={111} />
      <Arrow d="M 293 180 L 313 155" color={C.build} label="build" labelX={304} labelY={172} />

      {/* Build → Registry */}
      <Arrow d="M 448 140 L 468 190" color={C.build} label="push" labelX={460} labelY={163} />

      {/* Registry → K8s */}
      <Arrow d="M 593 190 L 612 130" color={C.reg} label="pull" labelX={600} labelY={156} />

      {/* Registry → FastAPI */}
      <Arrow d="M 593 200 L 612 210" color={C.reg} label="deploy" labelX={600} labelY={200} />

      {/* K8s → Prometheus (dashed) */}
      <Arrow d="M 752 115 L 768 160" color={C.prom} label="scrape" labelX={758} labelY={135} animated={false} dashed />

      {/* FastAPI → Prometheus (dashed) */}
      <Arrow d="M 752 215 L 780 220" color={C.api} label="metrics" labelX={764} labelY={211} animated={false} dashed />

      {/* Prometheus → Grafana */}
      <Arrow d="M 828 208 L 828 250" color={C.graf} label="viz" labelX={840} labelY={230} animated={false} dashed />

      {/* Prometheus → Alertmanager */}
      <Arrow d="M 812 208 L 812 305" color={C.alert} label="alert" labelX={800} labelY={255} animated={false} dashed />

      {/* ── Nodes ── */}

      {/* SOURCE */}
      <Node id="github" x={75} y={105} w={110} h={50}
        color={C.gh} icon="🐙" label="GitHub" sub="main branch" />
      <Node id="gitrepo" x={75} y={180} w={110} h={50}
        color={C.gh} icon="📁" label="Git Repo" sub="Monorepo" />

      {/* CI / CD */}
      <Node id="test" x={224} y={105} w={118} h={50}
        color={C.test} icon="🧪" label="Test Suite" sub="pytest · coverage" />
      <Node id="lint" x={224} y={180} w={118} h={50}
        color={C.build} icon="🔍" label="Lint & Scan" sub="ruff · trivy" />

      {/* BUILD */}
      <Node id="actions" x={378} y={105} w={118} h={50}
        color={C.gh} icon="⚙️" label="GH Actions" sub="workflow.yml" />
      <Node id="docker" x={378} y={180} w={118} h={50}
        color={C.build} icon="🐳" label="Docker Build" sub="multi-stage" />

      {/* REGISTRY */}
      <Node id="ecr" x={528} y={190} w={112} h={52}
        color={C.reg} icon="📦" label="ECR / GHCR" sub="Image Registry" />

      {/* ORCHESTRATE */}
      <Node id="k8s" x={678} y={115} w={120} h={52}
        color={C.k8s} icon="☸️" label="Kubernetes" sub="3 replicas · HPA" />
      <Node id="fastapi" x={678} y={210} w={120} h={52}
        color={C.api} icon="⚡" label="FastAPI" sub="Model Serving" />

      {/* MODEL STORE — outside orchestrate lane */}
      <rect x={608} y={255} width={145} height={100} rx={10}
        fill="rgba(16,185,129,0.04)" stroke="rgba(16,185,129,0.15)"
        strokeWidth={1} strokeDasharray="4 3" />
      <text x={622} y={270} fontSize={7} fontWeight="800" fill="#10b981" opacity={0.7}
        letterSpacing="1.5" fontFamily="monospace">ML STORE</text>
      <Node id="mlflow" x={678} y={310} w={120} h={52}
        color={C.api} icon="🧠" label="MLflow" sub="Model Registry" />

      {/* OBSERVE */}
      <Node id="prom" x={828} y={160} w={105} h={48}
        color={C.prom} icon="📈" label="Prometheus" sub="metrics scrape" />
      <Node id="graf" x={828} y={255} w={105} h={48}
        color={C.graf} icon="📊" label="Grafana" sub="dashboards" />
      <Node id="alert" x={828} y={330} w={105} h={48}
        color={C.alert} icon="🚨" label="Alertmanager" sub="PagerDuty" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   TABS CONFIG
───────────────────────────────────────────────────────────── */

const TABS = [
  {
    id: "streaming",
    label: "Streaming Pipeline",
    sublabel: "Kafka → Spark → MongoDB → Dashboard",
    icon: Activity,
    terminalIcon: Radio,
    metrics: [
      { label: "Throughput", value: "1.2M", unit: "evt/s" },
      { label: "Avg Latency", value: "42", unit: "ms" },
      { label: "Uptime", value: "99.9", unit: "%" },
    ],
    comment: "// 1.2M events/sec  ·  42ms avg latency  ·  99.9% uptime",
    Diagram: StreamingDiagram,
  },
  {
    id: "deployment",
    label: "Deployment Stack",
    sublabel: "GH Actions → Docker → K8s → Observability",
    icon: Server,
    terminalIcon: Cpu,
    metrics: [
      { label: "Downtime", value: "Zero", unit: "rollout" },
      { label: "Replicas", value: "3+", unit: "pods" },
      { label: "RTO", value: "<30", unit: "sec" },
    ],
    comment: "// Zero-downtime rollout  ·  3+ replicas  ·  <30s RTO",
    Diagram: DeploymentDiagram,
  },
] as const;

type Tab = typeof TABS[number];

/* ─────────────────────────────────────────────────────────────
   ARCH CARD — Blueprint style, diagram-first
───────────────────────────────────────────────────────────── */

function ArchCard({ tab }: { tab: Tab }) {
  const TermIcon = tab.terminalIcon;
  const DiagramComp = tab.Diagram;

  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(28px)",
        border: "1px solid rgba(203,213,225,0.8)",
        boxShadow: "0 12px 40px -12px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: "linear-gradient(to right,transparent,#0ea5e9,#6366f1,transparent)" }}
      />

      {/* Terminal header bar */}
      <div
        className="flex items-center gap-3 px-5 py-3.5 border-b"
        style={{
          borderColor: "rgba(203,213,225,0.7)",
          background: "rgba(248,250,252,0.97)",
        }}
      >
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400/70 hover:bg-red-400 transition-colors cursor-default" />
          <span className="w-3 h-3 rounded-full bg-amber-400/70 hover:bg-amber-400 transition-colors cursor-default" />
          <span className="w-3 h-3 rounded-full bg-emerald-400/70 hover:bg-emerald-400 transition-colors cursor-default" />
        </div>
        <div className="flex items-center gap-2 flex-1 ml-1 min-w-0">
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(14,165,233,0.1)" }}
          >
            <TermIcon size={11} style={{ color: "#0ea5e9" }} strokeWidth={2} />
          </div>
          <span className="text-[11px] font-bold text-slate-800 truncate">{tab.label}</span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">—</span>
          <span className="text-[10px] text-slate-500 font-mono hidden sm:inline truncate">{tab.sublabel}</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: "#10b981" }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span className="text-[10px] font-bold font-mono text-emerald-600">LIVE</span>
        </div>
      </div>

      {/* ── Diagram — full width, hero ── */}
      <div className="p-5 md:p-6">
        <div
          className="rounded-xl overflow-hidden border w-full"
          style={{
            background: "rgba(248,250,252,0.7)",
            borderColor: "rgba(203,213,225,0.7)",
          }}
        >
          {/* Mini toolbar */}
          <div
            className="flex items-center justify-between px-3.5 py-2 border-b"
            style={{ borderColor: "rgba(203,213,225,0.6)" }}
          >
            <div className="flex items-center gap-1.5">
              <Terminal size={10} className="text-slate-400" />
              <span className="text-[9px] font-mono text-slate-400">architecture.blueprint</span>
            </div>
            <div className="flex gap-1">
              {["#0ea5e9", "#10b981", "#6366f1"].map((c, i) => (
                <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: c, opacity: 0.6 }} />
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div
            className="relative px-4 py-5"
            style={{
              backgroundImage: "radial-gradient(circle,rgba(148,163,184,0.1) 1px,transparent 1px)",
              backgroundSize: "22px 22px",
              minHeight: 400,
            }}
          >
            <DiagramComp />
          </div>
        </div>

        {/* ── Metrics row ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-8 flex-wrap">
            {tab.metrics.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="flex flex-col gap-0.5"
              >
                <span className="text-xl font-bold font-mono text-slate-900 leading-none">
                  {m.value}
                  <span className="text-[10px] ml-1 text-slate-400 font-sans font-medium">{m.unit}</span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-slate-500 font-semibold">{m.label}</span>
              </motion.div>
            ))}
          </div>

          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2 border font-mono"
            style={{
              background: "rgba(248,250,252,0.8)",
              borderColor: "rgba(14,165,233,0.2)",
            }}
          >
            <ChevronRight size={10} style={{ color: "#0ea5e9" }} />
            <span className="text-[9.5px] text-slate-500">{tab.comment}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */

export default function SystemArchitecture() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="architecture"
      className="relative py-28 overflow-hidden bg-slate-50 border-y border-slate-100"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#cbd5e1 1px,transparent 1px),linear-gradient(to bottom,#cbd5e1 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Subtle glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(14,165,233,0.1) 0%,transparent 65%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-32 -right-32 w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 65%)" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            className="text-[11px] font-bold tracking-[0.3em] text-sky-600 uppercase mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            System Design
          </motion.p>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-slate-900">Scalable</span>{" "}
            <span className="relative inline-block">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#0ea5e9 0%,#6366f1 60%,#0f172a 100%)",
                }}
              >
                Architecture
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{ background: "linear-gradient(to right,#0ea5e9,#6366f1)" }}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </span>
          </h2>

          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed mb-7">
            Blueprint-level system designs for data platforms, ML pipelines,
            and cloud-native deployments.
          </p>

          {/* 4 subtle blueprint tags */}
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {BLUEPRINT_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-[10.5px] font-semibold tracking-wide text-slate-600 border border-slate-200 bg-white/70"
                style={{ backdropFilter: "blur(8px)" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="flex p-1 rounded-xl gap-1 border"
            style={{
              background: "rgba(241,245,249,0.85)",
              borderColor: "rgba(203,213,225,0.8)",
              backdropFilter: "blur(12px)",
            }}
          >
            {TABS.map((tab, i) => {
              const isActive = activeIdx === i;
              const TabIcon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveIdx(i)}
                  className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-200 outline-none"
                  style={{ color: isActive ? "#0f172a" : "#64748b" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="tab-bg"
                      className="absolute inset-0 rounded-lg bg-white shadow-sm"
                      style={{ border: "1px solid rgba(203,213,225,0.8)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <TabIcon size={14} style={{ color: isActive ? "#0ea5e9" : "#475569", position: "relative" }} />
                  <span className="relative whitespace-nowrap">{tab.label}</span>
                  {isActive && (
                    <motion.span
                      className="relative w-1.5 h-1.5 rounded-full"
                      style={{ background: "#0ea5e9" }}
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Active architecture card */}
        <AnimatePresence mode="wait">
          <ArchCard key={TABS[activeIdx].id} tab={TABS[activeIdx]} />
        </AnimatePresence>

        {/* Blueprint footer tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {[
            "Real-Time Processing",
            "Fault Tolerant",
            "Cloud Native",
            "Observability",
            "Horizontal Scaling",
            "Event Driven",
          ].map((tag) => (
            <span key={tag} className="text-[10px] font-mono text-slate-400">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
