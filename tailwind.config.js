/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },

      colors: {
        red: {
          500: "#B8002E",
          600: "#A30029",
        },
        blue: {
          500: "#3367EB",
          600: "#2F5DD4",
        },
        gray: {
          100: "#E1E1E6",
          300: "#8D8D99",
          600: "#323228",
          800: "#202024",
          900: "#121214",
        },
      },
    },
  },
  plugins: [],
};
