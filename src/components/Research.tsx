"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  BookOpen,
  ExternalLink,
  Users,
  Globe,
  Tag,
  Quote,
  Award,
  Microscope,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { useRef, useState } from "react";

const publications = [
  {
    title:
      "Real-Time Cattle Monitoring Using Low-Cost IoT Smart Collars with LoRa Communication in Sri Lanka's Dry Zones",
    authors: ["Yohan Shanuka, J.A.D", "et al."],
    venue: "Digital Research Repository — University of Vavuniya",
    venueShort: "DRR · VAU",
    url: "http://drr.vau.ac.lk/handle/123456789/1355",
    year: "2024",
    type: "Research Paper",
    abstract:
      "Explores the design and deployment of a low-cost IoT smart collar system using LoRa communication for real-time cattle health monitoring across remote dry-zone environments in Sri Lanka. The system captures biometric and behavioural data — including temperature, motion, and heart rate — and transmits it over long-range low-power networks to an ML-backed prediction and alert pipeline.",
    keywords: ["IoT", "LoRa", "Cattle Monitoring", "Edge AI", "Real-Time Systems", "Sri Lanka", "Smart Agriculture"],
    accentColor: "#0ea5e9",
    accentSecondary: "#6366f1",
    impact: "Applied Research",
    domain: "AgriTech · Edge AI",
  },
];

const stats = [
  { icon: BookOpen, label: "Publications", value: "1" },
  { icon: TrendingUp, label: "Domain", value: "IoT & AI" },
  { icon: Award, label: "Repository", value: "DRR·VAU" },
  { icon: Microscope, label: "Focus Area", value: "AgriTech" },
];

/* Tilt card hook */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 300, damping: 30 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

