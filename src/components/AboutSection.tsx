"use client";

import { motion } from "framer-motion";
import { Database, GitBranch, Cpu, Server } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Engineering Focus</h2>
            <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                I specialize in <span className="font-semibold text-slate-900">Machine Learning, MLOps, and Data Engineering</span>, with a strong focus on building scalable ML pipelines, distributed data processing systems, and production-ready applications.
              </p>
              <p>
                My interests include ML deployment, workflow orchestration, data infrastructure, and cloud-native engineering systems. I bridge the gap between experimental models and robust, real-world solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center mb-4">
                  <Cpu size={24} />
                </div>
                <h3 className="font-semibold text-slate-900">ML Lifecycle</h3>
                <p className="text-sm text-slate-500 mt-2">End-to-end model training & tracking</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center translate-y-6">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                  <Database size={24} />
                </div>
                <h3 className="font-semibold text-slate-900">Data Systems</h3>
                <p className="text-sm text-slate-500 mt-2">Distributed ETL & stream processing</p>
              </div>

              <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <Server size={24} />
                </div>
                <h3 className="font-semibold text-slate-900">Deployment</h3>
                <p className="text-sm text-slate-500 mt-2">Containerized APIs & cloud native</p>
              </div>

              <div className="glass-card p-6 rounded-2xl flex flex-col items-center text-center translate-y-6">
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <GitBranch size={24} />
                </div>
                <h3 className="font-semibold text-slate-900">Automation</h3>
                <p className="text-sm text-slate-500 mt-2">CI/CD & workflow orchestration</p>
              </div>
            </div>
          </div>
          
          {/* Dashboard Counters */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <h4 className="text-4xl font-bold text-sky-600 font-heading mb-2">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }}>50</motion.span>TB+
              </h4>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Data Processed</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <h4 className="text-4xl font-bold text-indigo-600 font-heading mb-2">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }}>20</motion.span>+
              </h4>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Models Deployed</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} viewport={{ once: true }}
              className="glass-card p-6 rounded-2xl text-center"
            >
              <h4 className="text-4xl font-bold text-emerald-600 font-heading mb-2">
                <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 2 }}>99.9</motion.span>%
              </h4>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Pipeline Uptime</p>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
