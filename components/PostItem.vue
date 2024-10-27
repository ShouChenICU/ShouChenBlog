<script setup lang="ts">
const porps = withDefaults(defineProps<{ postInfo: Post }>(), {
  postInfo: () => ({
    _path: '/',
    title: '',
    description: '',
    cover: '',
    keywords: [],
    category: '',
    createAt: '',
    draft: false
  })
})
</script>

<template>
  <NuxtLink
    :to="'/post' + postInfo._path"
    class="rounded-2xl overflow-hidden frosted-glass flex flex-row items-stretch"
  >
    <div class="flex-1 min-w-0 px-3 py-2 flex flex-col items-stretch justify-between gap-2">
      <h2 class="text-lg tracking-wider font-bold truncate text-neutral-50">
        {{ postInfo.title }}
      </h2>
      <p class="line-clamp-2 break-words text-sm text-neutral-100">{{ postInfo.description }}</p>
      <p class="text-xs text-neutral-200">{{ postInfo.createAt }}</p>
    </div>
    <div v-if="postInfo.cover" class="relative w-[25%] aspect-[3/2] m-2 rounded-lg overflow-hidden">
      <img src="/mosh.webp" class="size-full object-cover object-center" />
    </div>
  </NuxtLink>
</template>
