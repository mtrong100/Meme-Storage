<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    :title="`Switch to ${nextTheme} mode`"
  >
    <span v-if="theme === 'light'">🌞</span>
    <span v-else-if="theme === 'dark'">🌙</span>
    <span v-else>🖥️</span>
  </button>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";

const theme = ref(localStorage.getItem("theme") || "system");
const nextTheme = computed(() =>
  theme.value === "light" ? "dark" : theme.value === "dark" ? "system" : "light"
);

const setTheme = (t) => {
  if (t === "system") {
    document.documentElement.classList.toggle(
      "dark",
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  } else {
    document.documentElement.classList.toggle("dark", t === "dark");
  }
  localStorage.setItem("theme", t);
};

watchEffect(() => setTheme(theme.value));

const toggleTheme = () => {
  theme.value = nextTheme.value;
};
</script>
