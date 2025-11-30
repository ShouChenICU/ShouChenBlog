<script setup lang="ts">
definePageMeta({
  layout: 'main'
})

const sysSetting = useSystemSetting()
const postStore = usePostStore()
const siteUrl = useSiteConfig().url
const id = useRoute().params.id
await postStore.loadCurrent(id + '')
if (!postStore.current) {
  throw createError({ statusCode: 404, message: '文章不存在' + id })
}
const curPost = postStore.current

const router = useRouter()
// const docPath = router.currentRoute.value.path.replace('/post', '') || '/'

// const allPost = useAllPost()
// const curPostIdx = allPost.value.findIndex((p) => p._path === docPath)
// const privPost = curPostIdx === 0 ? undefined : allPost.value[curPostIdx - 1]
// const curPost = allPost.value[curPostIdx]
// const nextPost = curPostIdx === allPost.value.length - 1 ? undefined : allPost.value[curPostIdx + 1]
// useCurrentPost(curPost)
// console.log(data)

useSeoMeta({
  title: curPost.title,
  description: curPost.description,
  ogTitle: curPost.title,
  ogDescription: curPost.description,
  ogType: 'website',
  ogImage: siteUrl + curPost.meta.cover,
  ogUrl: siteUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: curPost.title,
  twitterDescription: curPost.description,
  twitterSite: '@ShouChen_',
  twitterCreator: '@ShouChen_',
  twitterImage: siteUrl + curPost.meta.cover
})

onMounted(() => {
  setTimeout(() => {
    if (curPost.meta.cover) {
      sysSetting.setBgUrl(curPost.meta.cover as string)
    }
  }, 2e3)
  postStore.category = ''
})

onUnmounted(() => {
  sysSetting.setBgUrl('/bg.webp')
  sysSetting.bgBlur = false
})
</script>

<template>
  <div :key="curPost?.path">
    <main
      class="frosted-glass-heavy rounded-3xl overflow-hidden glass-high-light p-2"
      style="--glass-border-radius: 1.5rem; --glass-highlight-angle: -100deg"
    >
      <!-- 标题和封面 -->
      <div v-if="curPost?.meta.cover" class="relative aspect-[3/2] rounded-2xl overflow-hidden">
        <img
          :src="curPost.meta.cover + ''"
          :alt="curPost.title"
          class="size-full object-cover object-center"
        />
        <div
          class="absolute left-0 bottom-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
        >
          <h1 class="text-3xl font-bold tracking-wide break-words">{{ curPost.title }}</h1>
        </div>
      </div>
      <h1 v-else class="text-3xl font-bold tracking-wide break-words text-center mt-8">
        {{ curPost!.title }}
      </h1>
      <!-- 关键词、分类、创建时间 -->
      <div
        class="flex flex-row items-center flex-wrap mt-6 px-2 text-neutral-300 border-b-2 border-neutral-200/10 pb-3"
      >
        <Icon name="solar:hashtag-bold-duotone" class="mr-1" />
        <p class="min-w-0 break-words truncate mr-3">
          {{ (curPost!.meta.keywords as string[]).join(' / ') }}
        </p>
        <Icon name="solar:folder-with-files-line-duotone" class="mr-1" />
        <p class="whitespace-nowrap flex-1">{{ CategoryMap[curPost.meta?.category] }}</p>
        <div class="flex flex-row items-center">
          <Icon name="solar:clock-circle-linear" class="size-4" />
          <p class="text-sm ml-1">
            {{ formatDate(new Date(curPost.meta?.updateAt), 'YYYY-MM-DD HH:mm') }}
          </p>
        </div>
      </div>
      <!-- 文章内容 -->
      <!-- prose-code:bg-sky-900 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:mx-1 prose-code:pt-[2px] -->
      <ContentRenderer
        :value="curPost"
        tag="article"
        class="prose dark:prose-invert prose-neutral prose-a:no-underline prose-img:rounded-lg prose-code:text-neutral-200 [&_a]:text-sky-500 [&_a:hover]:text-pink-500 [&_a:hover]:underline prose-blockquote:text-neutral-400 break-words p-2 md:p-6 mt-2 max-w-none"
      />
    </main>

    <!-- 上下页导航 -->
    <div
      class="flex flex-col md:flex-row items-stretch gap-3 break-words [&>a]:flex-1 [&>a]:min-w-0 [&>a]:p-4 [&>a]:rounded-3xl [&>a]:overflow-hidden hover:[&>a]:cursor-pointer hover:[&>a]:brightness-110 hover:[&>a]:transition-all mt-4"
    >
      <NuxtLink
        class="frosted-glass"
        v-if="postStore.privPost"
        :to="'/post' + postStore.privPost.path"
      >
        <p class="font-bold text-2xl tracking-wider text-neutral-500">PRIV</p>
        <p>{{ postStore.privPost.title }}</p>
      </NuxtLink>
      <NuxtLink
        class="frosted-glass"
        v-if="postStore.nextPost"
        :to="'/post' + postStore.nextPost.path"
      >
        <p class="font-bold text-2xl tracking-wider text-neutral-500">NEXT</p>
        <p>{{ postStore.nextPost.title }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
