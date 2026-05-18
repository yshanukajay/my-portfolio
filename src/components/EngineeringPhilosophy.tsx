"use client";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Scalability",
    color: "#818cf8",
    desc: "Systems that grow with demand. Every pipeline I build is designed to handle 10× the expected load from day one.",
    icon: "⬡",
  },
  {
    title: "Reliability",
    color: "#10b981",
    desc: "99.9% uptime is the baseline. I engineer fault-tolerant architectures with graceful degradation and self-healing capabilities.",
    icon: "◈",
  },
  {
    title: "Observability",
    color: "#f59e0b",
    desc: "You can't improve what you can't measure. Every system ships with metrics, logs, and alerting baked in from the start.",
    icon: "◎",
  },
];

const articles = [
  "Building an End-to-End ML Pipeline with Kafka & Spark",
  "Deploying ML Models with FastAPI & Docker",
  "Kubernetes for ML Engineers — A Practical Guide",
  "Batch vs Streaming: When to Use Which",
];

export default function EngineeringPhilosophy() {
  return (
    <section id="philosophy" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle network lines bg */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <svg className="w-full h-full">
          <defs>
            <pattern id="net" width={80} height={80} patternUnits="userSpaceOnUse">
              <circle cx={40} cy={40} r={1} fill="rgba(99,102,241,0.2)" />
              <line x1={40} y1={40} x2={80} y2={0}   stroke="rgba(99,102,241,0.06)" strokeWidth={0.8} />
              <line x1={40} y1={40} x2={80} y2={80}  stroke="rgba(99,102,241,0.06)" strokeWidth={0.8} />
              <line x1={40} y1={40} x2={0}  y2={80}  stroke="rgba(99,102,241,0.06)" strokeWidth={0.8} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#net)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold tracking-[0.25em] text-indigo-500 uppercase mb-3">How I Think</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Engineering Philosophy</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-8" />

          {/* Main quote */}
          <blockquote className="max-w-3xl mx-auto text-xl md:text-2xl font-medium text-slate-700 leading-relaxed border-l-4 border-indigo-400 pl-6 text-left">
            I focus on building{" "}
            <span className="text-indigo-600 font-bold">scalable, production-ready AI systems</span>{" "}
            that combine machine learning, distributed data pipelines, and efficient backend infrastructure —
            not just models, but{" "}
            <span className="text-slate-900 font-bold">intelligent systems</span>.
          </blockquote>
        </motion.div>

        {/* 3 pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {pillars.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-7 border border-slate-100">
              <div className="text-3xl mb-4" style={{ color: p.color }}>{p.icon}</div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              <div className="mt-4 h-0.5 rounded-full" style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Technical Writing */}
        <motion.div className="max-w-5xl mx-auto glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Technical Writing</h3>
            <a href="#" className="text-xs font-semibold text-indigo-500 hover:text-indigo-600">View All →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {articles.map((a, i) => (
              <a key={a} href="#"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700 group-hover:text-indigo-700 transition-colors font-medium">{a}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
