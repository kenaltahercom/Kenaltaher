"use client";

import { useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   Galaxy – WebGL2 star-field background
   Dark Mode only. After-hero area → Footer.
   All GL resources, observers, and RAF cleaned
   up on unmount or when lightMode flips true.
───────────────────────────────────────────── */

interface GalaxyProps {
  density?: number;
  glowIntensity?: number;
  flareIntensity?: number;
  starSpeed?: number;
  mouseRepulsion?: boolean;
  clickWarp?: boolean;
  starColors?: string[];
  hueShift?: number;
  saturation?: number;
  starSize?: number;
  twinkleIntensity?: number;
  speed?: number;
  rotationSpeed?: number;
  layers?: number;
  direction?: "forward" | "backward";
  repulsionStrength?: number;
  mouseInteraction?: boolean;
  intro?: boolean;
  lightMode?: boolean;
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

const VERT = `#version 300 es
precision highp float;
in vec2 a_position;
in float a_size;
in float a_brightness;
in float a_speed;
in float a_angle;
in vec3 a_color;
in float a_layer;
uniform float u_time;
uniform float u_rotationSpeed;
uniform float u_speed;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform bool u_mouseRepulsion;
uniform float u_repulsionStrength;
uniform bool u_mouseInteraction;
uniform float u_starSize;
uniform float u_direction;
out float v_brightness;
out vec3 v_color;
out float v_dist;
out float v_layer;
void main() {
  float t = u_time * u_speed * a_speed * u_direction;
  float rot = u_time * u_rotationSpeed * u_direction;
  float s = sin(rot + a_angle);
  float c = cos(rot + a_angle);
  mat2 rotMat = mat2(c, -s, s, c);
  vec2 pos = rotMat * a_position + vec2(0.0, t * 0.05);
  pos = fract(pos * 0.5 + 0.5) * 2.0 - 1.0;
  if (u_mouseRepulsion && u_mouseInteraction) {
    vec2 mouseNDC = (u_mouse / u_resolution) * 2.0 - 1.0;
    mouseNDC.y = -mouseNDC.y;
    vec2 delta = pos - mouseNDC;
    float dist = length(delta);
    if (dist < 0.3) {
      float force = (0.3 - dist) / 0.3;
      pos += normalize(delta) * force * u_repulsionStrength * 0.05;
    }
  }
  v_brightness = a_brightness;
  v_color = a_color;
  v_dist = length(a_position);
  v_layer = a_layer;
  gl_Position = vec4(pos, 0.0, 1.0);
  gl_PointSize = a_size * u_starSize * (1.0 / (1.0 + v_dist * 0.5));
}`;

const FRAG = `#version 300 es
precision highp float;
uniform float u_time;
uniform float u_twinkleIntensity;
uniform float u_glowIntensity;
uniform float u_flareIntensity;
in float v_brightness;
in vec3 v_color;
in float v_dist;
in float v_layer;
out vec4 fragColor;
void main() {
  vec2 pc = gl_PointCoord - 0.5;
  float dist = length(pc);
  if (dist > 0.5) discard;
  float twinkle = 1.0 + u_twinkleIntensity *
    sin(u_time * 2.0 + v_dist * 13.7 + v_layer * 5.3);
  float core = exp(-dist * dist * 30.0);
  float glow = exp(-dist * dist * 4.0) * u_glowIntensity;
  float flareH = exp(-abs(pc.x) * 20.0) * exp(-abs(pc.y) * 80.0) * u_flareIntensity * 0.5;
  float flareV = exp(-abs(pc.y) * 20.0) * exp(-abs(pc.x) * 80.0) * u_flareIntensity * 0.5;
  float alpha = clamp((core + glow + flareH + flareV) * v_brightness * twinkle, 0.0, 1.0);
  fragColor = vec4(v_color * (core + glow * 0.5), alpha * 0.85);
}`;

function buildColors(
  userColors: string[],
  hueShift: number,
  saturation: number,
  count: number
): Float32Array {
  const defaults = [
    `hsl(${(200 + hueShift) % 360},${Math.max(0, 20 + saturation)}%,88%)`,
    `hsl(${(220 + hueShift) % 360},${Math.max(0, 30 + saturation)}%,92%)`,
    `hsl(${(240 + hueShift) % 360},${Math.max(0, 10 + saturation)}%,95%)`,
    `hsl(${(180 + hueShift) % 360},${Math.max(0, 25 + saturation)}%,85%)`,
    `hsl(${(260 + hueShift) % 360},${Math.max(0, 15 + saturation)}%,90%)`,
  ];
  const palette = userColors.length ? userColors : defaults;
  const result = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const src = palette[i % palette.length];
    const m = src.match(/hsl\(\s*(\d+\.?\d*)\s*,\s*(\d+\.?\d*)%\s*,\s*(\d+\.?\d*)%\s*\)/);
    const [r, g, b] = m
      ? hslToRgb(parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3]))
      : [1, 1, 1];
    result[i * 3]     = r;
    result[i * 3 + 1] = g;
    result[i * 3 + 2] = b;
  }
  return result;
}

