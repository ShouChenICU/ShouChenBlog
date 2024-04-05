<script setup>
import PostsList from './PostsList.vue'
</script>

<template>
  <div :class="$style['category-container']">
    <!-- <PostsList :filter="(doc) => $frontmatter.category === doc.frontmatter?.category" /> -->
    <PostsList
      v-if="$frontmatter?.category === 'tech'"
      :filter="(doc) => doc.frontmatter?.category === 'tech'"
    />
    <PostsList
      v-else-if="$frontmatter?.category === 'tutorial'"
      :filter="(doc) => doc.frontmatter?.category === 'tutorial'"
    />
    <PostsList
      v-else-if="$frontmatter?.category === 'daily'"
      :filter="(doc) => doc.frontmatter?.category === 'daily'"
    />
  </div>
</template>

<style module>
.category-container {
  padding: 1rem;
  padding-right: 10vw;
}

@media screen and (max-width: 768px) {
  .category-container {
    padding: 1rem;
  }
}
</style>
