<script setup>
import { copyObj } from './utils.js'
import { data } from './posts.data.mjs'
import PostsList from './PostsList.vue'
import PaginationBar from './PaginationBar.vue'
import { onMounted, ref } from 'vue'

const curPage = ref(1)

const postList = copyObj(data).filter((doc) => !doc.frontmatter?.draft)

onMounted(() => {
  document.head.innerHTML += '<meta>'
})
</script>

<template>
  <div :class="$style['home-container']">
    <div :class="$style['post-count']">
      <span>{{ postList.length }} Posts</span>
    </div>
    <!-- todo tag list -->
    <Transition name="inout">
      <PostsList :posts="postList.slice((curPage - 1) * 10, curPage * 10)" :key="curPage" />
    </Transition>
    <div style="display: flex; flex-direction: row; justify-content: center">
      <PaginationBar :total-row="postList.length" v-model:curPage="curPage" :page-size="10" />
    </div>
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
