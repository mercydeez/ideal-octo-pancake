"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  [0, 240, 255],    // Cyan
  [0, 150, 255],    // Electric Blue
  [255, 255, 255],  // White
  [0, 255, 180],    // Teal/Emerald
];

export default function Splash({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // UI Refs
  const l1Ref = useRef<HTMLSpanElement>(null);
  const l2Ref = useRef<HTMLSpanElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const rtagRef = useRef<HTMLDivElement>(null);
  const hrlTRef = useRef<HTMLDivElement>(null);
  const hrlBRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const handleResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x!: number; y!: number; r!: number; rgb!: number[]; alpha!: number;
      vx!: number; vy!: number; life!: number; maxLife!: number; decay!: number;
      constructor() { this.reset(); }
      reset() {
        this.x = W / 2 + (Math.random() - 0.5) * 80;
        this.y = H / 2 + (Math.random() - 0.5) * 80;
        this.r = Math.random() * 2.5 + 0.5;
        this.rgb = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.alpha = 0;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 0;
        this.maxLife = 80 + Math.random() * 120;
        this.decay = 0.97 + Math.random() * 0.02;
      }
      update() {
        this.life++;
        this.vx *= this.decay;
        this.vy *= this.decay;
        this.x += this.vx;
        this.y += this.vy;
        const prog = this.life / this.maxLife;
        this.alpha = prog < 0.15 ? prog / 0.15 : prog > 0.7 ? 1 - (prog - 0.7) / 0.3 : 1;
        if (this.life >= this.maxLife) this.reset();
      }
      draw() {
        ctx!.save();
        ctx!.globalAlpha = this.alpha * globalBrightness;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgb(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]})`;
        ctx!.fill();
        const g = ctx!.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 6);
        g.addColorStop(0, `rgba(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]},0.15)`);
        g.addColorStop(1, `rgba(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]},0)`);
        ctx!.globalAlpha = this.alpha * globalBrightness * 0.4;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r * 6, 0, Math.PI * 2);
        ctx!.fillStyle = g;
        ctx!.fill();
        ctx!.restore();
      }
    }

    class Ring {
      x: number; y: number; r: number; maxR: number; alpha: number; speed: number; width: number; color: number[];
      constructor() {
        this.x = W / 2; this.y = H / 2;
        this.r = 0;
        this.maxR = Math.max(W, H) * 0.85;
        this.alpha = 1;
        this.speed = 18 + Math.random() * 14;
        this.width = 1.5 + Math.random() * 2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.r += this.speed;
        this.alpha = 1 - this.r / this.maxR;
        this.speed *= 0.97;
      }
      draw() {
        if (this.alpha <= 0) return;
        ctx!.save();
        ctx!.globalAlpha = this.alpha * 0.5 * globalBrightness;
        ctx!.strokeStyle = `rgb(${this.color[0]},${this.color[1]},${this.color[2]})`;
        ctx!.lineWidth = this.width;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();
      }
      get done() { return this.alpha <= 0.01; }
    }

    class Streak {
      x: number; y: number; len: number; speed: number; vx: number; vy: number; alpha: number; color: number[]; life: number; maxLife: number;
      constructor() {
        const angle = Math.random() * Math.PI * 2;
        this.x = W / 2; this.y = H / 2;
        this.len = 80 + Math.random() * 200;
        this.speed = 20 + Math.random() * 30;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.alpha = 1;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life = 0;
        this.maxLife = 25 + Math.random() * 20;
      }
      update() {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.9;
        this.vy *= 0.9;
        this.alpha = 1 - this.life / this.maxLife;
      }
      draw() {
        const tailX = this.x - this.vx * (this.len / this.speed);
        const tailY = this.y - this.vy * (this.len / this.speed);
        const g = ctx!.createLinearGradient(tailX, tailY, this.x, this.y);
        g.addColorStop(0, `rgba(${this.color[0]},${this.color[1]},${this.color[2]},0)`);
        g.addColorStop(1, `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha * globalBrightness})`);
        ctx!.save();
        ctx!.strokeStyle = g;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        ctx!.moveTo(tailX, tailY);
        ctx!.lineTo(this.x, this.y);
        ctx!.stroke();
        ctx!.restore();
      }
      get done() { return this.life >= this.maxLife; }
    }

    let particles = Array.from({ length: 180 }, () => {
      const p = new Particle();
      p.life = Math.floor(Math.random() * p.maxLife);
      return p;
    });
    let rings: Ring[] = [];
    let streaks: Streak[] = [];

    let globalBrightness = 0;
    let flashAlpha = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const setTextState = (el: HTMLElement | null, opacity: number, blur: number, scaleX: number, scaleY: number, color?: string) => {
      if (!el) return;
      el.style.opacity = opacity.toString();
      el.style.filter = `blur(${blur}px)`;
      el.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;
      if (color) el.style.color = color;
    };

    let startTime: number | null = null;
    let redirected = false;
    let animationFrameId: number;

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!startTime) startTime = now;
      const t = (now - startTime) / 1000;

      globalBrightness = clamp(t / 1.0, 0, 1);

      if (t >= 0.3 && rings.length === 0) {
        for (let i = 0; i < 5; i++) rings.push(new Ring());
        for (let i = 0; i < 40; i++) streaks.push(new Streak());
      }

      const subA = clamp((t - 0.6) / 0.6, 0, 1);
      if (subRef.current) subRef.current.style.color = `rgba(255,255,255,${subA * 0.45})`;

      if (t >= 1.0) {
        cornerRefs.current.forEach(c => {
          if (c) c.style.opacity = clamp((t - 1.0) / 0.4, 0, 1).toString();
        });
        const p = clamp((t - 1.0) / 0.6, 0, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        if (hrlTRef.current) hrlTRef.current.style.background = `rgba(255,255,255,${ease * 0.12})`;
        if (hrlBRef.current) hrlBRef.current.style.background = `rgba(255,255,255,${ease * 0.12})`;
      }

      if (t >= 0.8) {
        const p = clamp((t - 0.8) / 0.5, 0, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        const scX = lerp(3.5, 1, ease);
        const scY = lerp(0.1, 1, ease);
        const blur = lerp(60, 0, ease);
        setTextState(l1Ref.current, ease, blur, scX, scY);
      }

      if (t >= 1.1) {
        const p = clamp((t - 1.1) / 0.6, 0, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        const scX = lerp(3.5, 1, ease);
        const scY = lerp(0.1, 1, ease);
        const blur = lerp(60, 0, ease);
        setTextState(l2Ref.current, ease, blur, scX, scY);
      }

      if (t >= 2.0) {
        const p = clamp((t - 2.0) / 0.8, 0, 1);
        const intensity = p;
        if (l1Ref.current) l1Ref.current.style.textShadow = `0 0 ${60 * intensity}px rgba(0,240,255,${0.4 * intensity}), 0 0 ${120 * intensity}px rgba(0,240,255,${0.15 * intensity})`;
        if (l2Ref.current) l2Ref.current.style.textShadow = `0 0 ${60 * intensity}px rgba(0,255,180,${0.4 * intensity}), 0 0 ${120 * intensity}px rgba(0,255,180,${0.15 * intensity})`;
      }

      if (t >= 1.8) {
        const p = clamp((t - 1.8) / 0.6, 0, 1);
        if (rtagRef.current) {
          rtagRef.current.style.color = `rgba(255,255,255,${p * 0.3})`;
          rtagRef.current.style.letterSpacing = `${lerp(20, 8, p)}px`;
        }
      }

      if (t >= 1.5 && rings.length < 6) {
        for (let i = 0; i < 3; i++) rings.push(new Ring());
      }

      if (t >= 1.1 && t < 1.5) {
        flashAlpha = clamp(1 - (t - 1.1) / 0.4, 0, 0.45);
      } else {
        flashAlpha = 0;
      }

      if (t >= 3.6 && !redirected) {
        redirected = true;
        setExiting(true);
        setTimeout(() => {
          onComplete();
        }, 800);
      }

      // Draw background
      ctx!.fillStyle = '#050505'; // Mathces architectural minimal theme
      ctx!.fillRect(0, 0, W, H);

      rings = rings.filter((r) => !r.done);
      rings.forEach((r) => { r.update(); r.draw(); });

      streaks = streaks.filter((s) => !s.done);
      streaks.forEach((s) => { s.update(); s.draw(); });

      particles.forEach((p) => { p.update(); p.draw(); });

      if (flashAlpha > 0) {
        ctx!.save();
        ctx!.globalAlpha = flashAlpha;
        ctx!.fillStyle = "#fff";
        ctx!.fillRect(0, 0, W, H);
        ctx!.restore();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash-shockwave"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] overflow-hidden select-none pointer-events-none bg-[#050505]"
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:wght@400&display=swap');
          `}</style>
          
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

          {/* HR Lines */}
          <div ref={hrlTRef} className="absolute left-0 right-0 h-[1px] top-[18%] bg-transparent z-[11]" />
          <div ref={hrlBRef} className="absolute left-0 right-0 h-[1px] bottom-[18%] bg-transparent z-[11]" />

          {/* Corners */}
          <div ref={(el) => { cornerRefs.current[0] = el; }} className="absolute w-[36px] h-[36px] top-[20px] left-[20px] z-[11] opacity-0 mix-blend-screen">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-white/50" />
            <div className="absolute top-0 left-0 w-[1px] h-full bg-white/50" />
          </div>
          <div ref={(el) => { cornerRefs.current[1] = el; }} className="absolute w-[36px] h-[36px] top-[20px] right-[20px] z-[11] opacity-0 mix-blend-screen">
            <div className="absolute top-0 right-0 w-full h-[1px] bg-white/50" />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-white/50" />
          </div>
          <div ref={(el) => { cornerRefs.current[2] = el; }} className="absolute w-[36px] h-[36px] bottom-[20px] left-[20px] z-[11] opacity-0 mix-blend-screen">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/50" />
            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-white/50" />
          </div>
          <div ref={(el) => { cornerRefs.current[3] = el; }} className="absolute w-[36px] h-[36px] bottom-[20px] right-[20px] z-[11] opacity-0 mix-blend-screen">
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-white/50" />
            <div className="absolute bottom-0 right-0 w-[1px] h-full bg-white/50" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 font-mono">
            <div ref={subRef} className="text-[clamp(9px,1.1vw,13px)] tracking-[10px] text-transparent uppercase mb-3 text-center">
              AI Engineer
            </div>
            <div className="relative text-center leading-[0.88] flex flex-col items-center justify-center">
              <span ref={l1Ref} style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="block text-[clamp(80px,14vw,200px)] tracking-[6px] text-white opacity-0 transform scale-x-[3] scale-y-[0.3] blur-[40px] whitespace-nowrap">
                ATHARVA
              </span>
              <span ref={l2Ref} style={{ fontFamily: "'Bebas Neue', sans-serif" }} className="block text-[clamp(70px,12vw,172px)] tracking-[6px] text-white opacity-0 transform scale-x-[3] scale-y-[0.3] blur-[40px] whitespace-nowrap -mt-4 lg:-mt-8">
                SOUNDANKAR
              </span>
            </div>
            <div ref={rtagRef} className="text-[clamp(8px,1vw,11px)] tracking-[8px] text-transparent uppercase mt-5 text-center px-4">
              Machine Learning · Deep Learning · LLMs
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
