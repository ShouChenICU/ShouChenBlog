<script setup lang="ts">
// import type { ParsedContent } from '@nuxt/content'

definePageMeta({
  layout: 'main'
})
const siteUrl = useSiteConfig().url
useSeoMeta({
  title: '主页',
  ogImage: siteUrl + '/ogImg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: '主页',
  twitterDescription: '主页',
  twitterImage: siteUrl + '/ogImg.webp',
  twitterSite: 'https://shouchen.blog',
  twitterCreator: 'ShouChen_'
})

const sysSetting = useSystemSetting()
const postStore = usePostStore()

const router = useRouter()
const pageSize = 5
postStore.page = Math.max(Number(router.currentRoute.value.query?.page), 1) || 1
postStore.search = (router.currentRoute.value.query?.search || '') + ''
postStore.category = (router.currentRoute.value.query?.category || '') + ''
await postStore.loadPosts()

onMounted(() => {
  sysSetting.setBgUrl('/bg.webp')
})

onUnmounted(() => {
  postStore.category = 'unset'
})
</script>

<template>
  <div>
    <!-- <div style="display: none">
      <a v-for="post in postStore.posts" :key="post.path" :href="'/post' + post.path">{{
        post.title
      }}</a>
    </div> -->
    <!-- 搜索框 -->
    <div
      class="flex flex-row items-stretch frosted-glass p-1 pl-3 rounded-xl hover:brightness-110 transition-all ease"
    >
      <Icon name="solar:minimalistic-magnifer-linear" class="text-neutral-400 my-auto" />
      <input
        type="text"
        class="flex-1 mr-2 rounded-xl overflow-hidden w-full bg-transparent outline-none border-none px-3 py-2 text-neutral-50 placeholder:text-neutral-400"
        placeholder="Search"
        v-model="postStore.search"
        @keydown.enter="postStore.loadPosts(1)"
      />
      <div class="frosted-glass px-3 rounded-lg text-sm flex flex-row items-center justify-center">
        {{ postStore.filteredPosts.length }} Posts
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="space-y-3 mt-4" v-auto-animate>
      <PostItem v-for="post in postStore.pagedPosts" :key="post.path" :post-info="post as any" />
      <!-- Empty指示 -->
      <div v-if="postStore.filteredPosts.length === 0" key="empty">
        <div
          class="frosted-glass py-8 rounded-xl mt-4 text-neutral-200 flex flex-col items-center gap-2"
        >
          <Icon name="fluent:border-none-24-regular" size="96" />
          <p class="text-center">No posts found</p>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <Paginator
      :size="pageSize"
      :total="postStore.filteredPosts.length"
      v-model:page="postStore.page"
      @update="(page) => postStore.loadPosts(page)"
    />
  </div>
</template>
