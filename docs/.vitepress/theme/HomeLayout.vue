<script setup>
import { onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { navElm } from './public.mjs'
import NavBar from './NavBar.vue'
import ProfileBox from './ProfileBox.vue'
import NoticeBox from './NoticeBox.vue'
// import PostsBox from './PostsBox.vue'

const siteData = useData()
const navElmHeight = ref(0)

onMounted(() => {
  navElmHeight.value = navElm.value.clientHeight
  // if (window.innerWidth >= 768) {
  //   navElmHeight.value += 32
  // }
})
</script>

<template>
  <div :class="$style['home-page']">
    1
  </div>
</template>

<style module>
.home-page {
  position: relative;
  margin: 0;
  width: 100%;
}

.main-box-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url('/imgs/banner.webp');
  background-attachment: fixed;
  /* background-position: 0 -300px; */
  background-size: cover;
}

.main-box {
  background-color: var(--color-bg-content);
  backdrop-filter: blur(12px);
  display: grid;
  grid-template-areas:
    'a b'
    'a c';
  grid-template-columns: 1fr 1fr;
  padding: 2rem;
  gap: 2rem;
  position: relative;
  width: 70%;
  /* margin: 0 auto; */
  z-index: 10;
}

.banner-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  overflow: hidden;
}

.banner-wrap::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(12px);
  z-index: -900;
}

.banner-wrap img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1000;
  /* filter: blur(24px); */
}

.side-div {
  max-width: 25%;
  min-width: 25%;
}

@media screen and (max-width: 768px) {
  .home-page {
    /* width: 100%; */
    /* grid-template-columns: 1fr; */
    /* flex-direction: column; */
    padding: 0;
    gap: 0;
  }

  .main-box {
    grid-template-areas:
      'a'
      'b'
      'c';
    grid-template-columns: 1fr;
    padding: 0;
    gap: 1rem;
    position: relative;
    width: 100%;
    margin: 0 auto;
    z-index: 10;
  }

  .side-div {
    max-width: unset;
    min-width: unset;
  }
}
</style>
