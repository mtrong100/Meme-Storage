<template>
  <article
    class="rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 animate-pulse"
  >
    <!-- Image Skeleton -->
    <div
      class="relative h-48 sm:h-56 lg:h-60 w-full overflow-hidden bg-gray-300 dark:bg-gray-700"
    >
      <div
        class="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700"
      ></div>

      <!-- Category Badge Skeleton -->
      <div
        class="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-gray-400 dark:bg-gray-600 w-16 h-6"
      ></div>
    </div>

    <!-- Content Skeleton -->
    <div class="p-4">
      <!-- Title Skeleton -->
      <div class="space-y-2 mb-3">
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
      </div>

      <!-- Meta Information Skeleton -->
      <div class="flex items-center justify-between">
        <div class="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
      </div>

      <!-- Mobile Action Buttons Skeleton -->
      <div class="flex justify-center flex-col gap-2 mt-4 sm:hidden">
        <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
      </div>
    </div>
  </article>
</template>

<script setup>
// This is a skeleton loading component for PostCard
</script>
