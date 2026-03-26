export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:   'rgb(var(--primary) / <alpha-value>)',
        surface:   'rgb(var(--surface) / <alpha-value>)',
        card:      'rgb(var(--card) / <alpha-value>)',
        border:    'rgb(var(--border) / <alpha-value>)',
        textMain:  'rgb(var(--text-main) / <alpha-value>)',
        textMuted: 'rgb(var(--text-muted) / <alpha-value>)',
        hoverBg:   'var(--hover-bg)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 15px -3px var(--primary)',
      }
    },
  },
  plugins: [],
};
