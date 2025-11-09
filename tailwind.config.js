
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-abyss': '#0A0A0A',
        'gray-carbon': '#1A1A1A',
        'gray-smoke': '#2D2D2D',
        'gray-fog': '#4A4A4A',
        'magenta-neon': '#FF00FF',
        'magenta-alt': '#E31EFF',
        'white-crisp': '#FFFFFF',
        'white-matte': '#E5E5E5',
        'alert-red': '#FF3366',
        // Purchase Modal Colors
        'purchase-bg': '#0A0A0F',
        'purchase-text': '#E5E5E5',
        'purchase-gray': '#A7A9A9',
        'purchase-green': '#39FF14',
        'purchase-cyan': '#00F5FF',
        'purchase-pink-alt': '#FF006E',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 2.5s infinite ease-in-out',
        glitchIn: 'glitchIn 1s ease-out',
        scrollPulse: 'scrollPulse 2s infinite ease-in-out',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.9, transform: 'scale(1.02)' },
        },
        glitchIn: {
          '0%': { opacity: 0, transform: 'translateX(-10px)' },
          '20%': { transform: 'translateX(10px)' },
          '40%': { transform: 'translateX(-5px)' },
          '60%': { transform: 'translateX(5px)' },
          '80%': { transform: 'translateX(-2px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        scrollPulse: {
            '0%, 100%': { opacity: 0.3 },
            '50%': { opacity: 1 },
        }
      },
    },
  },
  plugins: [],
}
