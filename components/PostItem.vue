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
    class="rounded-2xl overflow-hidden frosted-glass flex flex-row items-stretch hover:brightness-110 hover:shadow-xl hover:shadow-black/50 active:scale-[98%] post-item-transition transform-gpu"
    v-load-animate
  >
    <div class="flex-1 min-w-0 px-4 py-3 flex flex-col items-stretch justify-between gap-2">
      <h2 class="text-2xl tracking-wider font-bold truncate text-neutral-50">
        {{ postInfo.title }}
      </h2>
      <div class="flex flex-row items-center text-sm text-neutral-200/90">
        <Icon name="solar:hashtag-bold-duotone" class="mr-1" />
        <p class="min-w-0 break-words truncate mr-3">
          {{ postInfo.keywords.join(' / ') }}
        </p>
        <Icon name="solar:folder-with-files-line-duotone" class="mr-1" />
        <p>{{ CategoryMap[postInfo.category] }}</p>
      </div>
      <p class="line-clamp-2 break-words text-base text-neutral-100">
        {{ postInfo.description }}
      </p>
      <div class="flex flex-row items-center text-neutral-200/70">
        <Icon name="solar:clock-circle-linear" class="size-4" />
        <p class="text-sm ml-1">
          {{ formatDate(new Date(postInfo.createAt), 'YYYY-MM-DD HH:mm') }}
        </p>
      </div>
    </div>
    <div
      v-if="postInfo.cover"
      class="relative w-[30%] shrink-0 aspect-[3/2] m-2 rounded-lg overflow-hidden"
    >
      <img
        :src="postInfo.cover"
        :alt="postInfo.title"
        class="size-full object-cover object-center"
      />
    </div>
    <div v-else class="px-4 flex flex-row items-center justify-center">
      <Icon name="solar:alt-arrow-right-outline" class="size-8" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.post-item-transition {
  transition:
    transform 0.2s cubic-bezier(0.35, 0, 0.35, 1),
    box-shadow 0.2s cubic-bezier(0.35, 0, 0.35, 1),
    filter 0.2s cubic-bezier(0.35, 0, 0.35, 1),
    translate 0.3s cubic-bezier(0.35, 0, 0.35, 1),
    opacity 0.3s cubic-bezier(0.35, 0, 0.35, 1);
  will-change: transform, box-shadow, filter, translate, opacity;
}
</style>
