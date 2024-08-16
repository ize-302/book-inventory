<template>
  <FiltersSearchInput
    v-if="!loading"
    :placeholder="`Filter through thousands of authors...`"
    v-model="query"
  />
  <FiltersFilterItems
    :items="filteredAuthors"
    :totalCount="authors.length"
    :loading="loading"
    :limit="150"
    filterType="authors"
  />
</template>

<script setup>
const authors = ref([]);
const filteredAuthors = ref([]);
const query = ref("");
const loading = ref(true);

watch(query, async (newQuery, oldQuery) => {
  if (newQuery.length > 0) {
    const result = [...authors.value]
      .map((item) => item.toLowerCase())
      .filter((author) => author.includes(newQuery.toLowerCase()));
    filteredAuthors.value = result;
  } else if (newQuery.length === 0) {
    filteredAuthors.value = authors.value;
  }
});

onMounted(async () => {
  await nextTick();
  try {
    const result = await $fetch(`/api/authors`);
    authors.value = result;
    filteredAuthors.value = result;
    loading.value = false;
  } catch (error) {}
});
</script>
