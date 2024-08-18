<template>
  <FiltersSearchInput
    :placeholder="`Filter language...`"
    v-model="query"
    @submit="fetchLanguages()"
  />
  <FiltersFilterItems
    :items="languages"
    :limit="100"
    :loading="loading"
    filterType="languages"
  />
</template>

<script setup>
const languages = ref([]);
const query = ref("");
const loading = ref(true);

watch(query, async (newQuery, oldQuery) => {
  if (query.value.length === 0) {
    await fetchLanguages();
  }
});

const fetchLanguages = async () => {
  loading.value = true;
  try {
    const result = await $fetch(`/api/languages?q=${query.value}`);
    languages.value = result;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  await nextTick();
  await fetchLanguages();
});
</script>
