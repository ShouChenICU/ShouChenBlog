<script setup>
import { isOpenAside, navElm } from './public.mjs'
import DarkSwitcher from './DarkSwitcher.vue'
import MenuLeftIcon from './icons/MenuLeftIcon.vue'
</script>

<template>
  <nav :class="$style['nav-container']" ref="navElm">
    <div :class="$style['aside-open-btn']" @click="isOpenAside = true">
      <MenuLeftIcon />
    </div>
    <div>{{ $frontmatter.title }}</div>
    <div style="flex-grow: 1"></div>
    <DarkSwitcher />
  </nav>
</template>

<style module>
.nav-container {
  background-color: var(--color-bg-navbar);
  backdrop-filter: blur(16px);
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.16);
  z-index: 1000;
}

.aside-open-btn {
  display: none;
  margin-right: 0.75rem;
  font-size: 1.1em;
  border: 1px var(--color-divider) solid;
  padding: 0.5rem;
  border-radius: 4px;
}

@media screen and (max-width: 768px) {
  .nav-container {
    padding: 0.75rem;
  }

  .aside-open-btn {
    display: block;
  }
}
</style>
