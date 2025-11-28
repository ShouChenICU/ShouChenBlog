<script lang="ts" setup>
const { data: home } = await useAsyncData(() => queryCollection('content').first())

// console.log(home.value)
</script>

<template>
  <div>
    index
    {{ home }}
    <ContentRenderer v-if="home" :value="home" />
  </div>
</template>
