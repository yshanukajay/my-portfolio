"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

/* ══════════════════════════════════════════════════════════════════
   Exact config parameters from the DagsHub WebGL Fluid source
══════════════════════════════════════════════════════════════════ */
const BASE_CONFIG = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 3,
  VELOCITY_DISSIPATION: 3,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 0,
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  SHADING: true,
  COLORFUL: false,
  PAUSED: false,
  BACK_COLOR: { r: 9, g: 8, b: 25 },
  TRANSPARENT: false,
  BLOOM: false,
  BLOOM_ITERATIONS: 8,
  BLOOM_RESOLUTION: 256,
  BLOOM_INTENSITY: 0.8,
  BLOOM_THRESHOLD: 0.7,
  BLOOM_SOFT_KNEE: 0.7,
  SUNRAYS: true,
  SUNRAYS_RESOLUTION: 196,
  SUNRAYS_WEIGHT: 0.5,
};

/* ══════════════════════════════════════════════════════════════════
   Public handle type — parent feeds pointer events to the canvas
══════════════════════════════════════════════════════════════════ */
export interface FluidHandle {
  notifyEnter: (x: number, y: number) => void;
  notifyMove: (x: number, y: number) => void;
  notifyLeave: () => void;
}

export interface FluidProps {
  /** Override the background fill colour (0-255 per channel). Defaults to the original dark navy. */
  backColor?: { r: number; g: number; b: number };
  /** Multiply generated splat colours. Use >0.15 for light backgrounds. Default 0.15. */
  colorIntensity?: number;
  /** Number of random splats to seed on mount. Default 4. */
  initialSplats?: number;
  /** Restrict hue to a [min, max] range (0-1). Default [0,1] = full rainbow. */
  hueRange?: [number, number];
  /** HSV saturation of generated colours (0-1). Default 1 (full). */
  saturation?: number;
}

/* ══════════════════════════════════════════════════════════════════
   Internal pointer data (mirrors original Pointer constructor)
══════════════════════════════════════════════════════════════════ */
interface Ptr {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: { r: number; g: number; b: number };
}

/* ══════════════════════════════════════════════════════════════════
   FBO / DoubleFBO types
══════════════════════════════════════════════════════════════════ */
interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

/* ══════════════════════════════════════════════════════════════════
   GLSL Shader Sources  (kept verbatim from the minified source)
══════════════════════════════════════════════════════════════════ */

const BASE_VERTEX_SRC = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    vL = vUv - vec2(texelSize.x, 0.0);
    vR = vUv + vec2(texelSize.x, 0.0);
    vT = vUv + vec2(0.0, texelSize.y);
    vB = vUv - vec2(0.0, texelSize.y);
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const BLUR_VERTEX_SRC = `
  precision highp float;
  attribute vec2 aPosition;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  uniform vec2 texelSize;
  void main () {
    vUv = aPosition * 0.5 + 0.5;
    float offset = 1.33333333;
    vL = vUv - texelSize * offset;
    vR = vUv + texelSize * offset;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const BLUR_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  uniform sampler2D uTexture;
  void main () {
    vec4 sum = texture2D(uTexture, vUv) * 0.29411764;
    sum += texture2D(uTexture, vL) * 0.35294117;
    sum += texture2D(uTexture, vR) * 0.35294117;
    gl_FragColor = sum;
  }
`;

const COPY_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`;

const CLEAR_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  uniform sampler2D uTexture;
  uniform float value;
  void main () {
    gl_FragColor = value * texture2D(uTexture, vUv);
  }
`;

const COLOR_FRAG_SRC = `
  precision mediump float;
  uniform vec4 color;
  void main () {
    gl_FragColor = color;
  }
`;

const BLOOM_PREFILTER_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec3 curve;
  uniform float threshold;
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
    float br = max(c.r, max(c.g, c.b));
    float rq = clamp(br - curve.x, 0.0, curve.y);
    rq = curve.z * rq * rq;
    c *= max(rq, br - threshold) / max(br, 0.0001);
    gl_FragColor = vec4(c, 0.0);
  }
`;

const BLOOM_BLUR_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  void main () {
    vec4 sum = vec4(0.0);
    sum += texture2D(uTexture, vL);
    sum += texture2D(uTexture, vR);
    sum += texture2D(uTexture, vT);
    sum += texture2D(uTexture, vB);
    sum *= 0.25;
    gl_FragColor = sum;
  }
`;

const BLOOM_FINAL_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform float intensity;
  void main () {
    vec4 sum = vec4(0.0);
    sum += texture2D(uTexture, vL);
    sum += texture2D(uTexture, vR);
    sum += texture2D(uTexture, vT);
    sum += texture2D(uTexture, vB);
    sum *= 0.25;
    gl_FragColor = sum * intensity;
  }
