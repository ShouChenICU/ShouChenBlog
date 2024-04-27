<script setup></script>

<template>
  <div :class="$style['fl-container']">友情链接</div>
</template>

<style module>
.fl-container {
  padding: 1rem;
  padding-right: 10vw;
}

@media screen and (max-width: 768px) {
  .fl-container {
    padding: 0;
  }
}
</style>
