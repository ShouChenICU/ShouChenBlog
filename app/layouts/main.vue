<script setup lang="ts">
const sysSetting = useSystemSetting()
</script>

<template>
  <div class="flex flex-col-reverse md:flex-row gap-4 px-2 md:px-[10vw] py-4">
    <aside class="flex-1 min-w-0">
      <div
        :style="
          $route.path.includes('/post')
            ? 'height:100%'
            : `position:sticky;top:calc(${sysSetting.navHeight}px + 1rem)`
        "
      >
        <Profile :key="1" />
        <div
          :style="
            $route.path.startsWith('/post')
              ? `position:sticky;top:calc(${sysSetting.navHeight}px + 1rem)`
              : ''
          "
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
