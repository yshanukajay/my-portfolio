"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── Data ───────────────────────────────────────────────────────── */
const pillars = [
  {
    title: "Scalability",
    color: "#818cf8",
    border: "rgba(129,140,248,0.25)",
    desc: "Systems that grow with demand. Every pipeline I build is designed to handle 10× the expected load from day one.",
    icon: "⬡",
  },
  {
    title: "Reliability",
    color: "#10b981",
    border: "rgba(16,185,129,0.25)",
    desc: "99.9% uptime is the baseline. I engineer fault-tolerant architectures with graceful degradation and self-healing capabilities.",
    icon: "◈",
  },
  {
    title: "Observability",
    color: "#f59e0b",
    border: "rgba(245,158,11,0.25)",
    desc: "You can't improve what you can't measure. Every system ships with metrics, logs, and alerting baked in from the start.",
    icon: "◎",
  },
];

const articles = [
  "Building an End-to-End ML Pipeline with Kafka & Spark",
  "Deploying ML Models with FastAPI & Docker",
  "Kubernetes for ML Engineers — A Practical Guide",
  "Batch vs Streaming: When to Use Which",
];

/* ─── Floating Particle ───────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

function FloatingParticles({ reduced }: { reduced: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(99,102,241,0.35)",
      "rgba(139,92,246,0.30)",
      "rgba(16,185,129,0.25)",
      "rgba(99,102,241,0.20)",
    ];
    const p: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 8 + Math.random() * 84,
      y: 5 + Math.random() * 90,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 6,
      color: colors[i % colors.length],
    }));
    setParticles(p);
  }, []);

  if (reduced || particles.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -28, 0],
            opacity: [0, 0.9, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animated Grid Canvas ───────────────────────────────────────── */
