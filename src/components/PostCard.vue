<template>
  <article
    class="group rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
  >
    <!-- Image Container -->
    <div
      class="relative h-48 sm:h-56 lg:h-60 w-full overflow-hidden bg-gray-100 dark:bg-gray-900 cursor-pointer"
      @click="openModal"
    >
      <img
        :src="imageSrc"
        :alt="props.post.name || 'Post image'"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        @error="onImgError"
      />

      <!-- Desktop Hover Overlay with Action Buttons -->
      <div
        class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 items-center justify-center hidden sm:flex"
      >
        <div
          class="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex space-x-2"
        >
          <!-- View Button -->
          <button
            @click.stop="openModal"
            class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
            title="View post"
          >
            <svg
              class="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>

          <!-- Download Button -->
          <button
            @click.stop="downloadMedia"
            class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
            title="Download"
          >
            <svg
              class="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>

          <!-- Copy URL Button -->
          <button
            @click.stop="copyUrl"
            class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full p-3 shadow-lg hover:scale-110 transition-transform"
            title="Copy URL"
          >
            <svg
              class="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Tap Indicator -->
      <div class="absolute inset-0 flex items-center justify-center sm:hidden">
        <div class="bg-black/30 rounded-full p-3 transform scale-75">
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
      </div>

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent"
      ></div>
    </div>

    <!-- Content -->
    <div class="p-3">
      <!-- Title -->
      <h3
        class="text-xs md:text-base font-medium text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors capitalize"
      >
        {{ props.post.name }}
      </h3>

      <!-- Meta Information -->
      <div
        class="flex items-center justify-between mt-3 text-gray-600 dark:text-gray-400 md:text-base text-xs"
      >
        <div class="flex items-center space-x-2">
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span class="md:text-base text-xs">{{ formattedDate }}</span>
        </div>

        <div
          class="flex items-center space-x-1"
          :title="`${props.post.category?.toUpperCase()} file`"
        >
          <div class="w-2 h-2 rounded-full" :class="categoryDotClass"></div>
          <span
            class="font-medium md:text-base text-xs"
            :class="categoryTextClass"
            >{{ categoryLabel }}</span
          >
        </div>
      </div>

      <!-- Mobile Action Buttons -->
      <div class="flex justify-center gap-2 mt-4 sm:hidden">
        <button
          @click="downloadMedia"
          class="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm w-full"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          <!-- <span>Download</span> -->
        </button>

        <button
          @click="copyUrl"
          class="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm w-full"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <!-- <span>Copy URL</span> -->
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div
      v-if="loading"
      class="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        class="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"
      ></div>
    </div>
  </article>

  <!-- Post Modal -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    @click.self="showModal = false"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
    >
      <!-- Modal Header -->
      <div
        class="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700"
      >
        <div class="flex-1 min-w-0">
          <h3
            class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white truncate"
          >
            {{ props.post.name }}
          </h3>
          <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {{ categoryLabel }} • {{ formattedDate }}
          </p>
        </div>
        <div class="flex items-center space-x-1 sm:space-x-2 ml-4">
          <!-- Download Button -->
          <button
            @click="downloadMedia"
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            title="Download"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </button>

          <!-- Copy URL Button -->
          <button
            @click="copyUrl"
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
            title="Copy URL"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>

          <!-- Close Button -->
          <button
            @click="showModal = false"
            class="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Modal Content -->
      <div class="p-4 sm:p-6 max-h-[50vh] sm:max-h-[60vh] overflow-auto">
        <div class="flex justify-center">
          <img
            :src="props.post.url"
            :alt="props.post.name"
            class="max-w-full max-h-[40vh] sm:max-h-[50vh] object-contain rounded-lg"
            @error="handleModalImageError"
          />
        </div>
      </div>

      <!-- Modal Footer -->
      <div
        class="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50"
      >
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
        >
          <div class="flex-1 min-w-0">
            <p
              class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 break-all"
            >
              {{ props.post.url }}
            </p>
          </div>
          <button
            @click="copyUrl"
            class="flex-shrink-0 px-3 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center space-x-2 text-sm sm:text-base mt-2 sm:mt-0"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy URL</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { toast } from "vue-sonner";

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const imgError = ref(false);
const loading = ref(true);
const showModal = ref(false);

const imageSrc = computed(() => {
  if (imgError.value || !props.post.url) {
    return `https://placehold.co/600x400/4ade80/ffffff?text=${encodeURIComponent(
      props.post.name || "Image"
    )}`;
  }
  return props.post.url;
});

const onImgError = () => {
  imgError.value = true;
  loading.value = false;
};

const handleModalImageError = (event) => {
  event.target.src = `https://placehold.co/800x600/6b7280/ffffff?text=Image+Not+Found`;
};

const categoryLabel = computed(() => {
  return props.post.category === "gif" ? "GIF" : "Image";
});

const categoryDotClass = computed(() => {
  return props.post.category === "gif" ? "bg-purple-500" : "bg-green-500";
});

const categoryTextClass = computed(() => {
  return props.post.category === "gif"
    ? "text-purple-600 dark:text-purple-400"
    : "text-green-600 dark:text-green-400";
});

const formattedDate = computed(() => {
  const t = props.post.createdAt;
  let d = new Date();

  if (t?.toDate) d = t.toDate();
  else if (t instanceof Date) d = t;
  else if (typeof t === "string") d = new Date(t);

  // ✅ Format as dd/mm/yyyy
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
});

const openModal = () => {
  showModal.value = true;
};

const downloadMedia = () => {
  try {
    // Get file extension from URL or use category
    let extension = "jpg";
    const url = props.post.url.toLowerCase();

    if (props.post.category === "gif") {
      extension = "gif";
    } else if (url.includes(".png")) {
      extension = "png";
    } else if (url.includes(".jpeg") || url.includes(".jpg")) {
      extension = "jpg";
    } else if (url.includes(".webp")) {
      extension = "webp";
    }

    // Create filename
    const filename = `${props.post.name
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase()}.${extension}`;

    // Create and trigger download
    const link = document.createElement("a");
    link.href = props.post.url;
    link.download = filename;
    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
    toast.error("Download failed. Please try again.");
  }
};

const copyUrl = async () => {
  try {
    await navigator.clipboard.writeText(props.post.url);
    toast.success("URL copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy URL:", err);
    toast.error("Failed to copy URL");
  }
};

onMounted(() => {
  const img = new Image();
  img.src = imageSrc.value;
  img.onload = () => {
    loading.value = false;
  };
  img.onerror = () => {
    loading.value = false;
    imgError.value = true;
  };
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
