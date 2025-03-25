<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
const siteUrl = useSiteConfig().url
useSeoMeta({
  title: '关于',
  ogImage: siteUrl + '/ogImg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: '关于',
  twitterDescription: '关于',
  twitterImage: siteUrl + '/ogImg.webp',
  twitterSite: 'https://shouchen.blog',
  twitterCreator: 'ShouChen_'
})

onMounted(() => {
  useBgUrl('/bg.webp')
})
</script>

<template>
  <div
    class="relative p-4 rounded-3xl frosted-glass-heavy glass-high-light"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: -90deg"
  >
    <div class="relative aspect-[3/1] rounded-lg overflow-hidden">
      <img src="/banner.webp" alt="Banner" class="size-full object-cover object-center -z-10" />
      <div
        class="absolute left-0 bottom-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-row gap-4"
      >
        <img
          src="/favicon.webp"
          alt="Avatar"
          class="size-16 rounded-full border-2 border-white/60 p-[2px]"
        />
        <div class="flex-1 min-w-0 flex flex-col self-end gap-1 break-all">
          <h2 class="text-xl tracking-widest font-bold">守晨</h2>
          <p class="text-neutral-300">做自己喜欢的事🍀</p>
        </div>
      </div>
    </div>

    <div class="p-4 flex flex-col items-center gap-2 text-neutral-300">
      <p class="text-2xl text-neutral-200">Hi 欢迎访问我的博客</p>
      <p>我是一名全栈工程师💻，在从事AI相关的创业活动🤖</p>
      <p>同时也是Debian忠实粉🍥，日用系统和服务器都选择它🖥️</p>
      <p>我还是音乐发烧友，喜欢收集高品质音乐和各类耳机🎧</p>
      <p>我喜欢折腾电子产品🎯，喜欢搞机📱，喜欢玩MC🎮</p>
      <p>我还想养猫 (猫娘也行)🐱，想学摄影📷，最想去的国家是日本⛩️</p>
      <p>我的梦想是自由自在的做自己喜欢的事情🍀</p>
      <p class="text-lg text-neutral-200 mt-2">🗃️ 我的一些作品</p>
      <p>
        <NuxtLink
          class="text-[#51a8dd] hover:text-rose-500"
          to="https://fastsend.ing"
          target="_blank"
          >fastsend.ing</NuxtLink
        >
        浏览器点对点加密文件传输
      </p>
      <p>
        <NuxtLink
          class="text-[#51a8dd] hover:text-rose-500"
          href="https://aifreee.cc"
          target="_blank"
          >aifreee.cc</NuxtLink
        >
        免登录即可使用的免费AI工具站，由Cloudflare的Workers AI驱动
      </p>
      <p>
        <NuxtLink class="text-[#51a8dd] hover:text-rose-500" target="_blank">miaobox.cc</NuxtLink>
        一个本地优先的实用工具箱（域名已过期）
      </p>
      <p>
        <NuxtLink
          class="text-[#51a8dd] hover:text-rose-500"
          href="https://awesome-code.top"
          target="_blank"
          >awesome-code.top</NuxtLink
        >
        一个收录分享各种Awesome代码(片段)的网站
      </p>
    </div>
  </div>
</template>
