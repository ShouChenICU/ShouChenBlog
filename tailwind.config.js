import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'components/**/*.{vue,js,ts}',
    'pages/**/*.{vue,js,ts}',
    'layouts/**/*.{vue,js,ts}',
    'content/**/*.md'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
