<script setup lang="ts">
const curPage = defineModel<number>('page')
const props = defineProps<{ total: number; size: number }>()

const pages = [1, 2]

defineEmits<{
  update: [number]
}>()
</script>

<template>
  <div class="flex flex-row justify-center items-center my-4 gap-3">
    <a
      v-for="p in pages"
      :key="p"
      class="frosted-glass page-btn"
      :class="{ 'pointer-events-none': p === curPage }"
      @click="$emit('update', p)"
    >
      {{ p }}
    </a>
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
