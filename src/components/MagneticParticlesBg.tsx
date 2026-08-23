"use client";

import { useEffect, useRef } from "react";

/* ─── White + blue palette ───────────────────────────────────────── */
// Each particle is randomly assigned one of these colours
const PALETTE: [number, number, number][] = [
  [255, 255, 255],   // pure white
  [224, 242, 254],   // sky-100
  [186, 230, 253],   // sky-200
  [147, 197, 253],   // blue-300
  [96, 165, 250],   // blue-400
  [165, 180, 252],   // indigo-300
  [199, 210, 254],   // indigo-200
  [226, 232, 240],   // slate-200 (near-white with cool tint)
];

/* ─── particle ───────────────────────────────────────────────────── */
interface Particle {
  x: number; y: number;
  hx: number; hy: number;
  vx: number; vy: number;
  radius: number;
  baseAlpha: number;
  col: [number, number, number]; // assigned colour
}

/* ─── constants ──────────────────────────────────────────────────── */
const NUM_PARTICLES = 320;
const ATTRACT_RADIUS = 200;
const ATTRACT_STRENGTH = 1.2;
const SPRING_K = 0.045;
const DAMPING = 0.86;
const CONNECT_DIST = 65;

/* ─── component ──────────────────────────────────────────────────── */
export default function MagneticParticlesBg({
  opacity = 1,
}: {
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cvs: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;

    let w = 0, h = 0;
    let particles: Particle[] = [];
    let mouseX = -9999, mouseY = -9999;
    let hovering = false;
    let animId: number;
    let prevTime = 0;

    /* ── create particles ──────────────────────────────────────── */
    function createParticles() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      cvs.width = w;
      cvs.height = h;

      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const hx = 20 + Math.random() * (w - 40);
        const hy = 20 + Math.random() * (h - 40);
        particles.push({
          x: hx, y: hy,
          hx, hy,
          vx: 0, vy: 0,
          radius: 1.2 + Math.random() * 2.4,
          baseAlpha: 0.30 + Math.random() * 0.50,
          col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        });
      }
    }

    /* ── draw loop ─────────────────────────────────────────────── */
    function draw(ts: number) {
      if (!prevTime) prevTime = ts;
      const dt = Math.min(ts - prevTime, 50);
      prevTime = ts;
      const scale = dt / 16;

      c.clearRect(0, 0, w, h);

      /* 1 ── Physics ─────────────────────────────────────────── */
      for (const p of particles) {
        if (hovering) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && dist < ATTRACT_RADIUS) {
            const t = dist / ATTRACT_RADIUS;
            const force = (1 - t) * (1 - t) * ATTRACT_STRENGTH;
            p.vx += (dx / dist) * force * scale;
            p.vy += (dy / dist) * force * scale;
          }
        }
        // Spring to home
        p.vx += (p.hx - p.x) * SPRING_K * scale;
        p.vy += (p.hy - p.y) * SPRING_K * scale;
        // Damping
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        // Move
        p.x += p.vx * scale;
        p.y += p.vy * scale;
      }

      /* 2 ── Connection lines ────────────────────────────────── */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const a = (1 - dist / CONNECT_DIST) * 0.18;
            // Blend the two particle colours for the line
            const [r1, g1, b1] = particles[i].col;
            const [r2, g2, b2] = particles[j].col;
            const rm = Math.round((r1 + r2) / 2);
            const gm = Math.round((g1 + g2) / 2);
            const bm = Math.round((b1 + b2) / 2);
            c.beginPath();
            c.moveTo(particles[i].x, particles[i].y);
            c.lineTo(particles[j].x, particles[j].y);
            c.strokeStyle = `rgba(${rm},${gm},${bm},${a})`;
            c.lineWidth = 0.9;
            c.stroke();
          }
        }
      }

      /* 3 ── Dots + glow ─────────────────────────────────────── */
      for (const p of particles) {
        const [r, g, b] = p.col;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const excitement = Math.min(speed * 0.12, 0.55);
        const alpha = Math.min(1, p.baseAlpha + excitement);

        // Glow halo
        const glowR = p.radius * 4 + excitement * 10;
        const gloGr = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
        gloGr.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.55})`);
        gloGr.addColorStop(1, `rgba(${r},${g},${b},0)`);
        c.beginPath();
        c.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        c.fillStyle = gloGr;
        c.fill();

        // Core dot
        c.beginPath();
        c.arc(p.x, p.y, p.radius + excitement * 0.8, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        c.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    /* ── mouse events ──────────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      const rect = parent!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      hovering = true;
    };
    const onLeave = () => {
      hovering = false;
      mouseX = -9999;
      mouseY = -9999;
    };
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    /* ── boot & resize ─────────────────────────────────────────── */
    createParticles();
    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => createParticles());
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animId);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", opacity }}
    />
  );
}
