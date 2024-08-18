<template>
  <div class="px-4 pb-20">
    <div class="my-4 mb-10">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        @click="router.back()"
        ><span class="ml-1">Back to books</span></UButton
      >
    </div>
    <!-- skeleton -->
    <div v-if="loading" class="flex flex-col lg:flex-row gap-4 w-full mt-2">
      <div class="w-1/4 mr-6 flex-none relative aspect-[2/3] mb-6">
        <USkeleton class="w-full h-[300px] md:h-[300px] lg:h-[500px]" />
      </div>
      <div class="max-w-[800px] space-y-5">
        <USkeleton class="w-[600px] h-[30px]" />
        <USkeleton class="w-[300px] h-[30px]" />
        <br />
        <USkeleton class="mt-10 w-[800px] h-[30px]" />
        <USkeleton class="w-[700px] h-[30px]" />
        <USkeleton class="w-[500px] h-[30px]" />
        <USkeleton class="w-[300px] h-[30px]" />
      </div>
    </div>

    <!-- real -->
    <div v-else class="flex flex-col lg:flex-row gap-4 w-full mt-2">
      <div class="w-1/4 mr-6 flex-none relative aspect-[2/3] mb-6">
        <img
          :src="book?.image"
          class="object-cover rounded-md shadow-md"
          width="100%"
        />
      </div>
      <div>
        <h1 class="mb-2 text-2xl md:text-5xl font-bold">{{ book?.title }}</h1>
        <p v-if="book?.author" class="mb-1 text-slate-500 text-lg">
          {{ book.author }}
        </p>

        <p v-if="book?.description" class="my-4 opacity-80">
          {{ book.description }}
        </p>
        <div class="flex flex-row items-center">
          <div class="w-full lg:w-1/2">
            <p v-if="book?.publisher" class="mb-1 text-slate-500 text-lg">
              Published by {{ book.publisher }}
            </p>
            <p v-if="book?.isbn" class="mb-1 text-slate-500 text-lg">
              ISBN {{ book.isbn }}
            </p>
            <p v-if="book?.pages" class="text-slate-500 text-lg">
              {{ book.pages }} pages
            </p>
          </div>
          <div class="flex flex-col items-center gap-1">
            <CircleProgressBar
              v-if="book?.likedPercent"
              size="60"
              colorFilled="#FF5533"
              strokeWidth="8px"
              :value="book?.likedPercent / 10"
              :max="10"
              :percentage="true"
            >
            </CircleProgressBar>
            <span>Rating</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CircleProgressBar } from "circle-progress.vue";

const router = useRouter();
const route = useRoute();
const book = ref();
const loading = ref(true);

const fetchBook = async () => {
  loading.value = true;
  try {
    const result = await $fetch(`/api/books/${route.params.id}`);
    book.value = result;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  await nextTick();
  await fetchBook();
});

definePageMeta({
  layout: "detail",
});
</script>
