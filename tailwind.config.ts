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
          depth: 'var(--prussian-depth)', // New volumetric shadow base
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
        technical: ['var(--font-tenada)', 'system-ui', 'sans-serif'], // Semantic name for Tenada
        heading: ['var(--font-tenada)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // MONOLITHIC SCALE
        'huge': ['clamp(3.5rem, 8vw + 2rem, 8rem)', { lineHeight: '0.9', letterSpacing: '-0.05em', fontWeight: '800' }],
        'hero': ['clamp(2.75rem, 6vw + 1.5rem, 5rem)', { lineHeight: '1.0', letterSpacing: '-0.04em' }],
        'display': ['clamp(2rem, 4.5vw + 1rem, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'section': ['clamp(1.5rem, 3vw + 0.5rem, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        // TECHNICAL TEXT
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0em' }],
        'label': ['0.65rem', { lineHeight: '1.4', letterSpacing: '0.15em', fontWeight: '600' }],
        'micro': ['10px', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '700' }],
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.02em',
        'technical': '0.15em',
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
    },
  },
  plugins: [require('tailwindcss-animate')],
}
export default config
