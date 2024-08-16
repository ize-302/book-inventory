<template>
  <FiltersSearchInput
    v-if="!loading"
    :placeholder="`Filter through a hundred genres...`"
    v-model="query"
  />
  <FiltersFilterItems
    :items="filteredGenres"
    :totalCount="genres.length"
    :loading="loading"
    :limit="100"
    filterType="genres"
  />
</template>

<script setup>
const genres = ref([]);
const filteredGenres = ref([]);
const query = ref("");
const loading = ref(true);

watch(query, async (newQuery, oldQuery) => {
  if (newQuery.length > 0) {
    const result = [...genres.value]
      .map((item) => item.toLowerCase())
      .filter((genre) => genre.includes(newQuery.toLowerCase()));
    filteredGenres.value = result;
  } else if (newQuery.length === 0) {
    filteredGenres.value = authors.value;
  }
});

onMounted(async () => {
  await nextTick();
  try {
    const result = await $fetch(`/api/genres`);
    genres.value = result;
    filteredGenres.value = result;
    loading.value = false;
  } catch (error) {}
});
</script>
