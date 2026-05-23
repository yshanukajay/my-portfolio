"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const architectures = [
  {
    title: "Streaming Data Architecture",
    subtitle: "High-throughput event pipeline",
    color: "#f59e0b",
    nodes: [
      { label: "Kafka", sub: "event stream", x: 15, y: 40 },
      { label: "Spark", sub: "processing",   x: 38, y: 40 },
      { label: "MongoDB", sub: "storage",    x: 61, y: 40 },
      { label: "Dashboard", sub: "analytics",x: 84, y: 40 },
    ],
    verticals: [
      { label: "Schema Registry", x: 26, y: 72, color: "#f59e0b" },
      { label: "DQ Checks",       x: 49, y: 72, color: "#10b981" },
    ],
    comment: "// 1.2M events/sec · 42ms avg latency",
  },
  {
    title: "Containerized Deployment",
    subtitle: "Production serving architecture",
    color: "#0ea5e9",
    nodes: [
      { label: "GitHub Actions", sub: "CI/CD",       x: 15, y: 30 },
      { label: "Docker",         sub: "container",   x: 15, y: 58 },
      { label: "Registry",       sub: "ECR/GHCR",    x: 50, y: 44 },
      { label: "K8s Cluster",    sub: "orchestrate", x: 82, y: 30 },
      { label: "FastAPI",        sub: "serving",     x: 82, y: 58 },
    ],
    verticals: [
      { label: "Prometheus", x: 65, y: 80, color: "#f59e0b" },
      { label: "Grafana",    x: 82, y: 80, color: "#10b981" },
    ],
    comment: "// Zero-downtime rollout · real-time observability",
  },
];

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

