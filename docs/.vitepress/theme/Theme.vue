<script setup>
import { useData } from 'vitepress'
import AsideContainer from './AsideContainer.vue'
import MainContainer from './MainContainer.vue'
import NotFound from './NotFound.vue'
import HomeLayout from './HomeLayout.vue'
import DocLayout from './DocLayout.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div :class="$style['main-container']">
    <AsideContainer />
    <MainContainer />
  </div>
  <!-- <NotFound v-if="page.isNotFound" />
  <HomeLayout v-else-if="frontmatter.layout === 'home'" />
  <DocLayout v-else /> -->
</template>

<style module>
.main-container {
  position: relative;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100%;
}
</style>
