<template>
  <nav
    class="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-gray-900/95 border-b border-green-100/50 dark:border-green-800/50 shadow-sm transition-all duration-300"
  >
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center group">
          <div class="relative">
            <div
              class="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"
            ></div>
            <div class="relative flex items-center space-x-2">
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <span
                class="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent"
              >
                Meme Storage
              </span>
            </div>
          </div>
        </router-link>

        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navItems"
            :key="item.name"
            :to="item.path"
            class="relative px-4 py-2 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-300 hover:text-green-600 dark:hover:text-green-400 group"
            active-class="text-green-600 dark:text-green-400"
          >
            <span class="relative z-10">{{ item.name }}</span>
            <span
              class="absolute inset-0 bg-green-50 dark:bg-green-900/30 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"
              :class="{ 'scale-100': $route.path === item.path }"
            ></span>
          </router-link>

          <!-- Theme Switcher -->
          <ThemeToggle />
        </div>

        <!-- Mobile Menu Button -->
        <button
          class="md:hidden p-2.5 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 text-green-600 dark:text-green-400 hover:from-green-100 hover:to-emerald-100 dark:hover:from-gray-700 dark:hover:to-gray-600 shadow-sm hover:shadow transition-all duration-300"
          @click="open = !open"
          :aria-expanded="open"
          aria-label="Toggle navigation menu"
        >
          <div class="relative w-6 h-6">
            <span
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-current rounded-full transition-all duration-300"
              :class="open ? 'rotate-45' : '-translate-y-1.5'"
            ></span>
            <span
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-current rounded-full transition-all duration-300"
              :class="open ? 'opacity-0' : 'opacity-100'"
            ></span>
            <span
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-current rounded-full transition-all duration-300"
              :class="open ? '-rotate-45' : 'translate-y-1.5'"
            ></span>
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="open"
      class="md:hidden border-t border-green-100/50 dark:border-green-800/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl transition-all duration-300"
      :class="open ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'"
    >
      <div class="flex flex-col space-y-1 px-4 py-3">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.path"
          class="px-4 py-3 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-300 hover:bg-green-50 dark:hover:bg-gray-800/50 hover:text-green-600 dark:hover:text-green-400"
          active-class="text-green-600 dark:text-green-400 bg-green-50 dark:bg-gray-800/50"
          @click="open = false"
        >
          {{ item.name }}
        </router-link>

        <!-- Mobile Theme Toggle -->
        <div class="mt-2">
          <ThemeToggle mobile />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from "vue";
import ThemeToggle from "./ThemeToggle.vue";

const open = ref(false);

const navItems = [
  { name: "Home", path: "/" },
  { name: "Upload", path: "/create" },
  { name: "Manage", path: "/manage" },
];

// Close mobile menu when route changes
watch(
  () => open.value,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }
);
</script>
