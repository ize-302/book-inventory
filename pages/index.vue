<template>
  <!-- <BookSearchInput /> -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <div class="flex flex-col h-full">
      <div class="flex-grow overflow-auto min-h-[200px]">
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-4"
          id="page-top"
        >
          <USkeleton
            v-if="loading"
            v-for="item in Array(30).fill(0)"
            class="h-[200px] w-full"
          />
          <nuxt-link
            :to="`/${item.id}`"
            v-else-if="!loading"
            v-for="item in books"
            class="bg-slate-100 aspect-[2/3] w-full rounded-md overflow-hidden relative"
          >
            <img
              :src="item.image"
              class="object-cover"
              width="100%"
              height="100%"
              style="
                position: absolute;
                height: 100%;
                width: 100%;
                inset: 0px;
                color: transparent;
              "
            />
          </nuxt-link>
        </div>
      </div>
      <div class="mt-auto p-4 border-t flex justify-center">
        <UPagination
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
  }`;
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
