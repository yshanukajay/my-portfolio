"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { Mail, MapPin, ArrowUpRight, Send, Clock, Zap } from "lucide-react";

/* ─── SVG Icons ──────────────────────────────────────────────────── */
const LinkedInIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GitHubIcon = () => (
  <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

/* ─── Animated Background Grid ───────────────────────────────────── */
function ContactGrid({ reduced }: { reduced: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    let raf: number, t = 0;
    const CELL = 52;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const cols = Math.ceil(W / CELL) + 2, rows = Math.ceil(H / CELL) + 2;
      const fx = Math.cos(t * 0.1) * 5, fy = Math.sin(t * 0.15) * 5;
      ctx.save(); ctx.translate(fx, fy);
      for (let c = 0; c <= cols; c++) {
        const wave = 0.5 + 0.5 * Math.sin(t * 0.5 + (c / cols) * Math.PI * 3);
        ctx.strokeStyle = `rgba(99,102,241,${0.04 + 0.06 * wave})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(c * CELL, -CELL); ctx.lineTo(c * CELL, H + CELL); ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        const wave = 0.5 + 0.5 * Math.sin(t * 0.38 + (r / rows) * Math.PI * 2.5 + 1);
        ctx.strokeStyle = `rgba(139,92,246,${0.03 + 0.05 * wave})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath(); ctx.moveTo(-CELL, r * CELL); ctx.lineTo(W + CELL, r * CELL); ctx.stroke();
      }
      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const pulse = 0.5 + 0.5 * Math.sin(t * 0.9 + ((c * 3 + r * 5) / (cols + rows)) * Math.PI * 4);
          const bright = (c * 7 + r * 11) % 19 === 0;
          ctx.beginPath(); ctx.arc(c * CELL, r * CELL, bright ? 1.2 + pulse * 0.7 : 0.7, 0, Math.PI * 2);
          ctx.fillStyle = bright ? `rgba(99,102,241,${0.12 + 0.2 * pulse})` : `rgba(139,92,246,${0.04 + 0.07 * pulse})`;
          ctx.fill();
        }
      }
      ctx.restore();
      t += 0.016; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [reduced]);
  if (reduced) return null;
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden />;
}

/* ─── Mouse-follow glow ──────────────────────────────────────────── */
function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-400); const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  const onMove = useCallback((e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left); y.set(e.clientY - r.top);
  }, [x, y]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [onMove]);
  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      <motion.div className="absolute w-[500px] h-[500px] rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          left: sx, top: sy,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)",
          filter: "blur(1px)", willChange: "transform",
        }} />
    </div>
  );
}

/* ─── Contact Method Card ────────────────────────────────────────── */
interface ContactCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
  delay: number;
}
function ContactCard({ icon, label, value, href, color, delay }: ContactCardProps) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -3, boxShadow: `0 12px 28px ${color}18` }}
      className="flex items-center gap-4 p-4 rounded-2xl border cursor-pointer group transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.06)",
        borderColor: "rgba(255,255,255,0.1)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200"
        style={{ background: `${color}20`, color }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-white truncate">{value}</p>
      </div>
      <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0" />
    </motion.a>
  );
}

/* ─── Trust Chips ────────────────────────────────────────────────── */
const CHIPS = ["AI Engineering", "Data Engineering", "MLOps", "Cloud Architecture", "ML Systems", "Distributed Systems"];

