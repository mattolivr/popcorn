const { withTV } = require("tailwind-variants/transformer");
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */

export default withTV(
  withMT({
    content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
    theme: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Roboto Serif", "serif"],
        mono: ["Inconsolata", "monospace"],
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        primary: {
          light: "#7dd3fc", // Sky 300
          DEFAULT: "#38bdf8", // Sky 400
          dark: "#0ea5e9", // Sky 500
        },
        secondary: {
          light: "#ffedd5", // Orange 300,
          DEFAULT: "#fed7aa", // Orange 400
          dark: "#fdba74", // Orange 500
        },
        gray: {
          light: "#e5e7eb", // Gray 200
          DEFAULT: "#d1d5db", // Gray 300,
          medium: "#6b7280", // Gray 600
          dark: "#374151", // Gray 700
        },
      },
    },
    plugins: [require("autoprefixer")],
  }),
);
