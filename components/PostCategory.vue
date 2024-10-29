<script setup lang="ts">
const currentCategory = useCategory()
const postsWithCategory = await queryContent()
  .only(['_path', 'category'])
  .where({ category: currentCategory.value })
  .find()

function calcCategoryPostCount(category: string) {
  return postsWithCategory.filter((post) => post.category === category).length
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
    <div class="mt-2">
      <button
        v-for="(value, key) in CategoryMap"
        :key="key"
        class="pl-1 pr-2 py-2 w-full text-start rounded-md flex flex-row items-center justify-between hover:bg-neutral-500/35 hover:pl-3 hover:brightness-110 transition-all ease-out"
        @click="currentCategory = key"
      >
        <span class="text-neutral-200">{{ value }}</span>
        <span class="text-neutral-400 text-sm">{{ calcCategoryPostCount(key) }}</span>
      </button>
    </div>
  </div>
</template>
