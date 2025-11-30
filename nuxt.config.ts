import fs from 'node:fs'

const postList = fs.readdirSync('content').map((s) => `/post/${s.split('.')[0]}`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@formkit/auto-animate',
    '@nuxtjs/tailwindcss'
  ],

  css: ['@/assets/main.css'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
      link: [{ rel: 'icon', href: '/favicon.webp' }]
    },
    pageTransition: { name: 'inout', mode: 'out-in' },
    layoutTransition: { name: 'inout', mode: 'out-in' }
  },

  site: {
    url: 'https://shouchen.blog',
    name: "ShouChen's Blog",
    description: "ShouChen's Blog"
  },

  icon: {
    provider: 'server',
    serverBundle: {
      collections: ['solar', 'fluent']
    },
    clientBundle: {
      scan: true
    },
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './app/assets/icons'
      }
    ],
    fetchTimeout: 3e4
  },

  i18n: {
    baseUrl: 'https://shouchen.blog',
    locales: [{ code: 'zh', language: 'zh-CN', file: 'zh-CN.json' }],
    defaultLocale: 'zh'
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        },
        highlight: {
          theme: 'github-dark'
          // theme: {
          //   default: 'github-light',
          //   dark: 'github-dark'
          // }
        }
      }
    }
  },

  nitro: {
    prerender: {
      routes: postList
    }
  },

  router: {
    options: {
      sensitive: false
    }
  },

  ogImage: {
    enabled: false
  }
})
