<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: 'post'
})

const router = useRouter()
const docPath = router.currentRoute.value.path.replace('/post', '') || '/'

const data = (await queryContent(docPath).findOne()) as unknown as Post

// console.log(data)

onMounted(() => {
  if (data.cover) {
    useBgUrl(data.cover)
  }
  // useBgBlur(true)
})

onUnmounted(() => {
  useBgUrl('/bg.webp')
  useBgBlur(false)
})
</script>

<template>
  <main
    class="frosted-glass-heavy rounded-3xl overflow-hidden glass-high-light p-2"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: -100deg"
  >
    <!-- 标题和封面 -->
    <div v-if="data.cover" class="relative aspect-[3/2] rounded-2xl overflow-hidden">
      <img :src="data.cover" :alt="data.title" class="size-full object-cover object-center" />
      <div
        class="absolute left-0 bottom-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
      >
        <h1 class="text-3xl font-bold tracking-wide break-words">{{ data.title }}</h1>
      </div>
    </div>
    <h1 v-else class="text-3xl font-bold tracking-wide break-words text-center mt-8">
      {{ data.title }}
    </h1>
    <!-- 关键词、分类、创建时间 -->
    <div
      class="flex flex-row items-center flex-wrap mt-6 px-2 text-neutral-300 border-b-2 border-neutral-200/10 pb-3"
    >
      <Icon name="solar:hashtag-bold-duotone" class="mr-1" />
      <p class="min-w-0 break-words truncate mr-3">
        {{ data.keywords.join(' / ') }}
      </p>
      <Icon name="solar:folder-with-files-line-duotone" class="mr-1" />
      <p class="whitespace-nowrap flex-1">{{ CategoryMap[data.category] }}</p>
      <div class="flex flex-row items-center">
        <Icon name="solar:clock-circle-linear" class="size-4" />
        <p class="text-sm ml-1">
          {{ formatDate(new Date(data.updateAt), 'YYYY-MM-DD HH:mm') }}
        </p>
      </div>
    </div>
    <!-- 文章内容 -->
    <!-- prose-code:bg-sky-900 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:px-1 prose-code:mx-1 prose-code:pt-[2px] -->
    <ContentRenderer
      :value="data"
      tag="article"
      class="prose dark:prose-invert prose-neutral prose-a:no-underline prose-img:rounded-lg prose-code:text-neutral-200 [&_a]:text-sky-500 [&_a:hover]:text-pink-500 [&_a:hover]:underline break-all p-2 md:p-6 mt-2 max-w-none"
    />
  </main>
</template>
