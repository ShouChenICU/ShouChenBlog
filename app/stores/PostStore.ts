import type { ContentCollectionItem } from '@nuxt/content'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('usePostStore', {
  state: () => ({
    allPosts: [] as ContentCollectionItem[],
    filteredPosts: [] as ContentCollectionItem[],
    current: null as ContentCollectionItem | null,
    page: 1,
    search: '',
    category: ''
  }),

  getters: {
    privPost: (state) => {
      if (state.current) {
        const idx = state.allPosts.findIndex((p) => p.path === state.current?.path)
        if (idx > 0) {
          return state.allPosts[idx - 1]
        }
      }
      return null
    },

    nextPost: (state) => {
      if (state.current) {
        const idx = state.allPosts.findIndex((p) => p.path === state.current?.path)
        if (idx < state.allPosts.length - 1) {
          return state.allPosts[idx + 1]
        }
      }
      return null
    },

    pagedPosts: (state) => state.filteredPosts.slice(5 * (state.page - 1), 5 * state.page)
  },

  actions: {
    async loadCurrent(id: string) {
      this.current = (await queryCollection('content').where('path', '=', `/${id}`).first()) as any
    },

    async loadPosts(page?: number) {
      if (page) {
        this.page = page
      }
      if (this.page !== 1 || this.search !== '' || this.category !== '') {
        useRouter().replace({
          path: '/',
          query: { page: this.page, search: this.search, category: this.category }
        })
      } else {
        useRouter().replace({ path: '/', query: {} })
      }

      this.filteredPosts = (await queryCollection('content')
        .select('title', 'description', 'meta', 'path')
        .all()
        .then((posts) =>
          posts
            .filter((p) => !Boolean(p.meta?.draft))
            .filter((p) => {
              return (
                (!this.category || p.meta?.category === this.category) &&
                (p.title + p.description)
                  .toLocaleLowerCase()
                  .includes(this.search.toLocaleLowerCase())
              )
            })
        )
        .then((posts) =>
          posts.sort((a, b) => {
            const atime = new Date(a.meta?.updateAt + '')
            const btime = new Date(b.meta?.updateAt + '')
            return btime.getTime() - atime.getTime()
          })
        )) as any
    },

    async loadAll() {
      this.allPosts = (await queryCollection('content')
        .select('title', 'description', 'meta', 'path')
        .all()
        .then((posts) => posts.filter((p) => !Boolean(p.meta?.draft)))
        .then((posts) =>
          posts.sort((a, b) => {
            const atime = new Date(a.meta?.updateAt + '')
            const btime = new Date(b.meta?.updateAt + '')
            return btime.getTime() - atime.getTime()
          })
        )) as any
    }
  }
})
