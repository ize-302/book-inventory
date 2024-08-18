<template>
  <FiltersSearchInput
    :placeholder="`Find awards...`"
    v-model="query"
    @submit="fetchAwards()"
  />
  <FiltersFilterItems
    :items="awards"
    :loading="loading"
    :limit="50"
    filterType="awards"
  />
</template>

<script setup>
const awards = ref([]);
const query = ref("");
const loading = ref(true);

watch(query, async (newQuery, oldQuery) => {
  if (query.value.length === 0) {
    await fetchAwards();
  }
});

const fetchAwards = async () => {
  loading.value = true;
  try {
    const result = await $fetch(`/api/awards?q=${query.value}`);
    awards.value = result;
    loading.value = false;
  } catch (error) {}
};

onMounted(async () => {
  await nextTick();
  await fetchAwards();
});
</script>
