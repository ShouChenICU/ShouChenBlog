<script setup lang="ts">
const navElm = ref<HTMLElement>()
const sysSetting = useSystemSetting()

onMounted(() => {
  sysSetting.navHeight = navElm.value?.clientHeight || 80
})
</script>

<template>
  <nav
    ref="navElm"
    class="sticky top-0 z-50 flex flex-row items-center py-4 px-4 rounded-b-3xl md:mx-[8vw] frosted-glass glass-high-light"
    style="--glass-border-radius: 0 0 1.5rem 1.5rem; --glass-highlight-angle: 90deg"
  >
    <NuxtLink
      to="/"
      class="text-neutral-100 text-lg font-bold text-shadow tracking-wider select-none"
    >
      ShouChen's Blog
    </NuxtLink>

    <div class="flex-1"></div>

    <div class="md:flex flex-row items-center gap-2 select-none hidden">
      <NuxtLink
        v-for="link in NavLinks"
        :to="link.path"
        class="flex flex-row items-center gap-2 rounded-lg px-2 py-1 border border-transparent active:scale-95 transition-all duration-150 ease-out"
        :class="{
          'bg-neutral-100 text-neutral-950 pointer-events-none': $route.path === link.path,
          'hover:border-neutral-400/90': $route.path !== link.path
        }"
      >
        <Icon :name="link.icon" />
        <span class="font-bold">{{ link.name }}</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped></style>
