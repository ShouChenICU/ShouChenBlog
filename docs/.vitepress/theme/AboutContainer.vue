<script setup>
import ProfileBox from './ProfileBox.vue'
</script>

<template>
  <div :class="$style['about-container']">
    <ProfileBox />
  </div>
</template>

<style module>
.about-container {
  padding: 2rem 4rem;
  padding-right: 25%;
}

@media screen and (max-width: 768px) {
  .about-container {
    padding: 0;
  }
}
</style>
