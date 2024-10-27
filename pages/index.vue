<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: '主页'
})

const posts = await queryContent('/')
  .only(['_path', 'title', 'cover', 'description', 'createAt'])
  .find()
</script>

<template>
  <div>
    <p>posts</p>
    <div class="space-y-3">
      <PostItem v-for="post in posts" :key="post._path" :post-info="post as Post" />
    </div>
  </div>
</template>
