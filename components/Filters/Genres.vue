<template>
  <FiltersSearchInput
    :placeholder="`Filter through a hundred genres...`"
    v-model="query"
    @submit="fetchGenres()"
  />
  <FiltersFilterItems
    :items="genres"
    :loading="loading"
    :limit="100"
    filterType="genres"
  />
</template>

<script setup>
const genres = ref([]);
const query = ref("");
const loading = ref(true);

watch(query, async (newQuery, oldQuery) => {
  if (query.value.length === 0) {
    await fetchGenres();
  }
});

const fetchGenres = async () => {
  loading.value = true;
  try {
    const result = await $fetch(`/api/genres?q=${query.value}`);
    genres.value = result;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  await nextTick();
  await fetchGenres();
});
</script>
