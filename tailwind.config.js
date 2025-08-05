/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00D4FF',
        'neon-green': '#00FF88',
        'dark-bg': '#0A0A0A',
        'dark-card': '#1A1A1A',
        'dark-border': '#333333',
        'dark-text': '#E0E0E0',
        'dark-muted': '#888888'
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.3)',
      }
    },
  },
  plugins: [],
}
