<script setup>
import { data as contentData } from '../../posts.data.mjs'
import PostCard from './PostCard.vue'
</script>

<template>
  <div :class="$style['posts-box']">
    <div :class="$style['doc-list']">
      <PostCard v-for="(doc, idx) in contentData" :key="idx" :doc="doc" />
    </div>
  </div>
</template>

<style module>
.posts-box {
  position: relative;
  min-width: 0;
  padding: 1rem;
}

.doc-list {
  column-count: 3;
  column-gap: 1rem;
}

@media screen and (max-width: 768px) {
  .doc-list {
    column-count: 1;
    column-gap: 0;
  }
}
</style>
