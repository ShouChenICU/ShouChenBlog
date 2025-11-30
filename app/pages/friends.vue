<script setup lang="ts">
definePageMeta({
  layout: 'main'
})
const siteUrl = useSiteConfig().url
useSeoMeta({
  title: '友链',
  ogImage: siteUrl + '/ogImg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: '友链',
  twitterDescription: '我的朋友们',
  twitterImage: siteUrl + '/ogImg.webp',
  twitterSite: 'https://shouchen.blog',
  twitterCreator: 'ShouChen_'
})

const sysSetting = useSystemSetting()

onMounted(() => {
  sysSetting.bgUrl = '/bg.webp'
})

interface Friend {
  name: string
  description: string
  url: string
  avatar: string
}

const friends: Friend[] = [
  //   {
  //     name: 'ShouChen',
  //     description: '做自己喜欢的事',
  //     url: 'https://shouchen.blog',
  //     avatar: 'https://shouchen.blog/favicon.webp'
  //   }
]
</script>

<template>
  <div
    class="relative p-4 rounded-3xl frosted-glass-heavy glass-high-light"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: -90deg"
  >
    <div class="p-6 flex flex-col gap-8 text-neutral-300">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-neutral-200 mb-6 relative inline-block">
          我的朋友们
          <span
            class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
          ></span>
        </h2>
        <p class="text-neutral-400">海内存知己，天涯若比邻</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          v-for="(friend, index) in friends"
          :key="index"
          :href="friend.url"
          target="_blank"
          class="group"
        >
          <div
            class="p-4 rounded-xl bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 transition-all duration-300 h-full flex items-center gap-4"
          >
            <img
              :src="friend.avatar"
              :alt="friend.name"
              class="size-14 rounded-full border border-white/20 object-cover"
            />
            <div class="flex-1 min-w-0">
              <h4
                class="text-[#51a8dd] group-hover:text-rose-500 font-medium mb-1 transition-colors truncate"
              >
                {{ friend.name }}
              </h4>
              <p class="text-neutral-400 text-sm truncate">{{ friend.description }}</p>
            </div>
          </div>
        </a>
      </div>

      <div v-if="friends.length === 0" class="text-center py-10 text-neutral-500">
        <Icon name="solar:sad-square-linear" size="48" class="mb-2 mx-auto" />
        <p>暂时还没有友链哦~</p>
      </div>

      <!-- 申请友链 -->
      <div class="mt-8 border-t border-white/10 pt-8">
        <h3 class="text-lg font-semibold text-neutral-200 mb-4">申请友链</h3>
        <div class="bg-white/5 rounded-xl p-6 text-sm text-neutral-300 leading-relaxed">
          <p class="mb-2">欢迎交换友链！请在申请前确保您的网站满足以下条件：</p>
          <ul class="list-disc list-inside mb-4 space-y-1 text-neutral-400">
            <li>网站内容健康积极，无违法违规内容</li>
            <li>网站能够正常访问，且有一定的内容更新</li>
            <li>已添加本站友链</li>
          </ul>
          <p class="mb-2">本站信息：</p>
          <div class="bg-black/20 p-4 rounded-lg font-mono text-xs select-all">
            name: 守晨<br />
            desc: 做自己喜欢的事🍀<br />
            url: https://shouchen.blog<br />
            avatar: https://shouchen.blog/favicon.webp
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
