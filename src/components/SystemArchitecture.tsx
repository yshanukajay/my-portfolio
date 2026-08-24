"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal } from "lucide-react";
import MagneticParticlesBg from "./MagneticParticlesBg";

// --- Node Specifications Database ---
const nodeSpecs: Record<string, { desc: string; spec: string; logs: string[] }> = {
  // Streaming Architecture
  "Kafka": {
    desc: "Distributed event store and streaming ingestion broker. Set up for partition-based parallel consumption.",
    spec: "Partitions: 32 · Replication: 3 · Retention: 7 days",
    logs: [
      "[+0.00s] Ingesting clickstream stream at 1.2M events/sec",
      "[+0.05s] Partition rebalance complete - all 32 partitions active",
      "[+0.12s] Sync replica state: ISR count = 3 (healthy)"
    ]
  },
  "Spark": {
    desc: "Apache Spark Streaming compute engine executing stateful sliding-window data aggregations.",
    spec: "Executors: 4 · Memory: 8GB · Batch Window: 5s",
    logs: [
      "[+0.00s] Micro-batch execution started (Batch ID: 49021)",
      "[+0.04s] Processing rate: 24,000 events/ms | Delay: 42ms",
      "[+0.10s] Checkpoint written successfully to S3 storage bucket"
    ]
  },
  "MongoDB": {
    desc: "NoSQL document storage storing aggregated metrics. Utilizes indexes on timestamps and dimensions.",
    spec: "ReplicaSet: 3 nodes · CacheSize: 16GB · Upsert Rate: 10k/sec",
    logs: [
      "[+0.00s] Bulk write executed: 2,490 upserts in 14ms",
      "[+0.03s] Query cache hit ratio: 94.8%",
      "[+0.08s] Connected clients: 88 active reader sessions"
    ]
  },
  "Dashboard": {
    desc: "Real-time client monitoring dashboard streaming metrics using persistent WebSockets.",
    spec: "WebSocket connections: 1,420 · Polling: 500ms intervals",
    logs: [
      "[+0.00s] WebSocket broker server listening on port 8080",
      "[+0.03s] Client broadcast: 1,420 active screens refreshed",
      "[+0.09s] Heartbeat ping sent to clients (0 failed handshakes)"
    ]
  },
  "Schema Registry": {
    desc: "Centralized schema management using Apache Avro serialize validations across producers.",
    spec: "Serializer: Apache Avro v2 · Port: 8081 · Formats: JSON, Avro",
    logs: [
      "[+0.00s] Validating clickstream-events payload against schema version 4",
      "[+0.02s] Schema validation: PASSED",
      "[+0.06s] Synced schema versions from local registry cache"
    ]
  },
  "DQ Checks": {
    desc: "Validation engine running data quality constraints and outlier filters before storage writing.",
    spec: "Check Rules: 8 constraints · Threshold: > 0.05% error",
    logs: [
      "[+0.00s] Executed schema validations on Spark output batch",
      "[+0.04s] Verification success: 0 records dropped (100% validity)",
      "[+0.09s] Integrity monitor: green status"
    ]
  },

  // Deployment Architecture
  "GitHub Actions": {
    desc: "CI/CD pipeline triggering automated testing and image building workflows on push to main.",
    spec: "Runner: Ubuntu-Latest · Build SLA: < 2.5 minutes",
    logs: [
      "[+0.00s] Triggered build workflow from branch 'main'",
      "[+0.35s] Completed pytest suite: 48 passed, 0 failures",
      "[+1.12s] Package compilation completed successfully"
    ]
  },
  "Docker": {
    desc: "Isolated containerization environment hosting API microservices for consistent deployment.",
    spec: "Base: Python-3.11-Slim · Layer Size: 342MB · Registry: ECR",
    logs: [
      "[+0.00s] Assembling application layers...",
      "[+0.25s] Image built successfully (SHA-256: 82a173bd)",
      "[+0.55s] Container starting entrypoint: server.py"
    ]
  },
  "Registry": {
    desc: "Amazon ECR container repository hosting build tags and running automated CVE vulnerability security scans.",
    spec: "Target: AWS ECR · Image Tags: Semantic Version + Commit SHA",
    logs: [
      "[+0.00s] Authenticated worker with ECR registry credentials",
      "[+0.15s] Pushed tag: main-82a173 (342 MB)",
      "[+0.80s] Automated vulnerability check: Clean (0 CVEs)"
    ]
  },
  "K8s Cluster": {
    desc: "Container orchestration cluster managing replica pods with HPA auto-scaling logic.",
    spec: "Min Replicas: 3 · Max: 15 · CPU Target: 75% target",
    logs: [
      "[+0.00s] Rolling update triggered for service 'model-serving'",
      "[+0.40s] Deploying replica pods: 3/3 successfully scheduled",
      "[+0.92s] Service endpoints matched to new container instances"
    ]
  },
  "FastAPI": {
    desc: "High-performance serving microservice exposing machine learning inference endpoints.",
    spec: "Workers: 4 Uvicorn processes · Latency target: < 100ms",
    logs: [
      "[+0.00s] Server process started on local port 8000",
      "[+0.20s] Loaded machine learning model 'TomatoClassifier:v2'",
      "[+0.52s] API serving route GET /predict: HTTP 200 OK (88ms)"
    ]
  },
  "Prometheus": {
    desc: "Scrape-based monitoring system scraping logs, request status counts, and compute loads.",
    spec: "Scrape Frequency: 15s · Target: FastAPI Prometheus export",
    logs: [
      "[+0.00s] Metric scraper active on FastAPI port 8000/metrics",
      "[+0.05s] Successfully processed 214 metrics variables",
      "[+0.12s] Memory status: 512MB RAM consumed (within safe bounds)"
    ]
  },
  "Grafana": {
    desc: "Visualization system showcasing telemetry charts, service performance charts, and alert status.",
    spec: "Refresh Rate: 10s · Data Source: Prometheus Local",
    logs: [
      "[+0.00s] Connected to data source 'Prometheus'",
      "[+0.08s] Admin viewed dashboard 'Service Telemetry Metrics'",
      "[+0.15s] Alert evaluation: Green (0 thresholds breached)"
    ]
  }
};

