<script setup lang="ts">
const navHeight = useNavHeight()
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row gap-4 px-2 md:px-[10vw] py-4">
    <aside class="flex-1">
      <div class="sticky" :style="{ top: `calc(${navHeight}px + 1rem)` }" v-auto-animate>
        <Profile :key="1" />
        <PostTOC :key="2" v-if="$route.path.startsWith('/post')" />
        <PostCategory :key="3" />
      </div>
    </aside>
    <NuxtPage class="md:w-[75%]" />
  </div>
</template>
