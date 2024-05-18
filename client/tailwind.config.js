const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer"), flowbite.plugin()],
};
