<template>
  <FiltersSearchInput
    :placeholder="`Find authors...`"
    v-model="query"
    @submit="fetchAuthors()"
  />
  <FiltersFilterItems
    :items="authors"
    :loading="loading"
    :limit="50"
    filterType="authors"
  />
</template>

<script setup>
const authors = ref([]);
const query = ref("");
const loading = ref(true);

watch(query, async (newQuery, oldQuery) => {
  if (query.value.length === 0) {
    await fetchAuthors();
  }
});

const fetchAuthors = async () => {
  loading.value = true;
  try {
    const result = await $fetch(`/api/authors?q=${query.value}`);
    authors.value = result;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  await nextTick();
  await fetchAuthors();
});
</script>