function LiveGrid({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;
    const CELL = 56;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / CELL) + 2;
      const rows = Math.ceil(H / CELL) + 2;

      // Slow float offset
      const floatY = Math.sin(t * 0.18) * 6;
      const floatX = Math.cos(t * 0.12) * 4;

      ctx.save();
      ctx.translate(floatX, floatY);

      // Vertical lines — wave breathe
      for (let c = 0; c <= cols; c++) {
        const x = c * CELL;
        const wave = 0.5 + 0.5 * Math.sin(t * 0.55 + (c / cols) * Math.PI * 2.5);
        const alpha = (0.04 + 0.05 * wave);
        ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(x, -CELL);
        ctx.lineTo(x, H + CELL);
        ctx.stroke();
      }

      // Horizontal lines — offset phase
      for (let r = 0; r <= rows; r++) {
        const y = r * CELL;
        const wave = 0.5 + 0.5 * Math.sin(t * 0.4 + (r / rows) * Math.PI * 2 + 1.2);
        const alpha = (0.03 + 0.04 * wave);
        ctx.strokeStyle = `rgba(139,92,246,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(-CELL, y);
        ctx.lineTo(W + CELL, y);
        ctx.stroke();
      }

      // Intersection dots
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * CELL;
          const y = r * CELL;
          const phase = ((c * 3 + r * 5) / (cols + rows)) * Math.PI * 4;
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.9 + phase);

          // sparse bright accent dots
          const isBright = (c * 7 + r * 11) % 23 === 0;
          if (isBright) {
            const alpha = 0.15 + 0.25 * pulse;
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + pulse * 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(99,102,241,${alpha})`;
            ctx.fill();
          } else {
            const alpha = 0.05 + 0.08 * pulse;
            ctx.beginPath();
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139,92,246,${alpha})`;
            ctx.fill();
          }
        }
      }

      ctx.restore();

      // Diagonal shimmer sweep
      for (let i = 0; i < 3; i++) {
        const sweep = ((t * 14 + i * (W / 3)) % (W + H * 0.6));
        const x0 = sweep - H * 0.4;
        const x1 = sweep;
        const shimmerA = 0.018 + 0.012 * Math.sin(t * 0.8 + i * 1.2);
        const g = ctx.createLinearGradient(x0, 0, x1, H);
        g.addColorStop(0, "rgba(129,140,248,0)");
        g.addColorStop(0.5, `rgba(129,140,248,${shimmerA})`);
        g.addColorStop(1, "rgba(129,140,248,0)");
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x0, 0);
        ctx.lineTo(x1, H);
        ctx.stroke();
      }

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduced]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

/* ─── Pulsing Radial Glow ─────────────────────────────────────────── */
function RadialGlow({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute inset-x-0 top-0 flex justify-center pointer-events-none" aria-hidden>
      {/* Outer slow glow */}
      <motion.div
        className="absolute top-[-60px] w-[700px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(99,102,241,0.11) 0%, rgba(139,92,246,0.07) 35%, transparent 70%)",
          willChange: "opacity, transform",
          filter: "blur(1px)",
        }}
        animate={reduced ? {} : {
          opacity: [0.6, 1, 0.6],
          scale: [0.96, 1.04, 0.96],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Inner tight glow */}
      <motion.div
        className="absolute top-[20px] w-[320px] h-[220px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.14) 0%, transparent 65%)",
          willChange: "opacity",
          filter: "blur(2px)",
        }}
        animate={reduced ? {} : {
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
    </div>
  );
}

/* ─── Gradient Mesh Blur ──────────────────────────────────────────── */
function GradientMesh() {
  return (
    <div className="absolute inset-x-0 top-0 h-72 pointer-events-none" aria-hidden
      style={{
        background:
          "linear-gradient(180deg, rgba(246,248,255,0.92) 0%, rgba(248,250,255,0.6) 60%, transparent 100%)",
      }}
    />
  );
}

/* ─── Edge fade overlays ──────────────────────────────────────────── */
function EdgeFades() {
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none" aria-hidden
        style={{ background: "linear-gradient(to top, rgba(248,250,255,0.95), transparent)" }} />
      <div className="absolute inset-y-0 left-0 w-24 pointer-events-none" aria-hidden
        style={{ background: "linear-gradient(to right, rgba(248,250,255,0.7), transparent)" }} />
      <div className="absolute inset-y-0 right-0 w-24 pointer-events-none" aria-hidden
        style={{ background: "linear-gradient(to left, rgba(248,250,255,0.7), transparent)" }} />
    </>
  );
}

/* ─── Main Component ──────────────────────────────────────────────── */
export default function EngineeringPhilosophy() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section
      id="philosophy"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #f8faff 0%, #f4f6ff 40%, #f8fffd 100%)" }}
    >
      {/* === Layer 0: Animated Grid Canvas === */}
      <LiveGrid reduced={reduced} />

      {/* === Layer 1: Radial glow behind heading === */}
      <RadialGlow reduced={reduced} />

      {/* === Layer 2: Floating particles === */}
      <FloatingParticles reduced={reduced} />

      {/* === Layer 3: Drifting blob accents === */}
      {!reduced && (
        <>
          <motion.div
            className="absolute pointer-events-none"
            style={{
              top: "10%", right: "5%",
              width: 380, height: 380,
              borderRadius: "60% 40% 50% 50% / 50% 60% 40% 50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
              willChange: "transform, border-radius",
            }}
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
              borderRadius: [
                "60% 40% 50% 50% / 50% 60% 40% 50%",
                "40% 60% 40% 60% / 60% 40% 60% 40%",
                "55% 45% 55% 45% / 45% 55% 45% 55%",
                "60% 40% 50% 50% / 50% 60% 40% 50%",
              ],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute pointer-events-none"
            style={{
              bottom: "8%", left: "3%",
              width: 300, height: 300,
              borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
              background: "radial-gradient(circle, rgba(16,185,129,0.055) 0%, transparent 70%)",
              willChange: "transform",
            }}
            animate={{ x: [0, -18, 12, 0], y: [0, 18, -12, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </>
      )}

      {/* === Layer 4: Gradient mesh overlay (preserves readability) === */}
      <GradientMesh />

      {/* === Layer 5: Edge fade overlays === */}
      <EdgeFades />

      {/* === Content === */}
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          {/* Frosted badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 border"
            style={{
              background: "rgba(99,102,241,0.07)",
              borderColor: "rgba(99,102,241,0.18)",
              backdropFilter: "blur(8px)",
            }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <p className="text-[11px] font-bold tracking-[0.22em] text-indigo-500 uppercase">How I Think</p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Engineering Philosophy</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full mb-8" />

          {/* Main quote — frosted card */}
          <motion.blockquote
            className="max-w-3xl mx-auto text-xl md:text-2xl font-medium text-slate-700 leading-relaxed pl-6 text-left rounded-2xl p-7 border"
            style={{
              background: "rgba(255,255,255,0.65)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(99,102,241,0.15)",
              borderLeft: "4px solid #6366f1",
              boxShadow: "0 4px 24px rgba(99,102,241,0.07)",
            }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            I focus on building{" "}
            <span className="text-indigo-600 font-bold">scalable, production-ready AI systems</span>{" "}
            that combine machine learning, distributed data pipelines, and efficient backend infrastructure —
            not just models, but{" "}
            <span className="text-slate-900 font-bold">intelligent systems</span>.
          </motion.blockquote>
        </motion.div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -5, boxShadow: `0 12px 32px ${p.color}18` }}
              className="rounded-2xl p-7 border transition-shadow duration-300"
              style={{
                background: "rgba(255,255,255,0.72)",
                backdropFilter: "blur(12px)",
                borderColor: p.border,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                {p.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3">{p.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              <div className="mt-5 h-px rounded-full"
                style={{ background: `linear-gradient(to right, ${p.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>

        {/* Technical Writing */}
        <motion.div
          className="max-w-5xl mx-auto rounded-2xl p-8 border"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(12px)",
            borderColor: "rgba(99,102,241,0.12)",
            boxShadow: "0 4px 24px rgba(99,102,241,0.06)",
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Technical Writing</h3>
            <a href="#" className="text-xs font-semibold text-indigo-500 hover:text-indigo-600 transition-colors">
              View All →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {articles.map((a, i) => (
              <a
                key={a}
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/60 transition-all group"
              >
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-slate-700 group-hover:text-indigo-700 transition-colors font-medium">
                  {a}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
