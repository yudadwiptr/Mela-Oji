import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem', // Extra small size for mobile
      },
      fontFamily: {
        ovo: ["var(--font-ovo)", "serif"],
        legan: ["var(--font-legan)", "serif"],
        wonder: ["var(--font-wonder)", "sans-serif"],
        thesignature: ["var(--font-thesignature)", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        upDown: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        upDown: "upDown 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
