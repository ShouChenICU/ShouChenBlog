<script setup lang="ts">
const curPage = defineModel<number>('page', { default: 1 })
const props = defineProps<{ total: number; size: number }>()
const emit = defineEmits<{
  update: [number]
}>()

const isDesktop = useMediaQuery('(min-width: 768px)')

const lastPage = computed(() => {
  const pageSize = Math.max(props.size, 1)
  return Math.max(1, Math.ceil(props.total / pageSize))
})

const currentPage = computed(() => clampPage(curPage.value))

const visiblePageCount = computed(() => (isDesktop.value ? 7 : 5))

function clampPage(page: number) {
  return Math.min(Math.max(page, 1), lastPage.value)
}

function buildRange(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index)
}

const pages = computed(() => {
  if (lastPage.value <= visiblePageCount.value) {
    return buildRange(1, lastPage.value)
  }

  const middlePageCount = visiblePageCount.value - 2
  const maxStart = lastPage.value - middlePageCount
  const start = Math.min(Math.max(currentPage.value - Math.floor(middlePageCount / 2), 2), maxStart)
  const end = start + middlePageCount - 1

  return [1, ...buildRange(start, end), lastPage.value]
})

function goToPage(page: number) {
  const targetPage = clampPage(page)
  if (targetPage === currentPage.value) return
  emit('update', targetPage)
}
</script>

<template>
  <div class="flex flex-row justify-center items-stretch my-4 gap-3">
    <button
      class="frosted-glass page-btn text-sm md:text-base"
      :class="{
        'cursor-default opacity-50 hover:brightness-100 active:scale-100': currentPage === 1
      }"
      :disabled="currentPage === 1"
      :aria-label="`Go to previous page`"
      @click="goToPage(currentPage - 1)"
    >
      <Icon name="ph:caret-left-bold" class="size-4 block" />
    </button>
    <button
      v-for="p in pages"
      :key="p"
      class="frosted-glass page-btn text-sm md:text-base"
      :class="{
        'cursor-default !bg-neutral-100 text-neutral-950 hover:brightness-100 active:scale-100':
          p === currentPage
      }"
      :disabled="p === currentPage"
      :aria-current="p === currentPage ? 'page' : undefined"
      :aria-label="`Go to page ${p}`"
      @click="goToPage(p)"
    >
      {{ p }}
    </button>
    <button
      class="frosted-glass page-btn text-sm md:text-base"
      :class="{
        'cursor-default opacity-50 hover:brightness-100 active:scale-100': currentPage === lastPage
      }"
      :disabled="currentPage === lastPage"
      :aria-label="`Go to next page`"
      @click="goToPage(currentPage + 1)"
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
  will-change: filter, transform;
}
</style>
