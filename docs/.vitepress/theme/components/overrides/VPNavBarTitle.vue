<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useData, useRoute, withBase } from 'vitepress';

const STORAGE_KEY = 'znck-navbar-logo-script';

const { theme, isDark } = useData();
const route = useRoute();
const script = ref<'latin' | 'cyrillic'>('latin');

const logo = computed(() => {
  const variant = isDark.value ? 'dark' : 'light';

  return withBase(`/znck-logo-${script.value}.${variant}.svg`);
});

const siteTitle = 'znck.ru';

const toggleScript = () => {
  const previous = localStorage.getItem(STORAGE_KEY);
  const next = previous === 'cyrillic' ? 'latin' : 'cyrillic';

  script.value = next;
  localStorage.setItem(STORAGE_KEY, next);
};

onMounted(() => {
  toggleScript();
});

watch(
  () => route.path,
  () => {
    toggleScript();
  },
);
</script>

<template>
  <a
    class="VPNavBarTitle"
    :href="withBase('/')"
    :aria-label="siteTitle"
  >
    <img
      class="logo"
      :src="logo"
      alt=""
    />
    <span
      v-if="theme.siteTitle !== false"
      class="title"
      >{{ siteTitle }}</span
    >
  </a>
</template>

<style scoped>
.VPNavBarTitle {
  display: flex;
  align-items: center;
  border-bottom: 1px solid transparent;
  height: var(--vp-nav-height);
  transition: opacity 0.25s;
}

.VPNavBarTitle:hover {
  opacity: 0.8;
}

.logo {
  display: block;
  margin-right: 8px;
  height: 24px;
  width: 24px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}
</style>
