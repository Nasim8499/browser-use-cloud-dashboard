import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 24px 60px rgba(15, 23, 42, 0.08)",
      },
      colors: {
        glass: "rgba(255,255,255,0.6)",
        border: "#e2e8f0",
        text: "#0f172a",
        muted: "#475569",
      },
    },
  },
  plugins: [],
};

export default config;