// --- Rotating Logs database for real-time simulation ---
const rotatingLogs: Record<string, string[]> = {
  "Kafka": [
    "Partition [12] committed offset 5928301 (throughput: 1.22M/s)",
    "Broker [2] sync state: OK | Under-replicated partitions: 0",
    "Incoming connection from SparkStreamingClient verified",
    "Consumer lag: 0 events (fully caught up)",
    "Socket server: read throughput 142.1 MB/s | write throughput 0.1 MB/s"
  ],
  "Spark": [
    "Micro-batch 49022 completed in 39ms",
    "JVM heap usage: 4.2GB / 8.0GB (GC overhead: 0.8%)",
    "Serialized 12,482 partitions for shuffle distribution",
    "Executor state: 4 active cores | 0 blocked threads",
    "Processed 2.45M entries in current micro-batch window"
  ],
  "MongoDB": [
    "Connection pool: 120/150 active connections",
    "Query planner: index scan [timestamp_1_dim_1] selected for filter",
    "Wrote journal entry in 1.4ms (sync flush)",
    "Primary replica heartbeat: OK | Latency: 0.8ms",
    "Upsert throughput stable at 10,240 ops/sec"
  ],
  "Dashboard": [
    "WS heartbeat: 1,420 connections alive",
    "Outgoing frame payload size: 12.4 KB (compress: true)",
    "WebSocket server memory consumption: 42 MB",
    "Broadcasted aggregations complete: latency 1.1ms",
    "New WebSocket connection accepted from IPv4 client"
  ],
  "Schema Registry": [
    "Cache hit for schema ID [4] (hash: sha-256)",
    "Registered new schema version: 'user-clicks-v5'",
    "Cleaned up 1 expired schema cache reference",
    "Schema compatibility check: BACKWARD (valid)",
    "Served schema metadata request to ProducerClient in 1.1ms"
  ],
  "DQ Checks": [
    "Null count check: 0 null values found in batch",
    "Range constraint validation: 100% of data within [-3.0, 3.0] limits",
    "Great Expectations suite executed: 8 validations, 0 failed",
    "Metrics logger: push data completeness index = 1.000",
    "Outlier check complete: no anomalies detected in feature columns"
  ],
  "GitHub Actions": [
    "Runner requested: ubuntu-latest (queued for 0.4s)",
    "Running action: setup-python@v4 (cache hit)",
    "Pytest run: all 48 test suites passed in 24s",
    "Lint checks: Flake8 passed (0 warnings)",
    "SonarCloud quality gate: PASSED"
  ],
  "Docker": [
    "Layer cache hit for python:3.11-slim-bookworm",
    "Copying app directory: 12 files added",
    "Building wheels: FastAPI, Uvicorn, TensorFlow-CPU",
    "Image size verification: 342.1 MB (optimized layers)",
    "Running Docker health check: index.py status code 200"
  ],
  "Registry": [
    "Vulnerability scan: 0 critical, 0 high, 2 low CVEs found",
    "Pushed image tag: prod-v2.4.1-3829ad",
    "Cleaning up old tags: removed 1 untagged image",
    "Read throughput from ECS agent: 240 MB/s",
    "Replication to secondary region [us-west-2] completed"
  ],
  "K8s Cluster": [
    "HPA scaling: CPU at 48% (current replicas: 3)",
    "Service endpoint mapping updated: model-serving-api",
    "Pod scheduler: allocated node node-382-gp2",
    "Readiness probe succeeded for pod ml-serving-v2-xyz",
    "Kube-dns: lookup query 'model-serving' resolved in 0.5ms"
  ],
  "FastAPI": [
    "Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)",
    "GET /health: HTTP/1.1 200 OK (0.8ms)",
    "POST /v1/predict: HTTP/1.1 200 OK (82.4ms)",
    "Worker thread pool size: 4 active, 0 idle",
    "Incoming connection from ingress-controller verified"
  ],
  "Prometheus": [
    "Successfully scraped target: model-serving-api:8000/metrics",
    "Wrote TSDB block to disk in 4.2ms",
    "Alert manager check: 0 firing alerts | 0 pending",
    "Parsed 1,024 metric series in 0.8ms",
    "PromQL evaluation: rate(http_requests_total[5m]) = 142.1"
  ],
  "Grafana": [
    "Dashboard loaded: 'Cluster Telemetry Dashboard v2'",
    "Refresh interval triggered: querying Prometheus local API",
    "Rendered panel 'HTTP Latency Heatmap' in 12ms",
    "User session validated: Admin auth token verified",
    "Telemetry alert evaluation: System HEALTHY"
  ]
};

