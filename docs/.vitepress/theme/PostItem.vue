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
  <div :class="$style['post-item']">
    <div :class="$style['cover']">
      <img :src="doc.frontmatter?.cover" :alt="doc.frontmatter?.title" />
    </div>
    <a :class="$style['title']" :href="doc.url">
      <span>{{ doc.frontmatter?.title }}</span>
    </a>
    <div :class="$style['description']">
      <span>
        {{ doc.frontmatter?.description }}
      </span>
    </div>
    <div :class="$style['post-info']">
      <TagIcon />
      <span style="margin-left: 2px">{{ doc.frontmatter?.tags }}</span>
      <div style="flex-grow: 1"></div>
      <ClockIcon style="font-size: 1.1em" />
      <span style="margin-left: 2px">{{ updateTimeAgo }}</span>
    </div>
  </div>
</template>

<style module>
.post-item {
  display: grid;
  grid-template-areas:
    'a b'
    'a c'
    'a d';
  grid-template-columns: 24% 74%;
  grid-template-rows: max-content;
  grid-auto-rows: 1fr;
  column-gap: 2%;
  margin: 0.75rem 1.5rem;
  padding: 1rem 0 1.75rem 0;
  border-bottom: 1px var(--color-divider-soft) solid;
  overflow: hidden;
  z-index: 10;
}

.post-item .cover {
  grid-area: a;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.post-item .cover img {
  aspect-ratio: 3/2;
  object-fit: cover;
  object-position: center;
  will-change: scale;
  transform: translateZ(0);
  transition: scale 0.6s cubic-bezier(0.4, 0, 0.6, 1);
}

.post-item .cover:hover img {
  scale: 116%;
}

.post-item .title {
  text-decoration: none;
  grid-area: b;
  cursor: pointer;
  padding: 0.5rem 0;
  background: linear-gradient(135deg, hsla(203, 67%, 69%, 0.8), hsla(203, 67%, 49%, 0.8)) no-repeat;
  background-size: 0 2px;
  background-position: bottom right;
  will-change: background-size, background-position;
  transition: background-size 0.5s ease;
}

.post-item .title span {
  font-weight: bold;
  font-size: 1.1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-item .title:hover {
  background-size: 100% 2px;
  background-position: bottom left;
}

.post-item .description {
  /* width: 100%; */
  grid-area: c;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9em;
}

.post-item .description span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-item .post-info {
  grid-area: d;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.85em;
  opacity: 0.8;
}

@media screen and (max-width: 768px) {
  .post-item {
    display: block;
    margin: 0.5rem;
    padding: 1rem 0 1.5rem 0;
    box-sizing: content-box;
  }

  .post-item .title {
    display: block;
    margin-top: 1rem;
  }

  .post-item .description {
    padding-bottom: 0.5rem;
  }
}
</style>
