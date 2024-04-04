<script setup>
import { useData } from 'vitepress'
import NavBar from './NavBar.vue'
import NotFound from './NotFound.vue'
import HomeContainer from './HomeContainer.vue'
import PostContainer from './PostContainer.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div>
    <NavBar />
    <NotFound v-if="page.isNotFound" />
    <HomeContainer v-else-if="frontmatter.layout === 'home'" />
    <PostContainer v-else />
  </div>
</template>
