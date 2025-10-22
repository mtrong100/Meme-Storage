<template>
  <section>
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div>
        <h1
          class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent mb-2"
        >
          Manage Posts
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          View, edit, and manage all your posts in one place
        </p>
      </div>

      <div class="flex items-center space-x-4">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          <span class="font-semibold text-green-600 dark:text-green-400">{{
            filteredPosts.length
          }}</span>
          of {{ posts.length }} post{{ posts.length !== 1 ? "s" : "" }}
        </div>
      </div>
    </div>

    <!-- Search and Filter Bar -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
    >
      <div class="flex flex-col lg:flex-row gap-4">
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
              placeholder="Search posts by name or URL..."
              class="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <!-- Category Filter -->
        <div class="lg:w-48">
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all capitalize"
          >
            <option value="all">All Categories</option>
            <option value="image">Images</option>
            <option value="gif">GIFs</option>
          </select>
        </div>

        <!-- Sub Category Filter -->
        <div class="lg:w-48">
          <select
            v-model="selectedSubCategory"
            class="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all capitalize"
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
        <div class="lg:w-48">
          <select
            v-model="sortBy"
            class="w-full px-3 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all capitalize"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name A-Z</option>
            <option value="category">Category</option>
            <option value="subCategory">Sub Category</option>
          </select>
        </div>

        <!-- Clear Filters -->
        <button
          @click="clearFilters"
          class="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
          :disabled="!hasActiveFilters"
        >
          Clear
        </button>
      </div>

      <!-- Active Filters Badge -->
      <div
        v-if="hasActiveFilters"
        class="flex flex-wrap items-center gap-2 mt-4"
      >
        <span class="text-sm text-gray-500 dark:text-gray-400"
          >Active filters:</span
        >
        <span
          v-if="searchQuery"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
        >
          Search: "{{ searchQuery }}"
          <button @click="searchQuery = ''" class="ml-2 hover:text-blue-600">
            ×
          </button>
        </span>
        <span
          v-if="selectedCategory !== 'all'"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
        >
          Category: {{ selectedCategory }}
          <button
            @click="selectedCategory = 'all'"
            class="ml-2 hover:text-green-600"
          >
            ×
          </button>
        </span>
        <span
          v-if="selectedSubCategory !== 'all'"
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300"
        >
          Sub Category: {{ selectedSubCategory }}
          <button
            @click="selectedSubCategory = 'all'"
            class="ml-2 hover:text-orange-600"
          >
            ×
          </button>
        </span>
        <span
          class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300"
        >
          Sort: {{ sortLabels[sortBy] }}
          <button @click="sortBy = 'newest'" class="ml-2 hover:text-purple-600">
            ×
          </button>
        </span>
      </div>
    </div>

    <!-- Posts Table -->
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <!-- Loading State -->
      <div v-if="loading" class="p-12 text-center">
        <div
          class="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
        ></div>
        <p class="text-gray-600 dark:text-gray-400">Loading your posts...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="posts.length === 0" class="p-12 text-center">
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
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
              stroke-width="1.5"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No posts yet
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          Create your first post to get started
        </p>
        <router-link
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
          Create Post
        </router-link>
      </div>

      <!-- No Results State -->
      <div
        v-else-if="filteredPosts.length === 0 && hasActiveFilters"
        class="p-12 text-center"
      >
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center"
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
              stroke-width="1.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No posts found
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          Try adjusting your search or filters
        </p>
        <button
          @click="clearFilters"
          class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          Clear Filters
        </button>
      </div>

      <!-- Posts Table -->
      <div v-else-if="filteredPosts.length > 0" class="overflow-x-auto">
        <table class="w-full">
          <thead
            class="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600"
          >
            <tr>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                Post
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                Sub Category
              </th>
              <th
                class="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                Created
              </th>
              <th
                class="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr
              v-for="post in filteredPosts"
              :key="post.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
            >
              <!-- Post Info -->
              <td class="px-6 py-4">
                <div class="flex items-center space-x-4">
                  <div
                    class="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700"
                  >
                    <img
                      :src="post.url"
                      :alt="post.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p
                      class="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]"
                    >
                      {{ post.name }}
                    </p>
                    <p
                      class="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]"
                    >
                      {{ post.url }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Category -->
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="
                    post.category === 'gif'
                      ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                  "
                >
                  {{ post.category === "gif" ? "GIF" : "Image" }}
                </span>
              </td>

              <!-- Sub Category -->
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 capitalize"
                >
                  {{ post.subCategory }}
                </span>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900 dark:text-white">
                  {{ formatDate(post.createdAt) }}
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatTime(post.createdAt) }}
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-right space-x-3">
                <router-link
                  :to="`/edit/${post.id}`"
                  class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <svg
                    class="w-4 h-4 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </router-link>
                <button
                  @click="confirmDelete(post)"
                  class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <svg
                    class="w-4 h-4 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div
        class="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-xl"
      >
        <div class="flex items-center space-x-3 mb-4">
          <div
            class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Delete Post
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              This action cannot be undone
            </p>
          </div>
        </div>

        <p class="text-gray-700 dark:text-gray-300 mb-6">
          Are you sure you want to delete "<span class="font-semibold">{{
            postToDelete?.name
          }}</span
          >"?
        </p>

        <div class="flex space-x-3">
          <button
            @click="showDeleteModal = false"
            class="flex-1 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            @click="deletePost"
            :disabled="deleting"
            class="flex-1 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <svg
              v-if="deleting"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ deleting ? "Deleting..." : "Delete" }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db, subCategoriesCollection } from "../config/firebase";
