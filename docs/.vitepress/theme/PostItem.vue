<script setup>
import { onMounted, ref } from 'vue'
import { timeAgo } from '/utils.js'
import TagIcon from './icons/TagIcon.vue'
import ClockIcon from './icons/ClockIcon.vue'

const { doc } = defineProps(['doc'])

const updateTimeAgo = ref('')

onMounted(() => {
  updateTimeAgo.value = timeAgo(doc.frontmatter.updateTime)
})
</script>

<template>
  <!-- :style="{ backgroundImage: 'url(' + doc.frontmatter?.cover + ')' }" -->
  <div :class="$style['post-item-wrapper']">
    <a :class="$style['post-item']">
      <img :class="$style['cover']" :src="doc.frontmatter?.cover" />
      <div :class="$style['title']">{{ doc.frontmatter?.title }}</div>
      <div :class="$style['description']">{{ doc.frontmatter?.description }}</div>
    </a>
  </div>
</template>

<style module>
.post-item-wrapper {
  position: relative;
  width: 100%;
  /* padding: 1rem 0; */
  /* background: url('/imgs/banner.webp'); */
  /* background-position: center; */
  /* background-size: cover; */
  /* background-attachment: fixed; */
}

/* .post-item-wrapper::before {
  content: '';
  position: absolute;
  left: 15%;
  width: 70%;
  height: 100%;
  backdrop-filter: blur(12px);
  z-index: 1;
} */

.post-item {
  display: grid;
  grid-template-areas:
    'a b'
    'a c';
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  grid-auto-rows: 1fr;
  column-gap: 1rem;
  text-decoration: none;
  width: 70%;
  margin: 1rem auto;
  /* padding: 1rem; */
  /* backdrop-filter: blur(12px); */
  /* background-color: var(--color-bg-content); */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  z-index: 10;
}

.post-item .cover {
  grid-area: a;
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  /* border-radius: 0.5rem 0 0 0.5rem; */
}

.post-item .title {
  grid-area: b;
}

.post-item .description {
  grid-area: c;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.9em;
}

@media screen and (max-width: 768px) {
  .doc-list {
    column-count: 1;
    column-gap: 0;
  }
}
</style>
