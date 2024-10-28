<script setup lang="ts">
const footerElm = ref<HTMLElement>()

onMounted(() => {
  useFooterHeight(footerElm.value?.clientHeight)
})
</script>

<template>
  <footer
    ref="footerElm"
    class="z-50 flex flex-row items-center py-4 px-4 rounded-t-3xl md:mx-[8vw] frosted-glass glass-high-light"
    style="--glass-border-radius: 1.5rem 1.5rem 0 0; --glass-highlight-angle: -90deg"
  >
    <p class="text-sm tracking-wide text-neutral-200/90">shouchen.blog</p>
    <div class="flex-1"></div>
    <p class="text-xs text-neutral-200/90">“学习，是为了探索这个世界的本质”</p>
    <div class="w-[1px] h-4 bg-neutral-400/60 mx-2"></div>
    <p class="text-xs text-neutral-200/90">背景图来自@Yayoi_no_yume</p>
  </footer>
</template>
