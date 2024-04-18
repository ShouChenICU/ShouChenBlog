<script setup>
import { useData } from 'vitepress'
import { curPostUrl } from './public.mjs'
import NavBar from './NavBar.vue'
import NotFound from './NotFound.vue'
import HomeContainer from './HomeContainer.vue'
import ArchivedContainer from './ArchivedContainer.vue'
import FriendlyLinkContainer from './FriendlyLinkContainer.vue'
import AboutContainer from './AboutContainer.vue'
import CategoryContainer from './CategoryContainer.vue'
import PostContainer from './PostContainer.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div>
    <NavBar />
    <TransitionGroup>
      <NotFound v-if="page.isNotFound" key="404" />
      <HomeContainer v-else-if="frontmatter.layout === 'home'" key="home" />
      <ArchivedContainer v-else-if="frontmatter.layout === 'archived'" key="archived" />
      <FriendlyLinkContainer v-else-if="frontmatter.layout === 'friendlyLink'" key="friendlyLink" />
      <AboutContainer v-else-if="frontmatter.layout === 'about'" key="about" />
      <CategoryContainer v-else-if="frontmatter.layout === 'category'" key="category" />
      <PostContainer v-else :key="frontmatter.title" />
    </TransitionGroup>
  </div>
</template>

<style>
.v-leave-active,
.v-enter-active {
  transition:
    translate 0.3s cubic-bezier(0, 0.8, 0.55, 1),
    opacity 0.3s cubic-bezier(0, 0.8, 0.55, 1);
  /* transition:
    translate 0.39s ease-in-out,
    opacity 0.39s ease-in-out; */
}

.v-enter-active {
  transition-delay: 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  translate: 0 2rem;
}
</style>
