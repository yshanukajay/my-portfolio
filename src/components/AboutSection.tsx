"use client";
import { motion } from "framer-motion";
import { Terminal, Cpu, Cloud, GitMerge } from "lucide-react";

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

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 10% 90%, rgba(99,102,241,0.03) 0%, transparent 50%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        
        {/* ── PART 1: Engineering Mindset & Identity Side Card ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          
          {/* Left: Engineering Mindset */}
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
              Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-sky-500">Intelligent</span> Systems.
            </h2>
            
            <div className="prose prose-lg text-slate-600 mb-8">
              <p className="leading-relaxed font-medium text-slate-800 text-xl">
                I focus on designing intelligent systems that combine machine learning, scalable data engineering, and cloud infrastructure to solve real-world problems efficiently.
              </p>
              <p className="leading-relaxed mt-6">
                My goal is to engineer production-ready AI systems that bridge experimental machine learning models with highly reliable data platforms and modern cloud architectures. I build for scale, automation, and resilience.
              </p>
            </div>
          </motion.div>

          {/* Right: The Small Side Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} 
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-indigo-200 transition-colors duration-500">
              
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors duration-500" />

              <div className="relative z-10">
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Currently</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 leading-snug">
                    Building ML systems &amp; real-time data pipelines
                  </h3>
                </div>

                <div className="h-px w-full bg-slate-200 mb-8" />

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-5">
                    Focus Areas
                  </span>
                  
                  <ul className="space-y-4">
                    {[
                      { icon: GitMerge, text: "MLOps", color: "text-rose-500", bg: "bg-rose-500/10" },
                      { icon: Terminal, text: "Distributed Systems", color: "text-sky-500", bg: "bg-sky-500/10" },
                      { icon: Cpu, text: "AI Infrastructure", color: "text-indigo-500", bg: "bg-indigo-500/10" },
                      { icon: Cloud, text: "Cloud Engineering", color: "text-emerald-500", bg: "bg-emerald-500/10" }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                          <item.icon size={18} strokeWidth={2.5} />
                        </div>
                        <span className="text-slate-700 font-semibold">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── PART 2: Engineering Focus (Domain Cards) ── */}
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold tracking-[0.25em] text-indigo-500 uppercase mb-3">Engineering Focus</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Expertise</h2>
            <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {domains.map((domain, i) => (
              <motion.div key={domain.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
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
                    <li key={item} className="flex items-center gap-3 text-sm text-slate-700 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: domain.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
