<script setup>
import { copyObj, formatDateTime } from './utils.js'
import { data } from './posts.data.mjs'
import TagIcon from './icons/TagIcon.vue'

let postList = copyObj(data).filter((doc) => !doc.frontmatter?.draft)

postList.sort((a, b) => {
  const aT = a.frontmatter?.updateTime || ''
  const bT = b.frontmatter?.updateTime || ''
  if (aT === bT) {
    return 0
  }
  return aT > bT ? -1 : 1
})

let years = []
let postMap = {}

for (let p of postList) {
  if (p.frontmatter?.updateTime) {
    let d = new Date(p.frontmatter?.updateTime)
    let year = d.getFullYear()
    if (!postMap[year]) {
      years.push(year)
      postMap[year] = []
    }
    postMap[year].push(p)
  }
}
years.sort((a, b) => b - a)
</script>

<template>
  <div :class="$style['archived-container']">
    <div :class="$style['timeline']">
      <div :class="$style['timeline-year']" v-for="(year, idx) in years" :key="idx">
        <div>
          <span>{{ year }}</span>
          <div><div></div></div>
          <div>
            <span>{{ postMap[year].length }} Posts</span>
          </div>
        </div>
        <a
          :class="$style['timeline-item']"
          v-for="(post, idx2) in postMap[year]"
          :key="idx2"
          :href="post.url"
        >
          <span>{{ formatDateTime(new Date(post.frontmatter?.updateTime), 'MM-dd') }}</span>
          <div :class="$style['timeline-line-wrap']"><div></div></div>
          <div>{{ post.frontmatter.title }}</div>
          <div :class="$style['post-info']">
            <TagIcon />
            <span style="margin-left: 2px">{{ post.frontmatter?.tags }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style module>
.archived-container {
  padding: 1rem;
  padding-right: 10vw;
}

.timeline {
  position: relative;
  padding: 1rem;
}

.timeline-year {
  position: relative;
}

.timeline-year > :first-child {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1rem;
}

.timeline-year > :first-child > :nth-child(1) {
  font-size: 1.5em;
  text-align: end;
  width: 10%;
}

.timeline-line-wrap {
  position: relative;
  padding: 1.5rem 2rem;
  /* width: 10%; */
}

.timeline-year > :first-child > :nth-child(2) {
  position: relative;
  padding: 2rem;
  /* width: 10%; */
}

.timeline-year > :first-child > :nth-child(2) > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: var(--color-background-soft);
  border: 2px #58b2dc solid;
  outline: 2px var(--color-background-soft) solid;
  border-radius: 100px;
  z-index: 100;
}

.timeline-year > :first-child > :nth-child(3) {
  flex: 1 0 0;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-year > :first-child > :nth-child(3) > span {
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: var(--color-background-mute);
}

.timeline-item {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.5rem;
  padding-right: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.timeline-item:hover {
  background-color: #58b2dc50;
}

.timeline-item > :nth-child(1) {
  text-align: end;
  width: 10%;
  font-size: 0.9em;
  color: var(--color-text-quaternary);
  white-space: nowrap;
}

.timeline-item > :nth-child(2)::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -50%;
  height: 100%;
  width: 0;
  border-left: 2px var(--color-divider) dashed;
  transform: translateX(-50%);
}

.timeline-item > :nth-child(2) > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4px;
  height: 4px;
  background-color: currentColor;
  /* border: 2px #58b2dc solid; */
  outline: 2px var(--color-background-soft) solid;
  border-radius: 100px;
  z-index: 100;
  will-change: height, outline, background-color;
  transition:
    height 0.2s ease,
    outline 0.2s ease,
    background-color 0.2s ease;
}

.timeline-item:hover > :nth-child(2) > div {
  height: 16px;
  outline: none;
  background-color: #2ea9df;
}

.timeline-item > :nth-child(3) {
  font-weight: bold;
  flex: 1 0 0;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  will-change: padding-left;
  transition: padding-left 0.2s ease;
}

.timeline-item:hover > :nth-child(3) {
  padding-left: 0.25rem;
}

.post-info {
  grid-area: d;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.85em;
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 768px) {
  .archived-container {
    padding: 1rem;
  }

  .timeline {
    padding: 0;
  }

  .timeline-year > :first-child > :nth-child(1) {
    width: 15%;
  }

  .timeline-year > :first-child > :nth-child(2) {
    padding: 1.75rem 1.5rem;
    /* width: 8%; */
  }

  .timeline-line-wrap {
    position: relative;
    padding: 1.5rem;
    /* width: 8%; */
  }

  .timeline-item > :nth-child(1) {
    width: 15%;
  }

  .post-info {
    display: none;
  }
}
</style>
