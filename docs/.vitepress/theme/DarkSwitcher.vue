<script setup>
import { useDark } from '@vueuse/core'
import { watch, ref, onMounted } from 'vue'
import SunIcon from './icons/SunIcon.vue'
import MoonIcon from './icons/MoonIcon.vue'

// isDark为true则开启夜间模式
const isDark = useDark()
const switchElm = ref(null)
const lSl = ref(null)
const rSl = ref(null)
const btnElm = ref(null)

function switchDark(val) {
  if (val) {
    lSl.value.style.left = '0'
    btnElm.value.style.left = '1.7em'
    rSl.value.style.left = '3em'
    switchElm.value.style.backgroundColor = '#2c3e50'
  } else {
    lSl.value.style.left = '-3em'
    btnElm.value.style.left = '0.2em'
    rSl.value.style.left = '0'
    switchElm.value.style.backgroundColor = 'white'
  }
}

watch(isDark, (val) => {
  setTimeout(() => {
    switchDark(val)
  }, 0)
})

onMounted(() => switchDark(isDark.value))
</script>

<template>
  <div :class="$style['switch']" @click="isDark = !isDark" ref="switchElm">
    <div :class="$style['left-silder']" ref="lSl">
      <MoonIcon style="color: var(--vt-c-hanaba); margin-right: 1em" />
    </div>
    <div
      :class="$style['btn']"
      ref="btnElm"
      :style="{ backgroundColor: isDark ? '#434343' : 'white' }"
    ></div>
    <div :class="$style['right-silder']" ref="rSl">
      <SunIcon style="color: black; margin-left: 1em" />
    </div>
  </div>
</template>

<style module>
.switch {
  position: relative;
  width: 3em;
  height: 1.5em;
  border-radius: 100px;
  box-shadow:
    0 0 3px rgba(0, 0, 0, 0.32) inset,
    0 0 6px rgba(0, 0, 0, 0.16) inset;
  cursor: pointer;
  overflow: hidden;
  transition: background-color 0.2s ease;
}

.switch div {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  will-change: left;
  transition: left 0.2s ease;
}

.left-silder {
  position: absolute;
  width: 3em;
  height: 1.5em;
  top: 0;
  left: -3em;
  background-color: transparent;
  z-index: 90;
}

.btn {
  position: absolute;
  width: 1.1em;
  height: 1.1em;
  border-radius: 100px;
  left: 0.2em;
  top: 0.2em;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.right-silder {
  position: absolute;
  width: 3em;
  height: 1.5em;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 90;
}
</style>
