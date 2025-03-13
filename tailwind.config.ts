import type { Config } from 'tailwindcss'

const config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      colors: {
        primary: '#1e3a8a',
        secondary: '#9333ea',
        muted: '#64748b',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
