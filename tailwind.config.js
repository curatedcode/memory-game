/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "can-hover": { raw: "(hover: hover)" }
      },
      colors: {
        'C-off-white': 'rgb(207, 207, 192)',
        'C-light-gray': 'rgb(192, 192, 186)'
      }
  }
  },
  plugins: [],
}
