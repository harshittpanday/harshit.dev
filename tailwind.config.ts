import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08080a",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "#0f0f14",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "#14141d",
        },
        brand: {
          purple: "#A78BFA",
          "purple-light": "#C084FC",
          "purple-dark": "#7C3AED",
          yellow: "#FEF08A",
          "yellow-warm": "#FDE047",
          cyan: "#22D3EE",
          teal: "#14B8A6",
          green: "#4ADE80",
          emerald: "#10B981",
          pink: "#F472B6",
          cream: "#FFFBEB",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "marquee-left": "marqueeLeft 50s linear infinite",
        "marquee-right": "marqueeRight 50s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
