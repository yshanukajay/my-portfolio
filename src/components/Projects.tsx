"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Eye, Workflow, TrendingUp, AlertTriangle } from "lucide-react";

/* ─── GitHub icon ─────────────────────────────────────────────── */
const GithubIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* ─── Project data ────────────────────────────────────────────── */
const projects = [
  {
    title: "Real-Time Streaming Pipeline",
    badge: "Real-Time",
    category: "Distributed · Stream Processing",
    description:
      "End-to-end streaming pipeline handling high-throughput event data with sub-500ms latency. Replaced legacy batch jobs that caused 24-hour reporting delays.",
    problem: "24-hour delays in critical metric reporting due to batch processing.",
    dataset: "10TB+ clickstream events via Kafka",
    impact: "24h → < 500ms latency",
    stack: {
      infra: ["Kafka", "Spark Streaming", "MongoDB", "Docker"],
      languages: ["Python", "FastAPI"]
    },
    flow: [
      { name: "Kafka Ingest", desc: "High-throughput event queue" },
      { name: "Spark Stream", desc: "Real-time stateful transformations" },
      { name: "Aggregation", desc: "Sliding window metrics aggregation" },
      { name: "MongoDB Store", desc: "Low-latency document store write" },
      { name: "Dashboard UI", desc: "Instant WebSockets visualization" }
    ],
    metrics: {
      type: "streaming",
      throughput: "10,000/s",
      volume: "10TB+",
      latencyBefore: "24h",
      latencyAfter: "500ms"
    },
    color: "#0ea5e9",
    tags: ["Real-Time", "Distributed", "MLOps Enabled"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
  {
    title: "Cattle Health Monitoring System",
    badge: "Edge AI",
    category: "IoT · ML Prediction · Alerting",
    description:
      "IoT-driven pipeline combining streaming sensor ingestion with ML prediction to monitor livestock health patterns and trigger real-time alerts.",
    problem: "Manual monitoring caused late disease detection and yield loss.",
    dataset: "IoT Sensor Data (Temp, Motion, Heart Rate)",
    impact: "30% reduction in severe illness cases",
    stack: {
      infra: ["MongoDB", "FastAPI", "Kafka", "Docker"],
      languages: ["Python", "TensorFlow"]
    },
    flow: [
      { name: "IoT Sensors", desc: "Continuous collar telemetry data" },
      { name: "Ingestion API", desc: "FastAPI ingestion gateway" },
      { name: "Preprocessing", desc: "Noise filter & sequence scaling" },
      { name: "ML Prediction", desc: "LSTM neural network classification" },
      { name: "Alert Engine", desc: "Real-time SMS/Web notification" }
    ],
    metrics: {
      type: "ml_classification",
      accuracy: 94,
      metricLabel: "Accuracy",
      reduction: "30%",
      sensors: "Temp, Motion, HR"
    },
    color: "#10b981",
    tags: ["Edge AI", "API Integrated", "Computer Vision"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
  {
    title: "Tomato Leaf Disease Classifier",
    badge: "Computer Vision",
    category: "CNN · FastAPI · Docker Serving",
    description:
      "Production-grade CNN microservice for automated crop disease diagnosis. Sub-100ms inference latency with a fully containerized deployment pipeline.",
    problem: "Farmers needed reliable automated API for rapid field image diagnosis.",
    dataset: "PlantVillage: 50,000+ labeled images",
    impact: "< 100ms API inference latency",
    stack: {
      infra: ["FastAPI", "Docker", "React", "OpenCV"],
      languages: ["Python", "TensorFlow"]
    },
    flow: [
      { name: "PlantVillage Set", desc: "50k+ labeled disease images" },
      { name: "CNN Model", desc: "Custom ConvNet with transfer learning" },
      { name: "Validation", desc: "F1 Score & confusion matrix evaluation" },
      { name: "FastAPI serving", desc: "Containerized serving microservice" },
      { name: "React Web App", desc: "Mobile-friendly image uploader UI" }
    ],
    metrics: {
      type: "ml_classification",
      accuracy: 98,
      metricLabel: "F1 Score",
      latency: "< 100ms",
      datasetSize: "50,000+"
    },
    color: "#818cf8",
    tags: ["Computer Vision", "API Integrated", "MLOps Enabled"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
];

/* ─── Radial Gauge Helper ─────────────────────────────────────── */
function RadialGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 22;
  const strokeWidth = 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-4 bg-slate-950/40 border border-slate-800/40 p-3.5 rounded-xl">
      <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-slate-800/60"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx="24"
            cy="24"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-white font-mono">{value}%</span>
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
        <div className="text-xs font-bold text-slate-200 mt-0.5">High Performance</div>
      </div>
    </div>
  );
}

/* ─── Project card ────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  align,
}: {
  project: typeof projects[0];
  index: number;
  align: "left" | "right";
}) {
  const p = project;
  const [activeTab, setActiveTab] = useState<"overview" | "pipeline" | "metrics">("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "pipeline", label: "Pipeline", icon: Workflow },
    { id: "metrics", label: "Performance", icon: TrendingUp },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="group relative rounded-2xl border overflow-hidden min-h-[460px] flex flex-col justify-between"
      style={{ background: "#FAF7F4", borderColor: `${p.color}28` }}
    >
      {/* Top accent */}
      <div className="h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${p.color}, transparent)` }} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 0 1px ${p.color}40, 0 0 32px ${p.color}18` }}
      />

      <div className="p-6 flex flex-col flex-1">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center flex-wrap gap-2 mb-2">
              <span
                className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-full"
                style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}35` }}
              >
                {p.badge}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">{p.category}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">{p.title}</h3>
          </div>
          {/* Links */}
          <div className="flex gap-2 flex-shrink-0">
            <a
              href={p.links.github} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg text-slate-500 hover:text-white transition-colors"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <GithubIcon />
            </a>
            <a
              href={p.links.demo} target="_blank" rel="noopener noreferrer"
              className="p-2 rounded-lg transition-colors"
              style={{ background: `${p.color}15`, color: p.color }}
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200 mb-5 relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors relative z-10"
                style={{
                  color: isSelected ? "#1e293b" : "#64748b",
                }}
              >
                <Icon size={13} className={isSelected ? "" : "opacity-80"} />
                <span>{tab.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId={`active-tab-${index}`}
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{
                      background: `linear-gradient(135deg, ${p.color}18 0%, ${p.color}0a 100%)`,
                      border: `1px solid ${p.color}30`,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab contents wrapper */}
        <div className="flex-1 flex flex-col justify-between">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1"
          >
            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <div className="space-y-4">
                <p className="text-slate-600 text-sm leading-relaxed">{p.description}</p>

                {/* Problem Statement banner */}
                <div className="p-3.5 rounded-xl border border-amber-500/10 bg-amber-500/[0.03] flex gap-3">
                  <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber-500/80 font-mono">Core Challenge</div>
                    <p className="text-xs text-slate-400 mt-1 leading-normal">{p.problem}</p>
                  </div>
                </div>

                {/* Tech Stack categorization */}
                <div className="space-y-2 pt-1 border-t border-slate-200/60">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[9px] font-bold font-mono text-slate-500 uppercase mr-1">Infrastructure:</span>
                    {p.stack.infra.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[10px] font-bold rounded-md font-mono"
                        style={{ background: `${p.color}15`, color: p.color, border: `1px solid ${p.color}25` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className="text-[9px] font-bold font-mono text-slate-500 uppercase mr-1">Languages & ML:</span>
                    {p.stack.languages.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[10px] font-bold rounded-md font-mono border border-slate-200 text-slate-600 bg-slate-50"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Pipeline */}
            {activeTab === "pipeline" && (
              <div className="space-y-4 py-2 px-1">
                {p.flow.map((step, idx) => (
                  <div key={step.name} className="flex gap-4 relative group/node">
                    {/* Node Graphic */}
                    <div className="flex flex-col items-center shrink-0">
                      <motion.div
                        className="w-7 h-7 rounded-full flex items-center justify-center border text-[10px] font-bold"
                        style={{
                          background: "#080d14",
                          borderColor: idx === 0 ? p.color : `${p.color}50`,
                          color: idx === 0 ? "#ffffff" : p.color,
                          boxShadow: idx === 0 ? `0 0 10px ${p.color}40` : "none"
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </motion.div>
                      {idx < p.flow.length - 1 && (
                        <div className="w-[2px] flex-1 relative min-h-[32px] my-1" style={{ background: `${p.color}25` }}>
                          <motion.div
                            className="absolute top-0 left-0 right-0 rounded-full"
                            style={{ height: 6, background: p.color }}
                            animate={{ y: ["0%", "450%", "0%"] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: idx * 0.5,
                              ease: "easeInOut"
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Node Info */}
                    <div className="pb-3 flex-1">
                      <h4 className="text-xs font-bold text-slate-200 group-hover/node:text-white transition-colors duration-200">{step.name}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-normal">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab: Metrics */}
            {activeTab === "metrics" && (
              <div className="space-y-4">
                {p.metrics.type === "streaming" && (
                  <div className="space-y-4">
                    {/* Latency Comparison */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                        <span>Latency Performance</span>
                        <span className="text-emerald-400 font-bold font-mono">99.9% reduction</span>
                      </div>
                      <div className="h-8 w-full bg-slate-100 border border-slate-200 rounded-xl relative overflow-hidden flex items-center px-3.5">
                        <div className="absolute left-0 top-0 bottom-0 bg-rose-500/10 border-r border-rose-500/30" style={{ width: "95%" }} />
                        <div className="absolute left-0 top-0 bottom-0 bg-emerald-500/25 border-r border-emerald-500/80 rounded-r-lg" style={{ width: "2%" }} />
                        <div className="w-full flex justify-between relative z-10 text-[10px] font-bold text-white font-mono">
                          <span className="text-rose-400/90">Baseline: 24h</span>
                          <span className="text-emerald-400">Optimized: &lt;500ms</span>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-100/80 border border-slate-200/60 p-3 rounded-xl flex flex-col justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Throughput</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-base font-bold text-slate-900 font-mono">{p.metrics.throughput}</span>
                        </div>
                        <span className="text-[10px] text-slate-600">Events/sec ingestion</span>
                      </div>
                      <div className="bg-slate-100/80 border border-slate-200/60 p-3 rounded-xl flex flex-col justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Volume</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-base font-bold text-slate-900 font-mono">{p.metrics.volume}</span>
                        </div>
                        <span className="text-[10px] text-slate-600">Kafka Clickstream data</span>
                      </div>
                    </div>
                  </div>
                )}

                {p.metrics.type === "ml_classification" && p.title === "Cattle Health Monitoring System" && (
                  <div className="space-y-4">
                    {/* Gauge row */}
                    <RadialGauge value={p.metrics.accuracy || 0} label={p.metrics.metricLabel || "Accuracy"} color={p.color} />

                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-100/80 border border-slate-200/60 p-3 rounded-xl flex flex-col justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Illness Cases</span>
                        <div className="flex items-baseline gap-1 mt-1 text-emerald-400 font-mono">
                          <span className="text-base font-bold">-{p.metrics.reduction}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Severe case reduction</span>
                      </div>
                      <div className="bg-slate-100/80 border border-slate-200/60 p-3 rounded-xl flex flex-col justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Sensor Streams</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-xs font-bold text-white font-mono truncate">{p.metrics.sensors}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Real-time edge ingestion</span>
                      </div>
                    </div>
                  </div>
                )}

                {p.metrics.type === "ml_classification" && p.title === "Tomato Leaf Disease Classifier" && (
                  <div className="space-y-4">
                    {/* Gauge row */}
                    <RadialGauge value={p.metrics.accuracy || 0} label={p.metrics.metricLabel || "F1 Score"} color={p.color} />

                    {/* Stats row */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-slate-100/80 border border-slate-200/60 p-3 rounded-xl flex flex-col justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">API Latency</span>
                        <div className="flex items-baseline gap-1 mt-1 text-indigo-400 font-mono">
                          <span className="text-base font-bold">{p.metrics.latency}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">Sub-100ms target met</span>
                      </div>
                      <div className="bg-slate-100/80 border border-slate-200/60 p-3 rounded-xl flex flex-col justify-between">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Dataset Size</span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-base font-bold text-white font-mono">{p.metrics.datasetSize}</span>
                        </div>
                        <span className="text-[10px] text-slate-400">PlantVillage training images</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-3 bg-slate-100/80 border border-slate-200/50 rounded-xl flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: p.color }} />
                  <span className="text-[11px] text-slate-600">Business Impact: <strong className="text-slate-800 font-semibold">{p.impact}</strong></span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Tags Footer inside Card */}
          <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-slate-200/60">
            {p.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-[9px] font-semibold rounded-md border border-slate-200 text-slate-500">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden" style={{ background: "#FAF7F4" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 55%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] text-indigo-600 uppercase mb-3">Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Production AI Systems</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
            Deep-dive into the architecture, challenges, and metrics behind intelligent systems I&apos;ve engineered.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative max-w-5xl mx-auto">

          {/* Vertical spine (desktop only) */}
          <motion.div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, rgba(99,102,241,0.25) 8%, rgba(99,102,241,0.25) 92%, transparent)" }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <div className="space-y-16 lg:space-y-24">
            {projects.map((p, i) => {
              const isRight = i % 2 === 0; // 0→right, 1→left, 2→right

              return (
                <div key={p.title} className="relative">

                  {/* Desktop: 3-col grid [card | node | card] */}
                  <div className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] items-center gap-0">

                    {/* Left slot */}
                    {isRight ? (
                      <div /> // spacer
                    ) : (
                      <ProjectCard project={p} index={i} align="left" />
                    )}

                    {/* Center node */}
                    <div className="flex flex-col items-center justify-center">
                      <motion.div
                        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center font-black text-base border-2"
                        style={{
                          background: "#FAF7F4",
                          borderColor: p.color,
                          color: p.color,
                          boxShadow: `0 0 0 4px ${p.color}18, 0 0 24px ${p.color}40`,
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.15 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.div>

                      {/* Connector arm to card */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 h-px"
                        style={{
                          background: `linear-gradient(to ${isRight ? "right" : "left"}, ${p.color}60, transparent)`,
                          width: "calc(50% - 28px)",
                          left: isRight ? "calc(50% + 28px)" : undefined,
                          right: isRight ? undefined : "calc(50% + 28px)",
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </div>

                    {/* Right slot */}
                    {isRight ? (
                      <ProjectCard project={p} index={i} align="right" />
                    ) : (
                      <div /> // spacer
                    )}
                  </div>

                  {/* Mobile: stacked with left timeline */}
                  <div className="lg:hidden flex gap-5">
                    {/* Left micro-spine */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <motion.div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 flex-shrink-0"
                        style={{ background: "#FAF7F4", borderColor: p.color, color: p.color }}
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                        viewport={{ once: true }} transition={{ type: "spring", stiffness: 200 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </motion.div>
                      {i < projects.length - 1 && (
                        <div className="flex-1 w-px mt-3" style={{ background: `${p.color}30` }} />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <ProjectCard project={p} index={i} align="right" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

