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
      // { id: 'home', text: '主页', link: '/' },
      // { id: 'archived', text: '归档', link: '/archived' },
      // { id: 'friendlyLink', text: '友链', link: '/friendlyLink' },
      // { id: 'about', text: '关于', link: '/about' }
    ],

    categories: [
      { id: 'tech', text: '技术', link: '/doc/tech/index', color: '178, 143, 206' },
      { id: 'tutorial', text: '教程', link: '/doc/tutorial/index', color: '88, 178, 220' },
      { id: 'daily', text: '日常', link: '/doc/daily/index', color: '93, 172, 129' }
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

  transformHead: ({ pageData }) => {
    if (pageData.frontmatter.layout) {
      return [
        ['meta', { property: 'og:title', content: "ShouChen's Blog" }],
        ['meta', { property: 'og:description', content: "ShouChen's Blog" }],
        ['meta', { property: 'og:image', content: '/banner.webp' }],
        ['meta', { name: 'twitter:card', content: 'summary' }],
        ['meta', { name: 'twitter:site', content: '@ShouChen_' }],
        ['meta', { name: 'twitter:title', content: "ShouChen's Blog" }],
        ['meta', { name: 'twitter:description', content: "ShouChen's Blog" }],
        ['meta', { name: 'twitter:image', content: '/banner.webp' }]
      ]
    } else {
      return [
        ['meta', { property: 'og:title', content: pageData.frontmatter.title }],
        ['meta', { property: 'og:description', content: pageData.frontmatter.description }],
        ['meta', { property: 'og:image', content: pageData.frontmatter.cover || '/banner.webp' }],
        ['meta', { name: 'twitter:card', content: 'summary' }],
        ['meta', { name: 'twitter:site', content: '@ShouChen_' }],
        [
          'meta',
          { name: 'twitter:title', content: pageData.frontmatter.title || "ShouChen's Blog" }
        ],
        [
          'meta',
          {
            name: 'twitter:description',
            content: pageData.frontmatter.description || "ShouChen's Blog"
          }
        ],
        ['meta', { name: 'twitter:image', content: pageData.frontmatter.cover || '/banner.webp' }]
      ]
    }
  },

  outDir: '../dist'
})
