<script lang="ts" setup>
const isDark = useDark()

// isDark.value = false
</script>

<template>
  <div>
    post: {{ isDark }}
    <NuxtPage />
  </div>
</template>
