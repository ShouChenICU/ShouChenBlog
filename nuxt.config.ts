// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  ssr: true,
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts',
    '@nuxt/content',
    '@formkit/auto-animate',
    '@nuxtjs/i18n'
  ],

  css: ['@/assets/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

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

  i18n: {
    vueI18n: './i18n.config.ts',
    baseUrl: 'https://shouchen.blog',
    locales: [{ code: 'zh', language: 'zh-CN' }],
    defaultLocale: 'zh',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  ogImage: {
    enabled: false
  },

  icon: {
    provider: 'server',
    serverBundle: {
      collections: ['solar', 'ph', 'fluent', 'logos']
    },
    clientBundle: {
      scan: true
    },
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/icons'
      }
    ],
    fetchTimeout: 3e4
  },

  content: {
    markdown: {
      anchorLinks: false,
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    highlight: {
      theme: 'github-dark'
    }
    // experimental: {
    //   search: {
    //     indexed: true,
    //     filterQuery: {
    //       draft: false
    //     },
    //     options: {
    //       fields: ['title', 'description', 'keywords'],
    //       storeFields: ['title', 'description', 'keywords']
    //     }
    //   }
    // }
  }
})
