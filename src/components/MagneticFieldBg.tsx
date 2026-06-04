"use client";

import { useEffect, useRef } from "react";

/* ─── helpers ────────────────────────────────────────────────────── */
function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [16, 185, 129];
}

/* ─── types ──────────────────────────────────────────────────────── */
interface Pole {
  x: number;
  y: number;
  charge: number; // +1 = source, -1 = sink
}

type Path = [number, number][];

/* ─── tuning constants ───────────────────────────────────────────── */
const NUM_POLES      = 5;      // total magnetic poles
const LINES_PER_POLE = 22;     // field lines per positive pole
const MAX_STEPS      = 280;    // max integration steps per line
const STEP_PX        = 5;      // pixels per integration step
const PARTICLES      = 4;      // glowing dots per field line
const PARTICLE_SPEED = 0.00014; // t-units per ms  → ~4-6 s per loop
const POLE_DRIFT     = 0.12;   // px per ms drift speed

/* ─── component ──────────────────────────────────────────────────── */
export default function MagneticFieldBg({
  color   = "#10b981",
  opacity = 0.85,
}: {
  color?:   string;
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

    // Non-null aliases for TypeScript closure narrowing
    const cvs: HTMLCanvasElement         = canvas;
    const c:   CanvasRenderingContext2D  = ctx;
    const [r, g, b] = hexToRgb(color);

    /* ─── state ───────────────────────────────────────────────── */
    let w = 0, h = 0;
    let poles:   Pole[]   = [];
    let paths:   Path[]   = [];
    let pOffsets: number[] = []; // 0-1 phase per path
    let poleDVX:  number[] = [];
    let poleDVY:  number[] = [];
    let animId:  number;
    let prevTime = 0;

    /* ─── field helpers ────────────────────────────────────────── */
    function fieldAt(px: number, py: number): [number, number] {
      let fx = 0, fy = 0;
      for (const p of poles) {
        const dx = px - p.x;
        const dy = py - p.y;
        const r2 = Math.max(dx * dx + dy * dy, 900); // avoid singularity
        const rm = Math.sqrt(r2);
        fx += (p.charge * dx) / (r2 * rm);
        fy += (p.charge * dy) / (r2 * rm);
      }
      const mag = Math.sqrt(fx * fx + fy * fy) + 1e-12;
      return [fx / mag, fy / mag];
    }

    function traceLine(sx: number, sy: number): Path {
      const pts: Path = [[sx, sy]];
      let x = sx, y = sy;
      for (let i = 0; i < MAX_STEPS; i++) {
        const [dx, dy] = fieldAt(x, y);
        x += dx * STEP_PX;
        y += dy * STEP_PX;
        pts.push([x, y]);
        // Stop if leaves canvas
        if (x < -20 || x > w + 20 || y < -20 || y > h + 20) break;
        // Stop if enters a sink (negative pole)
        for (const p of poles) {
          if (p.charge < 0) {
            const ddx = x - p.x, ddy = y - p.y;
            if (ddx * ddx + ddy * ddy < 600) return pts;
          }
        }
      }
      return pts;
    }

    /* ─── build paths from all positive poles ──────────────────── */
    function buildPaths() {
      paths    = [];
      pOffsets = [];
      for (const p of poles) {
        if (p.charge < 0) continue;
        for (let a = 0; a < LINES_PER_POLE; a++) {
          const angle = (a / LINES_PER_POLE) * Math.PI * 2;
          paths.push(traceLine(
            p.x + Math.cos(angle) * 18,
            p.y + Math.sin(angle) * 18,
          ));
          pOffsets.push(Math.random());
        }
      }
    }

    /* ─── init ─────────────────────────────────────────────────── */
    function init() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      cvs.width  = w;
      cvs.height = h;

      // Place poles in a balanced layout
      poles = [];
      poleDVX = [];
      poleDVY = [];
      const positions = [
        [0.18, 0.25], [0.50, 0.15], [0.82, 0.30],
        [0.25, 0.72], [0.70, 0.68],
      ];
      for (let i = 0; i < NUM_POLES; i++) {
        const [px, py] = positions[i] ?? [Math.random(), Math.random()];
        poles.push({ x: px * w, y: py * h, charge: i % 2 === 0 ? 1 : -1 });
        poleDVX.push((Math.random() - 0.5) * POLE_DRIFT);
        poleDVY.push((Math.random() - 0.5) * POLE_DRIFT);
      }
      buildPaths();
    }

    /* ─── interpolate position on a path at normalised t (0-1) ── */
    function samplePath(path: Path, t: number): [number, number] {
      if (path.length < 2) return path[0] ?? [0, 0];
      const total  = path.length - 1;
      const scaled = t * total;
      const i      = Math.min(Math.floor(scaled), total - 1);
      const frac   = scaled - i;
      const [x1, y1] = path[i];
      const [x2, y2] = path[i + 1];
      return [x1 + (x2 - x1) * frac, y1 + (y2 - y1) * frac];
    }

    /* ─── rebuild timer ─────────────────────────────────────────── */
    let rebuildAccum = 0;
    const REBUILD_MS = 5000; // rebuild field lines every 5 s after pole drift

    /* ─── draw ──────────────────────────────────────────────────── */
    function draw(ts: number) {
      if (!prevTime) prevTime = ts;
      const dt = Math.min(ts - prevTime, 50);
      prevTime = ts;

      // Drift poles gently
      rebuildAccum += dt;
      for (let i = 0; i < poles.length; i++) {
        poles[i].x += poleDVX[i] * dt;
        poles[i].y += poleDVY[i] * dt;
        // Soft boundary bounce
        if (poles[i].x < w * 0.07 || poles[i].x > w * 0.93) poleDVX[i] *= -1;
        if (poles[i].y < h * 0.07 || poles[i].y > h * 0.93) poleDVY[i] *= -1;
      }
      if (rebuildAccum >= REBUILD_MS) {
        buildPaths();
        rebuildAccum = 0;
      }

      c.clearRect(0, 0, w, h);

      /* 1 ─── Field lines (static, very subtle) ──────────────── */
      for (const path of paths) {
        if (path.length < 2) continue;
        c.beginPath();
        c.moveTo(path[0][0], path[0][1]);
        for (let i = 1; i < path.length; i++) {
          c.lineTo(path[i][0], path[i][1]);
        }
        c.strokeStyle = `rgba(${r},${g},${b},0.07)`;
        c.lineWidth   = 0.9;
        c.stroke();
      }

      /* 2 ─── Glowing particles flowing along lines ───────────── */
      for (let pi = 0; pi < paths.length; pi++) {
        const path = paths[pi];
        if (path.length < 3) continue;

        // Advance phase
        pOffsets[pi] = (pOffsets[pi] + PARTICLE_SPEED * dt) % 1;

        for (let k = 0; k < PARTICLES; k++) {
          const t = (pOffsets[pi] + k / PARTICLES) % 1;

          // Fade in/out near the two ends of the line
          const edgeFade = Math.sin(t * Math.PI);
          if (edgeFade < 0.05) continue;

          const [px, py] = samplePath(path, t);

          // Outer glow
          const haloR  = 7 * edgeFade;
          const haloGr = c.createRadialGradient(px, py, 0, px, py, haloR);
          haloGr.addColorStop(0, `rgba(${r},${g},${b},${0.5 * edgeFade})`);
          haloGr.addColorStop(1, `rgba(${r},${g},${b},0)`);
          c.beginPath();
          c.arc(px, py, haloR, 0, Math.PI * 2);
          c.fillStyle = haloGr;
          c.fill();

          // Bright core
          c.beginPath();
          c.arc(px, py, 1.8 * edgeFade + 0.5, 0, Math.PI * 2);
          c.fillStyle = `rgba(${r},${g},${b},${0.85 * edgeFade})`;
          c.fill();
        }
      }

      /* 3 ─── Pole markers ────────────────────────────────────── */
      for (const p of poles) {
        const pRadius  = p.charge > 0 ? 28 : 18;
        const pAlpha   = p.charge > 0 ? 0.30 : 0.15;
        const poleGrad = c.createRadialGradient(p.x, p.y, 0, p.x, p.y, pRadius);
        poleGrad.addColorStop(0, `rgba(${r},${g},${b},${pAlpha})`);
        poleGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        c.beginPath();
        c.arc(p.x, p.y, pRadius, 0, Math.PI * 2);
        c.fillStyle = poleGrad;
        c.fill();

        // Tiny centre dot
        c.beginPath();
        c.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${p.charge > 0 ? 0.7 : 0.4})`;
        c.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    /* ─── boot & resize ──────────────────────────────────────────── */
    init();
    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => { init(); });
    ro.observe(parent);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none", opacity }}
    />
  );
}
