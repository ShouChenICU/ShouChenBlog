<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: 'post'
})

const navHeight = useNavHeight()
const route = useRoute()
const docPath = route.path.replace('/post', '') || '/'

const { data } = await useAsyncData<Post>(
  () => queryContent(docPath).findOne() as unknown as Promise<Post>
)
// console.log(data)

onMounted(() => {
  if (data.value?.cover) {
    useBgUrl(data.value.cover)
  }
  useBgBlur(true)
})

onUnmounted(() => {
  useBgUrl('/bg.webp')
  useBgBlur(false)
})
</script>

<template>
  <main
    class="frosted-glass-heavy rounded-3xl overflow-hidden glass-high-light p-2"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: -90deg"
  >
    <div v-if="data?.cover" class="relative aspect-[3/2] rounded-2xl overflow-hidden">
      <img :src="data.cover" :alt="data.title" class="size-full object-cover object-center" />
      <div
        class="absolute left-0 bottom-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
      >
        <h1 class="text-3xl font-bold tracking-wide break-words">{{ data.title }}</h1>
      </div>
    </div>
    <h1 v-else class="text-3xl font-bold tracking-wide break-words text-center my-4">
      {{ data?.title }}
    </h1>
    <ContentRenderer
      :value="data || undefined"
      tag="article"
      class="prose dark:prose-invert prose-neutral prose-a:no-underline prose-img:rounded-lg p-4 mt-4 max-w-none"
    />
  </main>
</template>

<style>
html {
  scroll-margin-top: 3rem;
}
</style>
