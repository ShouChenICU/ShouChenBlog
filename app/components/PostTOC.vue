<script setup lang="ts">
// import { type ParsedContent } from '@nuxt/content'
const postStore = usePostStore()
const curNavId = ref('')
const elmOffsetTopMap = new Map<string, number>()
let offsetTopList: number[] = []
let elmIdList: string[] = []

function positioningNav() {
  if (typeof window === 'undefined') return

  const y = window.scrollY

  // 使用二分查找找到第一个大于当前滚动位置的标题
  let left = 0
  let right = offsetTopList.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)
    // @ts-ignore
    if (offsetTopList[mid] <= y) {
      left = mid + 1
    } else {
      right = mid - 1
    }
  }

  // right 指向最后一个小于 y 的位置
  if (right >= 0) {
    // @ts-ignore
    curNavId.value = elmIdList[right]
  } else if (elmIdList.length > 0) {
    // @ts-ignore
    curNavId.value = elmIdList[0]
  }
}

function manualNav(offsetTop: number) {
  window.scroll({
    top: offsetTop + 1,
    left: 0,
    behavior: 'smooth'
  })
}

function updateTOC() {
  setTimeout(() => {
    const elmList = document.querySelectorAll('h2, h3') as NodeListOf<HTMLElement>
    offsetTopList = []
    elmIdList = []
    elmList.forEach((elm) => {
      offsetTopList.push(elm.offsetTop)
      elmIdList.push(elm.id)
      elmOffsetTopMap.set(elm.id, elm.offsetTop)
    })
    positioningNav()
  }, 1e3)
}

onMounted(() => {
  updateTOC()
  window.addEventListener('scroll', positioningNav)
})

onUpdated(() => updateTOC())

onUnmounted(() => {
  window.removeEventListener('scroll', positioningNav)
})
</script>

<template>
  <div
    class="relative p-4 rounded-3xl frosted-glass glass-high-light mt-4"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: 0deg"
  >
    <div
      class="relative flex flex-row items-center justify-between pl-3 before:absolute before:left-0 before:top-[20%] before:h-[60%] before:w-1 before:rounded before:bg-neutral-300"
    >
      <p class="text-neutral-100 text-lg font-bold">导航</p>
      <Icon name="solar:list-bold-duotone" class="size-5 mr-1" />
    </div>

    <div v-if="postStore.current?.body?.toc" class="mt-2 text-neutral-200 break-all">
      <div v-for="item in postStore.current.body.toc.links">
        <p
          class="p-1 mt-1 rounded-md cursor-pointer hover:bg-neutral-500/35 hover:pl-2 hover:brightness-110 transition-all ease-out"
          :class="{
            'bg-neutral-200 text-black pl-2 pointer-events-none': curNavId === item.id,
            'text-neutral-200': curNavId !== item.id
          }"
          @click="manualNav(elmOffsetTopMap.get(item.id) as number)"
        >
          {{ item.text }}
        </p>
        <div v-if="item.children">
          <p
            v-for="child in item.children"
            class="p-1 mt-1 pl-5 rounded-md cursor-pointer hover:bg-neutral-500/35 hover:pl-6 hover:brightness-110 transition-all ease-out"
            :class="{
              'bg-neutral-200 text-black pl-6 pointer-events-none': curNavId === child.id,
              'text-neutral-200': curNavId !== child.id
            }"
            @click="manualNav(elmOffsetTopMap.get(child.id) as number)"
          >
            {{ child.text }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
