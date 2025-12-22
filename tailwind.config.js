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
        surface: "hsl(var(--surface))",
        "on-surface": "hsl(var(--on-surface))",
        "surface-variant": "hsl(var(--surface-variant))",
        "on-surface-variant": "hsl(var(--on-surface-variant))",

        // Primary
        primary: "hsl(var(--primary))",
        "on-primary": "hsl(var(--on-primary))",
        "primary-container": "hsl(var(--primary-container))",
        "on-primary-container": "hsl(var(--on-primary-container))",

        // Secondary
        secondary: "hsl(var(--secondary))",
        "on-secondary": "hsl(var(--on-secondary))",
        "secondary-container": "hsl(var(--secondary-container))",
        "on-secondary-container": "hsl(var(--on-secondary-container))",

        // Tertiary + Outlines
        tertiary: "hsl(var(--tertiary))",
        outline: "hsl(var(--outline))",
        "outline-variant": "hsl(var(--outline-variant))",
      },
    },
  },
  plugins: [],
};
