/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'xbox-green': '#107C10',
        'xbox-dark': '#0E4B2A',
        'button-x': '#4A90E2',
        'button-y': '#F5A623',
        'button-a': '#7ED321',
        'button-b': '#D0021B'
      },
      animation: {
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'button-press': 'scale 0.1s ease-out'
      },
      keyframes: {
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}