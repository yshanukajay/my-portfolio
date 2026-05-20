"use client";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

/* ─── GitHub icon ─────────────────────────────────────────────── */
const GithubIcon = () => (
  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* ─── Horizontal pipeline flow ───────────────────────────────── */
function PipelineFlow({ steps, color }: { steps: string[]; color: string }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-1">
          <motion.span
            className="px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono border"
            style={{
              background: `${color}10`,
              borderColor: `${color}30`,
              color,
            }}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
          >
            {step}
          </motion.span>
          {i < steps.length - 1 && (
            <motion.span
              className="text-[10px]"
              style={{ color: `${color}60` }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            >
              →
            </motion.span>
          )}
        </span>
      ))}
    </div>
  );
}

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
    accuracy: "10k events/sec throughput",
    impact: "24h → < 500ms latency",
    stack: ["Kafka", "Spark Streaming", "MongoDB", "FastAPI", "Docker"],
    flow: ["Kafka Ingest", "Spark Stream", "Aggregation", "MongoDB Store", "Dashboard"],
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
    accuracy: "94% prediction accuracy",
    impact: "30% reduction in severe illness cases",
    stack: ["Python", "MongoDB", "FastAPI", "TensorFlow", "Kafka"],
    flow: ["IoT Sensors", "Ingestion API", "Preprocessing", "ML Predict", "Alert Engine"],
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
    accuracy: "98% F1 Score",
    impact: "< 100ms API inference latency",
    stack: ["TensorFlow", "FastAPI", "Docker", "OpenCV", "React"],
    flow: ["PlantVillage", "CNN Training", "Evaluation", "FastAPI Serve", "React UI"],
    color: "#818cf8",
    tags: ["Computer Vision", "API Integrated", "MLOps Enabled"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
];

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
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="group relative rounded-2xl border overflow-hidden"
      style={{ background: "#0d1117", borderColor: `${p.color}28` }}
    >
      {/* Top accent */}
      <div className="h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${p.color}, transparent)` }} />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ boxShadow: `inset 0 0 0 1px ${p.color}40, 0 0 32px ${p.color}18` }}
      />

      <div className="p-6">
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
            <h3 className="text-lg font-bold text-white leading-snug">{p.title}</h3>
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

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-5">{p.description}</p>

        {/* Pipeline flow */}
        <div className="mb-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-600 mb-2">Pipeline Flow</p>
          <PipelineFlow steps={p.flow} color={p.color} />
        </div>

        {/* Metrics 2x2 */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {[
            { label: "Problem",  value: p.problem,  c: "#0ea5e9" },
            { label: "Dataset",  value: p.dataset,  c: "#818cf8" },
            { label: "Accuracy", value: p.accuracy, c: "#10b981" },
            { label: "Impact",   value: p.impact,   c: "#f59e0b" },
          ].map((m) => (
            <div key={m.label} className="p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.c }} />
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">{m.label}</span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium leading-snug">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Stack chips */}
        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 text-[10px] font-bold rounded-full font-mono"
              style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}30` }}
            >
              {s}
            </span>
          ))}
          {p.tags.map((t) => (
            <span key={t} className="px-2.5 py-1 text-[10px] font-semibold rounded-full border border-slate-700 text-slate-500">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main section ────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden" style={{ background: "#080d14" }}>
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 55%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] text-indigo-400 uppercase mb-3">Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Production AI Systems</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
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
                          background: "#080d14",
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
                        style={{ background: "#080d14", borderColor: p.color, color: p.color }}
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
