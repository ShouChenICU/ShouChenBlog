<script setup>
import { useDark } from '@vueuse/core'
import { onMounted, ref } from 'vue'

const isDark = useDark()
const navElm = ref(null)

onMounted(() => {
  console.log(navElm.value?.clientHeight)
})
</script>

<template>
  <nav :class="$style['nav-bar']" ref="navElm">
    <img src="/favicon.webp" style="width: 2em; height: 2em" />
    <a :class="$style['main-logo']" href="/">ShouChen's Blog</a>
    <div style="flex-grow: 1"></div>
    <div>a</div>
  </nav>
</template>

<style module>
.nav-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg-navbar);
  backdrop-filter: blur(24px);
  z-index: 1000;
}

.main-logo {
  text-decoration: none;
  display: inline-block;
  /* margin: 0.125rem; */
  padding: 0.25rem 0.5rem;
  margin-left: 0.5em;
  /* font-size: 1.25em; */
  color: var(--color-heading);
  /* border-radius: 0.5rem; */
  /* border: 1px var(--color-border-logo) solid; */
  word-break: keep-all;
  white-space: nowrap;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .nav-bar {
    padding: 0.5rem;
  }
}
</style>
