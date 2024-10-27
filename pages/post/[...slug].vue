<script setup lang="ts">
import type { ParsedContent } from '@nuxt/content'

definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: 'post'
})

const route = useRoute()
const docPath = route.path.replace('/post', '') || '/'

const data = await queryContent(docPath).findOne()
// console.log(data)
</script>

<template>
  <div>
    <p>{{ $router.getRoutes().map((r) => r.path) }}</p>
    <p>{{ data }}</p>
    <ContentRenderer :value="data" />
  </div>
</template>
