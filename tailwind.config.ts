import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./globals.css", // Added globals.css to Tailwind content
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
        formaleScript: ["var(--font-formaleScript)", "cursive"], // Added FormaleScript font
        tempting: ["var(--font-tempting)", "cursive"], // Added Tempting font
        mutiara: ["var(--font-mutiara)", "serif"], // Added Mutiara font
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
