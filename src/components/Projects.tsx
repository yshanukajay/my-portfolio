"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ExternalLink, Workflow, AlertTriangle, Cpu, Zap, Activity, X, Layers, Database, Terminal } from "lucide-react";
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
    id: "churn-pipeline",
    title: "Production-Ready ML Pipeline: Customer Churn Prediction",
    badge: "MLOps",
    category: "Automated Retraining · Real-Time Inference · MLOps",
    image: "/project-streaming.png",
    description:
      "A complete, production-grade machine learning system for predicting customer churn in a banking context, featuring real-time streaming, automated weekly retraining, model registry tracking, and rigorous CI/CD quality validation.",
    problem: "Manual retraining bottlenecks and lack of real-time prediction capabilities leading to delayed retention actions.",
    dataset: "Banking customer profiles & transactional behavior dataset (XGBoost/Random Forest models)",
    impact: "Automated weekly retraining and automated CI/CD model validation (F1 Score >= 75% threshold)",
    stack: {
      infra: ["Kafka", "Airflow", "MLflow", "PostgreSQL", "Docker", "S3"],
      languages: ["Python", "SQL"]
    },
    flow: [
      { name: "Ingest & Train", desc: "Airflow automated weekly retraining" },
      { name: "Model Registry", desc: "MLflow model tracking & registry" },
      { name: "Kafka Stream", desc: "Real-time inference (10 events/sec)" }
    ],
    metrics: {
      type: "ml_classification",
      accuracy: 78,
      metricLabel: "F1 Score",
      reduction: "Weekly",
      reductionLabel: "Retraining",
      reductionSub: "Automated DAG",
      secondaryLabel: "Event Stream",
      latency: "10 events/s",
      datasetLabel: "CI/CD Validated"
    },
    color: "var(--color-accent-primary)",
    bgColor: "rgba(14, 165, 233, 0.04)",
    tags: ["MLOps", "Automated Pipelines", "Event Streaming"],
    links: { github: "https://github.com/yshanukajay/churn-pipeline-deployment-last", demo: "#" },
  },
  {
    id: "fraud-detection",
    title: "End-to-End Credit Card Fraud Detection System",
    badge: "Fintech",
    category: "PySpark Preprocessing · XGBoost Class-Imbalance · MLflow & Airflow",
    image: "/project-cattle.png",
    description:
      "A production-oriented machine learning system designed to detect fraudulent credit card transactions, featuring PySpark preprocessing, class-imbalance handling, threshold tuning, and MLflow/Airflow integration.",
    problem: "High volume of credit card transactions requires real-time, high-precision fraud detection while managing severe class imbalance (fraud is < 0.2% of transactions).",
    dataset: "Credit Card Transactions Dataset (1M+ samples, with transaction velocity, amount, and merchant category)",
    impact: "Centralized configuration pipeline with automated model validation and experiment tracking",
    stack: {
      infra: ["PySpark", "Airflow", "MLflow", "FastAPI", "Docker", "YAML"],
      languages: ["Python", "SQL"]
    },
    flow: [
      { name: "PySpark ETL", desc: "Preprocessing & train/test split" },
      { name: "XGBoost Train", desc: "Class-imbalance tuning" },
      { name: "Streaming Inference", desc: "Batch & streaming serving pipelines" }
    ],
    metrics: {
      type: "ml_classification",
      accuracy: 96,
      metricLabel: "ROC-AUC",
      reduction: "96%",
      reductionLabel: "Fraud Recall",
      reductionSub: "Imbalance tuned",
      secondaryLabel: "Scale",
      sensors: "1M+ Txns",
      datasetLabel: "PySpark Preprocessed"
    },
    color: "var(--color-accent-secondary)",
    bgColor: "rgba(99, 102, 241, 0.04)",
    tags: ["Fintech", "Security", "Distributed Compute"],
    links: { github: "https://github.com/yshanukajay/end-to-end-credit-card-fraud-detection-system", demo: "#" },
  },
  {
    id: "tomo-vision",
    title: "Tomo Vision: AI-Powered Tomato Disease Prediction",
    badge: "Computer Vision",
    category: "EfficientNetB0 · FastAPI Microservice · React & React Native",
    image: "/project-tomato.png",
    description:
      "A full-stack AI system leveraging an EfficientNetB0 deep learning model fine-tuned on the PlantVillage dataset to classify tomato leaf images into 6 categories (healthy + 5 disease types) with instant diagnoses and confidence scores.",
    problem: "Farmers and agronomists lacked reliable, instant field diagnostic tools to identify crop infections early and prevent harvest loss.",
    dataset: "PlantVillage Tomato Dataset (Expert-annotated leaf images across 6 disease classes)",
    impact: "Instant diagnosis via web and mobile apps using a highly optimized EfficientNetB0 CNN model serving predictions under 100ms.",
    stack: {
      infra: ["TensorFlow 2.11", "FastAPI", "React", "React Native", "Expo", "Docker"],
      languages: ["Python", "JavaScript"]
    },
    flow: [
      { name: "Model Tuning", desc: "EfficientNetB0 transfer learning" },
      { name: "API Serving", desc: "FastAPI inference microservice" },
      { name: "Client Apps", desc: "React Web & React Native Expo" }
    ],
    metrics: {
      type: "ml_classification",
      accuracy: 98,
      metricLabel: "Accuracy",
      reduction: "EfficientNetB0",
      reductionLabel: "CNN Model",
      reductionSub: "Fine-tuned Backbone",
      secondaryLabel: "Speed",
      latency: "< 100ms API",
      datasetLabel: "6 Disease Classes"
    },
    color: "var(--color-accent-primary)",
    bgColor: "rgba(14, 165, 233, 0.04)",
    tags: ["Computer Vision", "Deep Learning", "Mobile & Web Client"],
    links: { github: "https://github.com/yshanukajay/Tomato_Disease_Prediction_System", demo: "#" },
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
function ProjectCard({ project, isActive, onExplainClick }: { project: typeof projectsData[0]; isActive: boolean; onExplainClick: (p: typeof projectsData[0]) => void }) {
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


          {p.metrics.type === "ml_classification" && p.metrics.accuracy !== undefined && (
            <div className="space-y-3">
              <RadialGauge value={p.metrics.accuracy} label={p.metrics.metricLabel || "Accuracy"} color={p.color} />

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/80 border border-slate-200/60 p-2.5 rounded-xl flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {p.metrics.reductionLabel || "Reduction"}
                  </span>
                  <span className="text-sm font-bold text-emerald-600 font-mono mt-1">
                    {p.metrics.reduction}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5">
                    {p.metrics.reductionSub || "Target achieved"}
                  </span>
                </div>
                <div className="bg-white/80 border border-slate-200/60 p-2.5 rounded-xl flex flex-col justify-between">
                  <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {p.metrics.secondaryLabel || "Data source"}
                  </span>
                  <span className="text-[10px] font-bold text-slate-700 font-mono mt-1 truncate">
                    {p.metrics.sensors || p.metrics.latency}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5">
                    {p.metrics.datasetLabel}
                  </span>
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

          <motion.button
            onClick={() => onExplainClick(p)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm transition-all duration-300 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, color-mix(in srgb, ${p.color} 88%, transparent) 0%, ${p.color} 100%)`,
              boxShadow: `0 4px 14px color-mix(in srgb, ${p.color} 15%, transparent)`
            }}
          >
            <span>Explain System</span>
            <Activity size={13} />
          </motion.button>
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
  const [explainProject, setExplainProject] = useState<typeof projectsData[0] | null>(null);

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
          <p className="font-script text-3xl mb-2 transition-colors duration-300" style={{ color: (isMobile || prefersReduced) ? "#6366f1" : activeProject.color }}>
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
                    <ProjectCard project={p} isActive={true} onExplainClick={setExplainProject} />
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
                  <ProjectCard project={p} isActive={isActive} onExplainClick={setExplainProject} />
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

      {/* ─── Project Explanation Modal ───────────────────────────────── */}
      <AnimatePresence>
        {explainProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExplainProject(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col z-10"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-slate-100 flex items-start justify-between gap-4" style={{ borderLeft: `6px solid ${explainProject.color}` }}>
                <div>
                  <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md" style={{ backgroundColor: `${explainProject.color}15`, color: explainProject.color }}>
                    {explainProject.badge}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mt-2">{explainProject.title}</h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">{explainProject.category}</p>
                </div>
                <button
                  onClick={() => setExplainProject(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 md:space-y-8 scrollbar-thin select-text">
                
                {/* 1. Architecture Flow Diagram */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                    <Layers size={16} className="text-indigo-500" style={{ color: explainProject.color }} />
                    <span>System Flow & Architecture</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                    {explainProject.flow.map((step, idx) => (
                      <div key={step.name} className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto font-medium">
                        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs w-full md:w-[180px]">
                          <div className="text-[10px] font-mono font-bold text-slate-400">Step 0{idx + 1}</div>
                          <div className="text-xs font-bold text-slate-800 mt-1">{step.name}</div>
                          <div className="text-[10px] text-slate-500 mt-1 leading-tight">{step.desc}</div>
                        </div>
                        {idx < explainProject.flow.length - 1 && (
                          <div className="text-slate-300 font-bold text-lg rotate-90 md:rotate-0">→</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Business Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Challenge */}
                  <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-2">
                    <div className="flex items-center gap-2 text-amber-800 font-bold text-xs font-mono uppercase tracking-wider">
                      <AlertTriangle size={14} className="text-amber-500" />
                      <span>Core Challenge</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{explainProject.problem}</p>
                  </div>
                  
                  {/* Right: Dataset & Target */}
                  <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-800 font-bold text-xs font-mono uppercase tracking-wider">
                      <Database size={14} className="text-indigo-500" style={{ color: explainProject.color }} />
                      <span>Data Foundation</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{explainProject.dataset}</p>
                  </div>
                </div>

                {/* 3. Deep Dive System Details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
                    <Terminal size={16} className="text-emerald-500" />
                    <span>Technical Architecture Details</span>
                  </div>
                  
                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100 bg-white">
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs font-mono">1</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Orchestration & Automation</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5 font-medium">Airflow Scheduled Pipelines</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold sm:self-center">
                        {explainProject.id === "churn-pipeline" ? "Weekly Retraining DAG" : explainProject.id === "fraud-detection" ? "ETL & Threshold Tuning DAG" : "Model Serving Container"}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs font-mono">2</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Experiment Tracking & Serving</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5 font-medium">Model Registry & Artifact Repository</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold sm:self-center">
                        {explainProject.id === "tomo-vision" ? "FastAPI serving predictions under 100ms" : "MLflow Tracking Server"}
                      </span>
                    </div>

                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs font-mono">3</div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-800">Model Framework</h4>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5 font-medium">Core Algorithm & Neural Layers</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1 rounded-full font-semibold sm:self-center">
                        {explainProject.id === "tomo-vision" ? "EfficientNetB0 (TensorFlow)" : "XGBoost Classifier"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 4. Infrastructure Stack */}
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">System Infrastructure Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {explainProject.stack.infra.map((tool) => (
                      <span key={tool} className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold font-mono">
                        {tool}
                      </span>
                    ))}
                    {explainProject.stack.languages.map((lang) => (
                      <span key={lang} className="px-3.5 py-1.5 bg-sky-50/50 border border-sky-100 rounded-xl text-xs text-sky-700 font-bold font-mono">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0">
                <a
                  href={explainProject.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <GithubIcon />
                  <span>View Code on GitHub</span>
                </a>
                <button
                  onClick={() => setExplainProject(null)}
                  className="py-2.5 px-5 rounded-xl text-xs font-bold text-white shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: explainProject.color }}
                >
                  Close Explanation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
