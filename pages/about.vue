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

// 自我介绍数据
const introItems = [
  { icon: '💻', text: '我是一名全栈工程师，在从事AI相关的创业活动🤖' },
  { icon: '🍥', text: 'Debian忠实粉，日用系统和服务器都选择它🖥️' },
  { icon: '🎧', text: '音乐发烧友，喜欢收集高品质音乐和各类耳机' },
  { icon: '🎯', text: '喜欢折腾电子产品，喜欢搞机📱，喜欢玩MC🎮' },
  { icon: '🐱', text: '想养猫 (猫娘也行)，想学摄影📷，最想去的国家是日本⛩️' },
  { icon: '🍀', text: '梦想是自由自在的做自己喜欢的事情' }
]

// 项目列表数据
const projects = [
  {
    title: 'uurrll.cc',
    description: '支持自定义社媒卡片的短链平台',
    url: 'https://uurrll.cc',
    status: 'active'
  },
  {
    title: 'fastsend.ing',
    description: '浏览器点对点加密文件传输',
    url: 'https://fastsend.ing',
    status: 'active'
  },
  {
    title: 'aifreee.cc',
    description: '免登录即可使用的免费AI工具站，由Cloudflare的Workers AI驱动',
    url: null,
    status: 'paused'
  },
  {
    title: 'awesome-code.top',
    description: '一个收录分享各种Awesome代码(片段)的网站',
    url: null,
    status: 'paused'
  },
  {
    title: 'miaobox.cc',
    description: '一个本地优先的实用工具箱',
    url: null,
    status: 'paused'
  }
]
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

    <div class="p-6 flex flex-col gap-8 text-neutral-300">
      <!-- 自我介绍部分 -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-neutral-200 mb-6 relative inline-block">
          Hi 欢迎访问我的博客
          <span
            class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          ></span>
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-3xl mx-auto">
          <div
            v-for="(item, index) in introItems"
            :key="index"
            class="p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
          >
            <div class="text-2xl">{{ item.icon }}</div>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>

      <!-- 项目展示部分 -->
      <div class="mt-6">
        <h3
          class="text-lg font-semibold text-neutral-200 mb-5 flex items-center justify-center gap-2"
        >
          <span class="text-xl">🗃️</span>
          <span>我设计并开发的一些产品</span>
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- 项目卡片 -->
          <template v-for="(project, index) in projects" :key="index">
            <!-- 活跃项目 -->
            <a
              v-if="project.status === 'active'"
              :href="project.url ?? ''"
              target="_blank"
              class="group"
            >
              <div
                class="p-5 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 transition-all duration-300 h-full flex flex-col"
              >
                <h4
                  class="text-[#51a8dd] group-hover:text-rose-500 text-lg font-medium mb-2 transition-colors"
                >
                  {{ project.title }}
                </h4>
                <p class="text-neutral-300">{{ project.description }}</p>
                <div
                  class="mt-auto pt-3 text-neutral-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  访问网站 →
                </div>
              </div>
            </a>

            <!-- 暂停服务项目 -->
            <div
              v-else
              class="p-5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 h-full flex flex-col"
            >
              <h4 class="text-[#51a8dd] text-lg font-medium mb-2">{{ project.title }}</h4>
              <p class="text-neutral-300">{{ project.description }}</p>
              <div class="mt-auto pt-3 text-neutral-400 text-sm">（已暂停服务）</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
