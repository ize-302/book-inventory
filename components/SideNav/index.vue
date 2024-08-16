<template>
  <div class="w-[310px] flex-shrink-0 border-r flex flex-col h-full">
    <div class="p-4 border-b mb-2 h-[60px]">
      <h2
        class="flex gap-2 items-center text-lg font-semibold tracking-tight text-green-600"
      >
        <UIcon size="24" name="i-heroicons-book-open" />
        <span>Book inventory</span>
      </h2>
    </div>

    <div class="relative overflow-y-hidden flex-grow px-2">
      <UAccordion :items="filters" size="lg">
        <template #authors>
          <FiltersAuthors />
        </template>
        <template #genres>
          <FiltersGenres />
        </template>
        <template #languages>
          <FiltersLanguages />
        </template>
      </UAccordion>
    </div>
  </div>
</template>

<script setup>
const filters = [
  {
    label: "Authors",
    icon: "i-heroicons-users",
    slot: "authors",
  },
  {
    label: "Genres",
    icon: "i-heroicons-adjustments-horizontal",
    slot: "genres",
  },
  {
    label: "Languages",
    icon: "i-heroicons-language",
    slot: "languages",
  },
];
</script>
