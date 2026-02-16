import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          subtle: 'var(--surface-subtle)',
          card: 'var(--surface-card)',
        },
        primary: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          muted: 'var(--accent-muted)',
        },
        prussian: {
          DEFAULT: 'var(--prussian)',
          light: 'var(--prussian-light)',
          lighter: 'var(--prussian-lighter)',
        },
        border: {
          DEFAULT: 'var(--border)',
          subtle: 'var(--border-subtle)',
          accent: 'var(--border-accent)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['Mirabelle', 'var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        logo: ['SaintCarell', 'var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': 'var(--radius-card)',
        'button': 'var(--radius-button)',
        'input': 'var(--radius-input)',
        'badge': 'var(--radius-badge)',
      },
      boxShadow: {
        'soft': 'var(--shadow-soft)',
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'glow': 'var(--shadow-glow)',
        'nav': 'var(--shadow-nav)',
      },
      transitionDuration: {
        'smooth': '450ms',
        'slow': '600ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in-up': 'fade-in-up 0.6s var(--ease-out-expo) forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      fontSize: {
        'hero': ['clamp(2.75rem, 5vw + 1.5rem, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
        'display': ['clamp(2.25rem, 4vw + 0.75rem, 3.5rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        'section': ['clamp(1.875rem, 2.5vw + 0.5rem, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
