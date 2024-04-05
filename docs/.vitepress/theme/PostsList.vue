<script setup>
import { data as postList } from './posts.data.mjs'
import PostItem from './PostItem.vue'

postList.sort((a, b) => {
  const aT = a.frontmatter?.updateTime || ''
  const bT = b.frontmatter?.updateTime || ''
  if (aT === bT) {
    return 0
  }
  return aT > bT ? -1 : 1
})
</script>

<template>
  <div :class="$style['posts-list']">
    <PostItem v-for="(doc, idx) in postList" :key="idx" :doc="doc" />
  </div>
</template>

<style module>
.posts-list {
  position: relative;
}

/* @media screen and (max-width: 768px) {
  .doc-list {
    column-count: 1;
    column-gap: 0;
  }
} */
</style>
