<script setup lang="ts">
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

const router = useRouter()
const pageSize = 5
const curPage = ref(Math.max(Number(router.currentRoute.value.query?.page), 1) || 1)
const search = ref((router.currentRoute.value.query?.search || '') + '')
const curCategory = useCategory((router.currentRoute.value.query?.category || '') + '')
const posts = useAllPost()
const filteredPosts = computed(() =>
  posts.value?.filter((post) => post.category.includes(curCategory.value))
)
const pagePosts = computed(() =>
  filteredPosts.value?.slice(
    Math.max(curPage.value - 1, 0) * pageSize,
    Math.min(curPage.value * pageSize, filteredPosts.value?.length || 0)
  )
)

function updateQuery(page: number, category: string, searchStr: string) {
  curPage.value = page
  curCategory.value = category
  search.value = searchStr
  if (curPage.value !== 1 || search.value !== '' || curCategory.value !== '') {
    router.replace({
      query: { page: curPage.value, search: search.value, category: curCategory.value }
    })
  } else {
    router.replace('/')
  }
}

updateQuery(1, curCategory.value, search.value)

watch(curCategory, (newCategory) => {
  updateQuery(1, newCategory, search.value)
})

onUnmounted(() => {
  curCategory.value = 'unset'
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
        @keydown.enter="updateQuery(1, curCategory, search)"
      />
      <div class="frosted-glass px-3 rounded-lg text-sm flex flex-row items-center justify-center">
        {{ filteredPosts?.length }} Posts
      </div>
    </div>
    <!-- 文章列表 -->
    <div class="space-y-3 mt-4" v-auto-animate>
      <PostItem v-for="post in pagePosts" :key="post._path" :post-info="post as unknown as Post" />
      <!-- Empty指示 -->
      <div v-if="filteredPosts?.length === 0" key="empty">
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
      :total="filteredPosts?.length || 0"
      v-model:page="curPage"
      @update="(page) => updateQuery(page, curCategory, search)"
    />
  </div>
</template>
