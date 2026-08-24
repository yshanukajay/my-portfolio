"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Cpu, Cloud, GitMerge, Network, Zap, Bot, Link, GitBranch, BarChart2, type LucideIcon } from "lucide-react";



type Domain = {
  icon: LucideIcon;
  title: string;
  summary: string;
  metric: { label: string; value: string };
  color: string;
  flow: string[];
  capabilities: string[];
};

const interests = [
  { icon: Brain, text: "LLM Application Development", accent: "var(--color-accent-secondary)" },
  { icon: Bot, text: "AI Agent Systems", accent: "var(--color-accent-secondary)" },
  { icon: Link, text: "RAG & Knowledge Pipelines", accent: "var(--color-accent-primary)" },
  { icon: GitMerge, text: "MLOps & Model Deployment", accent: "var(--color-danger)" },
  { icon: GitBranch, text: "LangGraph & Agentic Flows", accent: "var(--color-success)" },
  { icon: BarChart2, text: "AI Observability & Evaluation", accent: "var(--color-warning)" },
] as const;

const domains: Domain[] = [
  {
    icon: Cpu,
    title: "ML Engineer",
    summary: "Design, train, and serve production-grade ML models with low-latency inference APIs.",
    metric: { label: "Inference", value: "< 100ms" },
    color: "var(--color-accent-secondary)",
    flow: ["Features", "Training", "Serving"],
    capabilities: [
      "CNNs, transformers & fine-tuning",
      "FastAPI model serving",
      "Feature stores & pipelines",
      "Model optimization & quantization",
    ],
  },
  {
    icon: Brain,
    title: "AI Engineer",
    summary: "Build intelligent LLM-powered agents, RAG systems, and multi-modal AI applications.",
    metric: { label: "Context", value: "128k tok" },
    color: "var(--color-accent-secondary)",
    flow: ["Prompt", "Retrieve", "Generate"],
    capabilities: [
      "LangChain & LangGraph agents",
      "RAG & vector search (Qdrant)",
      "LLM fine-tuning & evaluation",
      "Tool-calling & multi-agent flows",
    ],
  },
  {
    icon: GitMerge,
    title: "MLOps",
    summary: "Automate model lifecycle, observability, and reproducible AI workflows at scale.",
    metric: { label: "Deploy", value: "< 3 min" },
    color: "var(--color-success)",
    flow: ["Build", "Deploy", "Monitor"],
    capabilities: [
      "Docker & CI/CD pipelines",
      "MLflow & Langfuse tracking",
      "Model drift & alerting",
      "GitHub Actions automation",
    ],
  },
];

function FlowSteps({ steps }: { steps: string[] }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-1.5">
          <span
            className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200"
          >
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="text-slate-300 text-sm" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
      <span className="sr-only">Pipeline: {steps.join(" to ")}</span>
    </div>
  );
}

