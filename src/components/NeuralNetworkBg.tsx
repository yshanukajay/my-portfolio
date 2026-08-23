"use client";

import { useEffect, useRef } from "react";

/* ── helpers ─────────────────────────────────────────────────────── */
function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
    : [16, 185, 129];
}

/* ── types ───────────────────────────────────────────────────────── */
interface NNNode {
  x: number;
  y: number;
  phase: number;    // oscillation offset
  speed: number;    // individual oscillation speed
}

interface Signal {
  layer: number;    // connection is layer → layer+1
  fromIdx: number;
  toIdx: number;
  t: number;        // 0 → 1 along the edge
  velocity: number; // t-units per ms
  opacity: number;
}

/* ── layer topology ──────────────────────────────────────────────── */
const TOPOLOGY = [4, 7, 7, 5, 3]; // nodes per layer
const MAX_SIGNALS = 8;             // fewer concurrent signals = calmer look

/* ── component ───────────────────────────────────────────────────── */
export default function NeuralNetworkBg({
  color = "#10b981",
  opacity = 1,
}: {
  color?: string;
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

    // Non-null aliases so nested closures keep type narrowing
    const cvs: HTMLCanvasElement = canvas;
    const c: CanvasRenderingContext2D = ctx;

    const [r, g, b] = hexToRgb(color);

    /* ── mutable state ──────────────────────────────────────────── */
    let nodes: NNNode[][] = [];
    let signals: Signal[] = [];
    let animId: number;
    let prevTime = 0;

    /* ── layout ─────────────────────────────────────────────────── */
    function layout() {
      const w = parent!.clientWidth;
      const h = parent!.clientHeight;
      cvs.width = w;
      cvs.height = h;

      // Horizontal padding so nodes don't sit at the very edge
      const padX = w * 0.10;
      const padY = h * 0.14;

      nodes = TOPOLOGY.map((count, li) => {
        const x = padX + (w - 2 * padX) * (li / (TOPOLOGY.length - 1));
        return Array.from({ length: count }, (_, ni) => ({
          x,
          y: padY + (h - 2 * padY) * (ni / (count - 1 || 1)),
          phase: Math.random() * Math.PI * 2,
          speed: 0.18 + Math.random() * 0.22, // rad/s — slow gentle pulse
        }));
      });
    }

    /* ── signal factory ─────────────────────────────────────────── */
    function spawnSignal(): Signal {
      const layer = Math.floor(Math.random() * (TOPOLOGY.length - 1));
      const fromIdx = Math.floor(Math.random() * TOPOLOGY[layer]);
      const toIdx = Math.floor(Math.random() * TOPOLOGY[layer + 1]);
      return {
        layer, fromIdx, toIdx,
        t: 0,
        velocity: 0.00008 + Math.random() * 0.00010, // t per ms → ~5-9s travel
        opacity: 0.45 + Math.random() * 0.30,         // softer presence
      };
    }

    /* ── seed staggered signals ─────────────────────────────────── */
    function seed() {
      signals = [];
      for (let i = 0; i < Math.round(MAX_SIGNALS * 0.6); i++) {
        const s = spawnSignal();
        s.t = Math.random(); // stagger across the network
        signals.push(s);
      }
    }

    /* ── draw ────────────────────────────────────────────────────── */
    function draw(timestamp: number) {
      if (!prevTime) prevTime = timestamp;
      const dt = Math.min(timestamp - prevTime, 50); // cap at 50ms (tab unfocus)
      prevTime = timestamp;

      const w = cvs.width;
      const h = cvs.height;
      c.clearRect(0, 0, w, h);

      // ── 1. Connection lines ────────────────────────────────────
      for (let li = 0; li < nodes.length - 1; li++) {
        const fromLayer = nodes[li];
        const toLayer = nodes[li + 1];
        for (const fn of fromLayer) {
          for (const tn of toLayer) {
            c.beginPath();
            c.moveTo(fn.x, fn.y);
            c.lineTo(tn.x, tn.y);
            c.strokeStyle = `rgba(${r},${g},${b},0.07)`;
            c.lineWidth = 0.9;
            c.stroke();
          }
        }
      }

      // ── 2. Signals along edges ─────────────────────────────────
      signals = signals.filter(s => s.t <= 1);
      for (const sig of signals) {
        sig.t += sig.velocity * dt;
        if (sig.t > 1) continue;

        const fn = nodes[sig.layer]?.[sig.fromIdx];
        const tn = nodes[sig.layer + 1]?.[sig.toIdx];
        if (!fn || !tn) continue;

        const sx = fn.x + (tn.x - fn.x) * sig.t;
        const sy = fn.y + (tn.y - fn.y) * sig.t;

        // Tail — fading line segment behind signal
        const tailT = Math.max(0, sig.t - 0.12);
        const tx = fn.x + (tn.x - fn.x) * tailT;
        const ty = fn.y + (tn.y - fn.y) * tailT;
        const tailGrad = c.createLinearGradient(tx, ty, sx, sy);
        tailGrad.addColorStop(0, `rgba(${r},${g},${b},0)`);
        tailGrad.addColorStop(1, `rgba(${r},${g},${b},${0.35 * sig.opacity})`);
        c.beginPath();
        c.moveTo(tx, ty);
        c.lineTo(sx, sy);
        c.strokeStyle = tailGrad;
        c.lineWidth = 1.4;
        c.stroke();

        // Glow halo
        const haloR = 8;
        const haloG = c.createRadialGradient(sx, sy, 0, sx, sy, haloR);
        haloG.addColorStop(0, `rgba(${r},${g},${b},${0.55 * sig.opacity})`);
        haloG.addColorStop(1, `rgba(${r},${g},${b},0)`);
        c.beginPath();
        c.arc(sx, sy, haloR, 0, Math.PI * 2);
        c.fillStyle = haloG;
        c.fill();

        // Core dot
        c.beginPath();
        c.arc(sx, sy, 2.2, 0, Math.PI * 2);
        c.fillStyle = `rgba(${r},${g},${b},${sig.opacity})`;
        c.fill();
      }

      // Respawn finished signals
      while (signals.length < MAX_SIGNALS) {
        signals.push(spawnSignal());
      }

      // ── 3. Nodes ───────────────────────────────────────────────
      for (const layer of nodes) {
        for (const nd of layer) {
          nd.phase += nd.speed * (dt / 1000); // advance oscillation
          const pulse = 0.45 + 0.55 * (0.5 + 0.5 * Math.sin(nd.phase)); // 0.45–1.0

          // Outer glow ring
          const outerR = 14;
          const outerGr = c.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, outerR);
          outerGr.addColorStop(0, `rgba(${r},${g},${b},${0.18 * pulse})`);
          outerGr.addColorStop(1, `rgba(${r},${g},${b},0)`);
          c.beginPath();
          c.arc(nd.x, nd.y, outerR, 0, Math.PI * 2);
          c.fillStyle = outerGr;
          c.fill();

          // Node fill
          const nodeR = 4.5;
          const nGrad = c.createRadialGradient(nd.x - 1, nd.y - 1, 0, nd.x, nd.y, nodeR);
          nGrad.addColorStop(0, `rgba(${r},${g},${b},${0.7 * pulse})`);
          nGrad.addColorStop(1, `rgba(${r},${g},${b},${0.25 * pulse})`);
          c.beginPath();
          c.arc(nd.x, nd.y, nodeR, 0, Math.PI * 2);
          c.fillStyle = nGrad;
          c.fill();

          // Node ring
          c.beginPath();
          c.arc(nd.x, nd.y, nodeR, 0, Math.PI * 2);
          c.strokeStyle = `rgba(${r},${g},${b},${0.6 * pulse})`;
          c.lineWidth = 1.1;
          c.stroke();
        }
      }

      animId = requestAnimationFrame(draw);
    }

    /* ── init ────────────────────────────────────────────────────── */
    layout();
    seed();
    animId = requestAnimationFrame(draw);

    /* ── resize ──────────────────────────────────────────────────── */
    const ro = new ResizeObserver(() => {
      layout();
      seed();
    });
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
