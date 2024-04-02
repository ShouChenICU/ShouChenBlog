import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ShouChen' Blog",
  description: "ShouChen's Blog",
  lang: 'zh-CN',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: '/favicon.webp',

    nav: [{ text: '主页', link: '/' }],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ]

    // socialLinks: [
    //   { icon: "github", link: "https://github.com/vuejs/vitepress" },
    // ],
  },

  markdown: {
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详细信息'
    },

    lineNumbers: true
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.webp' }],
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      }
    ]
  ],

  outDir: '../dist'
})
