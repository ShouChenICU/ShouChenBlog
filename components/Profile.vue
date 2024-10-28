<script setup lang="ts"></script>

<template>
  <div
    class="relative p-4 rounded-3xl frosted-glass glass-high-light"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: 45deg"
  >
    <img src="/favicon.webp" class="size-16 rounded-full mx-auto block" />
    <h2 class="text-lg font-bold text-center tracking-widest mt-4">守晨</h2>
    <div class="flex flex-row items-center justify-evenly mt-4">
      <NuxtLink class="bg-neutral-100/90 rounded-full p-2 block">
        <Icon name="logos:x" class="size-5 block" />
      </NuxtLink>
      <NuxtLink class="bg-neutral-100/90 rounded-full p-2 block">
        <Icon name="logos:github-icon" class="size-5 block" />
      </NuxtLink>
      <NuxtLink class="bg-neutral-100/90 rounded-full p-2 block">
        <Icon name="my-icon:qq" class="size-5 block" />
      </NuxtLink>
    </div>
  </div>
</template>
