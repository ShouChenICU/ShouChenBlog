import type { ContentCollectionItem } from '@nuxt/content'
import { defineStore } from 'pinia'
import type { Router } from 'vue-router'

const POSTS_PER_PAGE = 5

function normalizeCategory(category: string) {
  return category === 'unset' ? '' : category
}

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

    pagedPosts: (state) =>
      state.filteredPosts.slice(POSTS_PER_PAGE * (state.page - 1), POSTS_PER_PAGE * state.page)
  },

  actions: {
    async loadCurrent(id: string) {
      this.current = (await queryCollection('content').where('path', '=', `/${id}`).first()) as any
    },

    async loadPosts(page?: number, router?: Router) {
      if (page !== undefined) {
        this.page = page
      }

      this.category = normalizeCategory(this.category)

      this.filteredPosts = (await queryCollection('content')
        .select('title', 'description', 'meta', 'path')
        .all()
        .then((posts) =>
          posts
            .filter((p) => !Boolean(p.meta?.draft))
            .filter((p) => {
              const searchableText = [
                p.title ?? '',
                p.description ?? '',
                ...(Array.isArray(p.meta?.keywords) ? p.meta.keywords : [])
              ]
                .join(' ')
                .toLocaleLowerCase()

              return (
                (!this.category || p.meta?.category === this.category) &&
                searchableText.includes(this.search.toLocaleLowerCase())
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

      const lastPage = Math.max(1, Math.ceil(this.filteredPosts.length / POSTS_PER_PAGE))
      this.page = Math.min(Math.max(this.page, 1), lastPage)

      if (!router) {
        return
      }

      if (this.page !== 1 || this.search !== '' || this.category !== '') {
        router.replace({
          path: '/',
          query: { page: this.page, search: this.search, category: this.category }
        })
      } else {
        router.replace({ path: '/', query: {} })
      }
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
