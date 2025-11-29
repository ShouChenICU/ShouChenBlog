<script lang="ts" setup>
const systemSetting = useSystemSetting()
</script>

<template>
  <div>
    <v-responsive>
      <v-app :theme="systemSetting.curTheme">
        <v-app-bar>
          <template v-slot:prepend>
            <v-avatar image="/favicon.webp" class="ml-4"></v-avatar>
          </template>

          <v-app-bar-title>ShouChen's Blog</v-app-bar-title>

          <v-btn icon @click="systemSetting.switchTheme">
            <v-icon :color="systemSetting.isDark ? 'yellow-darken-2' : undefined"
              ><Icon :name="systemSetting.isDark ? 'solar:moon-sleep-bold' : 'solar:sun-bold'"
            /></v-icon>
          </v-btn>
        </v-app-bar>

        <v-main :style="systemSetting.isDark ? '' : 'background-color: #eeeeee'">
          <NuxtPage />
        </v-main>
      </v-app>
    </v-responsive>
  </div>
</template>
