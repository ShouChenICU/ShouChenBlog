<script setup>
import { curCate } from './public.mjs'
import { data } from './posts.data.mjs'
import PostsList from './PostsList.vue'
import { computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const postList = computed(() => data.filter((doc) => curCate.value === doc.frontmatter?.category))

onMounted(() => {
  curCate.value = frontmatter.value?.category
})
</script>

<template>
  <Transition name="inout">
    <div :class="$style['category-container']" :key="curCate">
      <PostsList :posts="postList" />
    </div>
  </Transition>
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