`;

const SUNRAYS_MASK_FRAG_SRC = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  void main () {
    vec4 c = texture2D(uTexture, vUv);
    float br = max(c.r, max(c.g, c.b));
    c.a = 1.0 - min(max(br * 20.0, 0.0), 0.8);
    gl_FragColor = c;
  }
`;

const SUNRAYS_FRAG_SRC = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform float weight;
  #define ITERATIONS 16
  void main () {
    float Density    = 0.3;
    float Decay      = 0.95;
    float Exposure   = 0.7;
    vec2  coord      = vUv;
    vec2  dir        = vUv - 0.5;
    dir *= 1.0 / float(ITERATIONS) * Density;
    float illuminationDecay = 1.0;
    float color = texture2D(uTexture, vUv).a;
    for (int i = 0; i < ITERATIONS; i++) {
      coord -= dir;
      float col = texture2D(uTexture, coord).a;
      color += col * illuminationDecay * weight;
      illuminationDecay *= Decay;
    }
    gl_FragColor = vec4(color * Exposure, 0.0, 0.0, 1.0);
  }
`;

const SPLAT_FRAG_SRC = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main () {
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    vec3 splat = exp(-dot(p, p) / radius) * color;
    vec3 base  = texture2D(uTarget, vUv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const ADVECTION_FRAG_SRC = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;
  vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
    vec2 st   = uv / tsize - 0.5;
    vec2 iuv  = floor(st);
    vec2 fuv  = fract(st);
    vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
    vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
    vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
    vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
    return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
  }
  void main () {
  #ifdef MANUAL_FILTERING
    vec2 coord  = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
    vec4 result = bilerp(uSource, coord, dyeTexelSize);
  #else
    vec2 coord  = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
    vec4 result = texture2D(uSource, coord);
  #endif
    float decay = 1.0 + dissipation * dt;
    gl_FragColor = result / decay;
  }
`;

const DIVERGENCE_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).x;
    float R = texture2D(uVelocity, vR).x;
    float T = texture2D(uVelocity, vT).y;
    float B = texture2D(uVelocity, vB).y;
    vec2 C  = texture2D(uVelocity, vUv).xy;
    if (vL.x < 0.0) { L = -C.x; }
    if (vR.x > 1.0) { R = -C.x; }
    if (vT.y > 1.0) { T = -C.y; }
    if (vB.y < 0.0) { B = -C.y; }
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

const CURL_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uVelocity, vL).y;
    float R = texture2D(uVelocity, vR).y;
    float T = texture2D(uVelocity, vT).x;
    float B = texture2D(uVelocity, vB).x;
    float vorticity = R - L - T + B;
    gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
  }
