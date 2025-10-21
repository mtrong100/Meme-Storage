<template>
  <section class="space-y-6">
    <!-- Header with Stats -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Discover Memes
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-1">
          {{
            loading
              ? "Loading..."
              : `${filteredPosts.length} meme${
                  filteredPosts.length !== 1 ? "s" : ""
                } found`
          }}
        </p>
      </div>

      <div
        class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400"
      >
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span>{{ categoryCounts.image || 0 }} Images</span>
        </div>
        <div class="flex items-center space-x-1">
          <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>{{ categoryCounts.gif || 0 }} GIFs</span>
        </div>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div
      class="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search Input -->
        <div class="flex-1">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search posts by name..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <!-- Category Filter -->
        <div class="sm:w-48">
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="all">All Categories</option>
            <option value="image">Images</option>
            <option value="gif">GIFs</option>
          </select>
        </div>

        <!-- Sub Category Filter -->
        <div class="sm:w-48">
          <select
            v-model="selectedSubCategory"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="all">All Sub Categories</option>
            <option
              v-for="subCat in availableSubCategories"
              :key="subCat"
              :value="subCat"
              class="capitalize"
            >
              {{ subCat }}
            </option>
          </select>
        </div>

        <!-- Sort Options -->
        <div class="sm:w-40">
          <select
            v-model="sortBy"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>

        <!-- Clear Filters -->
        <button
          @click="clearFilters"
          class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          :disabled="!hasActiveFilters"
        >
          Clear Filter
        </button>
      </div>

      <!-- Active Filters Badge -->
      <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 mt-3">
        <span class="text-xs text-gray-500 dark:text-gray-400"
          >Active filters:</span
        >
        <span
          v-if="searchQuery"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
        >
          Search: "{{ searchQuery }}"
          <button @click="searchQuery = ''" class="ml-1 hover:text-blue-600">
            ×
          </button>
        </span>
        <span
          v-if="selectedCategory !== 'all'"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
        >
          Category: {{ selectedCategory }}
          <button
            @click="selectedCategory = 'all'"
            class="ml-1 hover:text-green-600"
          >
            ×
          </button>
        </span>
        <span
          v-if="selectedSubCategory !== 'all'"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
        >
          Sub Category: {{ selectedSubCategory }}
          <button
            @click="selectedSubCategory = 'all'"
            class="ml-1 hover:text-orange-600"
          >
            ×
          </button>
        </span>
      </div>
    </div>

    <!-- Skeleton Loading -->
    <div
      v-if="loading"
      class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-5"
    >
      <PostCardSkeleton v-for="n in 20" :key="n" />
    </div>

    <!-- Posts Grid -->
    <div
      v-else-if="filteredPosts.length"
      class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 mt-5"
    >
      <PostCard v-for="post in filteredPosts" :key="post.id" :post="post" />
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <div class="max-w-md mx-auto">
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
        >
          <svg
            class="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No posts found
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          {{
            hasActiveFilters
              ? "Try adjusting your search or filters"
              : "Be the first to create a post!"
          }}
        </p>
        <router-link
          v-if="hasActiveFilters || posts.length === 0"
          to="/create"
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create First Post
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getDocs, orderBy, query } from "firebase/firestore";
import { postsCollection } from "../config/firebase";
import PostCard from "../components/PostCard.vue";
import PostCardSkeleton from "../components/PostCardSkeleton.vue";
import { SUB_CATEGORY } from "../constants";

const posts = ref([]);
const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedSubCategory = ref("all");
const sortBy = ref("newest");
const loading = ref(true);

const availableSubCategories = computed(() => {
  return [...SUB_CATEGORY].sort();
});

const categoryCounts = computed(() => {
  const counts = { image: 0, gif: 0 };
  posts.value.forEach((post) => {
    if (post.category && counts[post.category] !== undefined) {
      counts[post.category]++;
    }
  });
  return counts;
});

const filteredPosts = computed(() => {
  let filtered = posts.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((post) =>
      post.name?.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (post) => post.category === selectedCategory.value
    );
  }

  // Sub Category filter
  if (selectedSubCategory.value !== "all") {
    filtered = filtered.filter(
      (post) => post.subCategory === selectedSubCategory.value
    );
  }

  // Sort
  switch (sortBy.value) {
    case "newest":
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(b.createdAt?.toDate()) - new Date(a.createdAt?.toDate())
      );
      break;
    case "oldest":
      filtered = [...filtered].sort(
        (a, b) =>
          new Date(a.createdAt?.toDate()) - new Date(b.createdAt?.toDate())
      );
      break;
    case "name":
      filtered = [...filtered].sort((a, b) =>
        (a.name || "").localeCompare(b.name || "")
      );
      break;
  }

  return filtered;
});

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    selectedCategory.value !== "all" ||
    selectedSubCategory.value !== "all"
  );
});

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  selectedSubCategory.value = "all";
};

onMounted(async () => {
  try {
    const q = query(postsCollection, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    posts.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Error loading posts:", error);
  } finally {
    loading.value = false;
  }
});
</script>
