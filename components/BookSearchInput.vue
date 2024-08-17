<template>
  <div class="border-b h-[60px] px-2 bg-white">
    <form
      class="relative flex flex-1 flex-shrink-0 w-full"
      @submit.prevent="handleSearchQuery"
    >
      <UIcon
        size="24"
        name="i-heroicons-magnifying-glass"
        class="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        class="flex h-10 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-none border-0 px-10 py-6 m-1 focus-visible:ring-0 text-base md:text-sm"
        id="search"
        placeholder="Search over 50,000 book titles..."
        name="q"
        v-model="searchQuery"
      />
    </form>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const searchQuery = ref(route.query.q ?? "");

const handleSearchQuery = () => {
  router.push({
    query: {
      ...route.query,
      q: searchQuery.value,
    },
  });
};

watch(searchQuery, async (newSearchQuery, _) => {
  if (newSearchQuery.length === 0) {
    await handleSearchQuery();
  }
});
</script>
