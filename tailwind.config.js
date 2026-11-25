/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0A1020',
          900: '#0E1428',
          850: '#111935',
          800: '#15203F',
          700: '#1B2A4E',
          600: '#243660',
          500: '#2E4374',
        },
        status: {
          healthy: '#22D39A',
          attention: '#F5A524',
          issue: '#FF4D4F',
        },
        accent: {
          blue: '#3B82F6',
          teal: '#2DD4BF',
          purple: '#8B5CF6',
          orange: '#F97316',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59,130,246,0.15), 0 8px 30px rgba(0,0,0,0.45)',
        'glow-green': '0 0 20px rgba(34,211,154,0.25)',
        'glow-amber': '0 0 20px rgba(245,165,36,0.25)',
        'glow-red': '0 0 20px rgba(255,77,79,0.30)',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
        softPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pulseRing: 'pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite',
        softPulse: 'softPulse 2s ease-in-out infinite',
        slideUp: 'slideUp 0.35s ease-out',
        slideInRight: 'slideInRight 0.3s ease-out',
        fadeIn: 'fadeIn 0.25s ease-out',
        shimmer: 'shimmer 1.5s infinite',
        spinSlow: 'spinSlow 12s linear infinite',
      },
    },
  },
  plugins: [],
};
