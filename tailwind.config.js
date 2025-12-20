/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core neutrals
        white: "rgb(var(--white) / <alpha-value>)",
        dark: "rgb(var(--dark) / <alpha-value>)",

        // Semantic system
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(230 225 210 / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          light: "rgb(120 140 150 / <alpha-value>)",
          dark: "rgb(70 85 100 / <alpha-value>)",
        },
        neutral: "rgb(var(--neutral) / <alpha-value>)",
        emphasis: {
          DEFAULT: "rgb(var(--emphasis) / <alpha-value>)",
          light: "rgb(160 150 120 / <alpha-value>)",
        },
        muted: "rgb(var(--muted) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 10px 30px rgb(var(--muted) / 0.2)",
        glow: "0 0 20px rgb(var(--emphasis) / 0.3)",
      },
    },
  },
  plugins: [],
};
