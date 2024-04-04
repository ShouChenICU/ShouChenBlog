<script setup>
import { data as contentData } from '../../posts.data.mjs'
import PostItem from './PostItem.vue'
</script>

<template>
  <div :class="$style['posts-list']">
    <PostItem v-for="(doc, idx) in contentData" :key="idx" :doc="doc" />
  </div>
</template>

<style module>
.posts-list {
  position: relative;
  padding-right: 10vw;
}

/* @media screen and (max-width: 768px) {
  .doc-list {
    column-count: 1;
    column-gap: 0;
  }
} */
</style>