function DomainCard({ domain, index }: { domain: Domain; index: number }) {
  const Icon = domain.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="rounded-2xl p-6 md:p-7 flex flex-col h-full bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-[0_4px_20px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_8px_28px_rgba(15,23,42,0.09)] hover:border-slate-300/80 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${domain.color}12`, color: domain.color }}
          >
            <Icon size={20} strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-lg leading-tight">{domain.title}</h3>
            <p className="text-sm text-slate-500 mt-1 leading-snug">{domain.summary}</p>
          </div>
        </div>
        <div
          className="text-right flex-shrink-0 px-3 py-2 rounded-xl bg-white/80 border border-slate-200/70 shadow-sm"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {domain.metric.label}
          </p>
          <p className="text-sm font-bold tabular-nums" style={{ color: domain.color }}>
            {domain.metric.value}
          </p>
        </div>
      </div>

      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
          Pipeline
        </p>
        <FlowSteps steps={domain.flow} />
      </div>

      <div className="mt-auto pt-5 border-t border-slate-100">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
          Capabilities
        </p>
        <ul className="space-y-2">
          {domain.capabilities.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm text-slate-600">
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: domain.color }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);
  const DURATION = 6000; // 6 seconds per expertise tab
  const PHOTO_DURATION = 5000; // 5 seconds per photo

  const photos = [
    { src: "/avatar.png", alt: "Yohan Shanuka — AI Engineer" },
    { src: "/photo.jpg", alt: "Yohan Shanuka" },
  ];

  useEffect(() => {
    if (isPaused) return;

    const tick = 50; // ms
    const increment = (tick / DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((curr) => (curr + 1) % domains.length);
          return 0;
        }
        return prev + increment;
      });
    }, tick);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Auto-swap photo every PHOTO_DURATION ms
  useEffect(() => {
    const photoTimer = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % photos.length);
    }, PHOTO_DURATION);
    return () => clearInterval(photoTimer);
  }, []);

  const activeDomain = domains[activeTab];
  const DomainIcon = activeDomain.icon;

  return (
    <section id="about" className="relative">
      {/* Engineering Mindset — white */}
      <div className="py-24 bg-[#F4F8FC] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 90%, rgba(99,102,241,0.04) 0%, transparent 50%)",
          }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Premium Developer Profile Card with Soft Floating Glow Background */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-[360px] lg:max-w-none group">
                {/* 1. SOFT FLOATING GLOW BACKGROUND (Blurred Circles / Gradient Blobs) */}
                {/* Blob 1: Indigo/Purple, top-left, pulsing */}
                <motion.div
                  animate={{
                    x: [0, 15, -10, 0],
                    y: [0, -20, 15, 0],
                    scale: [1, 1.1, 0.95, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-12 -left-12 w-64 h-64 bg-gradient-to-tr from-indigo-500/20 to-purple-500/15 rounded-full blur-[50px] pointer-events-none mix-blend-screen"
                />

                {/* Blob 2: Cyan/Blue, bottom-right, pulsing */}
                <motion.div
                  animate={{
                    x: [0, -20, 15, 0],
                    y: [0, 15, -20, 0],
                    scale: [1, 0.9, 1.1, 1],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -bottom-16 -right-16 w-72 h-72 bg-gradient-to-br from-sky-400/25 to-blue-600/15 rounded-full blur-[60px] pointer-events-none mix-blend-screen"
                />

                {/* Blob 3: Subtle Central Cloud Glow */}
                <div
                  className="absolute inset-0 blur-xl pointer-events-none opacity-60"
                  style={{
                    backgroundImage: "radial-gradient(circle at center, rgba(99,102,241,0.15) 0%, transparent 70%)"
                  }}
                />

                {/* 2. ROTATING CLOUD RINGS */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible">
                  {/* Outer Cloud Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[440px] h-[440px] rounded-full border border-dashed border-indigo-500/15 opacity-60"
                  />
                  {/* Middle Data Orbit */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[380px] h-[380px] rounded-full border border-indigo-400/10 opacity-50"
                    style={{ borderStyle: "double", borderWidth: "3px" }}
                  />
                  {/* Inner Cloud/Feedback Ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-cyan-400/20 opacity-70"
                  />
                </div>

                {/* 3. GRID / DOTTED MATRIX OVERLAY */}
                <div
                  className="absolute -inset-8 opacity-[0.22] pointer-events-none select-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(99,102,241,0.2) 1.5px, transparent 1.5px)",
                    backgroundSize: "20px 20px",
                    maskImage: "radial-gradient(circle at 50% 50%, black 65%, transparent 100%)",
                    WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 65%, transparent 100%)",
                  }}
                />
                {/* 6. MAIN CARICATURE WRAPPER (NO FRAME) */}
                <div className="relative transition-all duration-500 group-hover:-translate-y-2 z-10">
                  {/* Image carousel - crossfade between photos */}
                  <div
                    className="relative aspect-[4/5] rounded-[32px] overflow-hidden cursor-pointer"
                    onClick={() => setActivePhoto((prev) => (prev + 1) % photos.length)}
                    title="Click to switch photo"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activePhoto}
                        src={photos[activePhoto].src}
                        alt={photos[activePhoto].alt}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Dot indicators */}
                  <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhoto(i)}
                        aria-label={`Show photo ${i + 1}`}
                        className="transition-all duration-300 rounded-full"
                        style={{
                          width: activePhoto === i ? "20px" : "8px",
                          height: "8px",
                          backgroundColor: activePhoto === i ? "#6366f1" : "#cbd5e1",
                        }}
                      />
                    ))}
                  </div>
                </div>


              </div>
            </motion.div>

            {/* Right Column: Bio & Core Interests */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="flex items-center space-x-2 mb-6">
                <span className="h-px w-8 bg-indigo-500" />
                <p className="text-sm font-bold tracking-[0.2em] text-indigo-500 uppercase">
                  AI Engineering Mindset
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
                Building{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">
                  Intelligent
                </span>{" "}
                AI Systems.
              </h2>
              <div className="text-slate-600 space-y-4">
                <p className="leading-relaxed font-medium text-slate-800 text-xl">
                  I build production AI systems — from LLM-powered agents and RAG pipelines to
                  fine-tuned models and multi-agent workflows — engineered to solve real-world problems at scale.
                </p>
                <p className="leading-relaxed">
                  My focus spans ML engineering, AI agent design, and MLOps — shipping intelligent systems
                  that are observable, reproducible, and ready for production from day one.
                </p>
              </div>

              {/* Particularly Interested In — premium light panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-10 relative rounded-3xl overflow-hidden bg-slate-50/60 border border-slate-200/80 shadow-sm"
              >
                {/* Soft ambient gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 50% at 0% 100%, rgba(99,102,241,0.03) 0%, transparent 100%), radial-gradient(ellipse 50% 40% at 100% 0%, rgba(14,165,233,0.03) 0%, transparent 100%)",
                  }}
                />
                {/* Technical dot matrix background pattern */}
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(71,85,105,0.15) 1.5px, transparent 1.5px)",
                    backgroundSize: "20px 20px",
                    maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
                  }}
                />

                {/* Top border accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

                <div className="relative px-6 py-7 md:px-8 md:py-8">
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-2.5">
                      {/* Professional status dot (no neon pulse, clean state) */}
                      <span className="flex h-2 w-2 rounded-full bg-indigo-500" />
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                        Particularly Interested In
                      </span>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200 bg-slate-100/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      Focus areas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {interests.map((item, i) => (
                      <motion.div
                        key={item.text}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: 0.08 + i * 0.05 }}
                        whileHover={{ y: -2 }}
                        className="group relative flex items-center gap-4 p-4 rounded-2xl cursor-default transition-all duration-300 bg-white/90 backdrop-blur-sm border border-slate-200/70 shadow-[0_2px_10px_rgba(15,23,42,0.05)] hover:shadow-[0_6px_20px_rgba(15,23,42,0.08)] hover:border-slate-300/80"
                      >
                        {/* Hover subtle background accent indicator */}
                        <div
                          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none"
                          style={{
                            backgroundColor: item.accent,
                          }}
                        />
                        {/* Icon Wrapper */}
                        <div
                          className="relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
                          style={{
                            background: `${item.accent}0a`, // ~4% opacity
                            color: item.accent,
                          }}
                        >
                          <item.icon size={18} strokeWidth={2.25} />
                        </div>
                        <span className="relative text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                          {item.text}
                        </span>
                        {/* Soft right status indicator dot */}
                        <span
                          className="relative ml-auto w-1.5 h-1.5 rounded-full opacity-30 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ backgroundColor: item.accent }}
                          aria-hidden="true"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Core Expertise — full-bleed with side decorations */}
      <div className="w-full bg-[#F1F5F9] border-y border-[#E2E8F0] py-24 overflow-hidden relative">
        {/* Subtle engineering dot pattern background */}
        <div
          className="absolute inset-0 pointer-events-none select-none opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(#2563EB 1.5px, transparent 1.5px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(circle at 50% 50%, black, transparent 85%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 50%, black, transparent 85%)",
          }}
        />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">

          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-[0.25em] text-indigo-500 uppercase mb-3">
              Engineering Focus
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Expertise</h2>
            <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full mb-5" />
            <p className="text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Three focused areas — each with a clear pipeline and the capabilities I bring to production systems.
            </p>
          </motion.div>

          {/* Full-bleed 5-column layout: left accent | cards | right accent */}
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_200px] gap-6 items-start">

            {/* ── Left accent panel ── */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* System stats */}
              {[
                { label: "Models Deployed", value: "3+", color: "var(--color-accent-secondary)" },
                { label: "Pipeline Uptime", value: "99.9%", color: "var(--color-success)" },
                { label: "Avg Latency", value: "< 100ms", color: "var(--color-accent-primary)" },
                { label: "AI Projects", value: "8+", color: "var(--color-accent-secondary)" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                  className="rounded-2xl p-4 border border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-[0_4px_16px_rgba(15,23,42,0.06)]"
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xl font-extrabold font-mono" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                </motion.div>
              ))}

              {/* Decorative dot grid */}
              <div className="mt-2 opacity-30">
                <svg width="100%" viewBox="0 0 180 80">
                  {Array.from({ length: 6 }).map((_, row) =>
                    Array.from({ length: 10 }).map((_, col) => (
                      <motion.circle
                        key={`${row}-${col}`}
                        cx={col * 18 + 9} cy={row * 14 + 7} r={1.8}
                        fill="#6366f1"
                        animate={{ opacity: [0.2, 0.7, 0.2] }}
                        transition={{ duration: 2 + (row + col) * 0.3, repeat: Infinity, delay: (row + col) * 0.15 }}
                      />
                    ))
                  )}
                </svg>
              </div>
            </motion.div>

            {/* ── Center: Active Domain Tab Panel ── */}
            <div className="flex flex-col">
              {/* Tab Bar */}
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8 bg-slate-200/50 p-1.5 rounded-2xl border border-slate-200/50 max-w-xl mx-auto w-full select-none">
                {domains.map((dom, idx) => {
                  const DomIcon = dom.icon;
                  const isActive = activeTab === idx;
                  return (
                    <button
                      key={dom.title}
                      onClick={() => {
                        setActiveTab(idx);
                        setProgress(0);
                      }}
                      className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 select-none z-10 flex-1 justify-center"
                      style={{
                        color: isActive ? dom.color : "#64748b"
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeExpertiseTab"
                          className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-200/40 z-[-1] overflow-hidden"
                          transition={{ type: "spring", stiffness: 350, damping: 28 }}
                        >
                          <motion.div
                            className="absolute bottom-0 left-0 h-[2.5px]"
                            style={{ backgroundColor: dom.color }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.05, ease: "linear" }}
                          />
                        </motion.div>
                      )}
                      <DomIcon size={16} strokeWidth={2.25} />
                      <span>{dom.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Card Body */}
              <div
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className="relative min-h-[380px] md:min-h-[290px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="rounded-3xl p-6 md:p-8 bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-[0_4px_24px_rgba(15,23,42,0.07),0_1px_4px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_32px_rgba(15,23,42,0.10)] transition-shadow duration-300 relative overflow-hidden"
                  >
                    {/* Corner gradient glow matching active tab color */}
                    <div
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-[30px] pointer-events-none opacity-15"
                      style={{ backgroundColor: activeDomain.color }}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                      {/* Left half: Info & Pipeline Flow (7 cols) */}
                      <div className="md:col-span-7 flex flex-col space-y-6">
                        <div className="flex items-start gap-4">
                          <div
                            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${activeDomain.color}12`, color: activeDomain.color }}
                          >
                            <DomainIcon size={22} strokeWidth={2.25} />
                          </div>
                          <div>
                            <span
                              className="text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded"
                              style={{ backgroundColor: `${activeDomain.color}0c`, color: activeDomain.color }}
                            >
                              Domain Focus
                            </span>
                            <h3 className="font-extrabold text-slate-900 text-2xl mt-1 leading-none">{activeDomain.title}</h3>
                            <p className="text-sm text-slate-500 mt-2.5 leading-relaxed">{activeDomain.summary}</p>
                          </div>
                        </div>

                        {/* Pipeline Section */}
                        <div className="pt-2">
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              System Lifecycle Flow
                            </span>
                            <span className="h-px bg-slate-200 flex-1" />
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {activeDomain.flow.map((step, idx) => (
                              <div key={step} className="flex items-center gap-2">
                                <span
                                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors duration-300"
                                  style={{
                                    backgroundColor: `${activeDomain.color}05`,
                                    borderColor: `${activeDomain.color}25`,
                                    color: activeDomain.color,
                                  }}
                                >
                                  {step}
                                </span>
                                {idx < activeDomain.flow.length - 1 && (
                                  <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right half: Capabilities & Key Metric (5 cols) */}
                      <div className="md:col-span-5 flex flex-col justify-between h-full space-y-6 md:space-y-0 md:h-[220px]">
                        {/* Capabilities */}
                        <div>
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                              Core Capabilities
                            </span>
                            <span className="h-px bg-slate-200 flex-1" />
                          </div>
                          <ul className="grid grid-cols-1 gap-2.5">
                            {activeDomain.capabilities.map((cap) => (
                              <li key={cap} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: activeDomain.color }}
                                />
                                {cap}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Metric Block */}
                        <div
                          className="flex items-center justify-between p-4 rounded-2xl border transition-colors duration-300 md:mt-auto"
                          style={{
                            backgroundColor: `${activeDomain.color}03`,
                            borderColor: `${activeDomain.color}15`,
                          }}
                        >
                          <div>
                            <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                              Key Performance Index
                            </p>
                            <p className="text-xs font-bold text-slate-700 mt-0.5">
                              {activeDomain.metric.label}
                            </p>
                          </div>
                          <div className="text-right">
                            <span
                              className="text-lg font-black tracking-tight font-mono px-3 py-1 rounded-xl bg-white border border-slate-200 shadow-sm"
                              style={{ color: activeDomain.color }}
                            >
                              {activeDomain.metric.value}
                            </span>
                          </div>
                        </div>

                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Right accent panel ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:flex flex-col gap-4"
            >
              {/* Mini pipeline steps */}
              <div className="rounded-2xl p-4 border border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-[0_4px_16px_rgba(15,23,42,0.05)]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  AI Lifecycle
                </div>
                {["Prompt Design", "Retrieval", "Generation", "Evaluation", "Deployment", "Observability"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 mb-2 last:mb-0">
                    <motion.div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: ["#f59e0b", "#818cf8", "#818cf8", "#10b981", "#0ea5e9", "#f97316"][i] }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.8, delay: i * 0.25, repeat: Infinity }}
                    />
                    <span className="text-xs font-semibold text-slate-600">{step}</span>
                    {i < 5 && <div className="ml-auto w-4 h-px bg-slate-200" />}
                  </div>
                ))}
              </div>

              {/* Stack highlight */}
              {[
                { tech: "LangChain", role: "Chains", color: "#22c55e" },
                { tech: "LangGraph", role: "Agents", color: "#8b5cf6" },
                { tech: "Qdrant", role: "Vector DB", color: "#f43f5e" },
                { tech: "Langfuse", role: "Observe", color: "#ec4899" },
              ].map((item, i) => (
                <motion.div
                  key={item.tech}
                  initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200/80 bg-white/90 backdrop-blur-sm shadow-[0_2px_8px_rgba(15,23,42,0.05)]"
                >
                  <motion.span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: item.color }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, delay: i * 0.3, repeat: Infinity }}
                  />
                  <span className="text-sm font-bold text-slate-800">{item.tech}</span>
                  <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {item.role}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
