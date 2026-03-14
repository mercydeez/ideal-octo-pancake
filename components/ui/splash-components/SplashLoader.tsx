"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

export default function SplashLoader({ onComplete }: Props) {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (current >= 100) {
        setPct(100);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 900);
        }, 400);
        return;
      }
      const step =
        current < 60
          ? Math.random() * 3 + 1
          : current < 88
          ? Math.random() * 1.5 + 0.5
          : 0.45;
      current = Math.min(100, current + step);
      setPct(Math.floor(current));
      const delay = current < 60 ? 38 : current < 88 ? 75 : 130;
      timeout = setTimeout(tick, delay);
    };

    const start = setTimeout(tick, 400);
    return () => {
      clearTimeout(start);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: "#03050f" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* Percentage */}
          <motion.span
            className="font-display leading-none tracking-tighter select-none"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(80px, 14vw, 140px)",
              color: "#00ffe0",
              textShadow: "0 0 60px rgba(0,255,224,0.4)",
            }}
          >
            {pct}
          </motion.span>

          {/* Label */}
          <p
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px",
              letterSpacing: "6px",
              color: "rgba(255,255,255,0.22)",
              marginTop: "10px",
              textTransform: "uppercase",
            }}
          >
            Initializing System
          </p>

          {/* Progress bar */}
          <div
            style={{
              width: "200px",
              height: "1px",
              background: "rgba(255,255,255,0.07)",
              marginTop: "22px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${pct}%`,
                background: "linear-gradient(90deg, #8b5cf6, #00ffe0)",
                boxShadow: "0 0 14px #00ffe0",
                transition: "width 0.04s linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
