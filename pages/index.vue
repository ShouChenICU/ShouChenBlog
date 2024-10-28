<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
useSeoMeta({
  title: '主页'
})

const posts = await queryContent('/')
  .only(['_path', 'title', 'cover', 'keywords', 'description', 'createAt'])
  .where({
    draft: false
  })
  .sort({
    createAt: -1
  })
  .find()
</script>

<template>
  <div>
    <div class="flex flex-row items-center">
      <div class="flex-1"></div>
      <p class="frosted-glass px-3 py-2 rounded-xl text-sm">9 Posts</p>
    </div>
    <div class="space-y-3 mt-4">
      <PostItem v-for="post in posts" :key="post._path" :post-info="post as Post" v-load-animate />
    </div>
  </div>
</template>
