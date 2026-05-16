"use client";

import { motion } from "framer-motion";
import { BookOpen, Terminal } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export default function AdditionalSections() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* GitHub Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <GithubIcon className="text-slate-800" size={24} />
              <h3 className="text-xl font-bold text-slate-900">Open Source</h3>
            </div>
            <p className="text-slate-600 mb-6 text-sm">
              I actively contribute to open-source data engineering tools and maintain a clean, well-documented repository of ML pipelines and system architectures.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6 flex justify-between items-center">
              <div>
                <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Contributions</div>
                <div className="text-2xl font-bold text-sky-600">350+</div>
              </div>
              <div className="w-16 h-16 bg-[url('https://ghchart.rshah.org/sky-600/yshanukajay')] bg-no-repeat bg-contain opacity-50"></div>
            </div>
            <a href="https://github.com/yshanukajay" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-medium hover:text-sky-700 flex items-center gap-2">
              View GitHub Profile <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>

          {/* Blog Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-amber-600" size={24} />
              <h3 className="text-xl font-bold text-slate-900">Technical Writing</h3>
            </div>
            <ul className="space-y-4 mb-6">
              {[
                "Building an End-to-End ML Pipeline",
                "Deploying ML Models with FastAPI & Docker",
                "Kafka + Spark Streaming Explained",
                "Batch vs Streaming Data Processing"
              ].map((article, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-amber-500 mt-1">&bull;</span>
                  <a href="#" className="text-slate-700 text-sm hover:text-sky-600 transition-colors font-medium">
                    {article}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#" className="text-sky-600 font-medium hover:text-sky-700 flex items-center gap-2 mt-auto">
              Read All Articles <span aria-hidden="true">&rarr;</span>
            </a>
          </motion.div>

          {/* Current Learning Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 bg-slate-900 border-slate-800 text-slate-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <Terminal className="text-emerald-400" size={24} />
              <h3 className="text-xl font-bold text-white">Currently Exploring</h3>
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">{">"}</span>
                <span>Distributed Systems</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">{">"}</span>
                <span>Kubernetes Orchestration</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">{">"}</span>
                <span>Spark Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500">{">"}</span>
                <span>Advanced MLOps</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 animate-pulse">_</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
