<script setup>
import PostsList from './PostsList.vue'
</script>

<template>
  <div :class="$style['archived-container']">
    <PostsList :filter="(doc) => doc.frontmatter.isArchived" />
  </div>
</template>

<style module>
.archived-container {
  padding: 1rem;
  padding-right: 10vw;
}

@media screen and (max-width: 768px) {
  .archived-container {
    padding: 1rem;
  }
}
</style>
