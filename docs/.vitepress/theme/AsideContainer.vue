<script setup>
import { useData } from 'vitepress'
import { ref, shallowRef, watch } from 'vue'
import { isOpenAside, curCate } from './public.mjs'
import HomeIcon from './icons/HomeIcon.vue'
import ArchivedIcon from './icons/ArchivedIcon.vue'
import LinkIcon from './icons/LinkIcon.vue'
import CupIcon from './icons/CupIcon.vue'

const { site, theme } = useData()
const asideElm = ref(null)
const asideTemp = ref(null)

const nav = ref([
  { id: 'home', text: '主页', icon: shallowRef(HomeIcon), link: '/' },
  { id: 'archived', text: '归档', icon: shallowRef(ArchivedIcon), link: '/archived' },
  { id: 'friendlyLink', text: '友链', icon: shallowRef(LinkIcon), link: '/friendlyLink' },
  { id: 'about', text: '关于', icon: shallowRef(CupIcon), link: '/about' }
])

defineExpose({ isOpenAside })

watch(isOpenAside, (val) => {
  // console.log(val)
  if (val) {
    asideElm.value.style.left = '0'
    asideTemp.value.style.height = '100vh'
    asideTemp.value.style.opacity = '1'
    window.document.body.style.overflowY = 'hidden'
  } else {
    asideElm.value.style.left = '-61vw'
    asideTemp.value.style.opacity = '0'
    window.document.body.style.overflowY = 'scroll'
    setTimeout(() => {
      asideTemp.value.style.height = '0'
    }, 210)
  }
})
</script>

<template>
  <aside :class="$style['aside-container']" ref="asideElm">
    <div :class="$style['main-logo']">{{ site.title }}</div>
    <div :class="$style['menu-container']">
      <a
        v-for="(item, idx) in nav"
        :key="idx"
        :href="item.link"
        :class="
          $style['menu-item'] +
          ' ' +
          (item.id === $frontmatter.layout ? $style['menu-item-active'] : '')
        "
        @click="isOpenAside = false"
        ><component :is="item?.icon" style="margin-right: 0.75rem; font-size: 1.1em" />{{
          item.text
        }}</a
      >
    </div>
    <div :class="$style['text-divider']">
      <span>文章分类</span>
    </div>
    <div :class="$style['categories']">
      <a
        v-for="(item, idx) in theme.categories"
        :key="idx"
        :class="$style['category']"
        :style="
          $frontmatter.layout === 'category' && $frontmatter.category === item.id
            ? 'color: #f596aa;'
            : ''
        "
        :href="item.link"
        @click="
          () => {
            curCate = item.id
            isOpenAside = false
          }
        "
        >{{ item.text }}</a
      >
    </div>
    <div :class="$style['aside-footer']">shouchen.blog</div>
  </aside>
  <div ref="asideTemp" :class="$style['aside-temp']" @click="isOpenAside = false"></div>
</template>

<style module>
.aside-temp {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 0;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  z-index: 1060;
  transition: opacity 0.2s ease;
}

.aside-container {
  position: sticky;
  top: 0;
  height: 100vh;
  background-color: var(--color-bg-aside);
  padding-left: 10vw;
  overflow-y: auto;
  z-index: 1100;
  transition: left 0.2s ease;
}

.main-logo {
  font-weight: bold;
  padding: 1rem 0;
  border-bottom: 1px var(--color-divider) solid;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-title);
}

.menu-container {
  padding: 1rem 0;
}

.menu-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 100px 0 0 100px;
  overflow: hidden;
  cursor: pointer;
  transition: background-color 0.25s cubic-bezier(0.2, 0.8, 0.8, 1);
}

.menu-item:hover {
  background-color: var(--color-background-soft);
  transition: background-color 0.25s cubic-bezier(0.2, 0.8, 0, 1);
}

.menu-item-active {
  color: #51a8dd;
  /* background-color: var(--color-background-soft); */
}

.text-divider {
  position: relative;
  font-size: 0.9em;
}

.text-divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--color-divider-soft);
  z-index: -1;
}

.text-divider > span {
  display: inline-block;
  color: var(--color-text-quaternary);
  background-color: var(--color-bg-aside);
  padding: 0 0.5rem;
  margin: 0.75rem;
  z-index: 10;
}

.categories {
  padding: 1rem 0;
}

.category {
  display: block;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 100px 0 0 100px;
  overflow: hidden;
  transition: color 0.25s ease;
  cursor: pointer;
}

.category:hover {
  color: #f596aa;
  transition: color 0.25s cubic-bezier(0.2, 0.8, 0, 1);
}

.aside-footer {
  font-size: 0.8em;
  margin-top: 3rem;
  padding-top: 0.5rem;
  border-top: 1px var(--color-divider-soft) solid;
  color: var(--color-text-quaternary);
}

@media screen and (max-width: 768px) {
  .aside-container {
    position: fixed;
    width: 61vw;
    left: -61vw;
    padding-left: 1rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  }
}
</style>
