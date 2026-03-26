/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#080808',
        carbon: '#111111',
        graphite: '#1a1a1a',
        smoke: '#2a2a2a',
        ash: '#3d3d3d',
        mist: '#6b6b6b',
        silver: '#a8a8a8',
        ivory: '#f0ece4',
        gold: '#c8a96e',
        'gold-light': '#e2c98a',
        'gold-dark': '#a07840',
        amber: '#e8a020',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.3em',
        ultra: '0.5em',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease forwards',
        'slide-up': 'slideUp 0.7s ease forwards',
        'grain': 'grain 0.5s steps(2) infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '30%': { transform: 'translate(3%,2%)' },
          '50%': { transform: 'translate(-1%,4%)' },
          '70%': { transform: 'translate(2%,-1%)' },
          '90%': { transform: 'translate(-3%,1%)' },
        },
      },
    },
  },
  plugins: [],
};
