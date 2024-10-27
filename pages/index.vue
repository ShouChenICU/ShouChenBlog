<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: '主页'
})

const posts = await queryContent('/').only(['_path', 'title']).find()
</script>

<template>
  <div>
    <p>posts</p>
    <p v-for="post in posts">
      <NuxtLink :to="`/post${post._path}`">{{ post.title }}</NuxtLink>
    </p>
  </div>
</template>
