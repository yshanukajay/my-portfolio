"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Zap, Cloud, Server, GitMerge, Award, CheckCircle2 } from "lucide-react";

/* ─── Data ──────────────────────────────────────────────────────── */
const categories = [
  {
    id: "ml",
    label: "Machine Learning",
    color: "#818cf8",
    icon: Cpu,
    description: "Developing and deploying deep learning, computer vision, and predictive models using modern frameworks.",
    highlights: ["CNN & Transfer Learning", "PyTorch & TensorFlow", "Model Optimization"],
    stats: { label: "Average Skill", value: "86%" },
    tools: [
      { name: "TensorFlow",   level: 90, learning: false },
      { name: "PyTorch",      level: 85, learning: false },
      { name: "Scikit-learn", level: 88, learning: false },
      { name: "OpenCV",       level: 80, learning: false },
      { name: "XGBoost",      level: 82, learning: false },
      { name: "Keras",        level: 86, learning: false },
    ],
  },
  {
    id: "de",
    label: "Data Engineering",
    color: "#f59e0b",
    icon: Database,
    description: "Designing reliable, high-throughput ingestion and distributed data processing pipelines.",
    highlights: ["Kafka Message Brokers", "Spark Distributed Compute", "Airflow Orchestration"],
    stats: { label: "Data Volumes", value: "Terabytes" },
    tools: [
      { name: "Apache Kafka", level: 85, learning: false },
      { name: "Apache Spark", level: 82, learning: false },
      { name: "Airflow",      level: 80, learning: false },
      { name: "Delta Lake",   level: 75, learning: false },
      { name: "dbt",          level: 60, learning: true  },
      { name: "Hadoop",       level: 55, learning: true  },
    ],
  },
  {
    id: "be",
    label: "Backend & APIs",
    color: "#10b981",
    icon: Zap,
    description: "Building robust, secure, and low-latency APIs and server-side logic to power intelligent applications.",
    highlights: ["FastAPI Microservices", "High Performance Routers", "Scalable REST Architectures"],
    stats: { label: "P95 Latency", value: "< 20ms" },
    tools: [
      { name: "FastAPI",   level: 90, learning: false },
      { name: "Flask",     level: 85, learning: false },
      { name: "Node.js",   level: 75, learning: false },
      { name: "REST APIs", level: 88, learning: false },
      { name: "GraphQL",   level: 55, learning: true  },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    color: "#0ea5e9",
    icon: Cloud,
    description: "Orchestrating cloud infrastructure, automated CI/CD deployments, and high-availability systems.",
    highlights: ["Docker Containerization", "Kubernetes Scaling", "Infrastructure as Code"],
    stats: { label: "Uptime Goal", value: "99.9%" },
    tools: [
      { name: "Docker",          level: 88, learning: false },
      { name: "AWS",             level: 78, learning: false },
      { name: "GitHub Actions",  level: 85, learning: false },
      { name: "NGINX",           level: 75, learning: false },
      { name: "Kubernetes",      level: 60, learning: true  },
      { name: "Terraform",       level: 50, learning: true  },
    ],
  },
  {
    id: "db",
    label: "Databases",
    color: "#f97316",
    icon: Server,
    description: "Modeling relational, document, and vector storage mechanisms tailored for specific queries.",
    highlights: ["SQL Query Tuning", "NoSQL Document Stores", "Vector Indexing (Pinecone)"],
    stats: { label: "Data Integrity", value: "ACID Compliant" },
    tools: [
      { name: "MongoDB",    level: 88, learning: false },
      { name: "PostgreSQL", level: 85, learning: false },
      { name: "Redis",      level: 80, learning: false },
      { name: "Pinecone",   level: 55, learning: true  },
    ],
  },
  {
    id: "mlops",
    label: "MLOps",
    color: "#2dd4bf",
    icon: GitMerge,
    description: "Automating the lifecycle of machine learning models from experiment tracking to system monitoring.",
    highlights: ["MLflow Experiment Logs", "DVC Data Versioning", "Prometheus & Grafana Alerting"],
    stats: { label: "Feedback Loop", value: "Automated" },
    tools: [
      { name: "MLflow",     level: 85, learning: false },
      { name: "DVC",        level: 78, learning: false },
      { name: "Prometheus", level: 80, learning: false },
      { name: "Grafana",    level: 75, learning: false },
      { name: "W&B",        level: 60, learning: true  },
    ],
  },
];

/* ─── Radial progress ring ──────────────────────────────────────── */
function Ring({ pct, color, size = 44 }: { pct: number; color: string; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#e2e8f0" strokeWidth={3} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ - (pct / 100) * circ }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ─── Single tool card ──────────────────────────────────────────── */
function ToolCard({
  name, level, color, learning, delay,
}: {
  name: string; level: number; color: string; learning: boolean; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="group relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-slate-200 bg-white cursor-default select-none shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
    >
      {/* Hover accent */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 4px 20px ${color}18`, border: `1px solid ${color}35` }} />

      {/* Ring */}
      <div className="relative flex-shrink-0">
        <Ring pct={level} color={color} size={40} />
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono"
          style={{ color, transform: "rotate(0deg)" }}>
          {level}
        </span>
      </div>

      {/* Name + badge */}
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-slate-800 truncate block">{name}</span>
        {learning && (
          <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-bold uppercase tracking-wider"
            style={{ color }}>
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: color }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Learning
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Main Section ──────────────────────────────────────────────── */
export default function TechStack() {
  const [activeId, setActiveId] = useState("ml");

  const activeCat = categories.find((c) => c.id === activeId);
  const displayTools = (activeCat?.tools ?? []).map((t) => ({
    ...t,
    catId: activeId,
    catLabel: activeCat?.label ?? "",
    color: activeCat?.color ?? "#fff",
  }));

  const ActiveIcon = activeCat?.icon;

  return (
    <section
      id="stack"
      className="py-24 relative overflow-hidden bg-white border-y border-slate-100"
    >
      {/* Subtle engineering grid background */}
      <div
        className="absolute inset-0 pointer-events-none select-none transition-all duration-700 ease-in-out"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${activeCat?.color || "#0ea5e9"}1a 1.2px, transparent 1.2px),
            linear-gradient(to bottom, ${activeCat?.color || "#0ea5e9"}1a 1.2px, transparent 1.2px)
          `,
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(99,102,241,0.05) 0%, transparent 45%), radial-gradient(circle at 85% 80%, rgba(14,165,233,0.05) 0%, transparent 45%)",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-bold tracking-[0.25em] text-sky-600 uppercase mb-3">
            Tools &amp; Frameworks
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Technology Ecosystem
          </h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            A curated stack I use to build scalable ML systems, data pipelines, and cloud-native infrastructure.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-10"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => {
            const isActive = activeId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveId(cat.id)}
                className="relative px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200"
                style={{
                  color: isActive ? cat.color : "#64748b",
                  background: isActive ? `${cat.color}12` : "transparent",
                  border: `1px solid ${isActive ? `${cat.color}50` : "#e2e8f0"}`,
                  boxShadow: isActive ? `0 2px 12px ${cat.color}20` : "none",
                }}
              >
                {cat.label}
                {isActive && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: `${cat.color}15` }}
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mb-10 text-xs text-slate-500">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300 inline-block" />
            Proficient
          </span>
          <span className="flex items-center gap-2">
            <motion.span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: "#818cf8" }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
            Currently Learning
          </span>
        </div>

        {/* Main Content Layout - 2 Columns Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-6xl mx-auto mt-6">
          {/* Left Column: Category Summary Card (lg:col-span-5) */}
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-5 flex flex-col justify-between p-6 md:p-8 rounded-3xl border border-slate-200/80 bg-white/85 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group"
          >
            {/* Soft colored glow inside the card matching category */}
            <div 
              className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-[60px] opacity-10 transition-all duration-700 pointer-events-none"
              style={{ backgroundColor: activeCat?.color }}
            />

            <div>
              {/* Category Icon and Label */}
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{ 
                    backgroundColor: `${activeCat?.color}12`,
                    color: activeCat?.color 
                  }}
                >
                  {ActiveIcon && <ActiveIcon size={24} />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">
                    {activeCat?.label}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Ecosystem Focus
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {activeCat?.description}
              </p>

              {/* Highlights */}
              <div className="space-y-3 mb-8">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Core Competencies
                </h4>
                {activeCat?.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-medium">
                    <CheckCircle2 size={14} className="flex-shrink-0" style={{ color: activeCat?.color }} />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Stats strip */}
            <div 
              className="pt-6 border-t border-slate-100 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {activeCat?.stats.label}
                </span>
                <span className="text-sm font-extrabold text-slate-800">
                  {activeCat?.stats.value}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-50 border border-slate-100 text-slate-500">
                <Award size={10} style={{ color: activeCat?.color }} />
                <span>Verified Stack</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Tools Grid (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayTools.map((tool, i) => (
                <ToolCard
                  key={`${activeId}-${tool.name}`}
                  name={tool.name}
                  level={tool.level}
                  color={tool.color}
                  learning={tool.learning}
                  delay={i * 0.03}
                />
              ))}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
