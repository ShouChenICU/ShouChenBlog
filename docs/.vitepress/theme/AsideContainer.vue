<script setup>
import { useData } from 'vitepress'

const { site, theme } = useData()
</script>

<template>
  <aside :class="$style['aside-container']">
    <div :class="$style['main-logo']">{{ site.title }}</div>
    <div :class="$style['menu-container']">
      <a
        v-for="(item, idx) in theme.nav"
        :key="idx"
        :href="item.link"
        :class="$style['menu-item']"
        :style="{ color: item.id === $frontmatter.layout ? '#51A8DD' : 'unset' }"
        >{{ item.text }}</a
      >
    </div>
    <div :class="$style['text-divider']">
      <span>文章分类</span>
    </div>
    <div>
      
    </div>
    <div :class="$style['aside-footer']">shouchen.blog</div>
  </aside>
</template>

<style module>
.aside-container {
  position: sticky;
  top: 0;
  height: 100vh;
  background-color: var(--color-bg-aside);
  padding-left: 10vw;
  z-index: 1100;
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
  display: block;
  text-decoration: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.menu-item:hover {
  background-color: var(--color-background-soft);
}

.text-divider {
  position: relative;
  font-size: 0.9em;
  /* text-align: center; */
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

.aside-footer {
  font-size: 0.8em;
  margin-top: 3rem;
  padding-top: 0.5rem;
  border-top: 1px var(--color-divider-soft) solid;
  color: var(--color-text-quaternary);
}
</style>
