<script setup lang="ts"></script>

<template>
  <div
    class="relative p-3 rounded-3xl frosted-glass glass-high-light"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: 45deg"
  >
    <img src="/favicon.webp" alt="avatar" class="size-24 rounded-full mx-auto block" />
    <p class="text-lg font-bold text-center tracking-widest mt-4">守晨</p>
    <div
      class="flex flex-row items-center justify-evenly mt-4 py-3 bg-neutral-950/30 rounded-xl border border-neutral-500/40"
    >
      <a
        href="https://x.com/ShouChen_"
        target="_blank"
        aria-label="Twitter"
        class="bg-neutral-100 rounded-full p-2 block hover:brightness-110"
      >
        <Icon name="logos:x" class="size-5 block" />
      </a>
      <a
        href="https://github.com/ShouChenICU"
        target="_blank"
        aria-label="Github"
        class="bg-neutral-100 rounded-full p-2 block hover:brightness-110"
      >
        <Icon name="logos:github-icon" class="size-5 block" />
      </a>
      <a
        href="https://qm.qq.com/q/zSSm9ew4c8"
        target="_blank"
        aria-label="QQ"
        class="bg-neutral-100 rounded-full p-2 block hover:brightness-110"
      >
        <Icon name="my-icon:qq" class="size-5 block" />
      </a>
    </div>
  </div>
</template>
