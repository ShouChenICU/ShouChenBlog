<script setup lang="ts">
const navHeight = useNavHeight()
</script>

<template>
  <div>
    <NavBar />
    <div class="flex flex-row gap-4 px-[10vw]">
      <NuxtPage class="w-[70%]" />
      <div class="flex-1">
        <div class="sticky py-4" :style="{ top: navHeight + 'px' }">
          <Profile />
        </div>
      </div>
    </div>
  </div>
</template>
