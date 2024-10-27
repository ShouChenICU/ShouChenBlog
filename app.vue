<script setup lang="ts">
const colorMode = useColorMode()
const navHeight = useNavHeight()
const footerHeight = useFooterHeight()
const bodyHeight = ref(800)

onMounted(() => {
  colorMode.preference = 'dark'
  bodyHeight.value = window.innerHeight
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Background />
    <NavBar />
    <NuxtLayout :style="{ 'min-height': bodyHeight - navHeight - footerHeight + 'px' }">
      <NuxtPage />
    </NuxtLayout>
    <FooterBar />
  </div>
</template>
