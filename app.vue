<script setup lang="ts">
const colorMode = useColorMode()
const navHeight = useNavHeight()
const footerHeight = useFooterHeight()
const bodyHeight = ref(0)

const { data: allPost } = await useAsyncData(() =>
  queryContent('/')
    .where({
      draft: false
    })
    .sort({
      updateAt: -1
    })
    .find()
)
useAllPost((allPost.value as unknown as Post[]) ?? [])

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
    <NuxtLayout
      :style="{
        'min-height': bodyHeight === 0 ? '100vh' : bodyHeight - navHeight - footerHeight + 'px'
      }"
    >
      <NuxtPage />
    </NuxtLayout>
    <FooterBar />
  </div>
</template>
