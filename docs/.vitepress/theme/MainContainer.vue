<script setup>
import { useData } from 'vitepress'
import NavBar from './NavBar.vue'
import NotFound from './NotFound.vue'
import HomeContainer from './HomeContainer.vue'
import ArchivedContainer from './ArchivedContainer.vue'
import AboutContainer from './AboutContainer.vue'
import CategoryContainer from './CategoryContainer.vue'
import PostContainer from './PostContainer.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div>
    <NavBar />
    <NotFound v-if="page.isNotFound" />
    <HomeContainer v-else-if="frontmatter.layout === 'home'" />
    <ArchivedContainer v-else-if="frontmatter.layout === 'archived'" />
    <AboutContainer v-else-if="frontmatter.layout === 'about'" />
    <CategoryContainer v-else-if="frontmatter.layout === 'category'" />
    <PostContainer v-else />
  </div>
</template>
