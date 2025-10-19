<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-white via-green-50/30 to-emerald-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950 transition-all duration-500"
  >
    <Navbar />

    <main class="flex-grow p-2 sm:p-6 lg:p-8">
      <div class="container w-full mx-auto">
        <RouterView />
      </div>
    </main>

    <footer
      class="text-center py-6 px-4 text-sm text-gray-600 dark:text-gray-400 border-t border-green-200/60 dark:border-emerald-800/40 bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
    >
      <div class="container mx-auto">
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div
            class="flex items-center space-x-2 text-green-700 dark:text-green-400"
          >
            <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span>© {{ new Date().getFullYear() }} Meme Storage</span>
          </div>

          <div
            class="flex items-center space-x-4 text-gray-500 dark:text-gray-400"
          >
            <span class="hidden sm:inline">Built with</span>
            <div class="flex items-center space-x-3">
              <span
                class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs font-medium"
                >Vue</span
              >
              <span
                class="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs font-medium"
                >Firebase</span
              >
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>

  <Toaster position="bottom-right" rich-colors="true" />
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import { Toaster } from "vue-sonner";
</script>
