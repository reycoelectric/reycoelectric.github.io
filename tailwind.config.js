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
    'bg-stone-300', 'bg-stone-400', 'bg-stone-500', 'bg-teal-600', 'bg-teal-800',
    // Industry border colors (used dynamically from _data/industries.yml)
    'border-orange-400', 'border-blue-400', 'border-stone-600', 'border-green-500', 'border-red-400',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
