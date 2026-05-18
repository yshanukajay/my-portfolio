"use client";
import { motion } from "framer-motion";

const domains = [
  {
    title: "ML Engineering",
    color: "#818cf8",
    bg: "rgba(129,140,248,0.08)",
    border: "rgba(129,140,248,0.3)",
    items: ["CNN Architectures", "Model APIs", "FastAPI Serving", "Transfer Learning", "Prediction Systems", "Model Optimization"],
  },
  {
    title: "Data Engineering",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.3)",
    items: ["ETL Pipelines", "Kafka Streams", "Spark Processing", "MongoDB", "Data Lake Design", "Airflow Orchestration"],
  },
  {
    title: "MLOps",
    color: "#2dd4bf",
    bg: "rgba(45,212,191,0.08)",
    border: "rgba(45,212,191,0.3)",
    items: ["CI/CD Pipelines", "Docker & Kubernetes", "Model Monitoring", "MLflow Tracking", "GitHub Actions", "Cloud Deployment"],
  },
];

const counters = [
  { value: "50TB+", label: "Data Processed", color: "#0ea5e9" },
  { value: "20+",   label: "Models Deployed", color: "#818cf8" },
  { value: "99.9%", label: "Pipeline Uptime", color: "#10b981" },
  { value: "5+",    label: "APIs Built",       color: "#f59e0b" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(129,140,248,0.06) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold tracking-[0.25em] text-indigo-500 uppercase mb-3">What I Build</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Expertise</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 max-w-2xl mx-auto">
            I engineer intelligent systems at the intersection of machine learning, distributed data pipelines, and production infrastructure.
          </p>
        </motion.div>

        {/* 3-column domain cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {domains.map((domain, i) => (
            <motion.div key={domain.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden border"
              style={{ borderColor: domain.border, background: "white" }}>
              {/* Dark header */}
              <div className="px-6 py-5" style={{ background: domain.bg, borderBottom: `1px solid ${domain.border}` }}>
                <div className="flex items-center gap-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: domain.color }} />
                  <h3 className="font-bold text-slate-900 text-lg">{domain.title}</h3>
                </div>
              </div>
              {/* Items */}
              <ul className="px-6 py-5 space-y-2.5">
                {domain.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: domain.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Metric counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
          {counters.map((c, i) => (
            <motion.div key={c.label}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center">
              <div className="text-3xl font-bold mb-1" style={{ color: c.color }}>{c.value}</div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{c.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
