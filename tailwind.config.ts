/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#030303",
        cyan: "#00f5ff",
        pink: "#ff007a",
        background: "#030303",
        surface: "#1a1a1a",
        "surface-border": "rgba(255, 255, 255, 0.1)",
        "text-primary": "#f0f0f0",
        "text-muted": "#a0a0a0",
      },
      fontFamily: {
        sans: ["var(--font-space)", "var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-syncopate)", "monospace"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        glitch: "glitch 0.5s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-cyan": "pulseCyan 2s ease-in-out infinite",
        "pulse-pink": "pulsePink 2s ease-in-out infinite",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseCyan: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(0, 245, 255, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(0, 245, 255, 0.5)" },
        },
        pulsePink: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(255, 0, 122, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(255, 0, 122, 0.5)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "void-gradient": "linear-gradient(to bottom, #030303, #0a0a0a)",
        "cyber-gradient": "linear-gradient(135deg, #00f5ff 0%, #ff007a 100%)",
      },
    },
  },
  plugins: [],
};
