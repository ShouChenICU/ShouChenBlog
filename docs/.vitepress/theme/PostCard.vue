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
  <a :class="$style['post-card']" :href="doc.url" v-show="!doc.frontmatter?.isHide">
    <div v-if="doc.frontmatter?.cover" :class="$style['cover-wrapper']">
      <img :class="$style['cover']" :src="doc.frontmatter?.cover" />
      <div :class="$style['inner-title']">{{ doc.frontmatter?.title }}</div>
    </div>
    <div :class="$style['info']">
      <div v-if="!doc.frontmatter?.cover" :class="$style['title']">
        {{ doc.frontmatter?.title || doc.url }}
      </div>
      <div :class="$style['post-desc']">{{ doc.frontmatter?.description }}</div>
      <div :class="$style['post-info']">
        <TagIcon />
        <span style="margin-left: 2px">{{ doc.frontmatter?.tags }}</span>
        <div style="flex-grow: 1"></div>
        <ClockIcon style="font-size: 1.1em" />
        <span style="margin-left: 2px">{{ updateTimeAgo }}</span>
      </div>
    </div>
  </a>
</template>

<style module>
.post-card {
  min-width: 0;
  text-decoration: none;
  background-color: var(--color-bg-card);
  display: block;
  margin-bottom: 1rem;
  border-radius: 1rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.32),
    0 3px 6px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  -webkit-column-break-inside: avoid; /* 适用于Chrome, Safari, Opera */
  page-break-inside: avoid; /* 适用于Firefox */
  break-inside: avoid;
}

.post-card .cover-wrapper {
  position: relative;
  min-height: 3rem;
}

.post-card .cover-wrapper .cover {
  display: block;
}

.post-card .cover-wrapper .inner-title {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.9);
  padding: 0.25rem 0.5rem;
  background: linear-gradient(0, rgba(0, 0, 0, 0.6), transparent);
}

.post-card .title {
  /* font-size: 1.1em; */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  /* padding: 0.5rem; */
  padding-bottom: 0.25rem;
  margin-bottom: 2px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-card .post-desc {
  font-size: 0.9em;
  white-space: pre-wrap;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-card .post-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.85em;
  opacity: 0.8;
}

.post-card .info {
  padding: 0.5rem;
}

@media screen and (max-width: 768px) {
  .post-card {
    margin: 1rem;
  }
}
</style>
