"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu, Cloud, GitMerge, Database, Zap, type LucideIcon } from "lucide-react";

type Domain = {
  icon: LucideIcon;
  title: string;
  summary: string;
  metric: { label: string; value: string };
  color: string;
  flow: string[];
  capabilities: string[];
};

const domains: Domain[] = [
  {
    icon: Cpu,
    title: "ML Engineering",
    summary: "Train, evaluate, and serve models with low-latency APIs.",
    metric: { label: "Inference", value: "< 100ms" },
    color: "#6366f1",
    flow: ["Features", "Training", "Serving"],
    capabilities: [
      "CNN & transfer learning",
      "Model APIs & FastAPI",
      "Prediction systems",
      "Model optimization",
    ],
  },
  {
    icon: Database,
    title: "Data Engineering",
    summary: "Reliable ingestion, transformation, and storage at scale.",
    metric: { label: "Throughput", value: "10k+ /s" },
    color: "#0ea5e9",
    flow: ["Ingest", "Transform", "Store"],
    capabilities: [
      "Kafka & Spark pipelines",
      "Airflow orchestration",
      "Data lakes & MongoDB",
      "ETL & data quality",
    ],
  },
  {
    icon: GitMerge,
    title: "MLOps",
    summary: "Automated deploys, monitoring, and reproducible ML workflows.",
    metric: { label: "Deploy", value: "< 3 min" },
    color: "#10b981",
    flow: ["Build", "Deploy", "Monitor"],
    capabilities: [
      "Docker & Kubernetes",
      "CI/CD & GitHub Actions",
      "MLflow tracking",
      "Observability & alerts",
    ],
  },
];

function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-1.5">
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200"
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-slate-300 text-sm" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
      <span className="sr-only">Pipeline: {steps.join(" to ")}</span>
    </div>
  );
}

function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const Icon = domain.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-2xl p-6 md:p-7 flex flex-col h-full bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${domain.color}12`, color: domain.color }}
          >
            <Icon size={20} strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-lg leading-tight">{domain.title}</h3>
            <p className="text-sm text-slate-500 mt-1 leading-snug">{domain.summary}</p>
          </div>
        </div>
        <div
          className="text-right flex-shrink-0 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {domain.metric.label}
          </p>
          <p className="text-sm font-bold tabular-nums" style={{ color: domain.color }}>
            {domain.metric.value}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Pipeline
        </p>
        <FlowSteps steps={domain.flow} />
      </div>

      <div className="mt-auto pt-5 border-t border-slate-100">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          Capabilities
        </p>
        <ul className="space-y-2">
          {domain.capabilities.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: domain.color }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative">
      {/* Engineering Mindset — white */}
      <div className="py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 90%, rgba(99,102,241,0.04) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-px w-8 bg-indigo-500" />
              <p className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase">
                Engineering Mindset
              </p>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
              Building{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">
                Scalable
              </span>{" "}
              ML &amp; Data Systems.
            </h2>
            <div className="text-slate-600">
              <p className="leading-relaxed font-medium text-slate-800 text-xl">
                I focus on building intelligent systems at the intersection of machine learning and data engineering, 
                designing high-throughput distributed pipelines and deploying production-ready models that solve complex real-world challenges.
              </p>
              <p className="leading-relaxed mt-4">
                My goal is to develop production-ready machine learning workflows supported by reliable
                data infrastructure, modern backend systems, and scalable cloud architectures.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-indigo-200 transition-colors duration-500">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Particularly Interested In
                  </span>
                </div>
                <ul className="space-y-3">
                  {[
                    { icon: GitMerge, text: "MLOps & Automation", color: "text-rose-500", bg: "bg-rose-500/10" },
                    { icon: Terminal, text: "Data Engineering Pipelines", color: "text-sky-500", bg: "bg-sky-500/10" },
                    { icon: Cpu, text: "Machine Learning Systems", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    { icon: Cloud, text: "Cloud-Based Systems", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { icon: Database, text: "Distributed Data Processing", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { icon: Zap, text: "Backend Infrastructure", color: "text-cyan-500", bg: "bg-cyan-500/10" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color}`}>
                        <item.icon size={16} strokeWidth={2.5} />
                      </div>
                      <span className="text-slate-700 font-semibold text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
          </div>
        </div>
      </div>

      {/* Core Expertise — full-bleed with side decorations */}
      <div className="w-full bg-slate-50 border-y border-slate-100 py-24 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-indigo-500 uppercase mb-3">
              Engineering Focus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Expertise</h2>
            <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-5" />
            <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Three focused areas — each with a clear pipeline and the capabilities I bring to production systems.
            </p>
          </motion.div>

          {/* Full-bleed 5-column layout: left accent | cards | right accent */}
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-6 items-start">

            {/* ── Left accent panel ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* System stats */}
              {[
                { label: "Models Deployed", value: "12+", color: "#818cf8" },
                { label: "Pipeline Uptime", value: "99.9%", color: "#10b981" },
                { label: "Avg Latency",     value: "< 100ms", color: "#0ea5e9" },
                { label: "Data Processed",  value: "10TB+",  color: "#f59e0b" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="rounded-2xl p-4 border border-slate-200 bg-white shadow-sm"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xl font-extrabold font-mono" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}

              {/* Decorative dot grid */}
              <div className="mt-2 opacity-30">
                <svg width="100%" viewBox="0 0 180 80">
                  {Array.from({ length: 6 }).map((_, row) =>
                    Array.from({ length: 10 }).map((_, col) => (
                      <motion.circle
                        key={`${row}-${col}`}
                        cx={col * 18 + 9} cy={row * 14 + 7} r={1.8}
                        fill="#6366f1"
                        animate={{ opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 2 + (row + col) * 0.3, repeat: Infinity, delay: (row + col) * 0.15 }}
                      />
                    ))
                  )}
                </svg>
              </div>
            </motion.div>

            {/* ── Center: 3 domain cards ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {domains.map((domain, i) => (
                <DomainCard key={domain.title} domain={domain} index={i} />
              ))}
            </div>

            {/* ── Right accent panel ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* Mini pipeline steps */}
              <div className="rounded-2xl p-4 border border-slate-200 bg-white shadow-sm">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  ML Lifecycle
                </div>
                {["Data Ingest", "Feature Eng", "Training", "Evaluation", "Deployment", "Monitoring"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 mb-2 last:mb-0">
                    <motion.div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: ["#f59e0b","#818cf8","#818cf8","#10b981","#0ea5e9","#f97316"][i] }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.8, delay: i * 0.25, repeat: Infinity }}
                    />
                    <span className="text-xs font-semibold text-slate-600">{step}</span>
                    {i < 5 && <div className="ml-auto w-4 h-px bg-slate-200" />}
                  </div>
                ))}
              </div>

              {/* Stack highlight */}
              {[
                { tech: "Kafka", role: "Ingest",  color: "#f59e0b" },
                { tech: "Spark", role: "Process", color: "#0ea5e9" },
                { tech: "MLflow",role: "Track",   color: "#10b981" },
                { tech: "K8s",   role: "Deploy",  color: "#2dd4bf" },
              ].map((item, i) => (
                <motion.div
                  key={item.tech}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  <motion.span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: item.color }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, delay: i * 0.3, repeat: Infinity }}
                  />
                  <span className="text-sm font-bold text-slate-800">{item.tech}</span>
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.role}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
