<script setup>
import { copyObj } from './utils.js'
import { data } from './posts.data.mjs'
import PostsList from './PostsList.vue'

let postList = copyObj(data).filter((doc) => !doc.frontmatter?.draft)
</script>

<template>
  <div :class="$style['home-container']">
    <div :class="$style['post-count']">
      <span>{{ postList.length }} Posts</span>
    </div>
    <!-- todo tag list -->
    <PostsList :posts="postList" />
  </div>
</template>

<style module>
.home-container {
  padding: 1rem;
  padding-right: 10vw;
  margin-bottom: 4rem;
}

.post-count {
  text-align: end;
  font-size: 0.9em;
}

.post-count > span {
  padding: 6px 8px;
  border-radius: 6px;
  background-color: var(--color-background-mute);
}

@media screen and (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }
}
</style>
