import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Legacy aliases → Beautiva purple (keeps old class names working)
        glamora: {
          gold: '#9333EA',
          'gold-light': '#A855F7',
          'gold-dark': '#7C3AED',
          pink: '#D946EF',
          'pink-light': '#E879F9',
          'pink-dark': '#C026D3',
          dark: '#0D0520',
          'dark-2': '#160A30',
          'dark-3': '#1E1040',
        },
        // Beautiva brand palette
        bv: {
          purple: '#7C3AED',
          'purple-light': '#A855F7',
          'purple-pale': '#C084FC',
          lilac: '#E9D5FF',
          fuchsia: '#D946EF',
          dark: '#0D0520',
          'dark-2': '#160A30',
          'dark-3': '#1E1040',
          'dark-4': '#2A1650',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        tajawal: ['Tajawal', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delay': 'float 6s ease-in-out 2s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
