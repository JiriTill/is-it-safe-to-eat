
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        safe: "#16a34a",
        caution: "#f59e0b",
        danger: "#ef4444"
      },
      borderRadius: {
        '2xl': '1rem'
      }
    },
  },
  plugins: [],
};
