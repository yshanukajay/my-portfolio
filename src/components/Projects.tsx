"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Workflow, AlertTriangle, Cpu, Zap, Activity } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── GitHub Icon Component ───────────────────────────────────── */
const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* ─── Projects Data ───────────────────────────────────────────── */
export const projectsData = [
  {
    id: "streaming-pipeline",
    title: "Real-Time Streaming Pipeline",
    badge: "Real-Time",
    category: "Distributed Stream Processing · MLOps",
    image: "/project-streaming.png",
    description:
      "End-to-end event streaming architecture handling high-throughput telemetry data with sub-500ms latency. Replaced legacy batch processes to enable real-time operational insights.",
    problem: "24-hour reporting delays caused by batch processing bottlenecks during peak event traffic.",
    dataset: "10TB+ clickstream events ingested via Apache Kafka",
    impact: "24h batch delay → < 500ms real-time latency",
    stack: {
      infra: ["Kafka", "Spark Streaming", "MongoDB", "Docker"],
      languages: ["Python", "FastAPI"]
    },
    flow: [
      { name: "Kafka Ingest", desc: "High-throughput message broker" },
      { name: "Spark Stream", desc: "Stateful windowed transformations" },
      { name: "MongoDB Store", desc: "Low-latency document write" },
    ],
    metrics: {
      type: "streaming",
      throughput: "10,000/s",
      volume: "10TB+",
      latencyBefore: "24h",
      latencyAfter: "< 500ms"
    },
    color: "var(--color-accent-primary)",
    bgColor: "rgba(14, 165, 233, 0.04)",
    tags: ["Real-Time", "Distributed", "MLOps Enabled"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
  {
    id: "cattle-health",
    title: "Cattle Health Monitoring System",
    badge: "Edge AI",
    category: "IoT Telemetry · ML Prediction · Alert Engine",
    image: "/project-cattle.png",
    description:
      "Edge-assisted IoT pipeline coupling continuous collar sensor telemetry with LSTM neural networks for early disease detection and real-time farmer alerts.",
    problem: "Manual livestock inspection led to delayed diagnosis, high treatment costs, and yield loss.",
    dataset: "Continuous IoT Collar Telemetry (Temperature, Motion, Heart Rate)",
    impact: "30% reduction in severe livestock illness cases",
    stack: {
      infra: ["MongoDB", "FastAPI", "Kafka", "Docker"],
      languages: ["Python", "TensorFlow"]
    },
    flow: [
      { name: "IoT Collars", desc: "LoRa long-range telemetry feed" },
      { name: "LSTM Classifier", desc: "Pattern anomaly detection" },
      { name: "Alert Pipeline", desc: "Automated SMS/Web dispatch" }
    ],
    metrics: {
      type: "ml_classification",
      accuracy: 94,
      metricLabel: "Accuracy",
      reduction: "30%",
      sensors: "Temp, Motion, HR"
    },
    color: "var(--color-accent-secondary)",
    bgColor: "rgba(99, 102, 241, 0.04)",
    tags: ["Edge AI", "API Integrated", "Computer Vision"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
  {
    id: "tomato-classifier",
    title: "Tomato Leaf Disease Classifier",
    badge: "Computer Vision",
    category: "CNN Microservice · FastAPI · Containerized Serving",
    image: "/project-tomato.png",
    description:
      "Production-grade Convolutional Neural Network serving microservice for rapid automated crop disease identification. Built with sub-100ms inference latency.",
    problem: "Farmers lacked instant, reliable field diagnostic tools to prevent crop infection spread.",
    dataset: "PlantVillage: 50,000+ expert-annotated leaf images",
    impact: "< 100ms API inference latency in production",
    stack: {
      infra: ["FastAPI", "Docker", "React", "OpenCV"],
      languages: ["Python", "TensorFlow"]
    },
    flow: [
      { name: "CNN Model", desc: "Transfer-learned ResNet backbone" },
      { name: "FastAPI Engine", desc: "Containerized model server" },
      { name: "Client UI", desc: "Mobile-optimized diagnostic app" }
    ],
    metrics: {
      type: "ml_classification",
      accuracy: 98,
      metricLabel: "F1 Score",
      latency: "< 100ms",
      datasetSize: "50,000+"
    },
    color: "var(--color-accent-primary)",
    bgColor: "rgba(14, 165, 233, 0.04)",
    tags: ["Computer Vision", "API Integrated", "MLOps Enabled"],
    links: { github: "https://github.com/yshanukajay", demo: "#" },
  },
];

/* ─── Radial Gauge Component ─────────────────────────────────── */
function RadialGauge({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 22;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex items-center gap-3.5 bg-white border border-[#E2E8F0] p-3 rounded-xl shadow-xs">
      <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-100"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <motion.circle
            cx="22"
            cy="22"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-[#0F172A] font-mono">{value}%</span>
      </div>
      <div>
        <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">{label}</div>
        <div className="text-xs font-bold text-[#0F172A] mt-0.5">High Performance</div>
      </div>
    </div>
  );
}

/* ─── Project Card Component ──────────────────────────────────── */
function ProjectCard({ project, isActive }: { project: typeof projectsData[0]; isActive: boolean }) {
  const p = project;

  return (
    <motion.article
      whileHover={{ y: isActive ? -6 : 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`w-full bg-white/95 backdrop-blur-sm border rounded-3xl overflow-hidden flex flex-col md:flex-row transition-shadow duration-300 ${isActive
        ? "shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] border-slate-200"
        : "shadow-[0_4px_20px_-8px_rgba(15,23,42,0.05)] border-slate-100/80"
        }`}
      style={{
        boxShadow: isActive ? `0 24px 60px -15px color-mix(in srgb, ${p.color} 8%, transparent), inset 0 0 0 1px color-mix(in srgb, ${p.color} 8%, transparent)` : undefined,
      }}
    >
      {/* Visual / Screenshot Column (Left) */}
      <div className="w-full md:w-[46%] p-5 md:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm group">
          <motion.img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
        </div>

        {/* Metrics Section */}
        <div className="mt-5 space-y-3.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" style={{ backgroundColor: p.color }} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">Performance Metrics</span>
          </div>

          {p.metrics.type === "streaming" && (
            <div className="space-y-3">
              {/* Latency Comparison */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                  <span>Latency Reduction</span>
                  <span className="text-emerald-500 font-bold font-mono">99.9% reduction</span>
                </div>
                <div className="h-7 w-full bg-slate-100 border border-slate-200 rounded-lg relative overflow-hidden flex items-center px-3">
                  <div className="absolute left-0 top-0 bottom-0 bg-rose-500/10 border-r border-rose-500/20" style={{ width: "95%" }} />
                  <div className="absolute left-0 top-0 bottom-0 bg-emerald-500/25 border-r border-emerald-500/60 rounded-r-md" style={{ width: "2%" }} />
                  <div className="w-full flex justify-between relative z-10 text-[9px] font-bold text-slate-700 font-mono">
                    <span className="text-rose-600/80">Before: {p.metrics.latencyBefore}</span>
                    <span className="text-emerald-600">After: {p.metrics.latencyAfter}</span>
                  </div>
                </div>
              </div>

              {/* Aggregation Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/80 border border-slate-200/60 p-2.5 rounded-xl flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">Throughput</span>
                  <span className="text-sm font-bold text-slate-800 font-mono mt-1">{p.metrics.throughput}</span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5">Events / sec</span>
                </div>
                <div className="bg-white/80 border border-slate-200/60 p-2.5 rounded-xl flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">Data Vol</span>
                  <span className="text-sm font-bold text-slate-800 font-mono mt-1">{p.metrics.volume}</span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5">Kafka Clickstream</span>
                </div>
              </div>
            </div>
          )}

          {p.metrics.type === "ml_classification" && p.metrics.accuracy !== undefined && (
            <div className="space-y-3">
              <RadialGauge value={p.metrics.accuracy} label={p.metrics.metricLabel || "Accuracy"} color={p.color} />

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/80 border border-slate-200/60 p-2.5 rounded-xl flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">Illness Reduction</span>
                  <span className="text-sm font-bold text-emerald-600 font-mono mt-1">-{p.metrics.reduction}</span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5">Target achieved</span>
                </div>
                <div className="bg-white/80 border border-slate-200/60 p-2.5 rounded-xl flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">Sensor Streams</span>
                  <span className="text-[10px] font-bold text-slate-700 font-mono mt-1 truncate">{p.metrics.sensors || p.metrics.latency}</span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5">{p.metrics.datasetSize ? "PlantVillage Dataset" : "Real-time edge"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description / Info Column (Right) */}
      <div className="w-full md:w-[54%] p-6 md:p-8 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Badge & Category */}
          <div className="flex items-center flex-wrap gap-2">
            <span
              className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md border"
              style={{
                backgroundColor: `color-mix(in srgb, ${p.color} 4%, transparent)`,
                color: p.color,
                borderColor: `color-mix(in srgb, ${p.color} 15%, transparent)`
              }}
            >
              {p.badge}
            </span>
            <span className="text-[10px] text-slate-400 font-mono font-medium">{p.category}</span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug tracking-tight">
            {p.title}
          </h3>

          {/* Description */}
          <p className="text-slate-500 text-sm leading-relaxed">
            {p.description}
          </p>

          {/* Challenge Box */}
          <div className="p-3.5 rounded-2xl border border-slate-200/50 bg-slate-50/50 flex gap-3 shadow-inner">
            <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">Core Challenge</div>
              <p className="text-xs text-slate-500 mt-1 leading-normal font-medium">{p.problem}</p>
            </div>
          </div>

          {/* Infrastructure & Languages Badges */}
          <div className="space-y-2 pt-2">
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[8px] font-bold font-mono text-slate-400 uppercase tracking-wider mr-1">Infrastructure</span>
              {p.stack.infra.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[9px] font-bold rounded-md font-mono border"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${p.color} 4%, transparent)`,
                    color: p.color,
                    borderColor: `color-mix(in srgb, ${p.color} 12%, transparent)`
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-[8px] font-bold font-mono text-slate-400 uppercase tracking-wider mr-1">Languages &amp; ML</span>
              {p.stack.languages.map((s) => (
                <span
                  key={s}
                  className="px-2 py-0.5 text-[9px] font-bold rounded-md font-mono border border-slate-200 text-slate-600 bg-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Card Footer CTA Links */}
        <div className="flex items-center gap-3 mt-8 pt-5 border-t border-slate-100">
          <motion.a
            href={p.links.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center gap-2 transition-colors"
          >
            <GithubIcon />
            <span>GitHub Repository</span>
          </motion.a>

          <motion.a
            href={p.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${p.color} 88%, transparent) 0%, ${p.color} 100%)`,
              boxShadow: `0 4px 14px color-mix(in srgb, ${p.color} 15%, transparent)`
            }}
          >
            <span>Live System Demo</span>
            <ExternalLink size={13} />
          </motion.a>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Sidebar Progress Indicator Component ────────────────────── */
interface SidebarIndicatorProps {
  activeIndex: number;
  activeColor: string;
}

function SidebarIndicator({ activeIndex, activeColor }: SidebarIndicatorProps) {
  return (
    <div className="hidden lg:flex flex-col gap-5 select-none pointer-events-none">
      {projectsData.map((p, idx) => {
        const isActive = activeIndex === idx;
        return (
          <div key={p.title} className="flex items-center gap-3.5 group cursor-pointer pointer-events-auto">
            {/* Visual Dot */}
            <div className="relative w-4 h-4 flex items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="indicator-active-glow"
                  className="absolute inset-0 rounded-full blur-[4px] opacity-40"
                  style={{ backgroundColor: activeColor }}
                />
              )}
              <motion.span
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${isActive ? "border-transparent" : "border-slate-300 bg-slate-100 group-hover:border-slate-400"
                  }`}
                style={{
                  backgroundColor: isActive ? activeColor : undefined,
                  scale: isActive ? 1.25 : 1
                }}
              />
            </div>

            {/* Label */}
            <span
              className={`text-xs font-bold font-mono transition-all duration-300 tracking-wider ${isActive ? "text-slate-800 translate-x-1" : "text-slate-400 group-hover:text-slate-500"
                }`}
              style={{ color: isActive ? activeColor : undefined }}
            >
              {p.badge}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main Projects Section ───────────────────────────────────── */
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(true);

  const lenis = useLenis();
  const prefersReduced = useReducedMotion();

  // Detect responsive state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP ScrollTrigger Stacked Card Scroll Implementation
  useEffect(() => {
    if (isMobile || prefersReduced) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
    if (cards.length === 0) return;

    // Set initial absolute stacked positioning for desktop
    // Card 0 is in place, other cards are waiting stacked below
    gsap.set(cards.slice(1), {
      yPercent: 105,
      opacity: 0,
      scale: 0.96,
    });

    // Create ScrollTrigger & Timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 2.5}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          // Dynamically compute active index thresholds
          let active = 0;
          if (progress >= 0.70) {
            active = 2;
          } else if (progress >= 0.30) {
            active = 1;
          } else {
            active = 0;
          }
          setActiveIndex(active);
        }
      }
    });

    // Animate Card 1 entering, Card 0 receding
    tl.to(cards[0], {
      scale: 0.94,
      opacity: 0.72,
      yPercent: -3,
      ease: "power1.inOut"
    }, "card1")
      .to(cards[1], {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
      }, "card1")

      // Animate Card 2 entering, Card 1 receding
      .to(cards[1], {
        scale: 0.94,
        opacity: 0.72,
        yPercent: -3,
        ease: "power1.inOut"
      }, "card2")
      .to(cards[2], {
        yPercent: 0,
        opacity: 1,
        scale: 1,
        ease: "power2.out"
      }, "card2");

    // Recalculate ScrollTrigger on Lenis Scroll events to ensure exact alignment
    if (lenis) {
      const onScroll = () => ScrollTrigger.update();
      lenis.on("scroll", onScroll);
      return () => {
        lenis.off("scroll", onScroll);
        tl.kill();
        ScrollTrigger.getAll().forEach(t => t.kill());
      };
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMobile, prefersReduced, lenis]);

  const activeProject = projectsData[activeIndex];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full overflow-hidden transition-colors duration-700 select-none bg-[#F4F8FC]"
      style={{
        backgroundColor: (isMobile || prefersReduced) ? "#F4F8FC" : activeProject.bgColor,
        // Subtle ambient glow change mapped to active color
        backgroundImage: (isMobile || prefersReduced)
          ? "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 55%)"
          : `radial-gradient(ellipse at 50% 0%, ${activeProject.color}08 0%, transparent 60%)`
      }}
    >
      {/* Outer Layout Wrapper */}
      <div className="w-full relative min-h-screen flex flex-col justify-between py-16 px-6 lg:px-12">
        {/* 1. Header (Always positioned at top) */}
        <div className="w-full max-w-5xl mx-auto text-center mb-8 shrink-0">
          <p className="text-[10px] font-bold tracking-[0.25em] text-indigo-600 uppercase mb-2" style={{ color: (isMobile || prefersReduced) ? "#4f46e5" : activeProject.color }}>
            Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-3">
            Production AI Systems
          </h2>
          <div className="w-16 h-[2px] bg-slate-200 mx-auto rounded-full mb-3" style={{ backgroundColor: (isMobile || prefersReduced) ? "#e2e8f0" : `${activeProject.color}30` }} />
          <p className="text-slate-500 max-w-lg mx-auto text-xs leading-relaxed">
            Deep-dive into the architecture, challenges, and metrics behind production intelligent systems I&apos;ve engineered.
          </p>
        </div>

        {/* 2. Middle Content Row (Cards Stack + Sidebar) */}
        <div className="flex-1 max-w-6xl mx-auto w-full flex items-center justify-center gap-10 py-4">

          {/* Main Card viewport stack (Desktop layout is absolute stack, mobile is regular flex list) */}
          <div
            ref={cardsContainerRef}
            className={`w-full max-w-4xl relative ${(isMobile || prefersReduced)
              ? "flex flex-col gap-8 md:gap-12"
              : "h-[62vh] md:h-[65vh] flex items-center justify-center"
              }`}
          >
            {projectsData.map((p, idx) => {
              const isActive = activeIndex === idx;

              if (isMobile || prefersReduced) {
                // Mobile and prefers-reduced-motion fallback layout: normal list layout
                return (
                  <div key={p.title} className="w-full">
                    <ProjectCard project={p} isActive={true} />
                  </div>
                );
              }

              // Desktop Stacked layout: cards are absolute positioned on top of each other
              return (
                <div
                  key={p.title}
                  ref={(el) => { cardsRef.current[idx] = el; }}
                  className="absolute w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center"
                  style={{
                    zIndex: 10 + idx, // Card 0 has z-index 10, Card 1 has 11, Card 2 has 12
                  }}
                >
                  <ProjectCard project={p} isActive={isActive} />
                </div>
              );
            })}
          </div>

          {/* Floating Sidebar Progress Indicators (Desktop only) */}
          {!isMobile && !prefersReduced && (
            <div className="shrink-0 w-36">
              <SidebarIndicator activeIndex={activeIndex} activeColor={activeProject.color} />
            </div>
          )}
        </div>

        {/* 3. Footer indicator spacing (Desktop only) */}
        {!isMobile && !prefersReduced && (
          <div className="w-full text-center mt-6 shrink-0 pointer-events-none">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Use Scrollwheel / Trackpad to Navigate Projects
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
