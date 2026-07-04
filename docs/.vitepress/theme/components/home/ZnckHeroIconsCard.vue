<script setup lang="ts">
import { ref } from 'vue';
import ZnckHeroIconsAnimation from './ZnckHeroIconsAnimation.vue'

const animationRun = ref(1)
</script>

<template>
  <ZnckHeroIconsAnimation
    :key="animationRun"
    @animation-complete="animationRun++"
  />
</template>