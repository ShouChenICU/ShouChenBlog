<script setup lang="ts">
const navHeight = useNavHeight()
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row gap-4 px-2 md:px-[10vw] py-4">
    <aside class="flex-1">
      <div
        :class="$route.path.includes('/post') ? 'h-full' : 'sticky'"
        :style="{ top: $route.path.includes('/post') ? '0' : `calc(${navHeight}px + 1rem)` }"
      >
        <Profile :key="1" />
        <div
          :class="{ sticky: $route.path.includes('/post') }"
          :style="{ top: $route.path.includes('/post') ? `calc(${navHeight}px + 1rem)` : '0' }"
          v-auto-animate
        >
          <PostTOC :key="2" v-if="$route.path.startsWith('/post')" />
          <PostCategory :key="3" />
        </div>
      </div>
    </aside>
    <NuxtPage class="md:w-[75%]" />
  </div>
</template>
