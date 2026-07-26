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
    <div :class="$style['timeline-year']" v-for="year in years" :key="year">
      <div :class="$style['timeline-header']">
        <span :class="$style['timeline-year-label']">{{ year }}</span>
        <div :class="$style['timeline-year-marker']"><div></div></div>
        <div :class="$style['timeline-year-count']">
          <span>{{ postMap[year].length }} Posts</span>
        </div>
      </div>
      <NuxtLink
        :class="$style['timeline-item']"
        v-for="post in postMap[year]"
        :key="post.path"
        :href="'/post' + post.path"
      >
        <span :class="$style['timeline-date']">{{
          formatDate(new Date(post.meta.updateAt || ''), 'MM-DD')
        }}</span>
        <div :class="$style['timeline-line-wrap']"><div></div></div>
        <div :class="$style['timeline-title']">{{ post.title }}</div>
        <div :class="$style['post-info']" :title="(post.meta.keywords || []).join(' / ')">
          <Icon name="solar:hashtag-bold-duotone" :class="$style['post-info-icon']" />
          <span :class="$style['post-info-text']">{{
            (post.meta.keywords || []).join(' / ')
          }}</span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style module>
.timeline-year {
  --timeline-date-column: clamp(4.5rem, 10%, 7rem);
  --timeline-line-column: 4rem;
  position: relative;
}

.timeline-header,
.timeline-item {
  display: grid;
  grid-template-columns:
    var(--timeline-date-column)
    var(--timeline-line-column)
    minmax(0, 1fr)
    minmax(0, 34%);
  align-items: center;
  min-width: 0;
}

.timeline-header {
  padding-right: 1rem;
}

.timeline-year-label {
  font-size: 1.5em;
  text-align: end;
}

.timeline-line-wrap {
  position: relative;
  align-self: stretch;
  min-width: 0;
}

.timeline-year-marker {
  position: relative;
  height: 4rem;
}

.timeline-year-marker > div {
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

.timeline-year-count {
  grid-column: 3 / -1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.timeline-year-count > span {
  font-size: 0.8em;
  padding: 4px 8px;
  border-radius: 6px;
  background-color: var(--color-background-mute);
}

.timeline-item {
  position: relative;
  min-height: 3rem;
  border-radius: 0.5rem;
  padding-right: 1rem;
  cursor: pointer;
  transition:
    background-color 0.25s cubic-bezier(0.215, 0.61, 0.355, 1),
    box-shadow 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.timeline-item:hover,
.timeline-item:focus-visible {
  background: linear-gradient(220.55deg, #7cf7ff80 0%, #4b73ff80 100%);
}

.timeline-item:focus-visible {
  outline: none;
  box-shadow: inset 0 0 0 2px rgb(88 178 220 / 70%);
}

.timeline-date {
  text-align: end;
  font-size: 0.9em;
  color: white;
  white-space: nowrap;
}

.timeline-line-wrap::before {
  content: '';
  position: absolute;
  left: 50%;
  top: -50%;
  height: 100%;
  width: 0;
  border-left: 2px #555555 dashed;
  transform: translateX(-50%);
}

.timeline-line-wrap > div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background-color: #58b2dc;
  border-radius: 100px;
  z-index: 100;
  transition:
    height 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
    width 0.2s cubic-bezier(0.215, 0.61, 0.355, 1),
    filter 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.timeline-item:hover .timeline-line-wrap > div,
.timeline-item:focus-visible .timeline-line-wrap > div {
  width: 4px;
  height: 16px;
  outline: none;
  background-color: #58b2dc;
  filter: brightness(1.05);
}

.timeline-title {
  font-weight: bold;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.timeline-item:hover .timeline-title,
.timeline-item:focus-visible .timeline-title {
  transform: translateX(0.25rem);
}

.post-info {
  display: flex;
  align-items: center;
  min-width: 0;
  padding-left: 0.75rem;
  font-size: 0.85em;
  opacity: 0.8;
  white-space: nowrap;
}

.post-info-icon {
  flex: 0 0 auto;
  margin-right: 0.375rem;
}

.post-info-text {
  display: block;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media screen and (max-width: 768px) {
  .timeline-year {
    --timeline-date-column: clamp(3.5rem, 15%, 5rem);
    --timeline-line-column: 3rem;
  }

  .timeline-header,
  .timeline-item {
    grid-template-columns:
      var(--timeline-date-column)
      var(--timeline-line-column)
      minmax(0, 1fr);
  }

  .timeline-year-count {
    grid-column: 3;
  }

  .post-info {
    display: none;
  }
}
</style>
