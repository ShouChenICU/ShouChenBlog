<script setup>
import PostsList from './PostsList.vue'
</script>

<template>
  <div :class="$style['home-container']">
    home
    <PostsList />
    <div style="height: 120vh"></div>
    123
  </div>
</template>

<style module>
.home-container {
  padding-right: 10vw;
}
</style>
