"use client";

import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.tx = (e.clientX / window.innerWidth - 0.5) * 2.5;
      mouseRef.current.ty = -(e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Shaders ──────────────────────────────────────────────────
    const aspect = canvas.width / canvas.height;

    const vertSrc = `
      attribute vec3 aPos;
      attribute vec3 aCol;
      attribute float aSize;
      uniform float uTime;
      uniform float uRotY;
      uniform float uRotX;
      varying vec3 vCol;

      void main() {
        // Y-axis rotation
        float cy = cos(uRotY), sy = sin(uRotY);
        vec3 q;
        q.x = aPos.x * cy + aPos.z * sy;
        q.z = -aPos.x * sy + aPos.z * cy;
        q.y = aPos.y;

        // X-axis rotation
        float cx = cos(uRotX), sx = sin(uRotX);
        vec3 r;
        r.x = q.x;
        r.y = q.y * cx - q.z * sx;
        r.z = q.y * sx + q.z * cx;

        // Breathing motion
        r.y += sin(uTime * 0.9 + aPos.x * 0.4) * 0.25;
        r.x += cos(uTime * 0.7 + aPos.z * 0.3) * 0.18;

        float depth = r.z + 8.0;
        float sc = 1.2 / depth;
        gl_Position = vec4(r.x * sc / ${aspect.toFixed(4)}, r.y * sc, -1.0, 1.0);
        gl_PointSize = aSize * 280.0 / depth;
        vCol = aCol;
      }
    `;

    const fragSrc = `
      precision mediump float;
      varying vec3 vCol;
      void main() {
        vec2 d = gl_PointCoord - 0.5;
        float l = length(d);
        if (l > 0.5) discard;
        float a = smoothstep(0.5, 0.05, l);
        gl_FragColor = vec4(vCol, a * 0.85);
      }
    `;

    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(prog, compileShader(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // ── Particle data ─────────────────────────────────────────────
    const N = 3500;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const sz = new Float32Array(N);
    const palette = [
      [0, 1, 0.88],
      [0.55, 0.36, 1],
      [1, 0.24, 0.67],
      [1, 1, 1],
      [0, 0.9, 1],
    ];

    for (let i = 0; i < N; i++) {
      const r = 3 + Math.random() * 16;
      const t = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(t);
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(t);
      pos[i * 3 + 2] = r * Math.cos(ph);
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
      sz[i] = 0.8 + Math.random() * 3.5;
    }

    const mkBuf = (data: Float32Array, attr: string, n: number) => {
      const buf = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, attr);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, n, gl.FLOAT, false, 0, 0);
    };
    mkBuf(pos, "aPos", 3);
    mkBuf(col, "aCol", 3);
    mkBuf(sz, "aSize", 1);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRotY = gl.getUniformLocation(prog, "uRotY");
    const uRotX = gl.getUniformLocation(prog, "uRotX");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    // ── Render loop ───────────────────────────────────────────────
    const t0 = performance.now();
    const render = () => {
      const t = (performance.now() - t0) / 1000;
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.04;
      m.y += (m.ty - m.y) * 0.04;

      gl.clearColor(0.012, 0.02, 0.059, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, t);
      gl.uniform1f(uRotY, t * 0.07 + m.x * 0.35);
      gl.uniform1f(uRotX, t * 0.025 + m.y * 0.2);
      gl.drawArrays(gl.POINTS, 0, N);
      rafRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
