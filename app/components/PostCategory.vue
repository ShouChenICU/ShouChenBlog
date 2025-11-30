<script setup lang="ts">
const postStore = usePostStore()

function calcCategoryPostCount(category: string) {
  return (postStore.allPosts as any).filter((post: any) => post.meta.category === category).length
}

function navigateToCategory(category: string) {
  postStore.category = category
  postStore.loadPosts(1)
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
      <p class="text-neutral-100 text-lg font-bold">分类</p>
      <Icon name="solar:folder-with-files-line-duotone" class="size-5 mr-1" />
    </div>
    <div class="grid grid-cols-2 gap-2 mt-2">
      <button
        class="pl-1 pr-2 py-2 w-full text-start rounded-md flex flex-row items-center justify-between hover:bg-neutral-500/35 hover:pl-2 hover:brightness-110 transition-all ease-out"
        :class="{
          'bg-neutral-200 text-black pl-2 pointer-events-none': postStore.category === '',
          'text-neutral-200': postStore.category !== ''
        }"
        @click="navigateToCategory('')"
      >
        <span>全部</span>
        <span
          class="text-sm"
          :class="{
            'text-neutral-700': postStore.category === '',
            'text-neutral-400': postStore.category !== ''
          }"
          >{{ postStore.allPosts.length }}</span
        >
      </button>
      <button
        v-for="(value, key) in CategoryMap"
        :key="key"
        class="pl-1 pr-2 py-2 w-full text-start rounded-md flex flex-row items-center justify-between hover:bg-neutral-500/35 hover:pl-2 hover:brightness-110 transition-all ease-out"
        :class="{
          'bg-neutral-100 text-neutral-950 pl-2 pointer-events-none': postStore.category === key,
          'text-neutral-200': postStore.category !== key
        }"
        @click="navigateToCategory(key)"
      >
        <span>{{ value }}</span>
        <span
          class="text-sm"
          :class="{
            'text-neutral-700': postStore.category === key,
            'text-neutral-400': postStore.category !== key
          }"
          >{{ calcCategoryPostCount(key) }}</span
        >
      </button>
    </div>
  </div>
</template>