const architectures = [
  {
    title: "Streaming Data Architecture",
    subtitle: "High-throughput event pipeline",
    color: "#f59e0b",
    nodes: [
      { id: "kafka", label: "Kafka", sub: "event stream", x: 16, y: 38 },
      { id: "spark", label: "Spark", sub: "processing", x: 38, y: 38 },
      { id: "mongodb", label: "MongoDB", sub: "storage", x: 62, y: 38 },
      { id: "dashboard", label: "Dashboard", sub: "analytics", x: 84, y: 38 },
    ],
    verticals: [
      { id: "schema", label: "Schema Registry", x: 27, y: 68, color: "#f59e0b" },
      { id: "dq", label: "DQ Checks", x: 53, y: 68, color: "#10b981" },
    ],
    connections: [
      { from: "kafka", to: "spark", type: "straight" },
      { from: "spark", to: "mongodb", type: "straight" },
      { from: "mongodb", to: "dashboard", type: "straight" },
      { from: "kafka", to: "schema", type: "curve" },
      { from: "schema", to: "spark", type: "curve" },
      { from: "spark", to: "dq", type: "curve" },
      { from: "dq", to: "mongodb", type: "curve" },
    ],
    comment: "// 1.2M events/sec · 42ms avg latency",
    stats: [
      { label: "Throughput", value: "1.2M / s", sub: "Peak load scale" },
      { label: "Pipeline SLA", value: "99.99%", sub: "Service uptime" },
      { label: "Avg Latency", value: "42ms", sub: "Event execution duration" },
    ]
  },
  {
    title: "Containerized Deployment",
    subtitle: "Production serving architecture",
    color: "#0ea5e9",
    nodes: [
      { id: "github", label: "GitHub Actions", sub: "CI/CD", x: 18, y: 28 },
      { id: "docker", label: "Docker", sub: "container", x: 18, y: 56 },
      { id: "registry", label: "Registry", sub: "ECR/GHCR", x: 50, y: 42 },
      { id: "k8s", label: "K8s Cluster", sub: "orchestrate", x: 80, y: 28 },
      { id: "fastapi", label: "FastAPI", sub: "serving", x: 80, y: 56 },
    ],
    verticals: [
      { id: "prometheus", label: "Prometheus", x: 58, y: 74, color: "#f59e0b" },
      { id: "grafana", label: "Grafana", x: 80, y: 74, color: "#10b981" },
    ],
    connections: [
      { from: "github", to: "docker", type: "straight" },
      { from: "docker", to: "registry", type: "curve" },
      { from: "registry", to: "k8s", type: "curve" },
      { from: "registry", to: "fastapi", type: "curve" },
      { from: "k8s", to: "fastapi", type: "straight" },
      { from: "fastapi", to: "prometheus", type: "curve" },
      { from: "prometheus", to: "grafana", type: "straight" },
    ],
    comment: "// Zero-downtime rollout · real-time observability",
    stats: [
      { label: "Deploy SLA", value: "< 2.5m", sub: "Automated CI/CD time" },
      { label: "Auto Scaling", value: "3 - 15 Pods", sub: "Horizontal scale range" },
      { label: "Avg Latency", value: "< 100ms", sub: "Inference response target" },
    ]
  },
];