/* ─── Main Component ─────────────────────────────────────────────── */
export default function ContactSection() {
  const reduced = useReducedMotion() ?? false;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link with form data
    const mailtoUrl = `mailto:yshanuka123@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Inquiry")}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.location.href = mailtoUrl;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 font-medium focus:ring-2 focus:ring-indigo-500/60";
  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060911 0%, #080c18 50%, #05090f 100%)" }}>

      {/* Animated grid */}
      <ContactGrid reduced={reduced} />

      {/* Mouse glow */}
      {!reduced && <MouseGlow />}

      {/* Floating orbs */}
      {!reduced && (
        <>
          <motion.div className="absolute pointer-events-none"
            style={{ top: "10%", right: "8%", width: 420, height: 420, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 65%)",
              filter: "blur(2px)", willChange: "transform" }}
            animate={{ x: [0, 25, -10, 0], y: [0, -20, 12, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute pointer-events-none"
            style={{ bottom: "15%", left: "5%", width: 340, height: 340, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 65%)",
              filter: "blur(2px)", willChange: "transform" }}
            animate={{ x: [0, -20, 15, 0], y: [0, 18, -10, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 4 }} />
        </>
      )}

      {/* Top edge fade */}
      <div className="absolute inset-x-0 top-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #060911, transparent)" }} aria-hidden />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Trust chips */}
        <motion.div className="flex flex-wrap justify-center gap-2 mb-16"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          {CHIPS.map((chip, i) => (
            <motion.span key={chip}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
              style={{
                background: "rgba(99,102,241,0.08)",
                borderColor: "rgba(99,102,241,0.22)",
                color: "rgba(165,180,252,0.9)",
              }}>
              {chip}
            </motion.span>
          ))}
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 max-w-6xl mx-auto items-start">

          {/* ── LEFT: Narrative + contact cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-8"
              style={{ background: "rgba(16,185,129,0.08)", borderColor: "rgba(16,185,129,0.25)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">Open to Opportunities</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-[54px] font-bold leading-[1.1] mb-6"
              style={{ color: "rgba(255,255,255,0.95)" }}>
              Let&apos;s Build{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #6366f1 100%)" }}>
                  Intelligent
                </span>
              </span>
              <br />Systems Together
            </h2>

            <p className="text-base leading-relaxed mb-4"
              style={{ color: "rgba(148,163,184,0.9)", maxWidth: "42ch" }}>
              Interested in AI engineering, data infrastructure, distributed systems, or ML platform architecture?
              I&apos;m always open to discussing innovative projects and engineering challenges.
            </p>

            {/* Quick response */}
            <div className="flex items-center gap-2 mb-10"
              style={{ color: "rgba(99,102,241,0.8)" }}>
              <Clock size={13} />
              <span className="text-xs font-semibold">Usually responds within 24 hours</span>
            </div>

            {/* Contact method cards */}
            <div className="grid grid-cols-1 gap-3">
              <ContactCard
                icon={<Mail size={18} />}
                label="Email"
                value="yshanuka123@gmail.com"
                href="mailto:yshanuka123@gmail.com"
                color="#818cf8"
                delay={0.1}
              />
              <ContactCard
                icon={<LinkedInIcon />}
                label="LinkedIn"
                value="yohanshanukajay"
                href="https://www.linkedin.com/in/yohanshanukajay/"
                color="#0ea5e9"
                delay={0.15}
              />
              <ContactCard
                icon={<GitHubIcon />}
                label="GitHub"
                value="yshanukajay"
                href="https://github.com/yshanukajay"
                color="#a78bfa"
                delay={0.2}
              />
              <ContactCard
                icon={<MapPin size={18} />}
                label="Location"
                value="Remote · Worldwide"
                href="#"
                color="#10b981"
                delay={0.25}
              />
            </div>
          </motion.div>

          {/* ── RIGHT: Premium form card ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Gradient border wrapper */}
            <div className="relative p-px rounded-3xl"
              style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.5) 0%, rgba(139,92,246,0.3) 50%, rgba(99,102,241,0.15) 100%)" }}>
              <div className="rounded-3xl overflow-hidden relative"
                style={{ background: "linear-gradient(160deg, #0d1117 0%, #0a0f1a 100%)" }}>

                {/* Inner top glow */}
                <div className="absolute inset-x-0 top-0 h-px"
                  style={{ background: "linear-gradient(to right, transparent, rgba(129,140,248,0.6), transparent)" }} aria-hidden />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.12) 0%, transparent 70%)" }} aria-hidden />

                <div className="p-8 md:p-10">
                  {/* Form header */}
                  <div className="flex items-center gap-2.5 mb-8">
                    <div className="flex gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-red-500/70" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <span className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <div className="flex-1 h-6 rounded-md flex items-center px-3"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <span className="text-[10px] font-mono text-slate-500">contact.yml — Start a conversation</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-widest"
                          style={{ color: "rgba(99,102,241,0.8)" }}>Name</label>
                        <input
                          type="text" required placeholder="Your name"
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          className={inputClass}
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold uppercase tracking-widest"
                          style={{ color: "rgba(99,102,241,0.8)" }}>Email</label>
                        <input
                          type="email" required placeholder="your@email.com"
                          value={form.email}
                          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                          className={inputClass}
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                          onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: "rgba(99,102,241,0.8)" }}>Subject</label>
                      <input
                        type="text" placeholder="ML Platform / Research Collaboration / Engineering Role"
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        className={inputClass}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest"
                        style={{ color: "rgba(99,102,241,0.8)" }}>Message</label>
                      <textarea
                        rows={5} placeholder="Tell me about your project, the engineering challenges you're tackling, or the opportunity you'd like to explore..."
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        className={`${inputClass} resize-none`}
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2.5 relative overflow-hidden transition-all duration-300"
                      style={{
                        background: sent
                          ? "linear-gradient(135deg, #10b981, #059669)"
                          : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #6366f1 100%)",
                        backgroundSize: "200% 100%",
                        boxShadow: sent
                          ? "0 0 24px rgba(16,185,129,0.35)"
                          : "0 0 24px rgba(99,102,241,0.3)",
                      }}
                    >
                      {sent ? (
                        <>
                          <Zap size={16} /> Message Sent — Opening Mail Client
                        </>
                      ) : (
                        <>
                          <Send size={16} /> Start a Conversation
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, #060911, transparent)" }} aria-hidden />
    </section>
  );
}
