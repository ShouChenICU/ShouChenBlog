<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
const siteUrl = useSiteConfig().url
useSeoMeta({
  title: '归档',
  ogImage: siteUrl + '/ogImg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: '归档',
  twitterDescription: '归档',
  twitterImage: siteUrl + '/ogImg.webp',
  twitterSite: 'https://shouchen.blog',
  twitterCreator: 'ShouChen_'
})

const sysSetting = useSystemSetting()
const postStore = usePostStore()

// postStore.allPosts.sort((a, b) => {
//   const aT = a.meta.updateAt || ''
//   const bT = b.meta.updateAt || ''
//   if (aT === bT) {
//     return 0
//   }
//   return aT > bT ? -1 : 1
// })

let years: number[] = []
let postMap: any = {}

for (let p of postStore.allPosts) {
  if (p.meta.updateAt) {
    let d = new Date(p.meta.updateAt + '')
    let year = d.getFullYear()
    if (!postMap[year]) {
      years.push(year)
      postMap[year] = []
    }
    postMap[year].push(p)
  }
}
years.sort((a, b) => b - a)

onMounted(() => {
  sysSetting.bgUrl = '/bg.webp'
})
</script>

<template>
  <div
    class="relative p-4 rounded-3xl frosted-glass-heavy glass-high-light"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: -90deg"
  >
    <div :class="$style['timeline-year']" v-for="(year, idx) in years" :key="idx">
      <div>
        <span>{{ year }}</span>
        <div><div></div></div>
        <div>
          <span>{{ postMap[year].length }} Posts</span>
        </div>
      </div>
      <NuxtLink
        :class="$style['timeline-item']"
        v-for="(post, idx2) in postMap[year]"
        :key="idx2"
        :href="'/post' + post.path"
      >
        <span>{{ formatDate(new Date(post.meta.updateAt || ''), 'MM-DD') }}</span>
        <div :class="$style['timeline-line-wrap']"><div></div></div>
        <div>{{ post.title }}</div>
        <div :class="$style['post-info']">
          <Icon name="solar:hashtag-bold-duotone" class="mr-1" />
          <span style="margin-left: 2px">{{ (post.meta.keywords || []).join(' / ') }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style module>
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
  background-color: transparent;
  border: 2px #58b2dc solid;
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
  transition: background-color 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.timeline-item:hover {
  background: linear-gradient(220.55deg, #7cf7ff80 0%, #4b73ff80 100%);
  /* background: linear-gradient(220.55deg, #8a88fb99 0%, #d079ee99 100%); */
}

.timeline-item > :nth-child(1) {
  text-align: end;
  width: 10%;
  font-size: 0.9em;
  color: white;
  white-space: nowrap;
}

.timeline-item > :nth-child(2)::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -50%;
  height: 100%;
  width: 0;
  border-left: 2px #555555 dashed;
  transform: translateX(-50%);
}

.timeline-item > :nth-child(2) > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: #58b2dc;
  /* border: 2px #58b2dc solid; */
  /* outline: 2px #58b2dc solid; */
  border-radius: 100px;
  z-index: 100;
  will-change: height;
  transition:
    height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
    width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
    filter 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.timeline-item:hover > :nth-child(2) > div {
  width: 4px;
  height: 16px;
  outline: none;
  background-color: #58b2dc;
  filter: brightness(1.05);
}

.timeline-item > :nth-child(3) {
  font-weight: bold;
  flex: 1 0 0;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  will-change: padding-left;
  transition: padding-left 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
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