export default function Research() {
  const tilt = useTilt();
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="publications"
      className="relative py-28 overflow-hidden bg-slate-950"
    >
      {/* ── Animated mesh background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right,#94a3b8 1px,transparent 1px),linear-gradient(to bottom,#94a3b8 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.18, 0.28, 0.18] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(14,165,233,0.25) 0%, transparent 70%)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%)",
          }}
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-sky-400"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              opacity: 0.3,
            }}
            animate={{ y: [-8, 8, -8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Microscope size={13} className="text-sky-400" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-sky-400 uppercase">
              Academic Contribution
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            Research &amp;{" "}
            <span className="relative inline-block">
              <span className="text-gradient bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Publications
              </span>
              {/* Underline glow */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full"
                style={{ background: "linear-gradient(to right,#38bdf8,#818cf8)" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </span>
          </h2>

          <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
            Peer-reviewed research at the intersection of IoT systems, edge AI, and
            real-world agricultural engineering challenges.
          </p>
        </motion.div>

        {/* ── Stats strip ── */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-700/60 bg-slate-900/60 backdrop-blur-sm"
            >
              <s.icon size={18} className="text-sky-400" />
              <span className="text-base font-bold text-white font-mono">{s.value}</span>
              <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Publication cards ── */}
        <div className="max-w-4xl mx-auto space-y-6">
          {publications.map((pub, i) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                ref={tilt.ref}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
                className="relative rounded-2xl overflow-hidden group cursor-default"
              >
                {/* Animated border gradient */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg,${pub.accentColor}40,${pub.accentSecondary}40,transparent)`,
                    padding: "1px",
                  }}
                />

                {/* Card body */}
                <div className="relative rounded-2xl bg-slate-900 border border-slate-700/60 overflow-hidden">

                  {/* Top glowing accent bar */}
                  <div
                    className="h-[3px] w-full"
                    style={{ background: `linear-gradient(to right,${pub.accentColor},${pub.accentSecondary})` }}
                  />

                  {/* Inner glow overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at top left,${pub.accentColor}12 0%,transparent 60%)`,
                    }}
                  />

                  <div className="p-8 md:p-10 relative z-10">

                    {/* Top row: badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                        style={{
                          background: `${pub.accentColor}15`,
                          color: pub.accentColor,
                          borderColor: `${pub.accentColor}35`,
                        }}
                      >
                        <BookOpen size={11} strokeWidth={2.5} />
                        {pub.type}
                      </span>
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border border-indigo-500/30 bg-indigo-500/10 text-indigo-400">
                        <Award size={11} strokeWidth={2.5} />
                        {pub.impact}
                      </span>
                      <span className="ml-auto text-xs font-bold font-mono text-slate-500 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                        {pub.year}
                      </span>
                    </div>

                    {/* Title with quote icon */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-shrink-0 mt-1">
                        <Quote
                          size={22}
                          className="opacity-20"
                          style={{ color: pub.accentColor }}
                        />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                        {pub.title}
                      </h3>
                    </div>

                    {/* Authors & venue */}
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-2.5">
                        <Users size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1">Authors</p>
                          <div className="flex flex-wrap gap-1.5">
                            {pub.authors.map((a) => (
                              <span key={a} className="text-sm font-semibold text-slate-300">{a}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <Globe size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-slate-600 font-semibold mb-1">Published In</p>
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium transition-colors leading-snug"
                            style={{ color: pub.accentColor }}
                            onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                            onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                          >
                            {pub.venue}
                          </a>
                          <span className="block mt-1 text-[10px] font-bold text-slate-500 font-mono bg-slate-800 px-2 py-0.5 rounded w-fit border border-slate-700">
                            {pub.venueShort}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="h-px mb-6"
                      style={{
                        background: `linear-gradient(to right,${pub.accentColor}30,transparent)`,
                      }}
                    />

                    {/* Abstract */}
                    <div className="mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 flex items-center gap-1.5">
                        <span
                          className="inline-block w-3 h-[2px] rounded-full"
                          style={{ background: pub.accentColor }}
                        />
                        Abstract
                      </p>
                      <div className={`relative overflow-hidden transition-all duration-500 ${expanded ? "" : "max-h-[4.5rem]"}`}>
                        <p className="text-slate-400 text-sm leading-relaxed">{pub.abstract}</p>
                        {!expanded && (
                          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900 to-transparent" />
                        )}
                      </div>
                      <button
                        onClick={() => setExpanded(!expanded)}
                        className="mt-2 text-[11px] font-bold uppercase tracking-wider transition-colors"
                        style={{ color: pub.accentColor }}
                      >
                        {expanded ? "Show Less ↑" : "Read More ↓"}
                      </button>
                    </div>

                    {/* Keywords */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 mr-1">
                        <Tag size={11} /> Keywords
                      </span>
                      {pub.keywords.map((kw) => (
                        <motion.span
                          key={kw}
                          whileHover={{ scale: 1.08, y: -1 }}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold border border-slate-700 text-slate-400 bg-slate-800/80 hover:border-sky-500/50 hover:text-sky-400 transition-colors cursor-default"
                        >
                          {kw}
                        </motion.span>
                      ))}
                    </div>

                    {/* CTA row */}
                    <div className="flex flex-wrap items-center gap-4">
                      <motion.a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg group/btn"
                        style={{
                          background: `linear-gradient(135deg,${pub.accentColor},${pub.accentSecondary})`,
                          color: "#fff",
                          boxShadow: `0 0 24px ${pub.accentColor}40`,
                        }}
                      >
                        <ExternalLink size={15} />
                        View Publication
                        <ArrowUpRight
                          size={14}
                          className="opacity-0 group-hover/btn:opacity-100 -translate-x-1 group-hover/btn:translate-x-0 transition-all"
                        />
                      </motion.a>

                      <span className="flex items-center gap-2 text-xs text-slate-500">
                        <span
                          className="inline-block w-2 h-2 rounded-full animate-pulse"
                          style={{ background: pub.accentColor }}
                        />
                        {pub.domain}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <motion.p
          className="text-center text-slate-600 text-xs mt-10 font-medium"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          More research in progress — stay tuned for upcoming publications.
        </motion.p>

      </div>
    </section>
  );
}
