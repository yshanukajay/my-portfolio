"use client";

import { motion } from "framer-motion";
import { Network, ArrowRight } from "lucide-react";

export default function SystemArchitecture() {
  return (
    <section id="architecture" className="py-24 bg-slate-50 relative border-y border-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">System Architecture</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Showcasing distributed workflows, ETL patterns, and scalable deployment architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Data Engineering Workflow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Network className="text-amber-500" />
              Data Engineering Workflow
            </h3>
            
            <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 shadow-inner overflow-x-auto">
              <div className="flex items-center gap-4 mb-4 whitespace-nowrap">
                <div className="px-4 py-2 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded">Kafka</div>
                <ArrowRight size={16} className="text-slate-500" />
                <div className="px-4 py-2 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded">Spark</div>
                <ArrowRight size={16} className="text-slate-500" />
                <div className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded">MongoDB</div>
                <ArrowRight size={16} className="text-slate-500" />
                <div className="px-4 py-2 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded">Dashboard</div>
              </div>
              <p className="text-slate-500 mt-6 text-xs border-t border-slate-800 pt-4">
                // High-throughput streaming data pipeline processing raw events into structured analytics.
              </p>
            </div>
          </motion.div>

          {/* Containerized Deployment */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Network className="text-sky-500" />
              Containerized Deployment
            </h3>
            
            <div className="bg-slate-900 rounded-xl p-6 font-mono text-sm text-slate-300 shadow-inner overflow-x-auto">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-24 px-3 py-2 bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded text-center shrink-0">Docker</div>
                  <div className="flex-1 h-px bg-slate-700"></div>
                </div>
                <div className="flex items-center gap-4 w-full pl-8">
                  <div className="w-24 px-3 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-center shrink-0">Nginx</div>
                  <div className="flex-1 h-px bg-slate-700"></div>
                </div>
                <div className="flex items-center gap-4 w-full pl-16">
                  <div className="w-24 px-3 py-2 bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded text-center shrink-0">FastAPI</div>
                  <div className="flex-1 h-px bg-slate-700"></div>
                </div>
                <div className="flex items-center gap-4 w-full pl-24">
                  <div className="w-auto px-3 py-2 bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded shrink-0">ML Model Service</div>
                </div>
              </div>
              <p className="text-slate-500 mt-6 text-xs border-t border-slate-800 pt-4">
                // Production-ready deployment architecture serving models via a load-balanced API.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
