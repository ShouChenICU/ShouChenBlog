<script setup lang="ts">
const footerElm = ref<HTMLElement>()
const sysSetting = useSystemSetting()

onMounted(() => {
  sysSetting.footerHeight = footerElm.value?.clientHeight || 80
})
</script>

<template>
  <footer
    ref="footerElm"
    class="z-50 flex md:flex-row flex-col items-stretch md:items-center gap-1 md:gap-0 py-4 px-4 rounded-t-3xl md:mx-[8vw] frosted-glass glass-high-light"
    style="--glass-border-radius: 1.5rem 1.5rem 0 0; --glass-highlight-angle: -90deg"
  >
    <p class="text-sm tracking-wide text-neutral-200/90">© 2025 ShouChen. All Rights Reserved.</p>
    <div class="flex-1"></div>
    <p class="text-xs text-neutral-200/90 text-right md:text-start">
      “学习，是为了探索这个世界的本质”<span class="text-neutral-400/80 mx-1">-</span
      >现代简明魔法学院
    </p>
    <div class="w-[1px] h-4 bg-neutral-400/60 mx-2 hidden md:block"></div>
    <p class="text-xs text-neutral-200/90 text-right md:text-start">背景图来自@Yayoi_no_yume</p>
  </footer>
</template>
