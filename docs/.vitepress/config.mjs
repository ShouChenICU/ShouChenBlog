import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ShouChen' Blog",
  description: "ShouChen's Blog",
  lang: 'zh-CN',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    logo: '/favicon.webp',

    nav: [
      { id: 'home', text: '主页', link: '/' },
      { id: 'archived', text: '归档', link: '/archived' },
      { id: 'about', text: '关于', link: '/about' }
    ],

    categories: [
      { id: 'tech', text: '技术', link: '/category/tech' },
      { id: 'tutorial', text: '教程', link: '/category/tutorial' },
      { id: 'daily', text: '日常', link: '/category/daily' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    outline: {
      label: '目录',
      level: [2, 3]
    }
    // socialLinks: [
    //   { icon: "github", link: "https://github.com/vuejs/vitepress" },
    // ],
  },

  // sitemap: {
  //   hostname: 'https://shouchen.blog',
  //   transformItems: (items) => {
  //     return items
  //   }
  // },

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
