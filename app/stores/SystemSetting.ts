import { defineStore } from 'pinia'

export const useSystemSetting = defineStore('useSystemSetting', {
  state: () => ({
    isDark: false,
    navHeight: 0,
    footerHeight: 0,
    bgUrl: '/bg.webp',
    bgBlur: false
  }),

  getters: {
    curTheme: (state) => (state.isDark ? 'dark' : 'light')
  },

  actions: {
    init() {
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
          this.isDark = savedTheme === 'dark'
        } else {
          // 检测系统主题偏好
          this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
      }
    },

    switchTheme(dark?: boolean) {
      this.isDark = dark ? dark : !this.isDark
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
      }
    },

    setBgUrl(url?: string) {
      if (url) {
        this.bgUrl = url
      }
    }
  }
})
