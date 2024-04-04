<script setup>
import DarkSwitcher from './DarkSwitcher.vue'
</script>

<template>
  <nav :class="$style['nav-container']">
    <div>Home</div>
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
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.16);
  z-index: 1000;
}
</style>
