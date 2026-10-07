/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        groww: {
          primary: '#00D09C', // Signature Groww Emerald
          dark: '#00B386',
          light: '#E6FAF5',
          bg: '#FAFAFA',
          card: '#FFFFFF',
          text: '#111827',
          muted: '#6B7280',
          border: '#F0F0F0',
          surface: '#F4F5F7',
          danger: '#EB5757',
          warning: '#F59E0B',
          info: '#2F80ED',
          // Official Groww Dark Theme Tokens
          darkBg: '#0C0D11',
          darkCard: '#16181F',
          darkBorder: '#242834',
          darkSurface: '#1D212C',
          darkText: '#F8FAFC',
          darkMuted: '#94A3B8'
        }
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px'
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'elevated': '0 8px 24px -4px rgba(0, 0, 0, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.02)'
      }
    },
  },
  plugins: [],
}
