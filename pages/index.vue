<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: '主页'
})

const router = useRouter()
const pageSize = 5
const curPage = ref(Math.max(Number(router.currentRoute.value.query?.page), 1) || 1)
const search = ref((router.currentRoute.value.query?.search || '') + '')
const curCategory = useCategory()
const { data: posts } = await useAsyncData<Post[]>(
  () =>
    queryContent('/')
      .only(['_path', 'title', 'cover', 'keywords', 'description', 'category', 'updateAt', 'body'])
      .where({
        draft: false
      })
      .sort({
        updateAt: -1
      })
      .find() as Promise<Post[]>
)
const filteredPosts = computed(() =>
  posts.value?.filter((post) => post.category.includes(curCategory.value))
)
const pagePosts = computed(() =>
  filteredPosts.value?.slice(
    Math.max(curPage.value - 1, 0) * pageSize,
    Math.min(curPage.value * pageSize, filteredPosts.value?.length || 0)
  )
)

async function loadPosts(page: number) {
  curPage.value = page
  if (curPage.value !== 1 || search.value !== '' || curCategory.value !== '') {
    router.replace({
      query: { page: curPage.value, search: search.value, category: curCategory.value }
    })
  } else {
    router.replace('/')
  }
}

watch(curCategory, () => {
  loadPosts(1)
})
</script>

<template>
  <div>
    <div style="display: none">
      <a v-for="post in posts" :key="post._path" :href="'/post' + post._path">{{ post.title }}</a>
    </div>
    <!-- 搜索框 -->
    <div
      class="flex flex-row items-stretch frosted-glass p-1 pl-3 rounded-xl hover:brightness-110 transition-all ease"
    >
      <Icon name="solar:minimalistic-magnifer-linear" class="text-neutral-400 my-auto" />
      <input
        type="text"
        class="flex-1 mr-2 rounded-xl overflow-hidden w-full bg-transparent outline-none border-none px-3 py-2 text-neutral-50 placeholder:text-neutral-400"
        placeholder="Search"
        v-model="search"
        @keydown.enter="loadPosts(1)"
      />
      <div class="frosted-glass px-3 rounded-lg text-sm flex flex-row items-center justify-center">
        {{ filteredPosts?.length }} Posts
      </div>
    </div>
    <!-- Empty指示 -->
    <div v-if="filteredPosts?.length === 0">
      <div
        class="frosted-glass py-8 rounded-xl mt-4 text-neutral-200 flex flex-col items-center gap-2"
      >
        <Icon name="fluent:border-none-24-regular" size="96" />
        <p class="text-center">No posts found</p>
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="space-y-3 mt-4" v-auto-animate>
      <PostItem v-for="post in pagePosts" :key="post._path" :post-info="post as unknown as Post" />
    </div>
    <!-- 分页器 -->
    <Paginator
      :size="pageSize"
      :total="filteredPosts?.length || 0"
      v-model:page="curPage"
      @update="loadPosts"
    />
  </div>
</template>
