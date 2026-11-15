import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { bg: "#000000", deep: "#080808", surface: "#101010", gold: { DEFAULT: "#D6B15E", dark: "#B58A3A", light: "#F0D18A" }, ink: "#FFFFFF", muted: "#929292" },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: { "gold-grad": "linear-gradient(135deg,#F0D18A,#D6B15E 55%,#B58A3A)" },
    },
  },
  plugins: [],
};
export default config;