import { toast } from "vue-sonner";

const posts = ref([]);
const subCategories = ref([]);
const loading = ref(true);
const showDeleteModal = ref(false);
const postToDelete = ref(null);
const deleting = ref(false);
const searchQuery = ref("");
const selectedCategory = ref("all");
const selectedSubCategory = ref("all");
const sortBy = ref("newest");

const availableSubCategories = computed(() => {
  // Extract names from subcategories and sort them alphabetically
  return subCategories.value
    .map((subCat) => subCat.name)
    .sort((a, b) => a.localeCompare(b));
});

const sortLabels = {
  newest: "Newest First",
  oldest: "Oldest First",
  name: "Name A-Z",
  category: "Category",
  subCategory: "Sub Category",
};

const filteredPosts = computed(() => {
  let filtered = posts.value;

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.name?.toLowerCase().includes(query) ||
        post.url?.toLowerCase().includes(query)
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
    case "category":
      filtered = [...filtered].sort((a, b) =>
        (a.category || "").localeCompare(b.category || "")
      );
      break;
    case "subCategory":
      filtered = [...filtered].sort((a, b) =>
        (a.subCategory || "").localeCompare(b.subCategory || "")
      );
      break;
  }

  return filtered;
});

const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    selectedCategory.value !== "all" ||
    selectedSubCategory.value !== "all" ||
    sortBy.value !== "newest"
  );
});

const clearFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "all";
  selectedSubCategory.value = "all";
  sortBy.value = "newest";
};

const handleImageError = (event) => {
  event.target.src = `https://placehold.co/100x100/6b7280/ffffff?text=Image`;
};

const formatDate = (t) => {
  let d = new Date();
  if (t?.toDate) d = t.toDate();
  else if (t instanceof Date) d = t;
  else if (typeof t === "string") d = new Date(t);

  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatTime = (t) => {
  let d = new Date();
  if (t?.toDate) d = t.toDate();
  else if (t instanceof Date) d = t;
  else if (typeof t === "string") d = new Date(t);

  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const confirmDelete = (post) => {
  postToDelete.value = post;
  showDeleteModal.value = true;
};

const deletePost = async () => {
  if (!postToDelete.value) return;

  deleting.value = true;

  try {
    await deleteDoc(doc(db, "posts", postToDelete.value.id));
    toast.success("🗑️ Post deleted successfully!");
    await fetchPosts();
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete post. Please try again.");
  } finally {
    deleting.value = false;
    showDeleteModal.value = false;
    postToDelete.value = null;
  }
};

const fetchPosts = async () => {
  try {
    loading.value = true;

    // Fetch posts and subcategories concurrently
    const [postsSnapshot, subCategoriesSnapshot] = await Promise.all([
      getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc"))),
      getDocs(subCategoriesCollection),
    ]);

    // Process posts data
    posts.value = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Process subcategories data
    subCategories.value = subCategoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error(err);
    toast.error("Failed to load posts");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPosts);
</script>