export default function Galaxy({
  density = 1,
  glowIntensity = 0.3,
  flareIntensity = 1,
  starSpeed = 0.5,
  mouseRepulsion = true,
  clickWarp = true,
  starColors = [],
  hueShift = 140,
  saturation = 0,
  starSize = 1,
  twinkleIntensity = 0.3,
  speed = 1,
  rotationSpeed = 0.1,
  layers = 4,
  direction = "forward",
  repulsionStrength = 2,
  mouseInteraction = true,
  intro = true,
  lightMode = false,
}: GalaxyProps) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const cleanupRef  = useRef<(() => void) | null>(null);

  const initGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return null;

    function compileShader(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        console.warn("[Galaxy] Shader error:", gl!.getShaderInfoLog(sh));
        gl!.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compileShader(gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn("[Galaxy] Link error:", gl.getProgramInfoLog(prog));
      return null;
    }
    gl.useProgram(prog);

    /* ── Star data ── */
    const BASE = 1800;
    const count = Math.round(BASE * density * layers);
    const positions    = new Float32Array(count * 2);
    const sizes        = new Float32Array(count);
    const brightnesses = new Float32Array(count);
    const speeds       = new Float32Array(count);
    const angles       = new Float32Array(count);
    const layerArr     = new Float32Array(count);
    const colorsData   = buildColors(starColors, hueShift, saturation, count);

    for (let i = 0; i < count; i++) {
      const r = Math.pow(Math.random(), 0.5) * 2;
      const a = Math.random() * Math.PI * 2;
      positions[i * 2]     = Math.cos(a) * r;
      positions[i * 2 + 1] = Math.sin(a) * r;
      const layer = Math.floor(Math.random() * layers);
      layerArr[i]      = layer;
      sizes[i]         = (0.8 + Math.random() * 2.2) * (1 + layer * 0.15);
      brightnesses[i]  = 0.4 + Math.random() * 0.6;
      speeds[i]        = (0.3 + Math.random() * 0.7) * starSpeed;
      angles[i]        = Math.random() * Math.PI * 2;
    }

    /* ── VAO ── */
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    function mkBuf(data: Float32Array, name: string, sz: number) {
      const b = gl!.createBuffer()!;
      gl!.bindBuffer(gl!.ARRAY_BUFFER, b);
      gl!.bufferData(gl!.ARRAY_BUFFER, data, gl!.STATIC_DRAW);
      const loc = gl!.getAttribLocation(prog, name);
      if (loc >= 0) {
        gl!.enableVertexAttribArray(loc);
        gl!.vertexAttribPointer(loc, sz, gl!.FLOAT, false, 0, 0);
      }
      return b;
    }
    const buffers = [
      mkBuf(positions,    "a_position",  2),
      mkBuf(sizes,        "a_size",      1),
      mkBuf(brightnesses, "a_brightness",1),
      mkBuf(speeds,       "a_speed",     1),
      mkBuf(angles,       "a_angle",     1),
      mkBuf(colorsData,   "a_color",     3),
      mkBuf(layerArr,     "a_layer",     1),
    ];
    gl.bindVertexArray(null);

    /* ── Uniform locations ── */
    const uTime        = gl.getUniformLocation(prog, "u_time");
    const uResolution  = gl.getUniformLocation(prog, "u_resolution");
    const uMouse       = gl.getUniformLocation(prog, "u_mouse");
    const uMouseRep    = gl.getUniformLocation(prog, "u_mouseRepulsion");
    const uRepStrength = gl.getUniformLocation(prog, "u_repulsionStrength");
    const uMouseInter  = gl.getUniformLocation(prog, "u_mouseInteraction");
    const uStarSize    = gl.getUniformLocation(prog, "u_starSize");
    const uSpeed       = gl.getUniformLocation(prog, "u_speed");
    const uRotSpeed    = gl.getUniformLocation(prog, "u_rotationSpeed");
    const uTwinkle     = gl.getUniformLocation(prog, "u_twinkleIntensity");
    const uGlow        = gl.getUniformLocation(prog, "u_glowIntensity");
    const uFlare       = gl.getUniformLocation(prog, "u_flareIntensity");
    const uDirection   = gl.getUniformLocation(prog, "u_direction");

    gl.uniform1i(uMouseRep,    mouseRepulsion    ? 1 : 0);
    gl.uniform1i(uMouseInter,  mouseInteraction  ? 1 : 0);
    gl.uniform1f(uRepStrength, repulsionStrength);
    gl.uniform1f(uStarSize,    starSize);
    gl.uniform1f(uSpeed,       speed);
    gl.uniform1f(uRotSpeed,    rotationSpeed);
    gl.uniform1f(uTwinkle,     twinkleIntensity);
    gl.uniform1f(uGlow,        glowIntensity);
    gl.uniform1f(uFlare,       flareIntensity);
    gl.uniform1f(uDirection,   direction === "forward" ? 1.0 : -1.0);

    /* ── State ── */
    let mouseX = 0, mouseY = 0;
    let warpStart = 0;
    let rafId = 0;
    const t0 = performance.now();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let opacity = intro ? 0 : 1;

    /* ── Resize ── */
    function resize() {
      const w = canvas!.offsetWidth  || 1;
      const h = canvas!.offsetHeight || 1;
      canvas!.width  = w;
      canvas!.height = h;
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uResolution, w, h);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ── Events ── */
    function onMove(e: MouseEvent) {
      const r = canvas!.getBoundingClientRect();
      mouseX = e.clientX - r.left;
      mouseY = e.clientY - r.top;
    }
    function onTouch(e: TouchEvent) {
      if (!e.touches[0]) return;
      const r = canvas!.getBoundingClientRect();
      mouseX = e.touches[0].clientX - r.left;
      mouseY = e.touches[0].clientY - r.top;
    }
    function onClick() { if (clickWarp) warpStart = performance.now(); }

    window.addEventListener("mousemove", onMove,   { passive: true });
    window.addEventListener("touchmove",  onTouch,  { passive: true });
    canvas.addEventListener("click",      onClick);

    /* ── Render ── */
    function render() {
      rafId = requestAnimationFrame(render);
      const now     = performance.now();
      const elapsed = (now - t0) / 1000;
      const warp    = clickWarp ? Math.max(0, 1 - (now - warpStart) / 800) * 3 : 0;
      if (intro && opacity < 1) opacity = Math.min(1, opacity + 0.008);
      canvas!.style.opacity = String(opacity);

      gl!.clearColor(0, 0, 0, 0);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE);

      gl!.uniform1f(uTime,  elapsed + warp);
      gl!.uniform2f(uMouse, mouseX, mouseY);

      gl!.bindVertexArray(vao);
      gl!.drawArrays(gl!.POINTS, 0, count);
      gl!.bindVertexArray(null);

      if (reduced) cancelAnimationFrame(rafId);
    }
    render();

    /* ── Return cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove",  onTouch);
      canvas.removeEventListener("click",      onClick);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteVertexArray(vao);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [
    density, glowIntensity, flareIntensity, starSpeed, mouseRepulsion,
    clickWarp, starColors, hueShift, saturation, starSize, twinkleIntensity,
    speed, rotationSpeed, layers, direction, repulsionStrength,
    mouseInteraction, intro,
  ]);

  useEffect(() => {
    // Destroy previous instance whenever lightMode or initGL changes
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (lightMode) return;

    const cleanup = initGL();
    if (cleanup) cleanupRef.current = cleanup;

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [lightMode, initGL]);

  if (lightMode) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        opacity: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
