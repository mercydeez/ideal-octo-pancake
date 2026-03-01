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
        cyan: "#00F0FF",
        amber: {
          DEFAULT: "#FF6B35",
          400: "#FF6B35",
          500: "#FF6B35",
        },
        singularity: {
          DEFAULT: '#7B2FBE',
          400: '#A855F7',
          500: '#E879F9',
        },
        military: "#1a1c1a",
      },
      fontFamily: {
        cyber: ["var(--font-syncopate)", "sans-serif"],
        terminal: ["var(--font-space)", "monospace"],
      },
    },
  },
  plugins: [],
};
