"use client";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

const GithubIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* Mini animated pipeline SVG for the right panel */
function MiniPipeline({ steps, color }: { steps: string[]; color: string }) {
  return (
    <svg viewBox={`0 0 200 ${steps.length * 48 + 8}`} className="w-full h-full">
      <defs>
        <filter id="mpg" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {steps.map((step, i) => {
        const y = i * 48 + 24;
        const nextY = (i + 1) * 48 + 24;
        return (
          <g key={step}>
            {/* Node */}
            <motion.rect x={20} y={y - 16} width={160} height={32} rx={8}
              fill={`${color}15`} stroke={color} strokeWidth={1}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.15 }} />
            <motion.circle cx={36} cy={y} r={4} fill={color}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.8, delay: i * 0.3, repeat: Infinity }} />
            <text x={100} y={y + 4} textAnchor="middle" fontSize={9}
              fill="rgba(255,255,255,0.85)" fontFamily="monospace" fontWeight="700">
              {step}
            </text>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <g>
                <motion.line x1={100} y1={y + 16} x2={100} y2={nextY - 16}
                  stroke={color} strokeWidth={1.5} opacity={0.4}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.15 }} />
                {/* traveling dot */}
                <motion.circle r={3} fill={color}
                  style={{ filter: `drop-shadow(0 0 4px ${color})` }}
                  animate={{ cy: [y + 16, nextY - 16] }}
                  transition={{ duration: 1.4, delay: 0.8 + i * 0.5, repeat: Infinity, ease: "linear" }}
                  cx={100} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

const projects = [
  {
    title: "Real-Time Streaming Pipeline",
    badge: "Real-Time",
    badgeColor: "#0ea5e9",
    label: "Distributed · Stream Processing",
    description: "End-to-end streaming pipeline handling high-throughput event data with sub-500ms latency. Replaced batch jobs causing 24-hour reporting delays.",
    problem: "24-hour delays in critical metric reporting due to batch processing.",
    dataset: "10TB+ clickstream events via Kafka",
    accuracy: "10k events/sec throughput",
    metric: "24h → <500ms latency",
    stack: ["Kafka", "Spark Streaming", "MongoDB", "FastAPI", "Docker"],
    flow: ["Kafka Ingest", "Spark Stream", "Aggregation", "MongoDB Store", "Dashboard"],
    color: "#0ea5e9",
    tags: ["Real-Time", "Distributed", "MLOps Enabled"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
  {
    title: "Cattle Health Monitoring System",
    badge: "Edge AI",
    badgeColor: "#10b981",
    label: "IoT · ML Prediction · Alerting",
    description: "IoT-driven pipeline combining streaming sensor ingestion with ML prediction to monitor livestock health patterns and trigger real-time alerts.",
    problem: "Manual monitoring caused late disease detection and yield loss.",
    dataset: "IoT Sensor Data (Temp, Motion, Heart Rate)",
    accuracy: "94% prediction accuracy",
    metric: "30% reduction in severe illness",
    stack: ["Python", "MongoDB", "FastAPI", "TensorFlow", "Kafka"],
    flow: ["IoT Sensors", "Ingestion API", "Preprocessing", "ML Predict", "Alert Engine"],
    color: "#10b981",
    tags: ["Edge AI", "API Integrated", "Computer Vision"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
  {
    title: "Tomato Leaf Disease Classifier",
    badge: "Computer Vision",
    badgeColor: "#818cf8",
    label: "CNN · FastAPI · Docker Serving",
    description: "Production-grade CNN microservice for automated crop disease diagnosis. Sub-100ms inference latency with containerized deployment pipeline.",
    problem: "Farmers needed reliable automated API for rapid field image diagnosis.",
    dataset: "PlantVillage: 50,000+ labeled images",
    accuracy: "98% F1 Score",
    metric: "<100ms API inference",
    stack: ["TensorFlow", "FastAPI", "Docker", "OpenCV", "React"],
    flow: ["PlantVillage", "CNN Training", "Evaluation", "FastAPI Serve", "React UI"],
    color: "#818cf8",
    tags: ["Computer Vision", "API Integrated", "MLOps Enabled"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold tracking-[0.25em] text-indigo-500 uppercase mb-3">Case Studies</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Production AI Systems</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 max-w-2xl mx-auto">
            Deep-dive into the architecture, challenges, and metrics behind intelligent systems I&apos;ve engineered.
          </p>
        </motion.div>

        <div className="space-y-8 max-w-6xl mx-auto">
          {projects.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5">

                {/* LEFT: Details (3 cols) */}
                <div className="lg:col-span-3 p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full"
                          style={{ background: `${p.badgeColor}18`, color: p.badgeColor, border: `1px solid ${p.badgeColor}35` }}>
                          {p.badge}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{p.label}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <a href={p.links.github} target="_blank" rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-slate-900 transition-colors bg-slate-100 rounded-lg">
                        <GithubIcon />
                      </a>
                      <a href={p.links.demo} target="_blank" rel="noopener noreferrer"
                        className="p-2 transition-colors bg-slate-100 rounded-lg"
                        style={{ color: p.color }}>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{p.description}</p>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      { label: "Problem", value: p.problem, color: "#0ea5e9" },
                      { label: "Dataset", value: p.dataset, color: "#818cf8" },
                      { label: "Accuracy", value: p.accuracy, color: "#10b981" },
                      { label: "Impact",   value: p.metric,   color: "#f59e0b" },
                    ].map((m) => (
                      <div key={m.label} className="p-3 bg-white border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{m.label}</span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium leading-snug">{m.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="px-2.5 py-1 text-[11px] font-bold rounded-full text-white"
                        style={{ background: p.color }}>
                        {s}
                      </span>
                    ))}
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 text-[11px] font-semibold rounded-full border"
                        style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}0d` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Animated pipeline (2 cols) */}
                <div className="lg:col-span-2 p-6 flex items-center justify-center"
                  style={{ background: "#0d1117", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="w-full" style={{ maxHeight: 300, height: `${p.flow.length * 48 + 16}px` }}>
                    <MiniPipeline steps={p.flow} color={p.color} />
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