`;

const VORTICITY_FRAG_SRC = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main () {
    float L = texture2D(uCurl, vL).x;
    float R = texture2D(uCurl, vR).x;
    float T = texture2D(uCurl, vT).x;
    float B = texture2D(uCurl, vB).x;
    float C = texture2D(uCurl, vUv).x;
    vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
    force /= length(force) + 0.0001;
    force *= curl * C;
    force.y *= -1.0;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity += force * dt;
    velocity = min(max(velocity, -1000.0), 1000.0);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const PRESSURE_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    float C = texture2D(uPressure, vUv).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (L + R + B + T - divergence) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const GRAD_SUBTRACT_FRAG_SRC = `
  precision mediump float;
  precision mediump sampler2D;
  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main () {
    float L = texture2D(uPressure, vL).x;
    float R = texture2D(uPressure, vR).x;
    float T = texture2D(uPressure, vT).x;
    float B = texture2D(uPressure, vB).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity.xy -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const DISPLAY_FRAG_SRC = `
  precision highp float;
  precision highp sampler2D;
  varying vec2 vUv;
  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;
  uniform sampler2D uTexture;
  uniform sampler2D uBloom;
  uniform sampler2D uSunrays;
  uniform sampler2D uDithering;
  uniform vec2 ditherScale;
  uniform vec2 texelSize;
  vec3 linearToGamma (vec3 color) {
    color = max(color, vec3(0));
    return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
  }
  void main () {
    vec3 c = texture2D(uTexture, vUv).rgb;
  #ifdef SHADING
    vec3 lc = texture2D(uTexture, vL).rgb;
    vec3 rc = texture2D(uTexture, vR).rgb;
    vec3 tc = texture2D(uTexture, vT).rgb;
    vec3 bc = texture2D(uTexture, vB).rgb;
    float dx = length(rc) - length(lc);
    float dy = length(tc) - length(bc);
    vec3 n = normalize(vec3(dx, dy, length(texelSize)));
    vec3 l = vec3(0.0, 0.0, 1.0);
    float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
    c *= diffuse;
  #endif
  #ifdef BLOOM
    vec3 bloom = texture2D(uBloom, vUv).rgb;
  #endif
  #ifdef SUNRAYS
    float sunrays = texture2D(uSunrays, vUv).r;
    c *= sunrays;
  #ifdef BLOOM
    bloom *= sunrays;
  #endif
  #endif
  #ifdef BLOOM
    float noise = texture2D(uDithering, vUv * ditherScale).r;
    noise = noise * 2.0 - 1.0;
    bloom += noise / 255.0;
    bloom = linearToGamma(bloom);
    c += bloom;
  #endif
    float a = max(c.r, max(c.g, c.b));
    gl_FragColor = vec4(c, a);
  }
`;

/* ══════════════════════════════════════════════════════════════════
   React Component
══════════════════════════════════════════════════════════════════ */
const FluidSimulation = forwardRef<FluidHandle, FluidProps>((props, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Internal mutable store for the imperative API callbacks
  const apiRef = useRef<FluidHandle>({
    notifyEnter: () => { },
    notifyMove: () => { },
    notifyLeave: () => { },
  });

  useImperativeHandle(ref, () => ({
    notifyEnter: (x, y) => apiRef.current.notifyEnter(x, y),
    notifyMove: (x, y) => apiRef.current.notifyMove(x, y),
    notifyLeave: () => apiRef.current.notifyLeave(),
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Rebind as a definite type so inner closures don't lose narrowing
    const cvs: HTMLCanvasElement = canvas;

    /* ── WebGL context (webgl2 → webgl fallback) ─────────────── */
    const ctxParams: WebGLContextAttributes = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gl: any = canvas.getContext("webgl2", ctxParams);
    const isWebGL2 = !!gl;
    if (!isWebGL2) {
      gl = canvas.getContext("webgl", ctxParams) ?? canvas.getContext("experimental-webgl", ctxParams);
    }
    if (!gl) return; // WebGL not available

    /* ── Extensions ──────────────────────────────────────────── */
    let halfFloatExt: OES_texture_half_float | null = null;
    let linearFilterExt: OES_texture_float_linear | OES_texture_half_float_linear | null = null;

    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      linearFilterExt = gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloatExt = gl.getExtension("OES_texture_half_float");
      linearFilterExt = gl.getExtension("OES_texture_half_float_linear");
    }
    gl.clearColor(0, 0, 0, 1);

    const halfFloatType: number = isWebGL2 ? gl.HALF_FLOAT : halfFloatExt!.HALF_FLOAT_OES;

    /* ── Runtime config (with mobile/capability fallbacks) ───── */
    const cfg = {
      ...BASE_CONFIG,
      BACK_COLOR: props.backColor ?? BASE_CONFIG.BACK_COLOR,
    };
    const colorIntensity = props.colorIntensity ?? 0.15;
    if (/Mobi|Android/i.test(navigator.userAgent)) cfg.DYE_RESOLUTION = 512;
    if (!linearFilterExt) {
      cfg.DYE_RESOLUTION = 512;
      cfg.SHADING = false;
      cfg.BLOOM = false;
      cfg.SUNRAYS = false;
    }

    /* ── Texture-format support check (mirrors original) ─────── */
    function checkFormat(intFmt: number, fmt: number, type: number): boolean {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, intFmt, 4, 4, 0, fmt, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    function getSupportedFormat(
      intFmt: number,
      fmt: number,
      type: number,
    ): { internalFormat: number; format: number } | null {
      if (!checkFormat(intFmt, fmt, type)) {
        if (intFmt === gl.R16F) return getSupportedFormat(gl.RG16F, gl.RG, type);
        if (intFmt === gl.RG16F) return getSupportedFormat(gl.RGBA16F, gl.RGBA, type);
        return null;
      }
      return { internalFormat: intFmt, format: fmt };
    }

    let fmtRGBA: { internalFormat: number; format: number } | null;
    let fmtRG: { internalFormat: number; format: number } | null;
    let fmtR: { internalFormat: number; format: number } | null;

    if (isWebGL2) {
      fmtRGBA = getSupportedFormat(gl.RGBA16F, gl.RGBA, halfFloatType);
      fmtRG = getSupportedFormat(gl.RG16F, gl.RG, halfFloatType);
      fmtR = getSupportedFormat(gl.R16F, gl.RED, halfFloatType);
    } else {
      fmtRGBA = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatType);
      fmtRG = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatType);
      fmtR = getSupportedFormat(gl.RGBA, gl.RGBA, halfFloatType);
    }
    if (!fmtRGBA || !fmtRG || !fmtR) return; // Unsupported GPU

    /* ── Shader / program helpers ────────────────────────────── */
    function compileShader(type: number, src: string, keywords?: string[]): WebGLShader {
      let source = src;
      if (keywords?.length) {
        source = keywords.map((k) => `#define ${k}`).join("\n") + "\n" + src;
      }
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("[FluidSim] shader error:", gl.getShaderInfoLog(shader));
      }
      return shader;
    }

    function createProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
      const prog = gl.createProgram();
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn("[FluidSim] program link:", gl.getProgramInfoLog(prog));
      }
      return prog;
    }

    function getUniforms(prog: WebGLProgram): Record<string, WebGLUniformLocation | null> {
      const out: Record<string, WebGLUniformLocation | null> = {};
      const n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS) as number;
      for (let i = 0; i < n; i++) {
        const name = gl.getActiveUniform(prog, i).name as string;
        out[name] = gl.getUniformLocation(prog, name);
      }
      return out;
    }

    function hashCode(s: string): number {
      let h = 0;
      for (let i = 0; i < s.length; i++) {
        h = (h << 5) - h + s.charCodeAt(i);
        h |= 0;
      }
      return h;
    }

    /* ── Material (keyword-based multi-variant program) ──────── */
    class Material {
      vs: WebGLShader;
      fsSrc: string;
      progs: Record<number, WebGLProgram> = {};
      active: WebGLProgram | null = null;
      uniforms: Record<string, WebGLUniformLocation | null> = {};

      constructor(vs: WebGLShader, fsSrc: string) {
        this.vs = vs;
        this.fsSrc = fsSrc;
      }

      setKeywords(kws: string[]) {
        const hash = kws.reduce((acc, k) => acc + hashCode(k), 0);
        if (!this.progs[hash]) {
          const fs = compileShader(gl.FRAGMENT_SHADER, this.fsSrc, kws);
          this.progs[hash] = createProgram(this.vs, fs);
        }
        if (this.progs[hash] !== this.active) {
          this.uniforms = getUniforms(this.progs[hash]);
          this.active = this.progs[hash];
        }
      }

      bind() { gl.useProgram(this.active); }
    }

    /* ── Simple single-variant program ───────────────────────── */
    class Prog {
      program: WebGLProgram;
      uniforms: Record<string, WebGLUniformLocation | null>;

      constructor(vs: WebGLShader, fs: WebGLShader) {
        this.program = createProgram(vs, fs);
        this.uniforms = getUniforms(this.program);
      }

      bind() { gl.useProgram(this.program); }
    }

    /* ── Compile all shaders ─────────────────────────────────── */
    const baseVS = compileShader(gl.VERTEX_SHADER, BASE_VERTEX_SRC);
    const blurVS = compileShader(gl.VERTEX_SHADER, BLUR_VERTEX_SRC);

    const blurProg = new Prog(blurVS, compileShader(gl.FRAGMENT_SHADER, BLUR_FRAG_SRC));
    const copyProg = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, COPY_FRAG_SRC));
    const clearProg = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, CLEAR_FRAG_SRC));
    const colorProg = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, COLOR_FRAG_SRC));
    const bloomPrefilterP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, BLOOM_PREFILTER_FRAG_SRC));
    const bloomBlurP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, BLOOM_BLUR_FRAG_SRC));
    const bloomFinalP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, BLOOM_FINAL_FRAG_SRC));
    const sunraysMaskP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, SUNRAYS_MASK_FRAG_SRC));
    const sunraysP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, SUNRAYS_FRAG_SRC));
    const splatP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, SPLAT_FRAG_SRC));
    const advectionP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, ADVECTION_FRAG_SRC, linearFilterExt ? undefined : ["MANUAL_FILTERING"]));
    const divergenceP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, DIVERGENCE_FRAG_SRC));
    const curlP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, CURL_FRAG_SRC));
    const vorticityP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, VORTICITY_FRAG_SRC));
    const pressureP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, PRESSURE_FRAG_SRC));
    const gradSubtractP = new Prog(baseVS, compileShader(gl.FRAGMENT_SHADER, GRAD_SUBTRACT_FRAG_SRC));
    const displayMat = new Material(baseVS, DISPLAY_FRAG_SRC);

    /* ── Full-screen quad geometry ───────────────────────────── */
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    /* ── blit helper ─────────────────────────────────────────── */
    function blit(target: FBO | null, clear = false) {
      if (!target) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (clear) { gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT); }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    /* ── FBO creation ────────────────────────────────────────── */
    function createFBO(w: number, h: number, intFmt: number, fmt: number, type: number, filter: number): FBO {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, intFmt, w, h, 0, fmt, type, null);
      const fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture, fbo, width: w, height: h,
        texelSizeX: 1 / w, texelSizeY: 1 / h,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          return id;
        },
      };
    }

    function createDoubleFBO(w: number, h: number, intFmt: number, fmt: number, type: number, filter: number): DoubleFBO {
      let a = createFBO(w, h, intFmt, fmt, type, filter);
      let b = createFBO(w, h, intFmt, fmt, type, filter);
      return {
        width: w, height: h,
        texelSizeX: a.texelSizeX, texelSizeY: a.texelSizeY,
        get read() { return a; },
        get write() { return b; },
        swap() { [a, b] = [b, a]; },
      };
    }

    function resizeDoubleFBO(
      target: DoubleFBO, w: number, h: number,
      intFmt: number, fmt: number, type: number, filter: number,
    ): DoubleFBO {
      if (target.width === w && target.height === h) return target;
      // Copy existing read into new FBO at new size
      const newRead = createFBO(w, h, intFmt, fmt, type, filter);
      copyProg.bind();
      gl.uniform1i(copyProg.uniforms.uTexture, target.read.attach(0));
      blit(newRead);
      // Create fresh double with copied read and blank write
      let a = newRead;
      let b = createFBO(w, h, intFmt, fmt, type, filter);
      return {
        width: w, height: h,
        texelSizeX: 1 / w, texelSizeY: 1 / h,
        get read() { return a; },
        get write() { return b; },
        swap() { [a, b] = [b, a]; },
      };
    }

    /* ── Resolution helpers ──────────────────────────────────── */
    function getResolution(res: number) {
      let ar = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (ar < 1) ar = 1 / ar;
      const min = Math.round(res);
      const max = Math.round(res * ar);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max };
    }

    function scaleByPixelRatio(v: number) {
      return Math.floor(v * (window.devicePixelRatio || 1));
    }

    function resizeCanvas() {
      const w = scaleByPixelRatio(cvs.clientWidth);
      const h = scaleByPixelRatio(cvs.clientHeight);
      if (cvs.width !== w || cvs.height !== h) {
        cvs.width = w; cvs.height = h;
        return true;
      }
      return false;
    }

    /* ── Dithering texture (white 1×1 placeholder) ───────────── */
    const ditheringTex = (() => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));
      return {
        texture: tex, width: 1, height: 1,
        attach(id: number) {
          gl.activeTexture(gl.TEXTURE0 + id);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          return id;
        },
      };
    })();

    /* ── Initialise simulation FBOs ──────────────────────────── */
    const linearFilter = linearFilterExt ? gl.LINEAR : gl.NEAREST;

    let simRes = getResolution(cfg.SIM_RESOLUTION);
    let dyeRes = getResolution(cfg.DYE_RESOLUTION);

    let dye = createDoubleFBO(dyeRes.width, dyeRes.height, fmtRGBA.internalFormat, fmtRGBA.format, halfFloatType, linearFilter);
    let velocity = createDoubleFBO(simRes.width, simRes.height, fmtRG.internalFormat, fmtRG.format, halfFloatType, linearFilter);
    let divergence = createFBO(simRes.width, simRes.height, fmtR.internalFormat, fmtR.format, halfFloatType, gl.NEAREST);
    let curl = createFBO(simRes.width, simRes.height, fmtR.internalFormat, fmtR.format, halfFloatType, gl.NEAREST);
    let pressure = createDoubleFBO(simRes.width, simRes.height, fmtR.internalFormat, fmtR.format, halfFloatType, gl.NEAREST);

    // Bloom FBOs
    const bloomRes = getResolution(cfg.BLOOM_RESOLUTION);
    const bloom = createFBO(bloomRes.width, bloomRes.height, fmtRGBA.internalFormat, fmtRGBA.format, halfFloatType, linearFilter);
    const bloomFBOs: FBO[] = [];
    for (let i = 0; i < cfg.BLOOM_ITERATIONS; i++) {
      const w = bloomRes.width >> (i + 1);
      const h = bloomRes.height >> (i + 1);
      if (w < 2 || h < 2) break;
      bloomFBOs.push(createFBO(w, h, fmtRGBA.internalFormat, fmtRGBA.format, halfFloatType, linearFilter));
    }

    // Sunrays FBOs
    const srRes = getResolution(cfg.SUNRAYS_RESOLUTION);
    const sunrays = createFBO(srRes.width, srRes.height, fmtR.internalFormat, fmtR.format, halfFloatType, linearFilter);
    const sunraysTemp = createFBO(srRes.width, srRes.height, fmtR.internalFormat, fmtR.format, halfFloatType, linearFilter);

    /* ── Display material keywords ───────────────────────────── */
    const kws: string[] = [];
    if (cfg.SHADING) kws.push("SHADING");
    if (cfg.BLOOM) kws.push("BLOOM");
    if (cfg.SUNRAYS) kws.push("SUNRAYS");
    displayMat.setKeywords(kws);

    /* ── Color helpers ───────────────────────────────────────── */
    function HSVtoRGB(h: number, s: number, v: number) {
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      let r = 0, g = 0, b = 0;
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        default: r = v; g = p; b = q;
      }
      return { r, g, b };
    }

    function generateColor() {
      const [hMin, hMax] = props.hueRange ?? [0, 1];
      const hue = hMin + Math.random() * (hMax - hMin);
      const sat = props.saturation ?? 1;
      const c = HSVtoRGB(hue, sat, 1);
      // Scale down so colours are subtle; parent controls intensity for dark/light modes
      c.r *= colorIntensity; c.g *= colorIntensity; c.b *= colorIntensity;
      return c;
    }

    /* ── Pointer state ───────────────────────────────────────── */
    function makePtr(): Ptr {
      return {
        id: -1, texcoordX: 0, texcoordY: 0, prevTexcoordX: 0, prevTexcoordY: 0,
        deltaX: 0, deltaY: 0, down: false, moved: false, color: { r: 30, g: 0, b: 300 }
      };
    }
    const pointers: Ptr[] = [makePtr()];

    function ptrDown(ptr: Ptr, id: number, px: number, py: number) {
      ptr.id = id; ptr.down = true; ptr.moved = false;
      ptr.texcoordX = px / cvs.width;
      ptr.texcoordY = 1 - py / cvs.height;
      ptr.prevTexcoordX = ptr.texcoordX;
      ptr.prevTexcoordY = ptr.texcoordY;
      ptr.deltaX = 0; ptr.deltaY = 0;
      ptr.color = generateColor();
    }

    function ptrMove(ptr: Ptr, px: number, py: number) {
      ptr.prevTexcoordX = ptr.texcoordX;
      ptr.prevTexcoordY = ptr.texcoordY;
      ptr.texcoordX = px / cvs.width;
      ptr.texcoordY = 1 - py / cvs.height;
      // Aspect-ratio correction mirrors original deltaX / deltaY formulas
      const ar = cvs.width / cvs.height;
      ptr.deltaX = (ptr.texcoordX - ptr.prevTexcoordX) * (ar < 1 ? ar : 1);
      ptr.deltaY = (ptr.texcoordY - ptr.prevTexcoordY) / (ar > 1 ? ar : 1);
      ptr.moved = Math.abs(ptr.deltaX) > 0 || Math.abs(ptr.deltaY) > 0;
    }

    /* ── Splat ───────────────────────────────────────────────── */
    function splat(x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) {
      splatP.bind();
      gl.uniform1i(splatP.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatP.uniforms.aspectRatio, cvs.width / cvs.height);
      gl.uniform2f(splatP.uniforms.point, x, y);
      gl.uniform3f(splatP.uniforms.color, dx, dy, 0);
      let radius = cfg.SPLAT_RADIUS / 100;
      const ar = cvs.width / cvs.height;
      if (ar > 1) radius *= ar;
      gl.uniform1f(splatP.uniforms.radius, radius);
      blit(velocity.write); velocity.swap();

      gl.uniform1i(splatP.uniforms.uTarget, dye.read.attach(0));
      gl.uniform3f(splatP.uniforms.color, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }

    /* ── Blur (used for sunrays smoothing) ───────────────────── */
    function blur(target: FBO, temp: FBO, iterations: number) {
      blurProg.bind();
      for (let i = 0; i < iterations; i++) {
        gl.uniform2f(blurProg.uniforms.texelSize, target.texelSizeX, 0);
        gl.uniform1i(blurProg.uniforms.uTexture, target.attach(0));
        blit(temp);
        gl.uniform2f(blurProg.uniforms.texelSize, 0, target.texelSizeY);
        gl.uniform1i(blurProg.uniforms.uTexture, temp.attach(0));
        blit(target);
      }
    }

    /* ── Simulation step ─────────────────────────────────────── */
    function step(dt: number) {
      gl.disable(gl.BLEND);

      curlP.bind();
      gl.uniform2f(curlP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(curlP.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl);

      vorticityP.bind();
      gl.uniform2f(vorticityP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(vorticityP.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityP.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityP.uniforms.curl, cfg.CURL);
      gl.uniform1f(vorticityP.uniforms.dt, dt);
      blit(velocity.write); velocity.swap();

      divergenceP.bind();
      gl.uniform2f(divergenceP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(divergenceP.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence);

      clearProg.bind();
      gl.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProg.uniforms.value, cfg.PRESSURE);
      blit(pressure.write); pressure.swap();

      pressureP.bind();
      gl.uniform2f(pressureP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(pressureP.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < cfg.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureP.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }

      gradSubtractP.bind();
      gl.uniform2f(gradSubtractP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      gl.uniform1i(gradSubtractP.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradSubtractP.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      advectionP.bind();
      gl.uniform2f(advectionP.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!linearFilterExt) gl.uniform2f(advectionP.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velId = velocity.read.attach(0);
      gl.uniform1i(advectionP.uniforms.uVelocity, velId);
      gl.uniform1i(advectionP.uniforms.uSource, velId);
      gl.uniform1f(advectionP.uniforms.dt, dt);
      gl.uniform1f(advectionP.uniforms.dissipation, cfg.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();

      if (!linearFilterExt) gl.uniform2f(advectionP.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      gl.uniform1i(advectionP.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionP.uniforms.uSource, dye.read.attach(1));
      gl.uniform1f(advectionP.uniforms.dissipation, cfg.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    /* ── Bloom pass ──────────────────────────────────────────── */
    function applyBloom(src: FBO, dest: FBO) {
      if (bloomFBOs.length < 2) return;
      let last = dest;
      gl.disable(gl.BLEND);

      bloomPrefilterP.bind();
      const knee = cfg.BLOOM_THRESHOLD * cfg.BLOOM_SOFT_KNEE + 1e-4;
      gl.uniform3f(bloomPrefilterP.uniforms.curve, cfg.BLOOM_THRESHOLD - knee, knee * 2, 0.25 / knee);
      gl.uniform1f(bloomPrefilterP.uniforms.threshold, cfg.BLOOM_THRESHOLD);
      gl.uniform1i(bloomPrefilterP.uniforms.uTexture, src.attach(0));
      blit(last);

      bloomBlurP.bind();
      for (let i = 0; i < bloomFBOs.length; i++) {
        gl.uniform2f(bloomBlurP.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurP.uniforms.uTexture, last.attach(0));
        blit(bloomFBOs[i]);
        last = bloomFBOs[i];
      }

      gl.blendFunc(gl.ONE, gl.ONE);
      gl.enable(gl.BLEND);
      for (let i = bloomFBOs.length - 2; i >= 0; i--) {
        const base = bloomFBOs[i];
        gl.uniform2f(bloomBlurP.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
        gl.uniform1i(bloomBlurP.uniforms.uTexture, last.attach(0));
        gl.viewport(0, 0, base.width, base.height);
        blit(base);
        last = base;
      }

      gl.disable(gl.BLEND);
      bloomFinalP.bind();
      gl.uniform2f(bloomFinalP.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(bloomFinalP.uniforms.uTexture, last.attach(0));
      gl.uniform1f(bloomFinalP.uniforms.intensity, cfg.BLOOM_INTENSITY);
      blit(dest);
    }

    /* ── Sunrays pass ────────────────────────────────────────── */
    function applySunrays(src: FBO, mask: FBO, dest: FBO) {
      gl.disable(gl.BLEND);
      sunraysMaskP.bind();
      gl.uniform1i(sunraysMaskP.uniforms.uTexture, src.attach(0));
      blit(mask);

      sunraysP.bind();
      gl.uniform1f(sunraysP.uniforms.weight, cfg.SUNRAYS_WEIGHT);
      gl.uniform1i(sunraysP.uniforms.uTexture, mask.attach(0));
      blit(dest);

      blur(dest, sunraysTemp, 1);
    }

    /* ── Full render ─────────────────────────────────────────── */
    function render() {
      if (cfg.BLOOM) applyBloom(dye.read, bloom);
      if (cfg.SUNRAYS) applySunrays(dye.read, dye.write, sunrays);

      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);

      // Draw background colour
      colorProg.bind();
      gl.uniform4f(colorProg.uniforms.color,
        cfg.BACK_COLOR.r / 255, cfg.BACK_COLOR.g / 255, cfg.BACK_COLOR.b / 255, 1);
      blit(null);

      // Draw fluid to screen
      const W = gl.drawingBufferWidth;
      const H = gl.drawingBufferHeight;
      displayMat.bind();
      if (cfg.SHADING) gl.uniform2f(displayMat.uniforms.texelSize, 1 / W, 1 / H);
      gl.uniform1i(displayMat.uniforms.uTexture, dye.read.attach(0));
      if (cfg.BLOOM) {
        gl.uniform1i(displayMat.uniforms.uBloom, bloom.attach(1));
        gl.uniform1i(displayMat.uniforms.uDithering, ditheringTex.attach(2));
        gl.uniform2f(displayMat.uniforms.ditherScale, W / ditheringTex.width, H / ditheringTex.height);
      }
      if (cfg.SUNRAYS) gl.uniform1i(displayMat.uniforms.uSunrays, sunrays.attach(3));
      blit(null);
    }

    /* ── Initial random splats so fluid looks alive on load ─── */
    const numSplats = props.initialSplats ?? 4;
    const splatMult = props.colorIntensity && props.colorIntensity > 0.5 ? 22 : 10;
    for (let i = 0; i < numSplats; i++) {
      const c = generateColor(); c.r *= splatMult; c.g *= splatMult; c.b *= splatMult;
      splat(Math.random(), Math.random(),
        1000 * (Math.random() - 0.5), 1000 * (Math.random() - 0.5), c);
    }

    /* ── Animation loop ──────────────────────────────────────── */
    let lastTime = Date.now();
    let animId: number;

    function update() {
      const now = Date.now();
      const dt = Math.min((now - lastTime) / 1000, 1 / 60);
      lastTime = now;

      // Handle resize → rebuild FBOs
      if (resizeCanvas()) {
        simRes = getResolution(cfg.SIM_RESOLUTION);
        dyeRes = getResolution(cfg.DYE_RESOLUTION);
        dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, fmtRGBA!.internalFormat, fmtRGBA!.format, halfFloatType, linearFilter);
        velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, fmtRG!.internalFormat, fmtRG!.format, halfFloatType, linearFilter);
        divergence = createFBO(simRes.width, simRes.height, fmtR!.internalFormat, fmtR!.format, halfFloatType, gl.NEAREST);
        curl = createFBO(simRes.width, simRes.height, fmtR!.internalFormat, fmtR!.format, halfFloatType, gl.NEAREST);
        pressure = createDoubleFBO(simRes.width, simRes.height, fmtR!.internalFormat, fmtR!.format, halfFloatType, gl.NEAREST);
      }

      // Apply pointer-driven splats
      for (const ptr of pointers) {
        if (ptr.moved) {
          ptr.moved = false;
          splat(ptr.texcoordX, ptr.texcoordY,
            ptr.deltaX * cfg.SPLAT_FORCE, ptr.deltaY * cfg.SPLAT_FORCE, ptr.color);
        }
      }

      if (!cfg.PAUSED) step(dt);
      render();
      animId = requestAnimationFrame(update);
    }
    animId = requestAnimationFrame(update);

    /* ── Exact event listeners from the DagsHub source ──────── */
    // mouseover — initialise pointer when mouse enters canvas
    const onMouseOver = (e: MouseEvent) => {
      let ptr = pointers.find((p) => p.id === -1);
      if (!ptr) { ptr = makePtr(); pointers.push(ptr); }
      ptrDown(ptr, -1, scaleByPixelRatio(e.offsetX), scaleByPixelRatio(e.offsetY));
      if (pointers[0] !== ptr) pointers[0] = ptr;
    };

    // mousemove — update first pointer (mouse) if it is down
    const onMouseMove = (e: MouseEvent) => {
      const ptr = pointers[0];
      if (ptr?.down) ptrMove(ptr, scaleByPixelRatio(e.offsetX), scaleByPixelRatio(e.offsetY));
    };

    // touch start — one pointer slot per touch (index 1+)
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touches = e.targetTouches;
      while (touches.length >= pointers.length) pointers.push(makePtr());
      for (let i = 0; i < touches.length; i++) {
        ptrDown(pointers[i + 1], touches[i].identifier,
          scaleByPixelRatio(touches[i].pageX), scaleByPixelRatio(touches[i].pageY));
      }
    };

    // touch move
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touches = e.targetTouches;
      for (let i = 0; i < touches.length; i++) {
        const ptr = pointers[i + 1];
        if (ptr?.down) ptrMove(ptr, scaleByPixelRatio(touches[i].pageX), scaleByPixelRatio(touches[i].pageY));
      }
    };

    // touch end — release matching pointer
    const onTouchEnd = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const ptr = pointers.find((p) => p.id === e.changedTouches[i].identifier);
        if (ptr) ptr.down = false;
      }
    };

    canvas.addEventListener("mouseover", onMouseOver);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    /* ── Expose imperative API (parent can relay events) ─────── */
    apiRef.current = {
      notifyEnter: (x, y) => {
        ptrDown(pointers[0], -1, x, y);
      },
      notifyMove: (x, y) => {
        if (pointers[0].down) ptrMove(pointers[0], x, y);
      },
      notifyLeave: () => {
        pointers[0].down = false;
      },
    };

    /* ── Cleanup ─────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mouseover", onMouseOver);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      apiRef.current = { notifyEnter: () => { }, notifyMove: () => { }, notifyLeave: () => { } };
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block", pointerEvents: "none" }}
    />
  );
});

FluidSimulation.displayName = "FluidSimulation";
export default FluidSimulation;
