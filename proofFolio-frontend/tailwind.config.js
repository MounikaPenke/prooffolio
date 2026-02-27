/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0a1a',
        'dark-card': '#111122',
        'dark-border': '#1e1e38',
        'teal-accent': '#00d1b2',
        'teal-dark': '#009b88',
        'gray-text': '#a0a0c0',
        'red-wrong': '#ff4d4f',
        'green-proof': '#52c41a',
      },
    },
  },
  plugins: [],
}