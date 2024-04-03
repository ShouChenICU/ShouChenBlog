<script setup>
import { data as contentData } from '../../posts.data.mjs'
import PostItem from './PostItem.vue'
</script>

<template>
  <div :class="$style['posts-box']">
    <!-- <div :class="$style['doc-list']"> -->
      <PostItem v-for="(doc, idx) in contentData" :key="idx" :doc="doc" />
    <!-- </div> -->
  </div>
</template>

<style module>
.posts-box {
  position: relative;
  /* top: 50vh; */
  /* padding: 1rem; */
  width: 100%;
  /* margin: auto; */
}

.doc-list {
  width: 70%;
  margin: 0 auto;
  /* column-count: 4; */
  /* column-gap: 1rem; */
}

/* @media screen and (max-width: 768px) {
  .doc-list {
    column-count: 1;
    column-gap: 0;
  }
} */
</style>
