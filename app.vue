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
if (allPost.value) {
  allPost.value.forEach(
    (post) =>
      (post.flatContent = (
        flatContent(post.body as any) +
        post.title +
        (post as unknown as Post).keywords.join()
      ).toLowerCase())
  )
}
// console.log(allPost.value)

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
