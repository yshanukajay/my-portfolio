"use client";
import { motion } from "framer-motion";
import { Zap, GitBranch, Activity } from "lucide-react";

const pipelines = [
  {
    icon: <GitBranch size={20} />,
    iconColor: "var(--color-accent-primary)",
    title: "Training Pipeline",
    metric: { label: "Throughput", value: "1.2M events/s" },
    steps: [
      { name: "Data Validation", color: "var(--color-warning)" },
      { name: "Preprocessing", color: "var(--color-accent-primary)" },
      { name: "Feature Engineering", color: "var(--color-accent-secondary)" },
      { name: "Model Training", color: "var(--color-success)" },
      { name: "Evaluation", color: "var(--color-accent-primary)" },
      { name: "MLflow Tracking", color: "var(--color-accent-secondary)" },
    ],
  },
  {
    icon: <Zap size={20} />,
    iconColor: "var(--color-accent-secondary)",
    title: "Deployment Pipeline",
    metric: { label: "Deploy Time", value: "< 3 min" },
    steps: [
      { name: "Docker Build", color: "var(--color-accent-primary)" },
      { name: "FastAPI Serving", color: "var(--color-warning)" },
      { name: "CI/CD Actions", color: "var(--color-accent-secondary)" },
      { name: "Cloud Deployment", color: "var(--color-accent-primary)" },
    ],
  },
  {
    icon: <Activity size={20} />,
    iconColor: "var(--color-warning)",
    title: "Monitoring Pipeline",
    metric: { label: "SLA Uptime", value: "99.98%" },
    steps: [
      { name: "Prediction Logs", color: "var(--color-warning)" },
      { name: "Drift Detection", color: "var(--color-accent-secondary)" },
      { name: "Data Quality", color: "var(--color-success)" },
      { name: "Performance Monitor", color: "var(--color-accent-primary)" },
      { name: "Alert & Retrain", color: "var(--color-danger)" },
    ],
  },
];

function PipelineCard({ pipeline, delay }: { pipeline: typeof pipelines[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay }}
      className="rounded-2xl overflow-hidden border"
      style={{ background: "#0d1117", borderColor: "rgba(255,255,255,0.08)" }}>

      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${pipeline.iconColor}20`, color: pipeline.iconColor }}>
            {pipeline.icon}
          </div>
          <h3 className="font-bold text-white">{pipeline.title}</h3>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">{pipeline.metric.label}</div>
          <div className="text-sm font-bold font-mono" style={{ color: pipeline.iconColor }}>{pipeline.metric.value}</div>
        </div>
      </div>

      {/* Steps */}
      <div className="p-6 space-y-3">
        {pipeline.steps.map((step, idx) => (
          <div key={step.name} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: delay + idx * 0.08 }}
              className="w-full flex items-center gap-3 py-2.5 px-4 rounded-xl"
              style={{
                background: `color-mix(in srgb, ${step.color} 6%, transparent)`,
                border: `1px solid color-mix(in srgb, ${step.color} 15%, transparent)`
              }}>
              <motion.div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: step.color }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
                transition={{ duration: 1.8, delay: idx * 0.25, repeat: Infinity }} />
              <span className="text-sm font-semibold" style={{ color: step.color }}>{step.name}</span>
            </motion.div>

            {/* Animated connector */}
            {idx < pipeline.steps.length - 1 && (
              <div className="relative flex flex-col items-center my-1" style={{ height: 20 }}>
                <motion.div className="w-px flex-1" style={{ background: `color-mix(in srgb, ${step.color} 25%, transparent)` }}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: delay + idx * 0.1 }} />
                <motion.div className="absolute rounded-full" style={{ width: 5, height: 5, background: step.color }}
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 1.5, delay: idx * 0.4, repeat: Infinity, ease: "linear" }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function MLOpsPipelines() {
  return (
    <section id="pipelines" className="py-24 relative overflow-hidden"
      style={{ background: "#080d14" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.1) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold tracking-[0.25em] text-indigo-400 uppercase mb-3">End-to-End Workflows</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">MLOps & Data Pipelines</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            Standardizing the machine learning lifecycle from data ingestion to production monitoring.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pipelines.map((pipeline, i) => (
            <PipelineCard key={pipeline.title} pipeline={pipeline} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}
