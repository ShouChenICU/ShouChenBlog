<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { navElm } from './public.mjs'
import DarkSwitcher from './DarkSwitcher.vue'
import MenuRightIcon from './icons/MenuRightIcon.vue'
import CloseIcon from './icons/CloseIcon.vue'

const { theme, frontmatter } = useData()
const showExtra = ref(false)
const showExtraBtn = ref(null)
const navExtraElm = ref(null)
const navHeight = ref(0)

let curY = 0
let switchY = 0
let isHide = false

watch(showExtra, (isShow) => {
  if (isShow) {
    showExtraBtn.value.style.rotate = '180deg'
    navExtraElm.value.style.display = 'block'
    setTimeout(() => {
      navExtraElm.value.style.backgroundColor = 'var(--color-bg-navbar)'
      navExtraElm.value.style.backdropFilter = 'blur(12px)'
      navExtraElm.value.style.opacity = '1'
    }, 1)
    window.document.body.style.overflow = 'hidden'
  } else {
    showExtraBtn.value.style.rotate = '0deg'
    navExtraElm.value.style.backgroundColor = 'transparent'
    navExtraElm.value.style.backdropFilter = 'blur(0)'
    navExtraElm.value.style.opacity = '0'
    setTimeout(() => {
      navExtraElm.value.style.display = 'none'
    }, 260)
    window.document.body.style.overflow = 'auto'
  }
})

const autoHideFun = () => {
  const sY = window.scrollY
  if (sY <= navElm.value?.clientHeight) {
    navElm.value.style.backgroundColor = 'transparent'
    navElm.value.style.backdropFilter = 'none'
    navElm.value.style.boxShadow = 'none'
  } else {
    navElm.value.style.backgroundColor = 'var(--color-bg-navbar)'
    navElm.value.style.backdropFilter = 'blur(12px)'
    navElm.value.style.boxShadow = '0 0 3px rgba(0, 0, 0, 0.4), 0 0 6px rgba(0, 0, 0, 0.2);'
  }
  if (sY > curY) {
    if (sY > switchY + 64 && sY > navElm.value?.clientHeight) {
      if (!isHide) {
        navElm.value.style.top = '-' + navElm.value?.clientHeight + 'px'
        isHide = !isHide
      }
      switchY = sY
    }
  } else if (sY <= switchY - 64 || sY < navElm.value?.clientHeight) {
    if (isHide) {
      navElm.value.style.top = '0'
      isHide = !isHide
    }
    switchY = sY
  }
  curY = sY
  // if (window.scrollY <= navElm.value?.clientHeight) {
  //   navElm.value.style.backdropFilter = 'unset'
  //   navElm.value.style.backgroundColor = 'transparent'
  //   navElm.value.style.boxShadow = 'unset'
  // } else {
  //   navElm.value.style.backdropFilter = 'blur(24px)'
  //   navElm.value.style.backgroundColor = 'var(--color-bg-navbar)'
  //   navElm.value.style.boxShadow = '0 0 3px rgba(0, 0, 0, 0.4), 0 0 6px rgba(0, 0, 0, 0.2);'
  // }
}

onMounted(() => {
  window.removeEventListener('scroll', autoHideFun)
  window.addEventListener('scroll', autoHideFun)
  autoHideFun()
  navHeight.value = navElm.value?.clientHeight
})

onUnmounted(() => {
  window.removeEventListener('scroll', autoHideFun)
})
</script>

<template>
  <!-- :style="{ position: frontmatter?.layout === 'home' ? 'fixed' : 'sticky' }" -->
  <nav
    :class="$style['nav-bar']"
    :style="{ position: frontmatter?.layout === 'home' ? 'fixed' : 'sticky' }"
    ref="navElm"
  >
    <!-- main -->
    <div :class="$style['nav-main']">
      <a :class="$style['main-logo']" href="/">
        <img src="/favicon.webp" style="width: 2em; height: 2em" />
        <span style="margin-left: 0.5em">ShouChen's Blog</span>
      </a>
      <div style="flex-grow: 1"></div>
      <div :class="$style['ctrl-bar']">
        <a
          v-for="(item, idx) in theme.nav"
          :key="idx"
          :class="$style['ctrl-item']"
          :href="item.link"
          >{{ item.text }}</a
        >
        <div class="divider-v" style="--h: 2em; margin: 0 8px"></div>
        <DarkSwitcher />
      </div>
      <div :class="$style['show-extra-btn']" @click="showExtra = !showExtra" ref="showExtraBtn">
        <MenuRightIcon v-show="!showExtra" /><CloseIcon v-show="showExtra" />
      </div>
    </div>
  </nav>
  <!-- extra -->
  <div :class="$style['nav-extra']" ref="navExtraElm" :style="'top: ' + navHeight + 'px'">
    <a
      v-for="(item, idx) in theme.nav"
      :key="idx"
      :class="$style['extra-item']"
      :href="item.link"
      @click="showExtra = false"
      >{{ item.text }}</a
    >
  </div>
</template>

<style module>
.nav-bar {
  box-shadow:
    0 0 3px rgba(0, 0, 0, 0.4),
    0 0 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg-navbar);
  backdrop-filter: blur(12px);
  z-index: 1000;
  transition:
    top 0.5s ease-out,
    backdrop-filter 0.5s ease-in-out,
    background-color 0.5s ease-in-out;
}

.nav-bar:hover {
  background-color: var(--color-bg-navbar) !important;
  backdrop-filter: blur(12px) !important;
  box-shadow:
    0 0 3px rgba(0, 0, 0, 0.4),
    0 0 6px rgba(0, 0, 0, 0.2) !important;
}

.nav-main {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.75rem 2%;
}

.nav-extra {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  backdrop-filter: blur(0);
  opacity: 1;
  z-index: 900;
  transition:
    background-color 0.25s ease,
    backdrop-filter 0.25s ease,
    opacity 0.25s ease;
}

.extra-item {
  display: block;
  text-decoration: none;
  padding: 0.75rem;
  text-align: center;
  /* font-size: 1.1em; */
}

.show-extra-btn {
  display: none;
  font-size: 1.4em;
  rotate: 0deg;
  transition: rotate 0.25s ease;
}

.main-logo {
  text-decoration: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin: 0.125rem; */
  /* padding: 0.25rem 0.5rem; */
  /* font-size: 1.25em; */
  color: var(--color-heading);
  /* border-radius: 0.5rem; */
  /* border: 1px var(--color-border-logo) solid; */
  word-break: keep-all;
  white-space: nowrap;
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
}

.ctrl-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ctrl-item {
  text-decoration: none;
  display: inline-block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition:
    color 0.2s ease,
    background-color 0.2s ease;
}

.ctrl-item:hover {
  color: #51a8dd;
  background-color: rgba(128, 128, 128, 0.1);
}

@media screen and (max-width: 768px) {
  .nav-main {
    padding: 0.75rem;
  }

  .ctrl-bar {
    display: none;
  }

  .show-extra-btn {
    display: block;
  }
}
</style>
