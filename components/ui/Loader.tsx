"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PERSONAL } from "@/lib/constants";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const nameTimer = setTimeout(() => setShowName(true), 600);
    const completeTimer = setTimeout(() => onComplete(), 2200);

    return () => {
      clearInterval(interval);
      clearTimeout(nameTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Neural Network Animation */}
        <div className="relative w-64 h-64 mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Animated nodes */}
            {[
              [100, 40],
              [40, 80],
              [160, 80],
              [60, 140],
              [140, 140],
              [100, 100],
              [30, 120],
              [170, 120],
              [80, 60],
              [120, 60],
              [100, 160],
              [50, 50],
              [150, 50],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={`node-${i}`}
                cx={cx}
                cy={cy}
                r={3}
                fill="#FF6B35"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.7, 1], scale: 1 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  opacity: {
                    delay: i * 0.08,
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  },
                }}
              />
            ))}
            {/* Animated connections */}
            {[
              [100, 40, 40, 80],
              [100, 40, 160, 80],
              [100, 40, 100, 100],
              [40, 80, 60, 140],
              [40, 80, 100, 100],
              [160, 80, 140, 140],
              [160, 80, 100, 100],
              [60, 140, 100, 160],
              [140, 140, 100, 160],
              [80, 60, 100, 100],
              [120, 60, 100, 100],
              [30, 120, 60, 140],
              [170, 120, 140, 140],
              [50, 50, 40, 80],
              [150, 50, 160, 80],
            ].map(([x1, y1, x2, y2], i) => (
              <motion.line
                key={`edge-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FF6B35"
                strokeWidth={0.5}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ delay: i * 0.06, duration: 0.6 }}
              />
            ))}
          </svg>
        </div>

        {/* Name */}
        <AnimatePresence>
          {showName && (
            <motion.h1
              className="text-2xl md:text-4xl font-bold gradient-text mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {PERSONAL.name}
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-surface rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #FF6B35, #FFB800)",
            }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <p className="text-text-muted text-sm mt-3 font-mono">{progress}%</p>
      </motion.div>
    </AnimatePresence>
  );
}
