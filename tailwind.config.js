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
        // Neutrals
        surface: "var(--surface)",
        "on-surface": "var(--on-surface)",
        "surface-variant": "var(--surface-variant)",
        "on-surface-variant": "var(--on-surface-variant)",
        bright: "rgb(var(--surface-bright) / <alpha-value>)",
        variant: "rgb(var(--surface-variant) / <alpha-value>)",

        // Primary
        primary: "var(--primary)",
        "on-primary": "var(--on-primary)",
        "primary-container": "var(--primary-container)",

        // Secondary
        secondary: "var(--secondary)",
        "on-secondary": "var(--on-secondary)",
        "secondary-container": "var(--secondary-container)",

        // Tertiary + Outlines
        tertiary: "var(--tertiary)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
      },
    },
  },
  plugins: [],
};
