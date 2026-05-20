import { defineStore } from 'pinia'

export const useSystemSetting = defineStore('useSystemSetting', {
  state: () => ({
    isDark: true,
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
        this.isDark = true
        localStorage.setItem('theme', 'dark')
      }
    },

    switchTheme(dark?: boolean) {
      this.isDark = dark ?? !this.isDark
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
