"use client";

import { motion } from "framer-motion";
import { Database, Sparkles, Wind, Activity, Zap, Layers, Network, Code } from "lucide-react";

const baseTechnologies = [
  { name: "Kafka", role: "Ingest", icon: Database, color: "text-sky-400" },
  { name: "Spark", role: "Process", icon: Sparkles, color: "text-amber-400" },
  { name: "Airflow", role: "Schedule", icon: Wind, color: "text-red-400" },
  { name: "MLflow", role: "Track", icon: Activity, color: "text-emerald-400" },
  { name: "FastAPI", role: "Serve", icon: Zap, color: "text-cyan-400" },
  { name: "Docker", role: "Package", icon: Layers, color: "text-blue-400" },
  { name: "Kubernetes", role: "Scale", icon: Network, color: "text-indigo-400" },
  { name: "Python", role: "Core", icon: Code, color: "text-yellow-400" },
];

// Duplicate multiple times for a seamless infinite loop
const technologies = [
  ...baseTechnologies,
  ...baseTechnologies,
  ...baseTechnologies,
  ...baseTechnologies,
];

export default function TechStrip() {
  return (
    <div className="w-full bg-[#080d14] border-y border-slate-800/80 py-5 overflow-hidden flex items-center shadow-lg relative z-20">
      {/* Edge gradient overlays for visual depth */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#080d14] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#080d14] to-transparent z-10 pointer-events-none" />
      
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 35,
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex whitespace-nowrap items-center"
      >
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div key={index} className="flex items-center">
              {/* Pipeline Node */}
              <motion.div
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(56, 189, 248, 0.4)",
                  boxShadow: "0 0 15px rgba(56, 189, 248, 0.2)",
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-800 bg-[#0d121b]/90 backdrop-blur-md cursor-pointer transition-all duration-300 select-none"
              >
                {/* Active Pulsing Indicator */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>

                {/* Tech Icon */}
                <Icon size={16} className={`${tech.color} opacity-80`} />

                {/* Tech Info */}
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold font-mono tracking-wider text-slate-100">
                    {tech.name}
                  </span>
                  <span className="text-[8px] font-semibold tracking-widest text-slate-500 uppercase leading-none mt-0.5">
                    {tech.role}
                  </span>
                </div>
              </motion.div>

              {/* Glowing Connection Line */}
              <div className="w-14 h-[2px] bg-slate-800/60 relative overflow-hidden flex items-center justify-center mx-1">
                {/* Moving Data Particle */}
                <motion.div
                  className="absolute h-full w-8 bg-gradient-to-r from-transparent via-sky-400 to-transparent"
                  animate={{ left: ["-50%", "150%"] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: (index % 4) * 0.45,
                  }}
                />
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

