<script setup>
import { onMounted, ref } from 'vue'

const { totalRow, pageSize } = defineProps({
  totalRow: {
    default: 0
  },
  pageSize: {
    default: 10
  }
})
const curPage = defineModel('curPage', { default: 1 })
const maxPage = ref(1)

function priv() {
  if (curPage.value > 1) {
    curPage.value--
  }
}

function next() {
  if (curPage.value < maxPage.value) {
    curPage.value++
  }
}

onMounted(() => {
  maxPage.value = Math.floor(totalRow / pageSize)
  if (totalRow % pageSize !== 0) {
    maxPage.value++
  }
  maxPage.value = Math.max(maxPage.value, 1)
})
</script>

<template>
  <div :class="$style['page-bar']">
    <div :class="$style['item']" @click="priv">上一页</div>
    <div
      :class="$style['item']"
      v-for="i in maxPage"
      :key="i"
      :style="i === curPage ? 'background-color: #58B2DCAA' : ''"
      @click="curPage = i"
    >
      {{ i }}
    </div>
    <div :class="$style['item']" @click="next">下一页</div>
  </div>
</template>

<style module>
.page-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 0.25rem;
  overflow-x: auto;
}

.page-bar .item {
  word-break: keep-all;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  transition: background-color 0.25s cubic-bezier(0.215, 0.61, 0.355, 1);
  user-select: none;
  cursor: pointer;
}

.page-bar .item:hover {
  background-color: rgba(128, 128, 128, 0.16);
}

.page-bar .active {
  background-color: rgba(128, 128, 128, 0.32);
}
</style>
