"use client";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const commitData = [
  { m: "Nov", v: 14 }, { m: "Dec", v: 22 }, { m: "Jan", v: 18 },
  { m: "Feb", v: 35 }, { m: "Mar", v: 48 }, { m: "Apr", v: 62 }, { m: "May", v: 80 },
];

const builds = [
  {
    title: "Cattle Health AI Monitoring",
    desc: "Real-time IoT sensor ingestion + CNN-based anomaly detection with alerting pipeline.",
    color: "#10b981",
    progress: 72,
    stack: ["Kafka", "TensorFlow", "MongoDB", "FastAPI"],
    status: "In Progress",
  },
  {
    title: "CNN Tomato Disease Classifier",
    desc: "Transfer learning pipeline with automated retraining triggers and model versioning.",
    color: "#818cf8",
    progress: 88,
    stack: ["PyTorch", "MLflow", "Docker", "FastAPI"],
    status: "In Progress",
  },
  {
    title: "Streaming ML Inference Pipeline",
    desc: "Sub-100ms inference pipeline serving Kafka-triggered predictions via FastAPI endpoints.",
    color: "#0ea5e9",
    progress: 55,
    stack: ["Kafka", "Spark", "FastAPI", "Redis"],
    status: "In Progress",
  },

];

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="py-24 relative overflow-hidden"
      style={{ background: "#080d14" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(45,212,191,0.07) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <motion.span className="w-2 h-2 rounded-full bg-emerald-400"
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <p className="text-xs font-bold tracking-[0.25em] text-emerald-400 uppercase">Active Development</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Currently Building</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl mx-auto">
            Real-time progress on active engineering projects — because great systems are always evolving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Build cards (2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {builds.map((b, i) => (
              <motion.div key={b.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-5 border"
                style={{ background: "#0d1117", borderColor: "rgba(255,255,255,0.08)" }}>

                {/* Status badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 px-2.5 py-1 rounded-full"
                    style={{ background: `${b.color}15`, border: `1px solid ${b.color}30` }}>
                    <motion.span className="w-1.5 h-1.5 rounded-full"
                      style={{ background: b.color }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }} />
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: b.color }}>
                      {b.status}
                    </span>
                  </div>
                  <span className="text-xs font-bold font-mono" style={{ color: b.color }}>{b.progress}%</span>
                </div>

                <h3 className="font-bold text-white text-sm mb-2">{b.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{b.desc}</p>

                {/* Progress bar */}
                <div className="h-1 bg-slate-800 rounded-full mb-4 overflow-hidden">
                  <motion.div className="h-full rounded-full"
                    style={{ background: b.color }}
                    initial={{ width: 0 }} whileInView={{ width: `${b.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} />
                </div>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5">
                  {b.stack.map((s) => (
                    <span key={s} className="px-2 py-0.5 text-[10px] font-semibold rounded-md font-mono"
                      style={{ background: `${b.color}18`, color: b.color, border: `1px solid ${b.color}25` }}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub activity (1 col) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-2xl p-6 border"
            style={{ background: "#0d1117", borderColor: "rgba(255,255,255,0.08)" }}>

            <div className="flex items-center gap-3 mb-6">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              <div>
                <h3 className="font-bold text-white text-sm">Commit Activity</h3>
                <p className="text-[10px] text-slate-500">Last 7 months</p>
              </div>
            </div>

            <div className="h-32 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={commitData}>
                  <defs>
                    <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#10b981", fontSize: 11 }}
                    labelStyle={{ color: "#64748b" }} />
                  <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} fill="url(#cg)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {["Real-time cattle health AI", "CNN disease classifier", "Streaming inference pipeline"].map((item, i) => (
                <div key={item} className="flex items-center gap-2 text-slate-400">
                  <motion.span className="text-emerald-400"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, delay: i * 0.4, repeat: Infinity }}>›</motion.span>
                  {item}
                </div>
              ))}
              <div className="flex items-center gap-2 text-slate-600">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>█</motion.span>
              </div>
            </div>

            <a href="https://github.com/yshanukajay" target="_blank" rel="noopener noreferrer"
              className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              View GitHub Profile →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
