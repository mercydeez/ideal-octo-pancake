"use client";

import { motion } from "framer-motion";

const rise = {
  hidden: { opacity: 0, y: 40 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const TAGS = [
  "Machine Learning",
  "Deep Learning",
  "LLMs",
  "Computer Vision",
  "NLP",
];

interface Props {
  onEnter: () => void;
  expandRing: () => void;
  contractRing: () => void;
}

export default function SplashContent({ onEnter, expandRing, contractRing }: Props) {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Eyebrow */}
      <motion.p
        custom={0.1}
        variants={rise}
        initial="hidden"
        animate="show"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px",
          letterSpacing: "8px",
          color: "#00ffe0",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        // AI Engineer Portfolio
      </motion.p>

      {/* Name block */}
      <div style={{ textAlign: "center", lineHeight: 0.88, position: "relative" }}>
        {/* First name */}
        <motion.span
          custom={0.28}
          variants={rise}
          initial="hidden"
          animate="show"
          style={{
            display: "block",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(60px, 11vw, 148px)",
            letterSpacing: "3px",
            color: "#ffffff",
            marginBottom: "4px",
          }}
        >
          ATHARVA
        </motion.span>

        {/* Last name — gradient animated */}
        <div style={{ position: "relative" }}>
          <motion.span
            custom={0.44}
            variants={rise}
            initial="hidden"
            animate="show"
            style={{
              display: "block",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(60px, 11vw, 148px)",
              letterSpacing: "3px",
              background:
                "linear-gradient(110deg, #00ffe0, #8b5cf6, #ff3cac)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200%",
              animation: "gradientShift 5s ease infinite 1.5s",
            }}
          >
            SOUNDANKAR
          </motion.span>

          {/* Glitch ghost */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(60px, 11vw, 148px)",
              letterSpacing: "3px",
              color: "#ff3cac",
              opacity: 0,
              mixBlendMode: "screen",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              animation: "glitch 7s infinite 4s",
            }}
          >
            SOUNDANKAR
          </span>
        </div>
      </div>

      {/* Role */}
      <motion.p
        custom={0.65}
        variants={rise}
        initial="hidden"
        animate="show"
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 300,
          fontSize: "clamp(12px, 1.5vw, 17px)",
          color: "rgba(255,255,255,0.38)",
          letterSpacing: "4px",
          textTransform: "uppercase",
          marginTop: "12px",
        }}
      >
        Building the Future with Intelligence
      </motion.p>

      {/* Divider */}
      <motion.div
        custom={0.85}
        variants={rise}
        initial="hidden"
        animate="show"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          margin: "26px 0",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #00ffe0)",
          }}
        />
        <div
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#00ffe0",
            boxShadow: "0 0 12px #00ffe0",
            animation: "pulseDot 2s ease-in-out infinite",
          }}
        />
        <div
          style={{
            width: "80px",
            height: "1px",
            background: "linear-gradient(90deg, #8b5cf6, transparent)",
          }}
        />
      </motion.div>

      {/* Tags */}
      <motion.div
        custom={1.05}
        variants={rise}
        initial="hidden"
        animate="show"
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "500px",
          pointerEvents: "all",
        }}
      >
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="splash-tag"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px",
              letterSpacing: "2px",
              padding: "6px 13px",
              border: "1px solid rgba(0,255,224,0.18)",
              color: "rgba(0,255,224,0.55)",
              borderRadius: "2px",
              textTransform: "uppercase",
              background: "rgba(0,255,224,0.03)",
              cursor: "default",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderColor = "#00ffe0";
              (e.target as HTMLElement).style.color = "#00ffe0";
              (e.target as HTMLElement).style.background = "rgba(0,255,224,0.09)";
              (e.target as HTMLElement).style.boxShadow = "0 0 18px rgba(0,255,224,0.12)";
              expandRing();
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderColor = "rgba(0,255,224,0.18)";
              (e.target as HTMLElement).style.color = "rgba(0,255,224,0.55)";
              (e.target as HTMLElement).style.background = "rgba(0,255,224,0.03)";
              (e.target as HTMLElement).style.boxShadow = "none";
              contractRing();
            }}
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        custom={1.25}
        variants={rise}
        initial="hidden"
        animate="show"
        style={{ marginTop: "34px", pointerEvents: "all" }}
      >
        <button
          onClick={onEnter}
          className="cta-btn"
          onMouseEnter={expandRing}
          onMouseLeave={contractRing}
          style={{
            position: "relative",
            display: "inline-block",
            padding: "15px 52px",
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "#fff",
            border: "none",
            cursor: "none",
            background: "linear-gradient(135deg, #8b5cf6, #00ffe0)",
            overflow: "hidden",
          }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>
            Enter Portfolio →
          </span>
          <span className="cta-shine" />
        </button>
      </motion.div>
    </div>
  );
}
