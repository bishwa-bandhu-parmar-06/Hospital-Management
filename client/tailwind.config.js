/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        accentlight: 'var(--color-accentlight)',
        textPrimary: 'var(--color-text-primary)',
        background: 'var(--color-background)',
        error: 'var(--color-error)',
        success: 'var(--color-success)',
      },
      
      keyframes: {
        blinkCursor: {
          '50%': { 'border-right-color': 'transparent' },
        },
        typeAndDelete: {
          '0%, 10%': { width: '0' },
          '45%, 55%': { width: '6.2em' },
          '90%, 100%': { width: '0' },
        },
      },
      animation: {
        blinkCursor: 'blinkCursor 0.5s step-end infinite alternate',
        typeAndDelete: 'typeAndDelete 4s steps(11) infinite',
      },
    },
  },
  plugins: [],
}

