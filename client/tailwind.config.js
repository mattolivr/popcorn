const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html", flowbite.content()],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      serif: ["Roboto Serif", "serif"],
      mono: ["Inconsolata", "monospace"],
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer"), flowbite.plugin()],
};
