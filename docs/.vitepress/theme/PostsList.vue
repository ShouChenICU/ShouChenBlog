<script setup>
import { copyObj } from '../../utils.js'
import { data } from './posts.data.mjs'
import PostItem from './PostItem.vue'

let postList = copyObj(data)
const { filter } = defineProps(['filter'])

postList = postList.filter((doc) => !doc.frontmatter?.isHide)

if (filter) {
  postList = postList.filter(filter)
}

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
