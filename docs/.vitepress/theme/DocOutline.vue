<script setup>
import { getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'
import { navElm, remToPx, curPostUrl } from './public.mjs'
import UpIcon from './icons/UpIcon.vue'
import MenuRightIcon from './icons/MenuRightIcon.vue'

const curInst = getCurrentInstance()
const docOutlineContainerDom = ref(null)
const navHeight = ref(0)
const itemsDom = ref(null)
const itemList = ref([])
const itemLine = ref(null)
const itemThumb = ref(null)
let isSideOpen = false

const titleList = ref([])

// watch(curPostUrl, () => {
//   // setTimeout(() => {
//   curInst.proxy.$forceUpdate
//   console.log(1)
//   // }, 500)
// })

function getIndent(nodeName) {
  return 0.5 * Number(nodeName.replace('H', '')) + 'rem'
}

function switchSideOutline() {
  if (isSideOpen) {
    docOutlineContainerDom.value.style.right = '-70vw'
  } else {
    docOutlineContainerDom.value.style.right = '0'
  }
  isSideOpen = !isSideOpen
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

let currentIdx = null

function movePoint(idx) {
  if (currentIdx === idx) {
    return
  }
  currentIdx = idx
  const top = itemList.value[idx].top
  const itemHeight = itemList.value[idx].height
  const bottom = itemList.value[idx].bottom
  itemThumb.value.style.top = top + 'px'
  itemThumb.value.style.height = itemHeight + 'px'
  // console.log('top: ' + top + ' bottom: ' + bottom)
  if (top >= itemLine.value.offsetTop) {
    itemLine.value.style.transition = 'top 0.25s ease 0.15s,bottom 0.25s ease'
  } else {
    itemLine.value.style.transition = 'top 0.25s ease,bottom 0.25s ease 0.15s'
  }
  itemLine.value.style.bottom = bottom + 'px'
  itemLine.value.style.top = top + 'px'
}

function clickItem(node, target) {
  const y = node.getBoundingClientRect().y
  window.scrollBy({
    top: y - navElm.value.clientHeight
    // behavior: 'smooth'
  })
  setTimeout(() => {
    movePoint(target)
  }, 50)
}

function resizeHeight() {
  if (docOutlineContainerDom.value?.style) {
    docOutlineContainerDom.value.style.maxHeight =
      window.innerHeight - navElm.value.clientHeight - remToPx(4) + 'px'
  }
}

function syncPoint() {
  let current = 0
  for (let i = 0; i < titleList.value.length; i++) {
    if (titleList.value[i].getBoundingClientRect().top - 5 >= navElm.value.clientHeight) {
      break
    } else {
      current = i
    }
  }
  movePoint(current)
}

async function init() {
  window.removeEventListener('resize', resizeHeight)
  window.removeEventListener('scroll', syncPoint)

  titleList.value = [
    // docTitleRef.value,
    ...document.querySelectorAll('.VPDoc :where(h1,h2,h3,h4,h5,h6)')
  ]
  setTimeout(() => {
    itemLine.value = []
    if (titleList.value.length > 0) {
      window.addEventListener('resize', resizeHeight)
      window.addEventListener('scroll', syncPoint)
      resizeHeight()
      docOutlineContainerDom.value.querySelectorAll('.doc-outline-item').forEach((elm) => {
        const top = elm.offsetTop
        const height = elm.clientHeight
        itemList.value.push({
          top: top,
          height: height,
          bottom: itemsDom.value.clientHeight - top - height,
          item: elm
        })
      })
      setTimeout(() => {
        syncPoint()
      }, 100)
    } else {
      itemLine.value.style.display = 'none'
      itemThumb.value.style.display = 'none'
    }
    navHeight.value = navElm.value.clientHeight
  }, 200)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeHeight)
  window.removeEventListener('scroll', syncPoint)
  resizeHeight()
})
</script>

