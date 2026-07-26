<script setup lang="ts">
definePageMeta({
  layout: 'main'
})

const siteUrl = useSiteConfig().url
useSeoMeta({
  title: '友链',
  description: '与有趣的灵魂在互联网相遇',
  ogImage: siteUrl + '/ogImg.webp',
  twitterCard: 'summary_large_image',
  twitterTitle: '友链',
  twitterDescription: '与有趣的灵魂在互联网相遇',
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

interface SiteInfoItem {
  key: string
  label: string
  value: string
}

const friends: Friend[] = [
  {
    name: 'Lens Zzz',
    description: '梦的碎片，散落在尘世间',
    url: 'https://wimzylens.blogspot.com',
    avatar:
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg09_WUSWZBCJ8CNDIUsVd9_b2U6VByuWrZwPYgt_9AIxRNABDq3arJbxO_YiFxVtFFugNU8iU_u4x7hMZqquoVGdPA0YtCkCyoJC9KEKTKaXILD21YKHjPn0dEHKGjdWAdkmbrbn3wOXVopxhoeZDReIkKQo3V5skMfWXQnM9FqF_BHvE/s1600/94d36.jpg'
  },
  {
    name: 'Dragon1573',
    description: '一个装满了涩涩（雾）知识的站点',
    url: 'https://blog.dragon1573.wang',
    avatar: 'https://blog.dragon1573.wang/images/404.png'
  }
]

const requirements = [
  {
    icon: 'solar:shield-check-linear',
    title: '内容友好',
    description: '内容健康积极，无违法违规内容'
  },
  {
    icon: 'solar:refresh-circle-linear',
    title: '保持活跃',
    description: '网站可正常访问，并保持内容更新'
  },
  {
    icon: 'solar:link-round-linear',
    title: '双向链接',
    description: '申请前请先添加本站友链'
  }
]

const siteInfo: SiteInfoItem[] = [
  { key: 'name', label: '名称', value: '守晨' },
  { key: 'desc', label: '简介', value: '做自己喜欢的事🍀' },
  { key: 'url', label: '地址', value: 'https://shouchen.blog' },
  { key: 'avatar', label: '头像', value: 'https://shouchen.blog/favicon.webp' }
]

const copiedKey = ref<string | null>(null)
const copyFailed = ref(false)
let copyFeedbackTimer: ReturnType<typeof setTimeout> | undefined

async function writeClipboard(value: string) {
  if (navigator.clipboard?.writeText && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(value)
      return
    } catch {
      // 浏览器拒绝剪贴板权限时，继续使用兼容方案
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = value
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  const success = document.execCommand('copy')
  textarea.remove()

  if (!success) {
    throw new Error('Clipboard copy failed')
  }
}

async function copyInfo(value: string, key: string) {
  clearTimeout(copyFeedbackTimer)

  try {
    await writeClipboard(value)
    copyFailed.value = false
  } catch {
    copyFailed.value = true
  }

  copiedKey.value = key
  copyFeedbackTimer = setTimeout(() => {
    copiedKey.value = null
    copyFailed.value = false
  }, 1800)
}

function copyLabel(key: string) {
  if (copiedKey.value !== key) return '复制'
  return copyFailed.value ? '复制失败' : '已复制'
}

onBeforeUnmount(() => {
  clearTimeout(copyFeedbackTimer)
})
</script>

<template>
  <main
    class="relative overflow-hidden rounded-3xl p-3 sm:p-4 frosted-glass-heavy glass-high-light"
    style="--glass-border-radius: 1.5rem; --glass-highlight-angle: -90deg"
  >
    <div class="flex flex-col gap-4 sm:gap-5">
      <header
        class="rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.07] to-sky-400/[0.045] px-5 py-5 sm:px-6"
      >
        <div class="flex items-center gap-4">
          <div
            class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/[0.08] text-sky-300"
          >
            <Icon name="solar:users-group-rounded-linear" class="size-5" />
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold tracking-wide text-neutral-100 sm:text-2xl">我的朋友们</h1>
            <p class="mt-1.5 text-xs leading-5 text-neutral-400 sm:text-sm">
              海内存知己，天涯若比邻。愿每一次链接，都是一场有趣的相遇。
            </p>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="friend-list-title"
        class="rounded-2xl border border-white/10 bg-black/15 p-4 sm:p-6"
      >
        <div class="mb-5 flex items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div
              class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-sky-300/10 bg-sky-300/[0.06] text-sky-300"
            >
              <Icon name="solar:planet-2-linear" class="size-5" />
            </div>
            <div>
              <h2 id="friend-list-title" class="font-semibold text-neutral-100">友邻</h2>
              <p class="mt-1 text-xs text-neutral-500">一些值得常去看看的地方</p>
            </div>
          </div>
          <span
            class="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-neutral-400"
          >
            {{ friends.length.toString().padStart(2, '0') }}
          </span>
        </div>

        <div v-if="friends.length" class="grid grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-3">
          <a
            v-for="friend in friends"
            :key="friend.url"
            :href="friend.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/25 hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
          >
            <img
              :src="friend.avatar"
              :alt="`${friend.name} 的头像`"
              loading="lazy"
              class="size-14 shrink-0 rounded-full border border-white/15 bg-white/5 object-cover p-0.5"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5">
                <h3
                  class="truncate font-medium text-[#70b9e5] transition-colors group-hover:text-sky-300"
                >
                  {{ friend.name }}
                </h3>
                <Icon
                  name="solar:arrow-right-up-linear"
                  class="size-4 shrink-0 text-neutral-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-300"
                />
              </div>
              <p class="mt-1 truncate text-sm text-neutral-400">{{ friend.description }}</p>
            </div>
          </a>
        </div>

        <div
          v-else
          class="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.025] px-5 py-10 text-center"
        >
          <div
            class="flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sky-300"
          >
            <Icon name="solar:planet-3-linear" class="size-6" />
          </div>
          <h3 class="mt-4 font-medium text-neutral-200">等待第一位朋友</h3>
          <p class="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
            这里暂时很安静。如果你也在认真记录和分享，欢迎来交换一张互联网名片。
          </p>
          <a
            href="#apply"
            class="mt-5 inline-flex items-center gap-1.5 rounded-lg border border-sky-300/20 bg-sky-300/10 px-3.5 py-2 text-sm text-sky-200 transition hover:border-sky-300/35 hover:bg-sky-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
          >
            交换友链
            <Icon name="solar:arrow-down-linear" class="size-4" />
          </a>
        </div>
      </section>

      <section
        id="apply"
        aria-labelledby="apply-title"
        class="scroll-mt-24 rounded-2xl border border-white/10 bg-black/15 p-4 sm:p-6"
      >
        <details class="group">
          <summary
            class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50 [&::-webkit-details-marker]:hidden"
          >
            <span class="flex items-center gap-2">
              <Icon name="solar:link-circle-linear" class="size-5 text-emerald-300" />
              <h2 id="apply-title" class="font-semibold text-neutral-100">申请友链</h2>
            </span>
            <Icon
              name="solar:alt-arrow-down-linear"
              class="size-5 shrink-0 text-neutral-500 transition-transform duration-300 group-open:rotate-180"
            />
          </summary>

          <div class="mt-5 border-t border-white/[0.07] pt-5 sm:mt-6 sm:pt-6">
            <p class="mb-5 text-sm leading-6 text-neutral-500">
              欢迎交换友链，提交前简单确认下面三件事即可。
            </p>

            <div class="grid gap-3 sm:grid-cols-3">
              <div
                v-for="(requirement, index) in requirements"
                :key="requirement.title"
                class="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
              >
                <div class="flex items-center justify-between">
                  <Icon :name="requirement.icon" class="size-7 text-emerald-300" />
                  <span class="font-mono text-2xl font-light leading-none text-neutral-600/80">
                    {{ (index + 1).toString().padStart(2, '0') }}
                  </span>
                </div>
                <h3 class="mt-3 text-sm font-medium text-neutral-200">{{ requirement.title }}</h3>
                <p class="mt-1.5 text-xs leading-5 text-neutral-500">
                  {{ requirement.description }}
                </p>
              </div>
            </div>

            <div
              id="site-info"
              class="mt-4 rounded-xl border border-white/10 bg-neutral-950/45 p-4"
            >
              <div>
                <h3 class="text-sm font-medium text-neutral-200">本站信息</h3>
                <p class="mt-1 text-xs text-neutral-500">点击任意卡片即可复制对应内容</p>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  v-for="item in siteInfo"
                  :key="item.key"
                  type="button"
                  class="group min-w-0 rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 text-left transition hover:border-sky-300/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60"
                  :class="{
                    'border-emerald-300/20 bg-emerald-300/[0.06]': copiedKey === item.key
                  }"
                  :aria-label="`复制${item.label}：${item.value}`"
                  @click="copyInfo(item.value, item.key)"
                >
                  <span class="flex items-center justify-between gap-2">
                    <span class="text-xs text-neutral-500">{{ item.label }}</span>
                    <span
                      class="inline-flex items-center gap-1 text-[11px] transition-colors"
                      :class="copiedKey === item.key ? 'text-emerald-300' : 'text-neutral-600'"
                    >
                      <Icon
                        :name="
                          copiedKey === item.key && !copyFailed
                            ? 'solar:check-circle-linear'
                            : 'solar:copy-linear'
                        "
                        class="size-3.5"
                      />
                      {{ copyLabel(item.key) }}
                    </span>
                  </span>
                  <span
                    class="mt-2 block min-w-0 truncate font-mono text-xs text-neutral-300 sm:text-[13px]"
                    :title="item.value"
                  >
                    {{ item.value }}
                  </span>
                </button>
              </div>
            </div>

            <div
              class="mt-4 flex flex-col gap-3 rounded-xl border border-sky-300/10 bg-sky-300/[0.045] px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <p class="text-sm text-neutral-400">
                添加完成后，把你的名称、简介、地址和头像发给我。
              </p>
              <a
                href="https://qm.qq.com/q/zSSm9ew4c8"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex shrink-0 items-center gap-1.5 self-start text-sm text-sky-300 transition hover:text-sky-200 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/60 sm:self-auto"
              >
                通过 QQ 联系
                <Icon name="solar:arrow-right-up-linear" class="size-4" />
              </a>
            </div>
          </div>
        </details>
      </section>
    </div>

    <p class="sr-only" aria-live="polite">
      {{ copiedKey ? (copyFailed ? '复制失败，请手动选择内容复制' : '内容已复制到剪贴板') : '' }}
    </p>
  </main>
</template>
