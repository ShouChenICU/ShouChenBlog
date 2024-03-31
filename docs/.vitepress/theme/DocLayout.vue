<script setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { timeAgo } from '/utils.js'
import TagIcon from './icons/TagIcon.vue'
import ClockIcon from './icons/ClockIcon.vue'

const siteData = useData()
const updateTimeAgo = ref('')

onMounted(() => {
  updateTimeAgo.value = timeAgo(siteData.frontmatter.value.updateTime)
})
</script>

<template>
  <div :class="$style['doc-page']">
    <div v-show="$frontmatter.cover" :class="$style['doc-cover']">
      <img :src="$frontmatter.cover" />
    </div>
    <main :class="$style['doc-container']">
      <h1>{{ $frontmatter.title }}</h1>
      <div :class="$style['doc-info']">
        <TagIcon style="font-size: 1.1em; margin-right: 4px" />
        <span>{{ $frontmatter.tags }}</span>
        <div style="flex-grow: 1"></div>
        <ClockIcon style="font-size: 1.1em" />
        <span style="margin-left: 2px">{{ updateTimeAgo }}</span>
      </div>
      <Content class="vp-doc" />
    </main>
  </div>
</template>

<style module>
.doc-page {
  position: relative;
}

.doc-container {
  width: 70%;
  margin: auto;
  padding: 1rem;
}

.doc-container > h1 {
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  position: relative;
  font-weight: 600;
  outline: none;
  overflow-wrap: break-word;
  margin: 0;
  box-sizing: border-box;
}

.doc-cover {
  position: relative;
  text-align: center;
}

.doc-cover > img {
  display: inline-block;
  min-width: 70vw;
  max-width: 90vw;
  min-height: 50vh;
  max-height: 100vh;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 0 7px hsla(0, 0%, 0%, 0.6);
  border-radius: 0 0 0.5rem 0.5rem;
}

.doc-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9em;
  opacity: 0.8;
  /* border-top: 1px solid var(--vp-c-divider); */
}

@media screen and (max-width: 768px) {
  .doc-container {
    width: unset;
  }

  .doc-cover > img {
    width: 100vw;
    min-height: 30vh;
    max-height: 60vh;
  }
}
</style>
