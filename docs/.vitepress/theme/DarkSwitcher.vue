<script setup>
import { useDark } from '@vueuse/core'
import { watch, ref } from 'vue'

// isDark为true则开启夜间模式
const isDark = useDark()

const btnElm = ref(null)

watch(isDark, (val) => {
  if (val) {
    // btnElm.value.style.left = '1.7em'
    btnElm.value.style.backgroundColor = 'black'
  } else {
    // btnElm.value.style.left = '0.2em'
    btnElm.value.style.backgroundColor = 'white'
  }
})
</script>

<template>
  <div :class="$style['switch']" @click="isDark = !isDark">
    <div :class="$style['left-silder']" :style="'left: ' + (isDark ? '0' : '-3em')"></div>
    <div :class="$style['btn']" ref="btnElm"></div>
    <div :class="$style['right-silder']" :style="'left: ' + (isDark ? '3em' : '0')"></div>
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
}

.switch div {
  will-change: left;
  transition: left 0.2s ease;
}

.left-silder {
  position: absolute;
  width: 3em;
  height: 1.5em;
  top: 0;
  left: -3em;
  background-color: var(--vt-c-indigo);
  z-index: 90;
}

.btn {
  position: absolute;
  width: 1.1em;
  height: 1.1em;
  border-radius: 100px;
  left: 0.2em;
  top: 0.2em;
  background-color: aquamarine;
  z-index: 100;
  will-change: left;
  transition: background-color 0.2s ease;
}

.right-silder {
  position: absolute;
  width: 3em;
  height: 1.5em;
  top: 0;
  left: 0;
  z-index: 90;
}
</style>
