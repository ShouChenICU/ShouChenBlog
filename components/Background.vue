<script setup lang="ts">
const isBgBlur = useBgBlur()
const bgImgUrl = useBgUrl()
const imgFrontElm = ref()
const imgBackElm = ref()

// 监听背景图片URL变化
watch(bgImgUrl, (newImgUrl) => {
  if (!newImgUrl) return

  imgFrontElm.value.src = newImgUrl

  imgFrontElm.value.onload = () => {
    imgFrontElm.value.style.opacity = 1
    setTimeout(() => {
      imgBackElm.value.src = newImgUrl
      imgBackElm.value.onload = () => {
        imgFrontElm.value.style.opacity = 0
      }
    }, 1000)
  }
})
</script>

<template>
  <div class="fixed inset-0 -z-50 brightness-[60%]">
    <img
      ref="imgFrontElm"
      class="absolute size-full object-cover object-center img-transition opacity-0 z-10"
      :class="{
        blur: isBgBlur
      }"
      :src="bgImgUrl || '/bg.webp'"
      alt="background"
    />
    <img
      ref="imgBackElm"
      class="absolute size-full object-cover object-center img-transition z-0"
      :class="{
        blur: isBgBlur
      }"
      src="/bg.webp"
      alt="background"
    />
  </div>
</template>

<style scoped>
.img-transition {
  transition:
    filter 1s ease,
    opacity 1s ease;
  will-change: filter, opacity;
  transform: translateZ(0);
}
</style>
