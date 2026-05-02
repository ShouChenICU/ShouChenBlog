<script setup lang="ts">
const postStore = usePostStore()
const router = useRouter()

type TagStat = {
  label: string
  count: number
}

const tagStats = computed<TagStat[]>(() => {
  const tagCounter = new Map<string, number>()

  for (const post of postStore.allPosts as any[]) {
    const keywords = Array.isArray(post.meta?.keywords) ? post.meta.keywords : []

    for (const keyword of keywords) {
      const label = `${keyword}`.trim()
      if (!label) continue

      tagCounter.set(label, (tagCounter.get(label) ?? 0) + 1)
    }
  }

  return [...tagCounter.entries()]
    .map(([label, count]) => ({ label, count }))
    .filter((tag) => tag.count >= 2)
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
})

function searchByTag(tag: string) {
  postStore.search = postStore.search === tag ? '' : tag
  postStore.loadPosts(1, router)
}
</script>

<template>
  <div
    class="relative p-4 rounded-3xl frosted-glass glass-high-light mt-4"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: 0deg"
  >
    <div
      class="relative flex flex-row items-center justify-between pl-3 before:absolute before:left-0 before:top-[20%] before:h-[60%] before:w-1 before:rounded before:bg-neutral-300"
    >
      <p class="text-neutral-100 text-lg font-bold">标签</p>
      <Icon name="solar:tag-horizontal-line-duotone" class="size-5 mr-1" />
    </div>
    <div class="flex flex-wrap gap-2 mt-3">
      <button
        v-for="tag in tagStats"
        :key="tag.label"
        class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-neutral-100 backdrop-blur-sm transition-all ease-out hover:bg-white/10 hover:-translate-y-0.5"
        :class="{
          '!bg-neutral-100 !text-neutral-950 border-neutral-100': postStore.search === tag.label
        }"
        @click="searchByTag(tag.label)"
      >
        <span>{{ tag.label }}</span>
        <span
          class="ml-2 text-xs"
          :class="postStore.search === tag.label ? 'text-neutral-700' : 'text-neutral-400'"
          >{{ tag.count }}</span
        >
      </button>
    </div>
  </div>
</template>
