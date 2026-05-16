"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Download } from "lucide-react";

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
    <section className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 pb-10 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
          className="relative hidden lg:flex justify-center items-center h-[500px]"
        >
          {/* Abstract Data Flow Animation Placeholder */}
          <div className="relative w-full max-w-md h-full rounded-2xl glass-card overflow-hidden flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white/80 to-slate-50/50">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/40 via-transparent to-transparent"></div>
            
            {/* Mock Nodes */}
            <div className="w-full flex justify-between items-center mb-16 relative z-10">
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 rounded-xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 font-mono text-xs"
              >
                RAW
              </motion.div>
              <div className="h-px bg-sky-200 w-16 relative">
                 <motion.div 
                   animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky-500" 
                 />
              </div>
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-xl bg-sky-50 shadow-lg border border-sky-100 flex items-center justify-center text-sky-600 font-mono text-sm font-semibold"
              >
                ETL
              </motion.div>
            </div>

            {/* Mock Model Node */}
            <div className="w-full flex justify-center items-center mb-16 relative z-10">
              <div className="h-16 w-px bg-indigo-200 absolute -top-16">
                 <motion.div 
                   animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                   transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
                   className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500" 
                 />
              </div>
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-24 rounded-2xl bg-indigo-50 shadow-xl border border-indigo-100 flex flex-col items-center justify-center"
              >
                <span className="text-indigo-600 font-mono text-sm font-bold mb-1">MODEL</span>
                <span className="text-indigo-400 text-xs font-mono">TRAINING</span>
              </motion.div>
            </div>

            {/* Mock Output */}
            <div className="w-full flex justify-between items-center relative z-10">
              <div className="h-px bg-emerald-200 w-16 absolute right-16 -top-12 rotate-45 transform origin-right">
                <motion.div 
                   animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                   transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "linear" }}
                   className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500" 
                 />
              </div>
              <motion.div 
                animate={{ y: [0, -5, 0] }} 
                transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-16 rounded-xl bg-emerald-50 shadow-lg border border-emerald-100 flex items-center justify-center text-emerald-600 font-mono text-sm font-semibold"
              >
                API ENDPOINT
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
