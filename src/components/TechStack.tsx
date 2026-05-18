"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const categories = [
  {
    id: "ml",
    label: "Machine Learning",
    color: "#818cf8",
    usage: 92,
    tools: [
      { name: "TensorFlow",  learning: false },
      { name: "PyTorch",     learning: false },
      { name: "Scikit-learn",learning: false },
      { name: "OpenCV",      learning: false },
      { name: "XGBoost",     learning: false },
      { name: "Keras",       learning: false },
    ],
  },
  {
    id: "de",
    label: "Data Engineering",
    color: "#f59e0b",
    usage: 85,
    tools: [
      { name: "Apache Spark", learning: false },
      { name: "Kafka",        learning: false },
      { name: "Airflow",      learning: false },
      { name: "Hadoop",       learning: true  },
      { name: "dbt",          learning: true  },
      { name: "Delta Lake",   learning: false },
    ],
  },
  {
    id: "be",
    label: "Backend & APIs",
    color: "#10b981",
    usage: 88,
    tools: [
      { name: "FastAPI",  learning: false },
      { name: "Flask",    learning: false },
      { name: "Node.js",  learning: false },
      { name: "REST APIs",learning: false },
      { name: "GraphQL",  learning: true  },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    color: "#0ea5e9",
    usage: 78,
    tools: [
      { name: "Docker",          learning: false },
      { name: "Kubernetes",      learning: true  },
      { name: "AWS",             learning: false },
      { name: "GitHub Actions",  learning: false },
      { name: "NGINX",           learning: false },
      { name: "Terraform",       learning: true  },
    ],
  },
  {
    id: "db",
    label: "Databases",
    color: "#f97316",
    usage: 82,
    tools: [
      { name: "MongoDB",    learning: false },
      { name: "PostgreSQL", learning: false },
      { name: "Redis",      learning: false },
      { name: "Pinecone",   learning: true  },
    ],
  },
  {
    id: "mlops",
    label: "MLOps & Tracking",
    color: "#2dd4bf",
    usage: 80,
    tools: [
      { name: "MLflow",        learning: false },
      { name: "DVC",           learning: false },
      { name: "Prometheus",    learning: false },
      { name: "Grafana",       learning: false },
      { name: "W&B",           learning: true  },
    ],
  },
];

export default function TechStack() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="stack" className="py-24 bg-white relative border-y border-slate-100 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(14,165,233,0.05) 0%, transparent 50%)" }} />

      <div className="container mx-auto px-6 lg:px-12">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="text-xs font-bold tracking-[0.25em] text-sky-500 uppercase mb-3">Tools & Frameworks</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technology Ecosystem</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full mb-6" />
          <p className="text-slate-500 max-w-2xl mx-auto">
            A curated ecosystem of tools I use to build scalable ML systems and modern data platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-slate-100">

              {/* Category header */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-slate-900">{cat.label}</h3>
                <span className="text-xs font-bold font-mono" style={{ color: cat.color }}>{cat.usage}%</span>
              </div>

              {/* Usage bar */}
              <div className="h-1 bg-slate-100 rounded-full mb-5 overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ background: cat.color }}
                  initial={{ width: 0 }} whileInView={{ width: `${cat.usage}%` }}
                  viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }} />
              </div>

              {/* Tool badges */}
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => {
                  const key = `${cat.id}-${tool.name}`;
                  const isHov = hovered === key;
                  return (
                    <motion.div key={tool.name} className="relative"
                      onMouseEnter={() => setHovered(key)}
                      onMouseLeave={() => setHovered(null)}>
                      <motion.span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-default select-none border transition-all duration-200"
                        style={{
                          borderColor: isHov ? cat.color : "rgba(148,163,184,0.25)",
                          color: isHov ? cat.color : "#475569",
                          background: isHov ? `${cat.color}12` : "white",
                          boxShadow: isHov ? `0 0 16px ${cat.color}30` : "none",
                        }}>
                        {tool.name}
                        {tool.learning && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase"
                            style={{ background: `${cat.color}20`, color: cat.color }}>
                            Learning
                          </span>
                        )}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
