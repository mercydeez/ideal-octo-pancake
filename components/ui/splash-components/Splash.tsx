"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ParticleBackground from "./ParticleBackground";
import SplashLoader from "./SplashLoader";
import SplashContent from "./SplashContent";
import { useCursor } from "./useCursor";

interface Props {
  /** Called when user clicks "Enter Portfolio" */
  onEnter?: () => void;
}

export default function Splash({ onEnter }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [exiting, setExiting] = useState(false);
  const { cursorRef, ringRef, expandRing, contractRing } = useCursor();

  const handleLoaded = useCallback(() => setLoaded(true), []);

  const handleEnter = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onEnter?.();
    }, 900);
  }, [onEnter]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-50"
          style={{ background: "#03050f", cursor: "none" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* ── Custom cursor ─────────────────────────────── */}
          <div
            ref={cursorRef}
            style={{
              position: "fixed",
              width: "10px",
              height: "10px",
              background: "#00ffe0",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9999,
              transform: "translate(-50%, -50%)",
              mixBlendMode: "difference",
            }}
          />
          <div
            ref={ringRef}
            style={{
              position: "fixed",
              width: "38px",
              height: "38px",
              border: "1px solid rgba(0,255,224,0.45)",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9998,
              transform: "translate(-50%, -50%)",
              transition: "width 0.3s, height 0.3s",
            }}
          />

          {/* ── WebGL particles ───────────────────────────── */}
          <ParticleBackground />

          {/* ── Film grain ───────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: "-50%",
              width: "200%",
              height: "200%",
              opacity: 0.3,
              pointerEvents: "none",
              zIndex: 1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              animation: "grain 0.4s steps(2) infinite",
            }}
          />

          {/* ── Scan line ─────────────────────────────────── */}
          <div
            aria-hidden="true"
            style={{
              position: "fixed",
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(0,255,224,0.55), transparent)",
              zIndex: 2,
              pointerEvents: "none",
              animation: "scanLine 5s linear infinite",
              top: "-2px",
            }}
          />

          {/* ── HUD corners ──────────────────────────────── */}
          {(["tl", "tr", "bl", "br"] as const).map((pos, i) => (
            <HudCorner key={pos} pos={pos} delay={1.7 + i * 0.1} />
          ))}

          {/* ── Side labels ──────────────────────────────── */}
          <SideLabel side="left" delay={2.3}>
            ATHARVA SOUNDANKAR — AI ENGINEER — 2025
          </SideLabel>
          <SideLabel side="right" delay={2.3}>
            MACHINE LEARNING · DEEP LEARNING · LLMs
          </SideLabel>

          {/* ── Loading sequence ──────────────────────────── */}
          <SplashLoader onComplete={handleLoaded} />

          {/* ── Main content ─────────────────────────────── */}
          <AnimatePresence>
            {loaded && (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <SplashContent
                  onEnter={handleEnter}
                  expandRing={expandRing}
                  contractRing={contractRing}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Status bar ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.6 }}
            style={{
              position: "fixed",
              bottom: "22px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "18px",
              zIndex: 10,
            }}
          >
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "#00ffe0",
                animation: "pulseDot 1.5s ease-in-out infinite",
              }}
            />
            <StatusText>System Online</StatusText>
            <StatusText accent>Nagpur, India</StatusText>
            <StatusText>2025</StatusText>
          </motion.div>

          {/* ── Global keyframes ─────────────────────────── */}
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Outfit:wght@300;600&family=Space+Mono&display=swap');
            @keyframes grain {
              0%   { transform: translate(0,0); }
              25%  { transform: translate(-2%,1%); }
              50%  { transform: translate(1%,-2%); }
              75%  { transform: translate(-1%,2%); }
              100% { transform: translate(2%,-1%); }
            }
            @keyframes scanLine { to { top: 100vh; } }
            @keyframes pulseDot {
              0%,100% { transform: scale(1); box-shadow: 0 0 12px #00ffe0; }
              50%      { transform: scale(1.7); box-shadow: 0 0 28px #00ffe0, 0 0 56px rgba(0,255,224,0.4); }
            }
            @keyframes gradientShift {
              0%,100% { background-position: 0%; }
              50%      { background-position: 100%; }
            }
            @keyframes glitch {
              0%,93%,100% { opacity:0; transform:translateX(-50%); }
              94%  { opacity:.7; transform:translateX(calc(-50% + 5px)); clip-path:polygon(0 20%,100% 20%,100% 45%,0 45%); }
              95%  { opacity:0; }
              96%  { opacity:.5; transform:translateX(calc(-50% - 4px)); clip-path:polygon(0 55%,100% 55%,100% 80%,0 80%); }
              97%  { opacity:0; }
            }
            @keyframes hudIn { to { opacity: 1; } }
            @keyframes shine {
              0%       { left: -100%; }
              45%,100% { left: 160%; }
            }
            .cta-btn::after {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(135deg, #00ffe0, #ff3cac);
              opacity: 0;
              transition: opacity 0.4s;
            }
            .cta-btn:hover::after { opacity: 1; }
            .cta-shine {
              position: absolute;
              top: 0; left: -100%;
              width: 60%; height: 100%;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
              transform: skewX(-20deg);
              animation: shine 3.5s ease-in-out infinite 2s;
              z-index: 2;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Small internal helpers ────────────────────────────────────────

type HudPos = "tl" | "tr" | "bl" | "br";

function HudCorner({ pos, delay }: { pos: HudPos; delay: number }) {
  const isTop = pos.startsWith("t");
  const isLeft = pos.endsWith("l");
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        width: "48px",
        height: "48px",
        zIndex: 10,
        opacity: 0,
        animation: `hudIn 0.5s ease forwards ${delay}s`,
        ...(isTop ? { top: "20px" } : { bottom: "20px" }),
        ...(isLeft ? { left: "20px" } : { right: "20px" }),
        borderTop: isTop ? "1px solid #00ffe0" : undefined,
        borderBottom: !isTop ? "1px solid #00ffe0" : undefined,
        borderLeft: isLeft ? "1px solid #00ffe0" : undefined,
        borderRight: !isLeft ? "1px solid #00ffe0" : undefined,
      }}
    />
  );
}

function SideLabel({
  side,
  delay,
  children,
}: {
  side: "left" | "right";
  delay: number;
  children: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px",
        letterSpacing: "4px",
        color: "rgba(0,255,224,0.28)",
        zIndex: 10,
        whiteSpace: "nowrap",
        opacity: 0,
        animation: `hudIn 0.8s ease forwards ${delay}s`,
        top: "50%",
        ...(side === "left"
          ? { left: "20px", transform: "translateY(-50%) rotate(-90deg)" }
          : { right: "20px", transform: "translateY(-50%) rotate(90deg)" }),
      }}
    >
      {children}
    </div>
  );
}

function StatusText({
  children,
  accent,
}: {
  children: string;
  accent?: boolean;
}) {
  return (
    <span
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px",
        letterSpacing: "3px",
        color: accent ? "rgba(0,255,224,0.3)" : "rgba(255,255,255,0.18)",
        textTransform: "uppercase",
      }}
    >
      {children}
    </span>
  );
}
