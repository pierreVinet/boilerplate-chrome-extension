/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        50: '#0E131C',
        100: '#21262D',
        200: '#343B46',
        300: '#151D2A',
        400: '#d2bab0',
        500: '#bfa094',
        600: '#a18072',
        700: '#977669',
        800: '#846358',
        900: '#43302b',
      },
    },
  },
  plugins: [],
}
