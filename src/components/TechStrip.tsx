"use client";

import { motion } from "framer-motion";
import { Database, Sparkles, Wind, Activity, Zap, Layers, Network, Code } from "lucide-react";

const baseTechnologies = [
  { name: "Kafka", role: "Ingest", icon: Database, color: "text-orange-500", accentColor: "#f97316" },
  { name: "Spark", role: "Process", icon: Sparkles, color: "text-amber-500", accentColor: "#f59e0b" },
  { name: "Airflow", role: "Schedule", icon: Wind, color: "text-red-500", accentColor: "#ef4444" },
  { name: "MLflow", role: "Track", icon: Activity, color: "text-emerald-500", accentColor: "#10b981" },
  { name: "FastAPI", role: "Serve", icon: Zap, color: "text-cyan-500", accentColor: "#06b6d4" },
  { name: "Docker", role: "Package", icon: Layers, color: "text-blue-500", accentColor: "#3b82f6" },
  { name: "Kubernetes", role: "Scale", icon: Network, color: "text-indigo-500", accentColor: "#6366f1" },
  { name: "Python", role: "Core", icon: Code, color: "text-yellow-600", accentColor: "#eab308" },
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
    <div className="w-full bg-white/70 backdrop-blur-xl border-y border-slate-100 py-5 overflow-hidden flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.01)] relative z-20 tech-marquee-container">
      {/* Dynamic Keyframes injected locally */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes tech-marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .tech-marquee-container:hover .tech-marquee-content {
          animation-play-state: paused;
        }
        .tech-marquee-content {
          animation: tech-marquee 40s linear infinite;
        }
      `}} />

      {/* Edge gradient overlays for visual depth */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap items-center tech-marquee-content">
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div key={index} className="flex items-center">
              {/* Pipeline Node */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                  borderColor: tech.accentColor,
                  boxShadow: `0 10px 25px -5px ${tech.accentColor}15, 0 8px 10px -6px ${tech.accentColor}15`,
                }}
                className="flex items-center gap-3.5 px-5 py-3 rounded-2xl border border-slate-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-lg cursor-pointer transition-all duration-300 select-none group"
              >
                {/* Active Pulsing Indicator (color-coded to tech) */}
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: tech.accentColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: tech.accentColor }}
                  />
                </span>

                {/* Tech Icon */}
                <Icon size={18} className={`${tech.color} opacity-85 group-hover:scale-110 transition-transform duration-300`} />

                {/* Tech Info */}
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold font-mono tracking-wide text-slate-800 group-hover:text-slate-900 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-none mt-0.5 group-hover:text-slate-500 transition-colors">
                    {tech.role}
                  </span>
                </div>
              </motion.div>

              {/* Glowing Connection Line */}
              <div className="w-14 h-[2px] bg-slate-200/50 relative overflow-hidden flex items-center justify-center mx-1">
                {/* Moving Data Particle color-coded to the tech */}
                <motion.div
                  className="absolute h-full w-8"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${tech.accentColor}, transparent)`
                  }}
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
      </div>
    </div>
  );
}


