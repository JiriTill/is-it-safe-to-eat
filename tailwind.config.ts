
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        safe: "#16a34a",
        caution: "#f59e0b",
        danger: "#ef4444"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
};
export default config;
