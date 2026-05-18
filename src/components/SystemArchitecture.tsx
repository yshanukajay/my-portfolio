"use client";
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

function BlueprintCard({ arch, delay }: { arch: typeof architectures[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.08)" }}>

      {/* Header */}
      <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
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
      </div>

      {/* Diagram */}
      <div className="p-4" style={{ background: "#050a10" }}>
        <svg viewBox="0 0 100 90" className="w-full" style={{ height: 180 }}>
          <defs>
            <pattern id={`bg-${arch.title.slice(0,4)}`} width={8} height={8} patternUnits="userSpaceOnUse">
              <circle cx={4} cy={4} r={0.5} fill="rgba(148,163,184,0.1)" />
            </pattern>
            <filter id={`glow-${arch.title.slice(0,4)}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          <rect width={100} height={90} fill={`url(#bg-${arch.title.slice(0,4)})`} />

          {/* Main nodes */}
          {arch.nodes.map((n, i) => (
            <g key={n.label}>
              <motion.rect
                x={n.x - 10} y={n.y - 8} width={20} height={16} rx={3}
                fill={`${arch.color}18`} stroke={arch.color} strokeWidth={0.8}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + i * 0.12 }} />
              <motion.circle cx={n.x - 6} cy={n.y} r={1.8} fill={arch.color}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
              <text x={n.x + 2} y={n.y - 1} fontSize={2.8} fontWeight="700"
                fill="rgba(255,255,255,0.9)" fontFamily="monospace" textAnchor="middle">{n.label}</text>
              <text x={n.x + 2} y={n.y + 3.5} fontSize={2} fill={arch.color}
                fontFamily="monospace" textAnchor="middle" opacity={0.7}>{n.sub}</text>

              {/* Arrow between main nodes */}
              {i < arch.nodes.length - 1 && arch.nodes[i].y === arch.nodes[i + 1].y && (
                <motion.line
                  x1={n.x + 10} y1={n.y} x2={arch.nodes[i + 1].x - 10} y2={arch.nodes[i + 1].y}
                  stroke={arch.color} strokeWidth={0.7} opacity={0.5}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: delay + i * 0.15 }} />
              )}
            </g>
          ))}

          {/* Vertical sub-nodes */}
          {arch.verticals.map((v, i) => (
            <g key={v.label}>
              <motion.rect
                x={v.x - 9} y={v.y - 6} width={18} height={12} rx={2}
                fill={`${v.color}15`} stroke={v.color} strokeWidth={0.6}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: delay + 0.6 + i * 0.1 }} />
              <text x={v.x} y={v.y + 1.5} fontSize={2.4} fontWeight="700"
                fill={v.color} fontFamily="monospace" textAnchor="middle">{v.label}</text>
            </g>
          ))}

          {/* Comment */}
          <text x={2} y={88} fontSize={2.2} fill="rgba(148,163,184,0.4)"
            fontFamily="monospace">{arch.comment}</text>
        </svg>
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
