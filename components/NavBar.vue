<script setup lang="ts">
const navElm = ref<HTMLElement>()

onMounted(() => {
  useNavHeight(navElm.value?.clientHeight)
})
</script>

<template>
  <nav
    ref="navElm"
    class="sticky top-0 z-50 flex flex-row items-center py-4 px-4 rounded-b-2xl mx-[10vw] frosted-glass glass-high-light"
    style="--glass-border-radius: 0 0 1rem 1rem; --glass-highlight-angle: 90deg"
  >
    <div class="flex flex-row items-center gap-2 select-none">
      <NuxtLink
        v-for="link in links"
        :to="link.path"
        class="flex flex-row items-center gap-2 rounded-lg px-2 py-1 border border-transparent"
        :class="{
          'bg-neutral-100 text-black/90 pointer-events-none': $route.path === link.path,
          'hover:border-neutral-400/90': $route.path !== link.path
        }"
      >
        <Icon :name="link.icon" />
        <span class="font-bold">{{ link.name }}</span>
      </NuxtLink>
    </div>

    <div class="flex-1"></div>

    <h1 class="text-white/90 text-xl font-bold text-shadow tracking-wider select-none">
      ShouChen's Blog
    </h1>
  </nav>
</template>

<style scoped></style>
