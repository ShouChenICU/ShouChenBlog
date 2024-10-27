<script setup lang="ts">
const navHeight = useNavHeight()
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row gap-4 px-4 md:px-[10vw] py-4">
    <NuxtPage class="md:w-[70%]" />
    <div class="flex-1">
      <div class="sticky" :style="{ top: `calc(${navHeight}px + 1rem)` }">
        <Profile />
      </div>
    </div>
  </div>
</template>
