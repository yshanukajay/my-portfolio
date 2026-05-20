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
                I focus on building intelligent data systems that combine machine learning,
                distributed data pipelines, and cloud technologies to solve real-world problems efficiently.
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

      {/* Core Expertise — full-width band (site background tone) */}
      <div className="w-full bg-slate-50 border-y border-slate-100 py-24">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {domains.map((domain, i) => (
                <DomainCard key={domain.title} domain={domain} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
