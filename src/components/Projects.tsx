"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Database, Activity, Target, ShieldAlert } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const projects = [
  {
    title: "Real-Time Streaming Pipeline",
    description: "End-to-end streaming data pipeline handling high-throughput event data. Processes raw streams, aggregates metrics, and serves real-time analytics to a live dashboard.",
    problem: "Existing batch processes caused 24-hour delays in critical metric reporting.",
    dataset: "10TB+ clickstream events via Kafka",
    metrics: "Reduced latency from 24h to <500ms. Handled 10k events/sec.",
    challenges: "Managing stateful aggregations and Spark checkpointing failures.",
    focus: ["Distributed Systems", "Stream Processing", "Real-time Analytics"],
    flow: ["Kafka", "Spark Streaming", "MongoDB", "Dashboard"],
    links: { github: "#", demo: "#" }
  },
  {
    title: "Cattle Health Monitoring System",
    description: "IoT-driven data engineering pipeline combining streaming sensor ingestion with batch machine learning prediction services to monitor livestock health patterns.",
    problem: "Manual livestock monitoring led to late disease detection and yield loss.",
    dataset: "IoT Sensor Data (Temperature, Motion, Heart Rate)",
    metrics: "94% prediction accuracy. Reduced severe illness cases by 30%.",
    challenges: "Handling missing sensor packets and temporal data alignment.",
    focus: ["Data Ingestion", "MongoDB Pipeline", "Preprocessing Workflows", "ML Prediction Service"],
    flow: ["Sensors", "Ingestion API", "MongoDB", "ML Service", "Alerting"],
    links: { github: "#", demo: "#" }
  },
  {
    title: "Tomato Leaf Disease Prediction System",
    description: "Computer vision application served as a production-ready microservice. Focuses heavily on the deployment architecture, containerization, and API serving layer.",
    problem: "Farmers needed a reliable, automated API for rapid field image diagnosis.",
    dataset: "PlantVillage Dataset (50,000+ labeled images)",
    metrics: "98% F1 Score. Sub-100ms API inference latency.",
    challenges: "Optimizing Docker image size and managing FastAPI concurrent requests.",
    focus: ["CNN Training Pipeline", "FastAPI Deployment", "Model Serving", "Inference Pipeline", "Docker Containerization"],
    flow: ["Dataset", "Training", "Evaluation", "FastAPI", "React Frontend"],
    links: { github: "#", demo: "#" }
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-slate-50 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured ML Systems</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Deep dive into the architecture, challenges, and metrics of my production pipelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{project.title}</h3>
                  <div className="flex gap-2">
                    <a href={project.links.github} className="text-slate-400 hover:text-slate-900 transition-colors">
                      <GithubIcon size={20} />
                    </a>
                    <a href={project.links.demo} className="text-slate-400 hover:text-sky-600 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-slate-600 mb-6 text-sm flex-1">
                  {project.description}
                </p>

                {/* Deep Case Study Data */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5 text-sky-600">
                      <Target size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Problem</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">{project.problem}</p>
                  </div>
                  <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5 text-indigo-600">
                      <Database size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Dataset</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">{project.dataset}</p>
                  </div>
                  <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5 text-emerald-600">
                      <Activity size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Metrics</span>
                    </div>
                    <p className="text-xs text-slate-700 font-semibold leading-snug">{project.metrics}</p>
                  </div>
                  <div className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <div className="flex items-center gap-1.5 mb-1.5 text-amber-600">
                      <ShieldAlert size={14} /> <span className="text-[10px] font-bold uppercase tracking-wider">Challenges</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-snug">{project.challenges}</p>
                  </div>
                </div>

                {/* System Workflow */}
                <div className="mb-6 p-4 bg-slate-100/50 rounded-xl border border-slate-200/50">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">System Workflow</h4>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-700 font-medium">
                    {project.flow.map((step, idx) => (
                      <span key={idx} className="flex items-center">
                        {step}
                        {idx < project.flow.length - 1 && <ArrowRight size={12} className="mx-1.5 text-slate-400" />}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Focus Areas */}
                <div>
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Key Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.focus.map((item, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-medium rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
