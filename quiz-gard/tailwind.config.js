/** @type {import('tailwindcss').Config} */
export default {
  content: ["./dist/**/*.{html,js}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCC822",
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
