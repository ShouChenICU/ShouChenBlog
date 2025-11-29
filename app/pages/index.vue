<script lang="ts" setup>
definePageMeta({ layout: 'main' })

const postStore = usePostStore()
await postStore.loadAll()
</script>

<template>
  <v-container>
    <v-row class="flex-md-row align-md-start">
      <v-col cols="12" md="4" style="position: sticky; top: 0">
        <v-card rounded="xl" style="position: sticky; top: 0">
          <v-card-text class="d-flex flex-column align-center justify-center">
            <div style="height: 1rem"></div>
            <v-avatar image="/favicon.webp" size="96" class="elevation-2" />
            <p class="text-subtitle-1 font-weight-bold mt-2">ShouChen</p>
          </v-card-text>

          <v-divider />

          <v-card-text class="d-flex flex-row justify-space-evenly align-center">
            <v-btn icon href="https://x.com/shouchen_" target="_blank" theme="light">
              <v-icon>
                <Icon name="logos:x" />
              </v-icon>
            </v-btn>
            <v-btn icon href="https://github.com/shouchenicu" target="_blank" theme="light">
              <v-icon>
                <Icon name="logos:github-icon" />
              </v-icon>
            </v-btn>
            <v-btn icon href="https://qm.qq.com/q/zSSm9ew4c8" target="_blank" theme="light">
              <v-icon>
                <Icon name="my-icon:qq" />
              </v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="8">
        <v-sheet style="height: 1000px" class="rounded-xl pa-4">ababab</v-sheet>
      </v-col>
    </v-row>

    <v-divider class="my-8">Posts</v-divider>

    <v-card rounded="lg" class="mt-4">
      <v-card-item>
        <v-card-title>Card</v-card-title>
      </v-card-item>

      <v-card-text> abab </v-card-text>
    </v-card>

    <v-card rounded="lg" class="mt-4">
      <v-card-item>
        <v-card-title>Card</v-card-title>
      </v-card-item>

      <v-card-text> abab </v-card-text>
    </v-card>

    {{ postStore.postCount }}
    <!-- {{ postList }} -->
    <NuxtLink v-for="(item, idx) in postStore.posts" :key="idx" :to="`/post${item.path}`">{{
      item.path
    }}</NuxtLink>
    <PageFooter />
  </v-container>
</template>
