/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        telegram: {
          primary: "#0088cc",
          hover: "#0077b3",
        },
      },
    },
  },
  plugins: [],
};
