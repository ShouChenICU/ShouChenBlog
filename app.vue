<script setup lang="ts">
const colorMode = useColorMode()

onMounted(() => {
  colorMode.preference = 'dark'
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Background />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
