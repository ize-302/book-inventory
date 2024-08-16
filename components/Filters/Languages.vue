<template>
  <FiltersSearchInput
    v-if="!loading"
    :placeholder="`Filter language...`"
    v-model="query"
  />
  <FiltersFilterItems
    :items="filteredLanguages"
    :totalCount="languages.length"
    :limit="100"
    :loading="loading"
    filterType="languages"
  />
</template>

<script setup>
const languages = ref([]);
const filteredLanguages = ref([]);
const query = ref("");
const loading = ref(true);

watch(query, async (newQuery, oldQuery) => {
  if (newQuery.length > 0) {
    const result = [...languages.value]
      .map((item) => item.toLowerCase())
      .filter((author) => author.includes(newQuery.toLowerCase()));
    filteredLanguages.value = result;
  } else if (newQuery.length === 0) {
    filteredLanguages.value = languages.value;
  }
});

onMounted(async () => {
  await nextTick();
  try {
    const result = await $fetch(`/api/languages`);
    languages.value = result;
    filteredLanguages.value = result;
    loading.value = false;
  } catch (error) {}
});
</script>
