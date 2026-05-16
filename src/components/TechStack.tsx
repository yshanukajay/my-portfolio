"use client";

import { motion } from "framer-motion";

const stackData = [
  {
    category: "Machine Learning",
    tools: ["Scikit-learn", "TensorFlow", "PyTorch", "XGBoost", "OpenCV"],
    color: "sky"
  },
  {
    category: "MLOps",
    tools: ["MLflow", "Docker", "Kubernetes", "CI/CD", "Model Deployment", "Model Monitoring"],
    color: "indigo"
  },
  {
    category: "Data Engineering",
    tools: ["Apache Spark", "Kafka", "Airflow", "ETL Pipelines", "Data Warehousing"],
    color: "amber"
  },
  {
    category: "Backend",
    tools: ["FastAPI", "Flask", "REST APIs"],
    color: "emerald"
  },
  {
    category: "Databases",
    tools: ["MongoDB", "PostgreSQL", "Redis"],
    color: "rose"
  },
  {
    category: "Cloud & Infrastructure",
    tools: ["AWS", "GitHub Actions", "Linux", "Docker Compose"],
    color: "slate"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function TechStack() {
  return (
    <section className="py-24 bg-white relative border-y border-slate-100">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technology Stack</h2>
          <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Tools and frameworks I use to build scalable machine learning systems and modern data platforms.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stackData.map((stack, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-card p-8 rounded-2xl border-t-4 hover:-translate-y-1 transition-transform"
              style={{ borderTopColor: `var(--color-${stack.color}-400, #3b82f6)` }}
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.tools.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm font-medium rounded-md border border-slate-200 shadow-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
