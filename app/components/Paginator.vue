<script setup lang="ts">
const curPage = defineModel<number>('page', { default: 1 })
const props = defineProps<{ total: number; size: number }>()

const pages = computed(() => {
  if (props.total < 1) return [1]
  const lastPage = Math.ceil(props.total / props.size)
  const result = new Set<number>()
  // 添加第一页和最后一页
  result.add(1)
  result.add(lastPage)
  // 添加当前页及其前后页
  if (curPage.value > 1) result.add(curPage.value - 1)
  result.add(curPage.value)
  if (curPage.value < lastPage) result.add(curPage.value + 1)
  return [...result].sort((a, b) => a - b)
})

defineEmits<{
  update: [number]
}>()
</script>

<template>
  <div class="flex flex-row justify-center items-stretch my-4 gap-3">
    <button
      class="frosted-glass page-btn text-sm md:text-base"
      :class="{ 'pointer-events-none': curPage === 1 }"
      @click="$emit('update', curPage - 1)"
      :aria-label="`Go to page one`"
    >
      <Icon name="ph:caret-left-bold" class="size-4 block" />
    </button>
    <button
      v-for="p in pages"
      :key="p"
      class="frosted-glass page-btn text-sm md:text-base"
      :class="{ 'pointer-events-none !bg-neutral-100 text-neutral-950': p === curPage }"
      @click="$emit('update', p)"
      :aria-label="`Go to page ${p}`"
    >
      {{ p }}
    </button>
    <button
      class="frosted-glass page-btn text-sm md:text-base"
      :class="{ 'pointer-events-none': curPage === pages[pages.length - 1] }"
      @click="$emit('update', curPage + 1)"
      :aria-label="`Go to page ${pages[pages.length - 1]}`"
    >
      <Icon name="ph:caret-right-bold" class="size-4 block" />
    </button>
  </div>
</template>

<style scoped>
.page-btn {
  @apply py-3 px-4 rounded-lg overflow-hidden;
  @apply font-bold hover:brightness-125 active:scale-95 cursor-pointer;
  transition:
    filter 0.2s ease-out,
    transform 0.2s ease-out;
  will-change: filter transform;
}
</style>
