"use client";

import { motion } from "framer-motion";

const technologies = [
  "Python",
  "Apache Spark",
  "Kafka",
  "Airflow",
  "Docker",
  "FastAPI",
  "MongoDB",
  "AWS",
  "MLflow",
  // Duplicate for seamless loop
  "Python",
  "Apache Spark",
  "Kafka",
  "Airflow",
  "Docker",
  "FastAPI",
  "MongoDB",
  "AWS",
  "MLflow",
];

export default function TechStrip() {
  return (
    <div className="w-full bg-white border-y border-slate-100 py-6 overflow-hidden flex items-center shadow-sm relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>
      
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap items-center space-x-12 px-6"
      >
        {technologies.map((tech, index) => (
          <div key={index} className="flex items-center space-x-12">
            <span className="text-slate-500 font-medium text-lg font-heading tracking-wide">
              {tech}
            </span>
            <span className="text-sky-300">&bull;</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
