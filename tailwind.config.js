/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0F172A', // slate-900
          card: '#1E293B', // slate-800
          text: '#F8FAFC', // slate-50
          muted: '#94A3B8', // slate-400
          border: '#334155', // slate-700
        },
        primary: {
          light: '#38BDF8', // sky-400
          DEFAULT: '#0EA5E9', // sky-500
          dark: '#0284C7', // sky-600
        },
        secondary: {
          light: '#818CF8', // indigo-400
          DEFAULT: '#6366F1', // indigo-500
          dark: '#4F46E5', // indigo-600
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500%)' }
        }
      }
    },
  },
  plugins: [],
}
