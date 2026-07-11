"use client";

import { useEffect, useRef } from "react";
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

// Duplicate for seamless infinite loop (2× is enough when we use translate3d(-50%))
const technologies = [
  ...baseTechnologies,
  ...baseTechnologies,
];

export default function TechStrip() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  // Pause animation when tab is not visible (Page Visibility API)
  useEffect(() => {
    const handleVisibility = () => {
      if (!marqueeRef.current) return;
      marqueeRef.current.style.animationPlayState =
        document.hidden ? "paused" : "running";
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div className="w-full bg-white/70 backdrop-blur-xl border-y border-slate-100 py-5 overflow-hidden flex items-center shadow-[0_1px_3px_rgba(0,0,0,0.01)] relative z-20 tech-marquee-container">
      <style dangerouslySetInnerHTML={{
        __html: `
        /* GPU-composited marquee — transform: translate3d avoids layout/paint */
        @keyframes tech-marquee {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes data-particle {
          0%   { transform: translate3d(-100%, 0, 0); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translate3d(350%, 0, 0); opacity: 0; }
        }
        /* Pause on hover */
        .tech-marquee-container:hover .tech-marquee-content {
          animation-play-state: paused;
        }
        .tech-marquee-content {
          animation: tech-marquee 50s linear infinite;
          will-change: transform;
        }
        /* Pause on mobile — reduced motion / small screens */
        @media (max-width: 640px) {
          .tech-marquee-content {
            animation-duration: 80s;
          }
          .data-particle {
            display: none;
          }
        }
        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-content {
            animation: none;
          }
          .data-particle {
            display: none;
          }
        }
        .tech-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .tech-card:hover {
          transform: scale(1.04);
        }
        .tech-card .tech-icon {
          transition: transform 0.25s ease;
        }
        .tech-card:hover .tech-icon {
          transform: scale(1.1);
        }
        .data-particle {
          animation: data-particle 2.5s linear infinite;
          will-change: transform, opacity;
        }
      `}} />

      {/* Edge gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

      <div ref={marqueeRef} className="flex whitespace-nowrap items-center tech-marquee-content">
        {technologies.map((tech, index) => {
          const Icon = tech.icon;
          return (
            <div key={index} className="flex items-center">
              {/* Pipeline Node — pure CSS hover, no framer-motion */}
              <div
                className="tech-card flex items-center gap-3.5 px-5 py-3 rounded-2xl border border-slate-100 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-lg cursor-pointer select-none group"
                style={{ ["--accent" as string]: tech.accentColor } as React.CSSProperties}
              >
                {/* Active Pulsing Indicator */}
                <span className="relative flex h-2 w-2 shrink-0">
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
                <Icon size={18} className={`tech-icon ${tech.color} opacity-85`} />

                {/* Tech Info */}
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold font-mono tracking-wide text-slate-800 group-hover:text-slate-900 transition-colors">
                    {tech.name}
                  </span>
                  <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase leading-none mt-0.5 group-hover:text-slate-500 transition-colors">
                    {tech.role}
                  </span>
                </div>
              </div>

              {/* Glowing Connection Line — CSS animated particle */}
              <div className="w-14 h-[2px] bg-slate-200/50 relative overflow-hidden mx-1">
                <div
                  className="data-particle absolute h-full w-8"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${tech.accentColor}, transparent)`,
                    animationDelay: `${(index % 4) * 0.6}s`,
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
