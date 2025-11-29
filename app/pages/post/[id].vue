<script lang="ts" setup>
definePageMeta({ layout: 'post' })

const id = useRoute().params.id
const { data: post } = await useAsyncData(
  queryCollection('content').where('path', '=', `/${id}`).first
)
if (!post.value) {
  throw createError({ statusCode: 404, message: '文章不存在' })
}
</script>

<template>
  <div>
    {{ id }}
    <pre>{{ JSON.stringify(post, null, 2) }}</pre>
  </div>
</template>
