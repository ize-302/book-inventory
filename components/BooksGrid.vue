<template>
  <div
    class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 p-4"
    id="page-top"
  >
    <USkeleton
      v-if="props.loading"
      v-for="item in Array(props.skeletonCount).fill(0)"
      class="h-[200px] w-full"
    />

    <nuxt-link
      :to="`/${item.id}`"
      v-else-if="!props.loading"
      v-for="item in props.books"
      class="bg-slate-100 aspect-[2/3] w-full rounded-md overflow-hidden relative block transition ease-in-out md:hover:-translate-y-2"
    >
      <NuxtImg
        :src="item.image"
        class="object-cover"
        width="100%"
        height="100%"
        style="height: 100%; width: 100%"
        placeholder="https://placehold.co/600x400"
      />
    </nuxt-link>
  </div>
</template>

<script setup>
const props = defineProps(["loading", "books", "skeletonCount"]);
</script>
