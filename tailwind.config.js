module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './_services/**/*.md',
    './_job_openings/**/*.md',
    './_projects/**/*.md',
    './_posts/**/*.md',
    './**/*.html',
    './**/*.md',
  ],
  safelist: [
    // Career ladder step colors (used dynamically from _data/career_ladder.yml)
    'bg-stone-300', 'bg-stone-400', 'bg-stone-500',
    'bg-reyco-grey', 'bg-reyco-red-800',
    // Industry border colors (used dynamically from _data/industries.yml)
    'border-orange-400', 'border-blue-400', 'border-stone-600',
    'border-green-500', 'border-red-400',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        // ─── Reyco Brand Colors ────────────────────────────────────────────
        // Primary: Red  #af1c0f
        'reyco-red': {
          50:  '#fdf2f1',
          100: '#fae5e3',
          200: '#f4c0bc',
          300: '#ea8c85',
          400: '#de5a50',
          500: '#c93424',
          DEFAULT: '#af1c0f',
          600: '#af1c0f',
          700: '#af1c0f',
          800: '#8c1609',
          900: '#6b1007',
        },
        // Secondary: Grey  #797979
        'reyco-grey': {
          50:  '#f5f5f5',
          100: '#ebebeb',
          200: '#d6d6d6',
          300: '#c2c2c2',
          400: '#a8a8a8',
          500: '#909090',
          DEFAULT: '#797979',
          600: '#797979',
          700: '#606060',
          800: '#474747',
          900: '#2e2e2e',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
