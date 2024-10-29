<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: '主页'
})

const router = useRouter()
const pageSize = 2
const curPage = ref(Number(router.currentRoute.value.query?.page) || 1)
const search = ref((router.currentRoute.value.query?.search || '') + '')
const { data: total, refresh: refreshTotal } = await useAsyncData(() =>
  queryContent()
    .only(['_path', 'title'])
    .where({
      draft: false
    })
    .find()
)
const { data: posts, refresh: refreshData } = await useAsyncData<Post[]>(
  () =>
    queryContent('/')
      .only(['_path', 'title', 'cover', 'keywords', 'description', 'category', 'createAt', 'body'])
      .where({
        draft: false
      })
      .sort({
        createAt: -1
      })
      .skip(Math.max(curPage.value - 1, 0) * pageSize)
      .limit(pageSize)
      .find() as Promise<Post[]>
)

async function loadPosts(page?: number) {
  if (page) {
    curPage.value = page
  }
  if (curPage.value !== 1 || search.value !== '') {
    router.replace({ query: { page: curPage.value, search: search.value } })
  } else {
    router.replace('/')
  }

  refreshTotal()
  refreshData()
}

// updateQuery()
</script>

<template>
  <div>
    <div style="display: none">
      <a v-for="post in total" :key="post._path" :href="'/post' + post._path">{{ post.title }}</a>
    </div>
    <div class="flex flex-row items-center">
      <div class="flex-1"></div>
      <p class="frosted-glass px-3 py-2 rounded-xl text-sm">{{ total?.length }} Posts</p>
    </div>
    <div class="space-y-3 mt-4" v-auto-animate>
      <PostItem v-for="post in posts" :key="post._path" :post-info="post as unknown as Post" />
    </div>
    <Paginator
      :size="pageSize"
      :total="posts?.length || 0"
      v-model:page="curPage"
      @update="loadPosts"
    />
  </div>
</template>
