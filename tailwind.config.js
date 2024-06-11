/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      colors: {
        white: "#ededed",
        dark: "#191919",
        grey: "#3c3c3c",
        primary: "#839788",
        secondary: "#a05c7b",
        pastel: "#bdbbb6",
        bright: "#e5d1d0",
      },
    },
  },
  plugins: [],
};