<template>
  <div>
    <div
      class="doc-outline-container"
      ref="docOutlineContainerDom"
      :style="{ top: navHeight + remToPx(2) + 'px' }"
    >
      <div class="doc-outline-items" ref="itemsDom">
        <div class="doc-outline-item-line" ref="itemLine"></div>
        <div class="doc-outline-item-thumb" ref="itemThumb"></div>
        <div
          v-for="(item, idx) in titleList"
          :key="idx"
          class="doc-outline-item"
          :style="{ paddingLeft: getIndent(item.nodeName) }"
          @click="(e) => clickItem(item, idx)"
        >
          <span>
            {{ item.innerText }}
          </span>
        </div>
      </div>
    </div>
    <!-- Ctrl button -->
    <div class="doc-outline-ctrl-btn">
      <div @click="scrollToTop"><UpIcon /></div>
      <div class="doc-outline-open-btn" @click="switchSideOutline"><MenuRightIcon /></div>
    </div>
  </div>
</template>

<style scoped>
.doc-outline-container {
  /* color: var(--color-text-title); */
  /* background-color: var(--color-bg-navbar); */
  position: sticky;
  padding: 1rem 0.5rem;
  overflow-y: auto;
  z-index: 500;
}

.doc-outline-container::-webkit-scrollbar {
  width: 5px;
  background: transparent;
}

.doc-outline-container::-webkit-scrollbar-thumb {
  border-radius: 100px;
  -webkit-box-shadow: inset 0 0 3px rgba(128, 128, 128, 0.2);
  background-color: rgba(128, 128, 128, 0.2);
}

.doc-outline-container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(128, 128, 128, 0.4);
}

.doc-outline-items {
  position: relative;
  padding: 0 0.5rem;
}

.doc-outline-items::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 2px;
  background-color: rgba(160, 160, 160, 0.2);
}

.doc-outline-item-line {
  background-color: var(--vt-c-sora);
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  /* padding: 0.25rem 0; */
  z-index: 10;
  user-select: none;
  will-change: top, bottom;
  transform: translateZ(0);
  transition:
    top 0.2s ease,
    bottom 0.2s ease;
}

.doc-outline-item-thumb {
  background: linear-gradient(160deg, #68c2ecaa, #48a2ccaa);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  margin: 0 0.5rem;
  /* padding: 0.25rem 0; */
  border-radius: 0.25rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  z-index: -10;
  user-select: none;
  will-change: top;
  transform: translateZ(0);
  transition: top 0.25s ease;
}

.doc-outline-item {
  font-size: 0.9em;
  position: relative;
  padding: 0.3rem 0.5rem;
  border-radius: 0.25rem;
  will-change: background-color;
  transition: background-color 0.2s ease;
  z-index: 10;
  cursor: pointer;
}

.doc-outline-item:hover {
  background: linear-gradient(160deg, rgba(150, 150, 150, 0.2), rgba(150, 150, 150, 0.25));

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -0.5rem;
    bottom: 0;
    width: 2px;
    background-color: rgba(150, 150, 150, 0.2);
    z-index: 5;
  }
}

.doc-outline-ctrl-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.5rem;
  position: fixed;
  right: 1rem;
  bottom: 2rem;
  z-index: 510;
  -webkit-tap-highlight-color: transparent !important;
  cursor: pointer;
}

.doc-outline-ctrl-btn > div {
  padding: 0.75rem 1rem;
  background-color: rgba(128, 128, 128, 0.16);
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.doc-outline-ctrl-btn > div:hover {
  background-color: rgba(128, 128, 128, 0.24);
}

.doc-outline-open-btn {
  display: none;
}

@media screen and (max-width: 768px) {
  .doc-outline-container {
    position: fixed;
    top: 0;
    right: -70vw;
    bottom: 0;
    width: 70vw;
    padding: 0.5rem;
    box-sizing: content-box;
    overflow-y: auto;
    will-change: right;
    transform: translateZ(0);
    transition: right 0.5s ease;
  }

  .doc-outline-items {
    border-radius: 0.5rem;
    overflow: hidden;
    background-color: var(--color-bg-head);
    backdrop-filter: blur(3px);
    /* box-shadow: 0 0 2px rgba(0, 0, 0, 0.2); */
  }

  .doc-outline-open-btn {
    display: block;
  }
}
</style>
