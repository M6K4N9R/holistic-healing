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
        surface: {
          DEFAULT: "var(--surface)",
          bright: "rgb(var(--surface-bright) / <alpha-value>)",
          variant: "rgb(var(--surface-variant) / <alpha-value>)",
          dim: "rgb(var(--surface-dim) / <alpha-value>)",
        },
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",

        primary: "rgb(var(--primary) / <alpha-value>)",
        "on-primary": "var(--on-primary)",
        "primary-container": "rgb(var(--primary-container) / <alpha-value>)",

        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "on-secondary": "var(--on-secondary)",
        "secondary-container":
          "rgb(var(--secondary-container) / <alpha-value>)",

        tertiary: "rgb(var(--tertiary) / <alpha-value>)",
        outline: "rgb(var(--outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--outline-variant) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
