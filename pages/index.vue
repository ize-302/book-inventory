<template>
  <!-- <BookSearchInput /> -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <div class="flex flex-col h-full">
      <div class="flex-grow overflow-auto min-h-[200px]">
        <BooksGrid :loading="loading" :books="books" :skeletonCount="30" />
      </div>
      <div class="mt-auto p-4 border-t flex justify-center bg-white">
        <UPagination
          :max="2"
          size="md"
          v-model="page"
          :page-count="30"
          :total="Number(pagination?.totalItems)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const page = ref(route.query.page ? Number(route.query.page) : 1);
const loading = ref(true);
const books = ref();
const pagination = ref();

const fetchBooks = async () => {
  const queryString = `page=${page.value}&q=${route.query.q ?? ""}&authors=${
    route.query.authors ?? ""
  }&languages=${route.query.languages ?? ""}&genres=${
    route.query.genres ?? ""
  }&awards=${route.query.awards ?? ""}`;
  loading.value = true;
  try {
    const result = await $fetch(`/api/books?${queryString}`);
    books.value = result.items;
    pagination.value = result.pagination;
    loading.value = false;
  } catch (error) {}
};

watch(page, async (newPage, oldPage) => {
  await router.push({
    query: {
      ...route.query,
      page: page.value,
    },
    replace: true,
  });
});

const resetPage = async () => {
  page.value = 1;
  await router.push({
    query: {
      ...route.query,
      page: 1,
    },
    replace: true,
  });
};

watch(
  () => route.query.authors,
  async () => {
    await resetPage();
  }
);

watch(
  () => route.query.languages,
  async () => {
    await resetPage();
  }
);

watch(
  () => route.query.genres,
  async () => {
    await resetPage();
  }
);

watch(
  () => route.query.q,
  async () => {
    await resetPage();
  }
);

watch(
  () => route.query.awards,
  async () => {
    await resetPage();
  }
);

watch(
  () => route.fullPath,
  async () => {
    await fetchBooks();
    const element = document.querySelector("#page-top");
    element.scrollIntoView();
  }
);

onMounted(async () => {
  await nextTick();
  await fetchBooks();
});
</script>
