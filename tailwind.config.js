/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        'plus-jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        'lime': 'hsl(61, 70%, 52%)',
        'lime-hsl': 'hsl(61, 70%, 40%)',
        'red-hsl': 'hsl(4, 69%, 50%)',
        'slate-100': 'hsl(202, 86%, 94%)',
        'slate-300': 'hsl(203, 41%, 72%)',
        'slate-500': 'hsl(200, 26%, 54%)',
        'slate-700': 'hsl(200, 24%, 40%)',
        'slate-900': 'hsl(202, 55%, 16%)',
        'slate-900-hsl': 'hsl(202, 55%, 12%)',
      }
    },
  },
  plugins: [],
}