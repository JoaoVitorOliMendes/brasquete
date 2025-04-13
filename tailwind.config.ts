/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        'Anton': 'Anton',
        'Roboto': 'Roboto'
      },
      colors: {
        ...colors,
        primary: '#AC2900',
        secondary: '#2C2C2C',
        white: {
          DEFAULT: '#FFFFFF',
          25: '#FFFFFF25',
          50: '#FFFFFF50',
          200: '#FFFFAA',
          500: '#FFFFCC'
        },
        black: {
          DEFAULT: '#000000',
          15: '#00000015',
          25: '#00000025',
          50: '#00000050'
        }
      }
    },
  },
  plugins: []
}