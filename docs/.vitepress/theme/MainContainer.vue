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

let sY = 0

function onBeforeEnter() {
  // document.body.style.overflowY = 'scroll'
}

function onAfterLeave() {
  // document.body.style.overflowY = 'hidden'
}
</script>

<template>
  <div>
    <NavBar />
    <TransitionGroup name="inout" @before-enter="onBeforeEnter" @after-leave="onAfterLeave">
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
