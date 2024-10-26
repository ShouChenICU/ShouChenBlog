// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts'
  ],

  css: ['@/assets/main.css'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      link: [{ rel: 'icon', href: '/favicon.webp' }]
    },
    pageTransition: { name: 'visionpro', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  site: {
    url: 'http://localhost:3000',
    name: "ShouChen's Blog",
    description: "ShouChen's Blog"
  },

  ogImage: {
    enabled: false
  }
})
