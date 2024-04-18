<script setup>
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { curPostUrl } from './public.mjs'
import { timeAgo, copyObj } from './utils.js'
import { data } from './posts.data.mjs'
// import VPDocAsideOutline from 'vitepress/dist/client/theme-default/components/VPDocAsideOutline.vue'
import DocOutline from './DocOutline.vue'
import TagIcon from './icons/TagIcon.vue'
import ClockIcon from './icons/ClockIcon.vue'

const { frontmatter, theme } = useData()
const cateText = ref('')
const cateColor = ref('')
const updateTimeAgo = ref('')
const priv = ref(null)
const next = ref(null)

// watch(curPostUrl, () => {
//   init()
// })

function init() {
  updateTimeAgo.value = timeAgo(frontmatter.value.updateTime)
  for (let cate of theme.value.categories) {
    if (frontmatter.value?.category === cate.id) {
      cateText.value = cate.text
      cateColor.value = cate.color
      break
    }
  }

  let postList = copyObj(data)
  postList = postList.filter((p) => !p.frontmatter?.draft)

  postList.sort((a, b) => {
    const aT = a.frontmatter?.updateTime || ''
    const bT = b.frontmatter?.updateTime || ''
    if (aT === bT) {
      return 0
    }
    return aT > bT ? -1 : 1
  })

  // console.log(postList)
  priv.value = null
  next.value = null
  for (let i = 0; i < postList.length; i++) {
    if (postList[i].url === decodeURI(location.pathname)) {
      if (i > 0) {
        priv.value = postList[i - 1]
      }
      if (i < postList.length - 1) {
        next.value = postList[i + 1]
      }
      break
    }
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div :class="$style['post-container']" :style="'backdround: url(' + $frontmatter.cover + ')'">
    <!-- <VPDocAsideOutline :class="$style['post-outline']" /> -->
    <DocOutline :class="$style['post-outline']" />
    <div v-show="$frontmatter.cover" :class="$style['post-cover']">
      <img :src="$frontmatter.cover" :alt="$frontmatter.title" loading="lazy" />
    </div>
    <main :class="$style['post-context']">
      <h1>
        <span>{{ $frontmatter.title }}</span>
        <span
          :class="$style['category']"
          :style="'--color: ' + cateColor"
          v-show="$frontmatter?.category"
          >{{ cateText }}</span
        >
      </h1>
      <div :class="$style['post-info']">
        <TagIcon style="font-size: 1.1em; margin-right: 4px" />
        <span>{{ $frontmatter.tags }}</span>
        <div style="flex-grow: 1"></div>
        <ClockIcon style="font-size: 1.1em" />
        <span style="margin-left: 2px">{{ updateTimeAgo }}</span>
      </div>
      <Content class="vp-doc VPDoc" v-load-animate />
    </main>

    <div :class="$style['next-priv']">
      <a
        :class="$style['priv']"
        :href="priv?.url"
        v-show="priv"
        @click="curPostUrl = priv.url"
        target="_self"
      >
        <p style="font-size: 1.1em; opacity: 0.6">PRIV</p>
        <p style="font-size: 0.9em">{{ priv?.frontmatter?.title }}</p>
      </a>
      <a
        :class="$style['next']"
        :href="next?.url"
        v-show="next"
        @click="curPostUrl = next.url"
        target="_self"
      >
        <p style="font-size: 1.1em; opacity: 0.6">NEXT</p>
        <p style="font-size: 0.9em">{{ next?.frontmatter?.title }}</p>
      </a>
    </div>
  </div>
</template>

<style module>
.post-container {
  position: relative;
  padding: 2rem;
  display: grid;
  grid-template-columns: 74% 24%;
  column-gap: 2%;
  grid-template-areas:
    'b a'
    'c a'
    'd a';
}

.post-outline {
  grid-area: a;
}

.post-context {
  padding: 1rem;
}

.post-context > h1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  letter-spacing: -0.02em;
  line-height: 40px;
  font-size: 32px;
  position: relative;
  font-weight: 600;
  outline: none;
  overflow-wrap: break-word;
  margin: 0;
  box-sizing: border-box;
  grid-area: c;
}

.category {
  display: inline;
  line-height: normal;
  font-size: 1rem;
  padding: 2px 4px;
  margin-left: 8px;
  border-radius: 4px;
  border: 1px rgb(var(--color)) solid;
  /* color: white; */
  background-color: rgba(var(--color), 0.2);
  white-space: nowrap;
}

.post-cover {
  position: relative;
  text-align: center;
  grid-area: b;
}

.post-cover > img {
  display: inline-block;
  object-fit: cover;
  object-position: center;
  box-shadow: 0 0 7px hsla(0, 0%, 0%, 0.6);
  border-radius: 0.75rem;
}

.post-info {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.9em;
  opacity: 0.8;
  /* border-top: 1px solid var(--vp-c-divider); */
}

.next-priv {
  grid-area: d;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
  padding: 2rem 1rem;
  border-top: 1px var(--color-divider) solid;
}

.next-priv > a {
  will-change: box-shadow, border;
  transition:
    box-shadow 0.2s ease,
    border 0.2s ease;
}

.next-priv > a:hover {
  border: 1px transparent solid;
  box-shadow:
    0 0 3px rgba(0, 0, 0, 0.32),
    0 2px 6px rgba(0, 0, 0, 0.16);
}

.priv {
  display: block;
  text-decoration: none;
  border: 1px var(--color-divider-soft) solid;
  background-color: var(--color-bg-card);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.next {
  display: block;
  text-decoration: none;
  border: 1px var(--color-divider-soft) solid;
  background-color: var(--color-bg-card);
  text-align: end;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .post-container {
    width: 100vw;
    padding-right: 0;
    padding: 0.75rem;
    display: block;
  }

  .post-cover > img {
    border-radius: 0.5rem;
  }

  .next-priv {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1rem;
    margin: 1rem 0;
  }
}
</style>
