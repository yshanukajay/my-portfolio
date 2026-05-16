"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const projects = [
  {
    title: "Real-Time Streaming Pipeline",
    description: "End-to-end streaming data pipeline handling high-throughput event data. Processes raw streams, aggregates metrics, and serves real-time analytics to a live dashboard.",
    focus: ["Distributed Systems", "Stream Processing", "Real-time Analytics"],
    flow: ["Kafka", "Spark Streaming", "MongoDB", "Dashboard"],
    links: { github: "#", demo: "#" }
  },
  {
    title: "Cattle Health Monitoring System",
    description: "IoT-driven data engineering pipeline combining streaming sensor ingestion with batch machine learning prediction services to monitor livestock health patterns.",
    focus: ["Data Ingestion", "MongoDB Pipeline", "Preprocessing Workflows", "ML Prediction Service"],
    flow: ["Sensors", "Ingestion API", "MongoDB", "ML Service", "Alerting"],
    links: { github: "#", demo: "#" }
  },
  {
    title: "Tomato Leaf Disease Prediction System",
    description: "Computer vision application served as a production-ready microservice. Focuses heavily on the deployment architecture, containerization, and API serving layer rather than just the model accuracy.",
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
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Engineering Projects</h2>
          <div className="w-20 h-1 bg-sky-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Architecting systems, data pipelines, and scalable deployments.
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

                <p className="text-slate-600 mb-6 flex-1">
                  {project.description}
                </p>

                <div className="mb-6 p-4 bg-slate-100/50 rounded-xl border border-slate-200/50">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">System Workflow</h4>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-slate-700 font-medium">
                    {project.flow.map((step, idx) => (
                      <span key={idx} className="flex items-center">
                        {step}
                        {idx < project.flow.length - 1 && <ArrowRight size={14} className="mx-2 text-slate-400" />}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Key Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.focus.map((item, idx) => (
                      <span key={idx} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-full shadow-sm">
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
