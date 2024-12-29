import { createRequire } from 'module'
const require = createRequire(import.meta.url)

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
