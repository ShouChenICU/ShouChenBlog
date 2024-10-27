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
    Footer
  </footer>
</template>
