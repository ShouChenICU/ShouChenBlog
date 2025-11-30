<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content'

const porps = defineProps<{ postInfo: ContentCollectionItem }>()
</script>

<template>
  <NuxtLink
    :to="'/post' + postInfo.path"
    class="rounded-2xl overflow-hidden frosted-glass flex flex-row items-stretch hover:brightness-110 hover:shadow-xl hover:shadow-black/50 active:scale-[98%] post-item-transition transform-gpu"
  >
    <div
      class="flex-1 min-w-0 px-2 py-2 md:px-4 md:py-3 flex flex-col items-stretch justify-between gap-2"
    >
      <div class="md:hidden">
        <div v-if="postInfo.meta.cover" class="relative aspect-[3/2] rounded-lg overflow-hidden">
          <img
            :src="postInfo.meta.cover + ''"
            :alt="postInfo.title"
            class="size-full object-cover object-center"
          />
          <h2
            class="absolute left-0 bottom-0 right-0 px-2 py-4 text-xl font-bold break-all bg-gradient-to-t from-black to-transparent"
          >
            {{ postInfo.title }}
          </h2>
        </div>
        <h2 v-else class="text-xl tracking-wider font-bold break-all text-neutral-50">
          {{ postInfo.title }}
        </h2>
      </div>
      <!-- 桌面端标题 -->
      <h2 class="hidden md:block text-2xl tracking-wider font-bold truncate text-neutral-50">
        {{ postInfo.title }}
      </h2>
      <!-- 关键字和分类 -->
      <div class="flex flex-row items-center text-sm text-neutral-200/90 px-1 md:px-0">
        <Icon name="solar:hashtag-bold-duotone" class="mr-1" />
        <p class="min-w-0 break-words truncate mr-3">
          {{ ((postInfo.meta.keywords as string[]) || []).join(' / ') }}
        </p>
        <Icon name="solar:folder-with-files-line-duotone" class="mr-1" />
        <p class="whitespace-nowrap">{{ CategoryMap[postInfo.meta.category] }}</p>
      </div>
      <!-- 文章简介 -->
      <p class="line-clamp-2 break-words text-sm md:text-base text-neutral-100 px-1 md:px-0">
        {{ postInfo.description }}
      </p>
      <!-- 日期 -->
      <div class="flex flex-row items-center text-neutral-200/70">
        <Icon name="solar:clock-circle-linear" class="size-4" />
        <p class="text-sm ml-1">
          {{ formatDate(new Date(postInfo.meta.updateAt + ''), 'YYYY-MM-DD HH:mm') }}
        </p>
      </div>
    </div>
    <div
      v-if="postInfo.meta.cover"
      class="relative hidden md:block w-[30%] shrink-0 aspect-[3/2] m-2 rounded-lg overflow-hidden"
    >
      <img
        :src="postInfo.meta.cover + ''"
        :alt="postInfo.title"
        class="size-full object-cover object-center"
      />
    </div>
    <div v-else class="px-4 hidden md:flex flex-row items-center justify-center">
      <Icon name="solar:alt-arrow-right-outline" class="size-12" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.post-item-transition {
  transition:
    transform 0.2s cubic-bezier(0.2, 0, 0.2, 1),
    box-shadow 0.2s cubic-bezier(0.2, 0, 0.2, 1),
    filter 0.2s cubic-bezier(0.2, 0, 0.2, 1),
    translate 0.3s cubic-bezier(0.35, 0, 0.35, 1),
    opacity 0.3s cubic-bezier(0.35, 0, 0.35, 1);
  will-change: transform, box-shadow, filter, translate, opacity;
}
</style>
