import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0F",
          50: "#F6F6F9",
          100: "#ECECF3",
          800: "#14141F",
          900: "#0E0E17",
          950: "#0A0A13",
        },
        brand: {
          50: "#F0EEFF",
          100: "#E4E0FF",
          200: "#CBC3FF",
          300: "#AB9EFF",
          400: "#8A74FF",
          500: "#6D4DFF",
          600: "#5A2FF0",
          700: "#4A22D4",
          800: "#3D1FB0",
          900: "#331D8C",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "80rem",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "marquee": "marquee 40s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;