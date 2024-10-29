<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: '主页'
})

const router = useRouter()
const pageSize = 10
const curPage = ref(Math.max(Number(router.currentRoute.value.query?.page), 1) || 1)
const search = ref((router.currentRoute.value.query?.search || '') + '')
const { data: posts } = await useAsyncData<Post[]>(
  () =>
    queryContent('/')
      .only(['_path', 'title', 'cover', 'keywords', 'description', 'category', 'createAt', 'body'])
      .where({
        draft: false
      })
      .sort({
        createAt: -1
      })
      .find() as Promise<Post[]>
)
const filteredPosts = computed(() =>
  posts.value?.slice(
    Math.max(curPage.value - 1, 0) * pageSize,
    Math.min(curPage.value * pageSize, posts.value?.length || 0)
  )
)

async function loadPosts(page: number) {
  curPage.value = page
  if (curPage.value !== 1 || search.value !== '') {
    router.replace({ query: { page: curPage.value, search: search.value } })
  } else {
    router.replace('/')
  }
}
</script>

<template>
  <div>
    <div style="display: none">
      <a v-for="post in posts" :key="post._path" :href="'/post' + post._path">{{ post.title }}</a>
    </div>
    <div class="flex flex-row items-center">
      <div class="flex-1"></div>
      <p class="frosted-glass px-3 py-2 rounded-xl text-sm">{{ posts?.length }} Posts</p>
    </div>
    <div class="space-y-3 mt-4" v-auto-animate>
      <PostItem
        v-for="post in filteredPosts"
        :key="post._path"
        :post-info="post as unknown as Post"
      />
    </div>
    <Paginator
      :size="pageSize"
      :total="posts?.length || 0"
      v-model:page="curPage"
      @update="loadPosts"
    />
  </div>
</template>
