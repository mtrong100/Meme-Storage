<template>
  <section class="max-w-2xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent mb-3"
      >
        Edit Meme
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Update your meme information and media
      </p>
    </div>

    <!-- Loading State -->
    <div
      v-if="!loaded"
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center"
    >
      <div
        class="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
      ></div>
      <p class="text-gray-600 dark:text-gray-400">Loading post data...</p>
    </div>

    <!-- Form Container -->
    <div
      v-else
      class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      <!-- Form -->
      <form @submit.prevent="updatePost" class="p-6 space-y-6">
        <!-- Name Field -->
        <div>
          <label
            class="flex items-center text-sm font-medium mb-3 text-gray-700 dark:text-gray-200"
          >
            <svg
              class="w-4 h-4 mr-2 text-green-600"
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
            Post Name
          </label>
          <input
            v-model="name"
            type="text"
            required
            maxlength="60"
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
            placeholder="Give your post a catchy name..."
          />
          <div
            class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2"
          >
            <span>Required</span>
            <span>{{ name.length }}/60</span>
          </div>
        </div>

        <!-- URL Field -->
        <div>
          <label
            class="flex items-center text-sm font-medium mb-3 text-gray-700 dark:text-gray-200"
          >
            <svg
              class="w-4 h-4 mr-2 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            Media URL
          </label>
          <input
            v-model="url"
            type="url"
            required
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
            placeholder="https://example.com/image.jpg"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Enter a direct link to your image or GIF
          </p>
        </div>

        <!-- Category Field -->
        <div>
          <label
            class="flex items-center text-sm font-medium mb-3 text-gray-700 dark:text-gray-200"
          >
            <svg
              class="w-4 h-4 mr-2 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            Category
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              @click="category = 'image'"
              class="p-4 border-2 rounded-xl text-left transition-all duration-200"
              :class="
                category === 'image'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 dark:text-white'
              "
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Image</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    JPG, PNG, WebP
                  </div>
                </div>
              </div>
            </button>
            <button
              type="button"
              @click="category = 'gif'"
              class="p-4 border-2 rounded-xl text-left transition-all duration-200"
              :class="
                category === 'gif'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-700 dark:text-white'
              "
            >
              <div class="flex items-center space-x-3">
                <div
                  class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-purple-600 dark:text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                  </svg>
                </div>
                <div>
                  <div class="font-medium">GIF</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">
                    Animated GIFs
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Preview Section -->
        <div>
          <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Current Preview
          </h3>
          <div
            class="relative aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            <img
              v-if="url && category === 'image'"
              :src="url"
              :alt="name || 'Preview image'"
              class="w-full h-full object-contain"
              @error="handleImageError"
            />
            <img
              v-else-if="url && category === 'gif'"
              :src="url"
              :alt="name || 'Preview GIF'"
              class="w-full h-full object-contain"
              @error="handleImageError"
            />
            <div v-else class="flex items-center justify-center h-full">
              <div class="text-center text-gray-400">
                <svg
                  class="w-12 h-12 mx-auto mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p class="text-sm">Enter URL to see preview</p>
              </div>
            </div>
          </div>
          <p
            v-if="name"
            class="text-center text-gray-700 dark:text-gray-300 font-medium mt-3 truncate"
          >
            {{ name }}
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-4 pt-4">
          <button
            type="button"
            @click="router.push('/manage')"
            class="flex-1 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            <svg
              v-if="isSubmitting"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
            {{ isSubmitting ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "vue-sonner";

const route = useRoute();
const router = useRouter();

const name = ref("");
const url = ref("");
const category = ref("image");
const loaded = ref(false);
const isSubmitting = ref(false);

const handleImageError = () => {
  toast.error("Failed to load preview. Please check your URL.");
};

onMounted(async () => {
  try {
    const docRef = doc(db, "posts", route.params.id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      const data = snapshot.data();
      name.value = data.name;
      url.value = data.url;
      category.value = data.category;
      loaded.value = true;
    } else {
      toast.error("Post not found!");
      router.push("/manage");
    }
  } catch (error) {
    console.error(error);
    toast.error("Failed to load post data");
    router.push("/manage");
  }
});

const updatePost = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;

  try {
    const docRef = doc(db, "posts", route.params.id);
    await updateDoc(docRef, {
      name: name.value.trim(),
      url: url.value.trim(),
      category: category.value,
      updatedAt: new Date(),
    });

    toast.success("✅ Post updated successfully!");

    // reset form
    name.value = "";
    url.value = "";
    category.value = "image";
  } catch (err) {
    console.error(err);
    toast.error("Failed to update post. Please try again.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>
