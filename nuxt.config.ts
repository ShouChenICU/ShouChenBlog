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
    'vuetify-nuxt-module',
    '@nuxtjs/i18n'
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
    locales: [{ code: 'zh', language: 'zh-CN' }],
    defaultLocale: 'zh'
  },

  content: {
    build: {
      markdown: {
        toc: {
          depth: 3
        },
        // Object syntax can be used to override default options
        remarkPlugins: {
          // Override remark-emoji options
          'remark-emoji': {
            options: {
              emoticon: true
            }
          }
          // Disable remark-gfm
          // 'remark-gfm': false
          // Add remark-oembed
          // 'remark-oembed': {
          // Options
          // }
        },
        // Object syntax can be used to override default options
        // rehypePlugins: {
        // 'rehype-figure': {}
        // },
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark'
          }
        }
      }
    }
  },

  nitro: {
    prerender: {
      routes: postList
    }
  },

  ogImage: {
    enabled: false
  }
})