function BlueprintCard({ arch, delay }: { arch: typeof architectures[0]; delay: number }) {
  // Default to the first main node in the architecture
  const [selectedNode, setSelectedNode] = useState<string>(arch.nodes[0].label);

  const nodeData = nodeSpecs[selectedNode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay }}
      className="rounded-2xl overflow-hidden flex flex-col justify-between"
      style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>

      {/* Header */}
      <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">{arch.title}</div>
              <div className="text-[10px] text-slate-500">{arch.subtitle}</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-500 animate-pulse">● Live Telemetry</span>
        </div>
      </div>

      {/* Diagram */}
      <div className="p-4" style={{ background: "#050a10" }}>
        <svg viewBox="0 0 100 90" className="w-full" style={{ height: 180 }}>
          <defs>
            <pattern id={`bg-${arch.title.slice(0,4)}`} width={8} height={8} patternUnits="userSpaceOnUse">
              <circle cx={4} cy={4} r={0.5} fill="rgba(148,163,184,0.1)" />
            </pattern>
          </defs>
          <rect width={100} height={90} fill={`url(#bg-${arch.title.slice(0,4)})`} />

          {/* Main nodes */}
          {arch.nodes.map((n, i) => {
            const isSelected = selectedNode === n.label;
            return (
              <g key={n.label} className="group/node" style={{ cursor: "pointer" }} onClick={() => setSelectedNode(n.label)}>
                <motion.rect
                  x={n.x - 10} y={n.y - 8} width={20} height={16} rx={3}
                  fill={isSelected ? `${arch.color}33` : `${arch.color}12`}
                  stroke={isSelected ? "#ffffff" : arch.color}
                  strokeWidth={isSelected ? 1.2 : 0.7}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: delay + i * 0.12 }} />
                
                {/* Glow ring on hover/selected */}
                {isSelected && (
                  <motion.circle
                    cx={n.x - 6}
                    cy={n.y}
                    r={3.5}
                    fill="transparent"
                    stroke={arch.color}
                    strokeWidth={0.5}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    style={{ transformOrigin: `${n.x - 6}px ${n.y}px` }}
                  />
                )}

                <motion.circle cx={n.x - 6} cy={n.y} r={1.5} fill={isSelected ? "#ffffff" : arch.color}
                  animate={isSelected ? { scale: [1, 1.4, 1] } : { opacity: [0.4, 1, 0.4] }}
                  transition={isSelected ? { duration: 1, repeat: Infinity } : { duration: 2, delay: i * 0.3, repeat: Infinity }} />
                
                <text x={n.x + 2} y={n.y - 1} fontSize={2.8} fontWeight="700"
                  fill={isSelected ? "#ffffff" : "rgba(255,255,255,0.9)"} fontFamily="monospace" textAnchor="middle">{n.label}</text>
                <text x={n.x + 2} y={n.y + 3.5} fontSize={2} fill={isSelected ? "#ffffff" : arch.color}
                  fontFamily="monospace" textAnchor="middle" opacity={isSelected ? 1 : 0.7}>{n.sub}</text>

                {/* Arrow & Flow Pulse between main nodes */}
                {i < arch.nodes.length - 1 && arch.nodes[i].y === arch.nodes[i + 1].y && (
                  <g>
                    <line
                      x1={n.x + 10} y1={n.y} x2={arch.nodes[i + 1].x - 10} y2={arch.nodes[i + 1].y}
                      stroke={arch.color} strokeWidth={0.6} opacity={0.3} />
                    <motion.line
                      x1={n.x + 10} y1={n.y} x2={arch.nodes[i + 1].x - 10} y2={arch.nodes[i + 1].y}
                      stroke={arch.color} strokeWidth={0.8}
                      strokeDasharray="2 3"
                      animate={{ strokeDashoffset: [-12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      opacity={0.8} />
                  </g>
                )}
              </g>
            );
          })}

          {/* Vertical sub-nodes */}
          {arch.verticals.map((v, i) => {
            const isSelected = selectedNode === v.label;
            return (
              <g key={v.label} className="group/node" style={{ cursor: "pointer" }} onClick={() => setSelectedNode(v.label)}>
                <motion.rect
                  x={v.x - 9} y={v.y - 6} width={18} height={12} rx={2}
                  fill={isSelected ? `${v.color}25` : `${v.color}0f`}
                  stroke={isSelected ? "#ffffff" : v.color}
                  strokeWidth={isSelected ? 1.0 : 0.5}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: delay + 0.6 + i * 0.1 }} />
                <text x={v.x} y={v.y + 1.5} fontSize={2.4} fontWeight="700"
                  fill={isSelected ? "#ffffff" : v.color} fontFamily="monospace" textAnchor="middle">{v.label}</text>
              </g>
            );
          })}

          {/* Comment */}
          <text x={2} y={88} fontSize={2.2} fill="rgba(148,163,184,0.4)"
            fontFamily="monospace">{arch.comment}</text>
        </svg>
      </div>

      {/* Terminal Node Inspector */}
      <div className="border-t p-4 font-mono text-left" style={{ background: "#020509", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between border-b pb-2 mb-3" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: arch.color }} />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono">inspect: {selectedNode}</span>
          </div>
          <span className="text-[9px] text-slate-600 uppercase font-mono">Status: Active</span>
        </div>

        {nodeData ? (
          <div className="space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{nodeData.desc}</p>
              <div className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-2">
                <span className="text-slate-600 font-bold font-mono text-[9px] uppercase">Telemetry Conf:</span>
                <span className="font-bold font-mono" style={{ color: arch.color }}>{nodeData.spec}</span>
              </div>
            </div>

            <div>
              <div className="space-y-1 bg-black/40 p-2.5 rounded-lg border border-slate-900 font-mono text-[10px]">
                {nodeData.logs.map((log, lIdx) => (
                  <div key={lIdx} className="flex gap-2 text-slate-400 truncate">
                    <span className="text-slate-600 flex-shrink-0">LOG</span>
                    <span className="text-slate-200 select-all truncate">{log}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1.5 text-slate-500 mt-1">
                  <span className="w-1 h-3.5 bg-slate-400/80 animate-pulse" />
                  <span className="text-[9px]">Listening...</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[10px] text-slate-600">Select a component to inspect...</div>
        )}
      </div>

    </motion.div>
  );
}

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-24 bg-slate-50 relative border-y border-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold tracking-[0.25em] text-emerald-600 uppercase mb-3">System Design</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Scalable Architecture</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 max-w-2xl mx-auto">
            Blueprint-level architecture diagrams showcasing distributed workflows, ETL patterns, and containerized deployments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {architectures.map((arch, i) => (
            <BlueprintCard key={arch.title} arch={arch} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
