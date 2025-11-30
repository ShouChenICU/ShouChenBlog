import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'app/components/**/*.{vue,js,ts}',
    'app/pages/**/*.{vue,js,ts}',
    'app/layouts/**/*.{vue,js,ts}',
    'content/**/*.md'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
