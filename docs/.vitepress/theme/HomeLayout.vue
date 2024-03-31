<script setup>
import { useData } from 'vitepress'

const siteData = useData()
</script>

<template>
  <div :class="$style['home-page']">
    <div>1</div>
    <div>2</div>
  </div>
</template>

<style module>
.home-page {
}
</style>
