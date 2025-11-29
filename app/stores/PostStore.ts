import type { ContentCollectionItem } from '@nuxt/content'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('usePostStore', {
  state: () => ({
    posts: [] as ContentCollectionItem[],
    search: ''
  }),

  getters: {
    postCount: (state) => state.posts.length
  },

  actions: {
    async loadAll() {
      this.posts = (await queryCollection('content')
        .select('title', 'description', 'meta', 'path')
        .all()) as any
    }
  }
})
