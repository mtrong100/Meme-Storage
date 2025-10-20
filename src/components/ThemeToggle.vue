<template>
  <!-- Desktop Version (unchanged) -->
  <div v-if="!mobile" class="relative ml-2">
    <div class="relative group">
      <button
        class="p-2.5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-200 hover:from-green-100 hover:to-emerald-100 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-sm hover:shadow transition-all duration-300 flex items-center space-x-2"
        :title="`Current theme: ${currentThemeLabel}`"
      >
        <component
          :is="icon"
          class="w-5 h-5 transition-transform duration-300"
        />
        <svg
          class="w-4 h-4 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div
        class="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-lg"
      >
        <div class="p-2 space-y-1">
          <button
            v-for="option in themeOptions"
            :key="option.value"
            @click="setTheme(option.value)"
            class="w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-all duration-200 hover:bg-green-50 dark:hover:bg-gray-700/50 text-left"
            :class="{
              'bg-green-50 dark:bg-gray-700/50 text-green-700 dark:text-green-300':
                theme === option.value,
              'text-gray-700 dark:text-gray-300': theme !== option.value,
            }"
          >
            <div class="w-4 h-4 flex items-center justify-center">
              <div
                v-if="theme === option.value"
                class="w-2 h-2 bg-green-500 rounded-full"
              ></div>
            </div>
            <component :is="option.icon" class="w-4 h-4" />
            <span class="flex-1">{{ option.label }}</span>
            <span class="text-xs text-gray-500 dark:text-gray-400 capitalize">{{
              option.value
            }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Version - Using Native Select -->
  <div v-else class="w-full">
    <div class="space-y-2">
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300 block">
        Theme
      </label>
      <select
        v-model="theme"
        @change="setTheme(theme)"
        class="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none"
      >
        <option
          v-for="option in themeOptions"
          :key="option.value"
          :value="option.value"
          class="py-2"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, watch } from "vue";
import { Moon, Sun, Monitor } from "lucide-vue-next";

// Props
const props = defineProps({
  mobile: {
    type: Boolean,
    default: false,
  },
});

// Theme state - initialize from localStorage immediately
const theme = ref(localStorage.getItem("theme") || "system");

// Theme options
const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

// Apply theme immediately to prevent flash
const applyThemeImmediately = () => {
  const savedTheme = localStorage.getItem("theme") || "system";
  const html = document.documentElement;

  if (savedTheme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  } else if (savedTheme === "dark") {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
};

// Apply theme immediately when component is imported
applyThemeImmediately();

// Computed properties
const icon = computed(() => {
  if (theme.value === "dark") return Moon;
  if (theme.value === "light") return Sun;
  return Monitor;
});

const currentThemeLabel = computed(() => {
  const option = themeOptions.find((opt) => opt.value === theme.value);
  return option ? option.label : "System";
});

// Theme methods
const applyTheme = () => {
  const html = document.documentElement;
  if (theme.value === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    html.classList.toggle("dark", prefersDark);
  } else {
    html.classList.toggle("dark", theme.value === "dark");
  }
  localStorage.setItem("theme", theme.value);
};

const setTheme = (newTheme) => {
  theme.value = newTheme;
  applyTheme();
};

// Watch for system theme changes
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const handleSystemThemeChange = (e) => {
  if (theme.value === "system") {
    applyTheme();
  }
};

// Lifecycle
onMounted(() => {
  // Ensure theme is applied (in case of any timing issues)
  applyTheme();
  mediaQuery.addEventListener("change", handleSystemThemeChange);
});

// Cleanup
import { onUnmounted } from "vue";
onUnmounted(() => {
  mediaQuery.removeEventListener("change", handleSystemThemeChange);
});

// Watch theme changes for persistence
watch(theme, () => {
  applyTheme();
});
</script>
