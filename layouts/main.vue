<script setup lang="ts">
const navHeight = useNavHeight()
</script>

<template>
  <div>
    <NavBar />
    <div class="flex flex-row gap-4 px-[10vw] py-4">
      <NuxtPage class="w-[70%]" />
      <div class="flex-1">
        <div class="sticky" :style="{ top: `calc(${navHeight}px + 1rem)` }">
          <Profile />
        </div>
      </div>
    </div>
  </div>
</template>
