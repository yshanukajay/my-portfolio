"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Download, Database, Cog, Cpu, Server } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const titles = [
  "Machine Learning Engineer",
  "MLOps Enthusiast",
  "Data Engineer",
  "ML Systems Developer",
];

export default function HeroSection() {
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 pb-10 overflow-hidden bg-slate-50">
      
      {/* Floating Data Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => {
          // Deterministic pseudo-random values to prevent hydration mismatches
          const pseudoRandomX = (i * 37) % 100;
          const pseudoRandomY = 100 + (i * 13) % 100;
          const duration = 10 + (i % 5) * 2;
          const delay = (i % 3) * 1.5;
          
          return (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0, 
                y: pseudoRandomY, 
                left: `${pseudoRandomX}%`
              }}
              animate={{ 
                opacity: [0, 0.5, 0], 
                y: -100 
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-sky-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
            />
          );
        })}
      </div>

      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Side: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex items-center space-x-2">
            <span className="h-px w-8 bg-sky-500"></span>
            <p className="text-sm font-semibold tracking-wider text-sky-600 uppercase">
              Hello, I&apos;m
            </p>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight">
            Yohan Shanuka
          </h1>

          <div className="h-10 text-2xl md:text-3xl font-medium text-slate-600">
            <AnimatePresence mode="wait">
              <motion.span
                key={titleIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="inline-block text-gradient"
              >
                {titles[titleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
            I design scalable machine learning workflows, production-grade data pipelines, and cloud-ready ML systems.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors flex items-center gap-2"
            >
              View Projects <ArrowRight size={18} />
            </a>
            <a
              href="#"
              className="px-6 py-3 bg-white border border-slate-200 text-slate-800 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              Download Resume <Download size={18} />
            </a>
            <a
              href="https://github.com/yshanukajay"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white border border-slate-200 text-slate-800 rounded-lg hover:bg-slate-50 hover:text-sky-600 transition-colors shadow-sm"
            >
              <GithubIcon size={20} />
            </a>
          </div>
        </motion.div>

        {/* Right Side: Abstract Pipeline Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:flex justify-center items-center h-[500px] w-full max-w-md"
        >
          {/* Ambient Background Glow */}
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.05, 0.9] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 bg-sky-500/20 blur-3xl rounded-full pointer-events-none"
          />

          {/* Inner Pipeline Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden flex flex-col items-center justify-center p-8 bg-[#0D1117] z-10 shadow-2xl border border-slate-800">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent pointer-events-none"></div>
              
              {/* The Central Pipeline Line */}
              <div className="absolute top-12 bottom-12 w-px bg-slate-800 left-1/2 -translate-x-1/2">
              {/* Moving Data Particles */}
              <motion.div 
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 -translate-x-1/2 w-1.5 h-8 rounded-full bg-gradient-to-b from-sky-400 to-transparent shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              />
            </div>

            <div className="w-full flex flex-col justify-between h-full relative z-10 py-4">
              
              {/* Node 1: Ingestion */}
              <div className="w-full flex items-center justify-between">
                <div className="w-[45%] flex justify-end">
                  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-lg w-full text-right transition-colors">
                    <p className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-0.5">Ingestion</p>
                    <p className="text-slate-400 text-[10px] font-mono">Kafka / AWS S3</p>
                  </div>
                </div>
                <motion.div 
                  animate={{ 
                    borderColor: ["#334155", "#38bdf8", "#334155"],
                    boxShadow: ["0px 0px 15px rgba(0,0,0,0.5)", "0px 0px 20px rgba(56,189,248,0.8)", "0px 0px 15px rgba(0,0,0,0.5)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, times: [0, 0.1, 0.3], ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-[#0D1117] border-2 flex items-center justify-center relative z-20"
                >
                  <Database size={16} className="text-sky-400" />
                </motion.div>
                <div className="w-[45%]"></div>
              </div>

              {/* Node 2: Processing */}
              <div className="w-full flex items-center justify-between flex-row-reverse">
                <div className="w-[45%] flex justify-start">
                  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-lg w-full text-left transition-colors">
                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-0.5">Processing</p>
                    <p className="text-slate-400 text-[10px] font-mono">Apache Spark</p>
                  </div>
                </div>
                <motion.div 
                  animate={{ 
                    borderColor: ["#334155", "#818cf8", "#334155"],
                    boxShadow: ["0px 0px 15px rgba(0,0,0,0.5)", "0px 0px 20px rgba(129,140,248,0.8)", "0px 0px 15px rgba(0,0,0,0.5)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, times: [0.2, 0.35, 0.55], ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-[#0D1117] border-2 flex items-center justify-center relative z-20"
                >
                  <Cog size={16} className="text-indigo-400" />
                </motion.div>
                <div className="w-[45%]"></div>
              </div>

              {/* Node 3: Model Training */}
              <div className="w-full flex items-center justify-between">
                <div className="w-[45%] flex justify-end">
                  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-lg w-full text-right transition-colors">
                    <p className="text-fuchsia-400 text-xs font-bold uppercase tracking-wider mb-0.5">Training</p>
                    <p className="text-slate-400 text-[10px] font-mono">PyTorch / MLflow</p>
                  </div>
                </div>
                <motion.div 
                  animate={{ 
                    borderColor: ["#334155", "#e879f9", "#334155"],
                    boxShadow: ["0px 0px 15px rgba(0,0,0,0.5)", "0px 0px 20px rgba(232,121,249,0.8)", "0px 0px 15px rgba(0,0,0,0.5)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, times: [0.5, 0.65, 0.85], ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-[#0D1117] border-2 flex items-center justify-center relative z-20"
                >
                  <Cpu size={16} className="text-fuchsia-400" />
                </motion.div>
                <div className="w-[45%]"></div>
              </div>

              {/* Node 4: API Serving */}
              <div className="w-full flex items-center justify-between flex-row-reverse">
                <div className="w-[45%] flex justify-start">
                  <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 p-3 rounded-xl shadow-lg w-full text-left transition-colors">
                    <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-0.5">Serving</p>
                    <p className="text-slate-400 text-[10px] font-mono">FastAPI / Docker</p>
                  </div>
                </div>
                <motion.div 
                  animate={{ 
                    borderColor: ["#334155", "#34d399", "#334155"],
                    boxShadow: ["0px 0px 15px rgba(0,0,0,0.5)", "0px 0px 20px rgba(52,211,153,0.8)", "0px 0px 15px rgba(0,0,0,0.5)"]
                  }}
                  transition={{ duration: 3, repeat: Infinity, times: [0.75, 0.9, 1], ease: "easeInOut" }}
                  className="w-10 h-10 rounded-full bg-[#0D1117] border-2 flex items-center justify-center relative z-20"
                >
                  <Server size={16} className="text-emerald-400" />
                </motion.div>
                <div className="w-[45%]"></div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
