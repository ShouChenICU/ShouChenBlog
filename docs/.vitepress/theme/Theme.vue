<script setup>
import { useData } from 'vitepress'
import NavBar from './NavBar.vue'
import NotFound from './NotFound.vue'
import HomeLayout from './HomeLayout.vue'
import DocLayout from './DocLayout.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <NavBar />
  <NotFound v-if="page.isNotFound" />
  <HomeLayout v-else-if="frontmatter.layout === 'home'" />
  <DocLayout v-else />
</template>
