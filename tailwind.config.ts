import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50:  '#f0f7ec',
          100: '#dcefd3',
          200: '#b9dfaa',
          300: '#8ec87a',
          400: '#64af50',
          500: '#4a9238',
          600: '#38742b',
          700: '#2d5c23',
          800: '#244920',
          900: '#1a3a19',
          950: '#0d2010',
        },
        beige: {
          50:  '#fdf9f0',
          100: '#faf3e0',
          200: '#f5e6c0',
          300: '#edd498',
          400: '#e4be6e',
          500: '#d9a84a',
          600: '#c08c35',
          700: '#9e6f2b',
          800: '#815829',
          900: '#6b4926',
        },
        cream: {
          50:  '#fdfcfa',
          100: '#faf8f3',
          200: '#f5f0e6',
          300: '#ece6d4',
          400: '#ddd4bc',
          500: '#cbc0a0',
        },
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        serif: ['Playfair Display', ...fontFamily.serif],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.05)',
        'hover': '0 8px 30px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
}

export default config
