"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

/* ─── Data ──────────────────────────────────────────────────────── */
const categories = [
  {
    id: "ml",
    label: "Machine Learning",
    color: "#818cf8",
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
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative flex items-center gap-3 px-4 py-3.5 rounded-xl border border-slate-200 bg-white cursor-default select-none shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200"
    >
      {/* Hover accent */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
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

  return (
    <section
      id="stack"
      className="py-24 relative overflow-hidden bg-white border-y border-slate-100"
    >
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

        {/* Tool grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {displayTools.map((tool, i) => (
              <ToolCard
                key={`${tool.catId ?? "all"}-${tool.name}`}
                name={tool.name}
                level={tool.level}
                color={tool.color}
                learning={tool.learning}
                delay={i * 0.03}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="text-center text-xs text-slate-400 mt-10 font-mono"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
          Ring % = self-assessed proficiency · actively expanding the stack
        </motion.p>
      </div>
    </section>
  );
}
