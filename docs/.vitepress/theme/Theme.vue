<script setup>
import AsideContainer from './AsideContainer.vue'
import MainContainer from './MainContainer.vue'
</script>

<template>
  <div :class="$style['main-container']">
    <AsideContainer />
    <MainContainer />
  </div>
</template>

<style module>
.main-container {
  position: relative;
  display: grid;
  grid-template-columns: 25% 75%;
  grid-template-rows: 100%;
}

@media screen and (max-width: 768px) {
  .main-container {
    display: block;
  }
}
</style>
