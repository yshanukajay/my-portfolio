"use client";

import { motion } from "framer-motion";
import { ArrowDown, Database, Cog, Beaker, Server, Activity } from "lucide-react";

export default function MLOpsPipelines() {
  return (
    <section id="pipelines" className="py-24 bg-white relative border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">MLOps Pipelines</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Standardizing the machine learning lifecycle from data ingestion to production monitoring.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Training Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-xl flex items-center justify-center">
                <Database size={24} />
              </div>
              <h3 className="text-xl f  ont-bold text-slate-900">Training Pipeline</h3>
            </div>
            
            <div className="space-y-4">
              {["Data Validation", "Preprocessing", "Feature Engineering", "Model Training", "Evaluation", "MLflow Tracking"].map((step, idx, arr) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-medium text-slate-700 shadow-sm">
                    {step}
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowDown size={20} className="text-slate-300 my-2" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Deployment Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-8 border-t-4 border-t-indigo-400"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Deployment Pipeline</h3>
            </div>
            
            <div className="space-y-4">
              {["Docker Containerization", "FastAPI Serving", "CI/CD (GitHub Actions)", "Cloud Deployment"].map((step, idx, arr) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-medium text-slate-700 shadow-sm">
                    {step}
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowDown size={20} className="text-slate-300 my-2" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Monitoring Pipeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                <Activity size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Monitoring Pipeline</h3>
            </div>
            
            <div className="space-y-4">
              {["Prediction Logs", "Model Drift Detection", "Data Quality Checks", "Performance Monitoring", "Alerting & Retraining"].map((step, idx, arr) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-lg text-center font-medium text-slate-700 shadow-sm">
                    {step}
                  </div>
                  {idx < arr.length - 1 && (
                    <ArrowDown size={20} className="text-slate-300 my-2" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
