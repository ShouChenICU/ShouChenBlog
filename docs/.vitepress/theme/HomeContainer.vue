<script setup>
// import { navElm } from './public.mjs'
import PostsList from './PostsList.vue'
// import { onMounted, ref } from 'vue'

// const navHeight = ref(0)

// onMounted(() => {
//   navHeight.value = navElm.value?.clientHeight
// })
</script>

<template>
  <div :class="$style['home-container']">
    <!-- <div :class="$style['home-banner']">
      <img src="/imgs/banner.webp" />
      <div>11</div>
    </div> -->
    <!-- :style="{ marginTop: 'calc(35vh - ' + navHeight + 'px + 1rem )' }" -->
    <PostsList />
  </div>
</template>

<style module>
.home-container {
  padding: 1rem;
  padding-right: 10vw;
}

.home-banner {
  position: absolute;
  top: 0;
  left: 25%;
  width: 75%;
  height: 40vh;
  overflow: hidden;
  z-index: 800;
}

.home-banner > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.home-banner > div {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10%;
  background: linear-gradient(transparent, var(--color-background-soft));
}

@media screen and (max-width: 768px) {
  .home-container {
    padding: 1rem;
  }

  .home-banner {
    left: 0;
    width: 100%;
  }
}
</style>