const getNodeById = (arch: typeof architectures[0], id: string) => {
  const node = arch.nodes.find(n => n.id === id);
  if (node) return node;
  return arch.verticals.find(v => v.id === id);
};

const getPath = (n1: { x: number; y: number }, n2: { x: number; y: number }, type: string) => {
  const dx = n2.x - n1.x;
  const dy = n2.y - n1.y;
  if (type === "curve") {
    return `M ${n1.x} ${n1.y} C ${n1.x + dx * 0.5} ${n1.y}, ${n2.x - dx * 0.5} ${n2.y}, ${n2.x} ${n2.y}`;
  }
  return `M ${n1.x} ${n1.y} L ${n2.x} ${n2.y}`;
};

/* ─── Telemetry Console Component ────────────────────────────── */
interface TelemetryConsoleProps {
  activeArch: typeof architectures[0];
  selectedNodeId: string | null;
  onClearSelection: () => void;
}

function TelemetryConsole({
  activeArch,
  selectedNodeId,
  onClearSelection,
}: TelemetryConsoleProps) {
  const selectedNode = selectedNodeId
    ? activeArch.nodes.find((n) => n.id === selectedNodeId) ||
    activeArch.verticals.find((v) => v.id === selectedNodeId)
    : null;

  const nodeSpec = selectedNode ? nodeSpecs[selectedNode.label] : null;

  const [prevSelectedNodeId, setPrevSelectedNodeId] = useState<string | null>(null);
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  if (selectedNodeId !== prevSelectedNodeId) {
    setPrevSelectedNodeId(selectedNodeId);
    setDisplayedLogs(nodeSpec?.logs || []);
  }

  // Sync and simulate diagnostics logs
  useEffect(() => {
    if (!selectedNode || !nodeSpec) {
      return;
    }

    const interval = setInterval(() => {
      const extraLogs = rotatingLogs[selectedNode.label] || [];
      if (extraLogs.length === 0) return;

      const randomLog = extraLogs[Math.floor(Math.random() * extraLogs.length)];
      const formattedLog = `[+${(Math.random() * 4 + 1).toFixed(2)}s] ${randomLog}`;

      setDisplayedLogs((prev) => {
        const nextLogs = [...prev, formattedLog];
        if (nextLogs.length > 10) return nextLogs.slice(nextLogs.length - 10);
        return nextLogs;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [selectedNodeId, activeArch, selectedNode, nodeSpec]);

  // Auto-scroll terminal
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [displayedLogs]);

  return (
    <div
      className="w-full h-full flex flex-col rounded-3xl border p-6 md:p-7 relative overflow-hidden transition-all duration-300"
      style={{
        background: "linear-gradient(160deg, #0d1117 0%, #0a0f1a 100%)",
        borderColor: selectedNode ? activeArch.color : `${activeArch.color}55`,
        borderWidth: "1.5px",
        boxShadow: selectedNode
          ? `0 0 0 1px ${activeArch.color}30, 0 24px 48px rgba(0,0,0,0.5), inset 0 0 40px ${activeArch.color}08`
          : `0 0 0 1px ${activeArch.color}18, 0 8px 32px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Always-visible top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent 0%, ${activeArch.color}80 30%, ${activeArch.color} 50%, ${activeArch.color}80 70%, transparent 100%)`,
        }}
      />

      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, ${activeArch.color} 1px, transparent 1px)`,
          backgroundSize: "14px 14px",
        }}
      />

      {/* Terminal Title Header */}
      <div className="flex items-center justify-between pb-4 mb-5 relative z-10" style={{ borderBottom: `1px solid ${activeArch.color}25` }}>
        <div className="flex items-center gap-3">
          {/* Mac-style window dots */}
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <div className="flex items-center gap-2 ml-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeArch.color }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeArch.color }} />
            </span>
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold" style={{ color: activeArch.color }}>
              Telemetry Console
            </span>
          </div>
        </div>
        {selectedNode && (
          <button
            onClick={onClearSelection}
            className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md transition-all duration-200"
            style={{
              color: activeArch.color,
              border: `1px solid ${activeArch.color}40`,
              background: `${activeArch.color}10`,
            }}
          >
            ✕ Reset
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedNode && nodeSpec ? (
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col gap-4 text-left relative z-10"
          >
            {/* Active Node label */}
            <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: `${activeArch.color}10`, border: `1px solid ${activeArch.color}30` }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${activeArch.color}20`, color: activeArch.color }}>
                <Cpu size={16} />
              </div>
              <div>
                <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-slate-500 block">Active Node</span>
                <h4 className="text-sm font-bold font-mono tracking-wide" style={{ color: activeArch.color }}>
                  {selectedNode.label}
                </h4>
              </div>
            </div>

            {/* Description */}
            <div>
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest mb-1 block" style={{ color: `${activeArch.color}aa` }}>
                ▸ Functional Description
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                {nodeSpec.desc}
              </p>
            </div>

            {/* Diagnostics Config */}
            <div>
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest mb-1 block" style={{ color: `${activeArch.color}aa` }}>
                ▸ Diagnostics Config
              </span>
              <div className="p-2.5 rounded-xl font-mono text-[10px] text-slate-200 leading-relaxed"
                style={{ background: "rgba(0,0,0,0.4)", border: `1px solid ${activeArch.color}25` }}>
                {nodeSpec.spec}
              </div>
            </div>

            {/* Diagnostic Logs Window */}
            <div className="flex-1 flex flex-col">
              <span className="text-[9px] font-bold font-mono uppercase tracking-widest mb-1 block" style={{ color: `${activeArch.color}aa` }}>
                ▸ Live Shell Output
              </span>
              <div
                ref={logContainerRef}
                className="flex-1 overflow-y-auto p-3 rounded-xl font-mono text-[10px]"
                style={{
                  background: "rgba(0,0,0,0.55)",
                  border: `1px solid ${activeArch.color}20`,
                  minHeight: "110px",
                  maxHeight: "140px",
                }}
              >
                {displayedLogs.map((log, index) => (
                  <div key={index} className="flex gap-2 py-0.5">
                    <span className="text-emerald-600 select-none shrink-0">$</span>
                    <span className="text-emerald-400 break-all">{log}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 mt-2 select-none">
                  <span className="w-1.5 h-3.5 animate-pulse" style={{ background: activeArch.color }} />
                  <span className="text-[8px] uppercase tracking-wider" style={{ color: `${activeArch.color}70` }}>stream active...</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col justify-between text-left relative z-10"
          >
            {/* Architecture Summary */}
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl" style={{ background: `${activeArch.color}0d`, border: `1px solid ${activeArch.color}30` }}>
                <span className="text-[9px] font-bold font-mono uppercase tracking-widest block mb-1" style={{ color: `${activeArch.color}99` }}>Blueprint Profile</span>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {activeArch.title}
                </h4>
                <p className="text-[10px] font-mono font-medium mt-0.5" style={{ color: activeArch.color }}>
                  {activeArch.subtitle}
                </p>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-1 gap-2">
                {activeArch.stats.map((stat) => (
                  <div key={stat.label} className="p-3 rounded-xl flex items-center justify-between transition-all duration-200"
                    style={{ background: "rgba(0,0,0,0.35)", border: `1px solid ${activeArch.color}22` }}>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider block" style={{ color: `${activeArch.color}99` }}>{stat.label}</span>
                      <span className="text-[10px] text-slate-400 font-sans mt-0.5 block leading-tight">{stat.sub}</span>
                    </div>
                    <span className="font-mono text-sm font-extrabold" style={{ color: activeArch.color }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instruction */}
            <div className="mt-4 p-3.5 rounded-xl flex gap-3 items-start select-none"
              style={{ background: "rgba(0,0,0,0.3)", border: `1px dashed ${activeArch.color}35` }}>
              <Terminal size={14} className="shrink-0 mt-0.5" style={{ color: activeArch.color }} />
              <div>
                <div className="text-[9px] font-bold uppercase tracking-wider font-mono mb-0.5" style={{ color: activeArch.color }}>Interactive Map</div>
                <p className="text-[10px] text-slate-400 leading-normal font-sans">
                  Click any node in the blueprint to stream live logs &amp; diagnostics.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function SystemArchitecture() {
  const [activeArchIdx, setActiveArchIdx] = useState(0);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const activeArch = architectures[activeArchIdx];

  // Auto-clear selection when switching tabs
  const handleArchSwitch = (idx: number) => {
    setActiveArchIdx(idx);
    setSelectedNodeId(null);
  };

  return (
    <section id="architecture" className="py-24 bg-[#F4F8FC] relative border-y border-[#DDE8F0] overflow-hidden">
      {/* ── Interactive magnetic particles — white + blue, attracted to cursor ── */}
      <MagneticParticlesBg opacity={0.9} />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-script text-3xl text-emerald-600 mb-2">System Design</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Scalable Architecture</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6" />
          <div className="flex justify-center">
            <span className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-medium border border-slate-300 bg-white text-slate-700 shadow-sm">
              Blueprint-level architecture diagrams showcasing distributed workflows, ETL patterns, and containerized deployments.
            </span>
          </div>
        </motion.div>

        {/* Switcher: Architecture Titles act as Tabs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-12 md:gap-16 mb-12 border-b border-slate-200/80 pb-6 max-w-3xl mx-auto">
          {architectures.map((arch, idx) => {
            const isActive = activeArchIdx === idx;
            return (
              <button
                key={arch.title}
                onClick={() => handleArchSwitch(idx)}
                className="relative py-2.5 text-center focus:outline-none transition-all duration-300 w-full sm:w-auto"
              >
                <h3
                  className={`text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
                    }`}
                >
                  {arch.title}
                </h3>
                <p
                  className="text-[10px] font-mono font-medium tracking-wide mt-0.5 transition-colors duration-300"
                  style={{ color: isActive ? arch.color : "#94a3b8" }}
                >
                  {arch.subtitle}
                </p>
                {isActive && (
                  <motion.div
                    layoutId="activeArchUnderline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[3px] rounded-full z-10"
                    style={{ backgroundColor: arch.color }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Central Display: SVG Blueprint Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">

          {/* Canvas Column */}
          <div className="lg:col-span-7 xl:col-span-8 bg-[#050a10] rounded-3xl border border-slate-900 p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[360px] md:min-h-[420px]">
            {/* Dot Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="canvas-dot" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="6" cy="6" r="0.6" fill="rgba(148, 163, 184, 0.4)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#canvas-dot)" />
              </svg>
            </div>

            {/* Micro Header */}
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 border-b border-slate-900/60 pb-3 mb-5 relative z-10 select-none">
              <span className="flex items-center gap-1.5 font-bold">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeArch.color }} />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ backgroundColor: activeArch.color }} />
                </span>
                <span className="tracking-widest uppercase">Interactive Blueprint Map</span>
              </span>
              <span className="italic">{activeArch.comment}</span>
            </div>

            {/* SVG Content Canvas */}
            <div className="relative z-10 w-full flex items-center justify-center flex-1">
              <AnimatePresence mode="wait">
                <motion.svg
                  key={activeArchIdx}
                  viewBox="0 0 100 95"
                  className="w-full h-auto"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <defs>
                    <filter id="glow-orange" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* ── Layer 1: Connectors with flowing pulses ── */}
                  {activeArch.connections.map((conn) => {
                    const n1 = getNodeById(activeArch, conn.from);
                    const n2 = getNodeById(activeArch, conn.to);
                    if (!n1 || !n2) return null;

                    const pathData = getPath(n1, n2, conn.type);
                    const uniqueKey = `${conn.from}-${conn.to}`;

                    return (
                      <g key={uniqueKey}>
                        {/* Faint static pipe background */}
                        <path
                          d={pathData}
                          fill="none"
                          stroke={activeArch.color}
                          strokeWidth={0.5}
                          opacity={0.12}
                        />

                        {/* Animated flowing dash line */}
                        <motion.path
                          d={pathData}
                          fill="none"
                          stroke={activeArch.color}
                          strokeWidth={0.5}
                          strokeDasharray="2 3"
                          animate={{ strokeDashoffset: [-10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          opacity={0.4}
                        />

                        {/* Streaming Pulse 1 */}
                        <circle
                          r="0.6"
                          fill={activeArch.color}
                          filter={activeArchIdx === 0 ? "url(#glow-orange)" : "url(#glow-blue)"}
                        >
                          <animateMotion dur="3s" repeatCount="indefinite" path={pathData} begin="0s" />
                        </circle>

                        {/* Streaming Pulse 2 (Staggered) */}
                        <circle
                          r="0.6"
                          fill={activeArch.color}
                          filter={activeArchIdx === 0 ? "url(#glow-orange)" : "url(#glow-blue)"}
                        >
                          <animateMotion dur="3s" repeatCount="indefinite" path={pathData} begin="1.5s" />
                        </circle>
                      </g>
                    );
                  })}

                  {/* ── Layer 2: Main Nodes ── */}
                  {activeArch.nodes.map((n, i) => {
                    const isSelected = selectedNodeId === n.id;
                    const W = 26, H = 18;
                    // Dynamic font size: shrink for long labels so they always fit
                    const labelFontSize = Math.min(2.2, (W - 8) / (n.label.length * 0.62));
                    return (
                      <g
                        key={n.id}
                        className="group/node"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedNodeId(n.id)}
                      >
                        {/* Interactive Node Body */}
                        <motion.rect
                          x={n.x - W / 2}
                          y={n.y - H / 2}
                          width={W}
                          height={H}
                          rx={3.5}
                          fill={isSelected ? `${activeArch.color}1e` : "#0b1118"}
                          stroke={isSelected ? "#ffffff" : activeArch.color}
                          strokeWidth={isSelected ? 0.9 : 0.6}
                          opacity={0.9}
                          whileHover={{
                            fill: `${activeArch.color}25`,
                            stroke: "#ffffff",
                            strokeWidth: 0.9,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        {/* Status blinking dot — top-left corner */}
                        <circle cx={n.x - W / 2 + 2.5} cy={n.y - H / 2 + 2.5} r={1} fill={activeArch.color}>
                          <animate
                            attributeName="opacity"
                            values="0.4;1;0.4"
                            dur="2s"
                            begin={`${i * 0.4}s`}
                            repeatCount="indefinite"
                          />
                        </circle>

                        {/* Node Label Text — dynamically sized, centered */}
                        <text
                          x={n.x}
                          y={n.y - 1.5}
                          fontSize={labelFontSize}
                          fontWeight="800"
                          fill={isSelected ? "#ffffff" : "rgba(255,255,255,0.9)"}
                          fontFamily="monospace"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="group-hover/node:fill-white transition-colors duration-150"
                        >
                          {n.label}
                        </text>

                        {/* Subtitle — centered */}
                        <text
                          x={n.x}
                          y={n.y + 4}
                          fontSize={1.6}
                          fill={isSelected ? "#ffffff" : activeArch.color}
                          fontFamily="monospace"
                          textAnchor="middle"
                          opacity={isSelected ? 1 : 0.7}
                          className="group-hover/node:opacity-100 transition-opacity duration-150"
                        >
                          {n.sub}
                        </text>
                      </g>
                    );
                  })}

                  {/* ── Layer 3: Vertical Supporting Nodes ── */}
                  {activeArch.verticals.map((v, i) => {
                    const isSelected = selectedNodeId === v.id;
                    const VW = 24, VH = 12;
                    const vLabelFontSize = Math.min(1.9, (VW - 6) / (v.label.length * 0.62));
                    return (
                      <g
                        key={v.id}
                        className="group/node"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedNodeId(v.id)}
                      >
                        {/* Box container */}
                        <motion.rect
                          x={v.x - VW / 2}
                          y={v.y - VH / 2}
                          width={VW}
                          height={VH}
                          rx={2.5}
                          fill={isSelected ? `${v.color}18` : "#0b1118"}
                          stroke={isSelected ? "#ffffff" : v.color}
                          strokeWidth={isSelected ? 0.8 : 0.5}
                          opacity={0.85}
                          whileHover={{
                            fill: `${v.color}1e`,
                            stroke: "#ffffff",
                            strokeWidth: 0.8,
                          }}
                          transition={{ duration: 0.2 }}
                        />

                        {/* Label text — dynamically sized, centered */}
                        <text
                          x={v.x}
                          y={v.y + 0.8}
                          fontSize={vLabelFontSize}
                          fontWeight="800"
                          fill={isSelected ? "#ffffff" : v.color}
                          fontFamily="monospace"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="group-hover/node:fill-white transition-colors duration-150"
                        >
                          {v.label}
                        </text>
                      </g>
                    );
                  })}
                </motion.svg>
              </AnimatePresence>
            </div>
          </div>

          {/* Telemetry Console Column */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-stretch">
            <TelemetryConsole
              activeArch={activeArch}
              selectedNodeId={selectedNodeId}
              onClearSelection={() => setSelectedNodeId(null)}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
