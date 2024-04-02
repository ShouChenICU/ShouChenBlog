<script setup>
import { onMounted, ref } from 'vue'
import { timeAgo } from '/utils.js'
import TagIcon from './icons/TagIcon.vue'
import ClockIcon from './icons/ClockIcon.vue'

const { doc } = defineProps(['doc'])

const updateTimeAgo = ref('')

onMounted(() => {
  updateTimeAgo.value = timeAgo(doc.frontmatter.updateTime)
})
</script>

<template>
    <div :class="$style['post-item']">
        aa
    </div>
</template>

<style module>
.post-item{

}
</style>
