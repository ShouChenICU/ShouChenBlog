<script setup>
import { useData } from 'vitepress'
import NavBar from './NavBar.vue'
import ProfileBox from './ProfileBox.vue'
import PostsBox from './PostsBox.vue'

const siteData = useData()
</script>

<template>
  <div :class="$style['home-page']">
    <ProfileBox />
    <div>
      <NavBar />
      <PostsBox />
    </div>
  </div>
</template>

<style module>
.home-page {
  position: relative;
  margin: auto;
  width: 100%;
  /* padding: 2rem 1rem; */
  display: grid;
  grid-template-columns: 24% 76%;
  grid-auto-rows: auto;
  align-items: start;
  /* display: flex;
  flex-direction: row-reverse; */
  /* gap: 3rem; */
}

.side-div {
  max-width: 25%;
  min-width: 25%;
}

@media screen and (max-width: 768px) {
  .home-page {
    width: 100%;
    grid-template-columns: 1fr;
    /* flex-direction: column; */
    padding: 0;
    gap: 0;
  }

  .side-div {
    max-width: unset;
    min-width: unset;
  }
}
</style>
