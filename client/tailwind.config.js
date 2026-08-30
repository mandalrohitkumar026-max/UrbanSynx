/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#070a0f',
          surface: '#0d131d',
          card: '#111827',
          cardHover: '#162032',
          border: '#1e293b',
          borderLight: '#334155',
          textMuted: '#94a3b8',
          textBright: '#f8fafc',
        },
        cyber: {
          cyan: '#06b6d4',
          sky: '#38bdf8',
          blue: '#3b82f6',
          purple: '#a855f7',
          violet: '#8b5cf6',
          amber: '#f59e0b',
          emerald: '#10b981',
          rose: '#f43f5e',
          red: '#ef4444',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px -3px rgba(6, 182, 212, 0.3)',
        'glow-amber': '0 0 15px -3px rgba(245, 158, 11, 0.3)',
        'glow-red': '0 0 15px -3px rgba(239, 68, 68, 0.3)',
        'glow-purple': '0 0 15px -3px rgba(168, 85, 247, 0.3)',
        'glow-emerald': '0 0 15px -3px rgba(16, 185, 129, 0.3)',
        'radar': '0 0 50px rgba(6, 182, 212, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'flow-fast': 'flowAnimation 1s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        flowAnimation: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        }
      }
    },
  },
  plugins: [],
}
