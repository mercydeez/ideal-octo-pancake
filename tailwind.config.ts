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
        // ── New 9-Token Hierarchy ──────────────────────────
        primary:   "#38bdf8", // sky blue — main accent
        secondary: "#818cf8", // indigo — labels, tags
        highlight: "#fb923c", // orange — hero name + nav dot ONLY
        surface:   "#0d1117", // cards, elevated surfaces
        base:      "#060a14", // page background
        muted:     "#334155", // borders, dividers
        "text-1":  "#f1f5f9", // headings
        "text-2":  "#94a3b8", // body, descriptions
        "text-3":  "#475569", // labels, metadata

        // ── Legacy aliases (for incremental migration) ────
        void: "#060a14",
        cyan: "#38bdf8",
        amber: {
          DEFAULT: "#fb923c",
          400: "#fb923c",
          500: "#fb923c",
        },
        singularity: {
          DEFAULT: "#818cf8",
          400: "#818cf8",
          500: "#818cf8",
        },
        pink: "#818cf8",
      },
      fontFamily: {
        cyber: ["var(--font-syncopate)", "sans-serif"],
        terminal: ["var(--font-space)", "monospace"],
      },
    },
  },
  plugins: [],
};
