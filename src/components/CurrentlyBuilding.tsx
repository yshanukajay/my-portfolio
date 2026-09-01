"use client";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";

const commitData = [
  { m: "Nov", v: 14 }, { m: "Dec", v: 22 }, { m: "Jan", v: 18 },
  { m: "Feb", v: 35 }, { m: "Mar", v: 48 }, { m: "Apr", v: 62 }, { m: "May", v: 80 },
];

const project = {
  title: "Multi-Agentic Voice AI Pipeline",
  subtitle: "Autonomous Voice Agent Architecture",
  desc: "An end-to-end multi-agent conversational voice AI system featuring low-latency bidirectional audio streaming, autonomous tool orchestration, and real-time speech synthesis.",
  color: "#6366F1",
  progress: 72,
  stack: ["LangGraph", "FastAPI", "WebSockets", "Whisper", "Neural TTS", "Docker", "Python"],
  status: "Active Focus",
  features: [
    "Bidirectional WebSocket streaming with ultra-low latency",
    "Multi-agent coordination & autonomous tool execution via LangGraph",
    "Real-time voice activity detection (VAD) & speech-to-text pipeline",
    "Dynamic streaming neural audio generation & state management",
  ],
};

export default function CurrentlyBuilding() {
  return (
    <section id="building" className="py-24 relative overflow-hidden"
      style={{ background: "#F4F8FC" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse at 80% 50%, rgba(99,102,241,0.08) 0%, transparent 60%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-center gap-2.5 mb-2">
            <motion.span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"
              animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <p className="font-script text-3xl text-indigo-600">Active Development</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Currently Building</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-600 max-w-2xl mx-auto">
            Real-time focus and progress on my flagship active engineering build — pushing the boundaries of conversational AI and low-latency audio pipelines.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
          {/* Main Featured Project Card (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-2xl p-6 md:p-8 border flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(203,213,225,0.7)", boxShadow: "0 8px 30px rgba(15,23,42,0.06)" }}>

            <div>
              {/* Status Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}>
                  <motion.span className="w-2 h-2 rounded-full"
                    style={{ background: project.color }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.2, repeat: Infinity }} />
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: project.color }}>
                    {project.status}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium">Completion:</span>
                  <span className="text-sm font-bold font-mono" style={{ color: project.color }}>{project.progress}%</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{project.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">{project.desc}</p>

              {/* Key Architecture Highlights */}
              <div className="mb-6 space-y-2.5 bg-slate-50/80 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Core Highlights & Features</h4>
                {project.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <span className="text-indigo-500 font-bold mt-0.5">✦</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Progress & Tech Stack */}
            <div>
              <div className="mb-4">
                <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
                  <span>Development Milestone</span>
                  <span>Phase 3 of 4</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <motion.div className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${project.color}, #818CF8)` }}
                    initial={{ width: 0 }} whileInView={{ width: `${project.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }} />
                </div>
              </div>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="px-2.5 py-1 text-xs font-semibold rounded-lg font-mono"
                    style={{ background: `${project.color}14`, color: project.color, border: `1px solid ${project.color}25` }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* GitHub Activity & Live Pipeline Stream (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 rounded-2xl p-6 md:p-7 border flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)", borderColor: "rgba(203,213,225,0.7)", boxShadow: "0 8px 30px rgba(15,23,42,0.06)" }}>

            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(99,102,241,0.12)", color: "#6366F1" }}>
                  <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Commit Activity</h3>
                  <p className="text-[11px] text-slate-500">Active repo contributions</p>
                </div>
              </div>

              <div className="h-32 mb-5">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={commitData}>
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#818CF8", fontSize: 11 }}
                      labelStyle={{ color: "#94a3b8" }} />
                    <Area type="monotone" dataKey="v" stroke="#6366F1" strokeWidth={2.5} fill="url(#cg)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Live Terminal Stream */}
              <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    voice-agent-pipeline.log
                  </span>
                  <span>live</span>
                </div>
                {[
                  "Multi-Agentic Voice AI pipeline",
                  "Agent coordinator graph initialized",
                  "Low-latency audio streaming ready",
                  "Real-time Whisper STT connected",
                ].map((item, i) => (
                  <div key={item} className="flex items-center gap-2 text-slate-300 text-[11px]">
                    <motion.span className="text-indigo-400 font-bold"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}>›</motion.span>
                    <span>{item}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }}>█</motion.span>
                  <span className="text-slate-500 italic">Listening for voice stream...</span>
                </div>
              </div>
            </div>

            <a href="https://github.com/yshanukajay" target="_blank" rel="noopener noreferrer"
              className="mt-5 flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
              <span>View GitHub Repositories</span>
              <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
