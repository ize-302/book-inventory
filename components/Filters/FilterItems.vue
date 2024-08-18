<template>
  <div class="pl-3">
    <div class="flex items-center justify-between gap-2 pt-2">
      <p class="text-xs text-green-600">
        {{ queryStringArray.length }}
        {{ props.filterType }} selected
      </p>
      <button
        @click="() => handleResetFilter()"
        v-if="queryStringArray.length > 0"
        class="mr-2 text-xs px-1"
        size="xs"
      >
        Clear
      </button>
    </div>
    <div class="text-center space-y-1 pr-3" v-if="props.items.length === 0">
      <UIcon
        dynamic
        name="i-svg-spinners:180-ring"
        v-if="props.loading && props.items.length === 0"
        class="h-4 w-full mt-5"
      />
      <p v-if="!props.loading && props.items.length === 0" class="mt-5">
        Nothing to show
      </p>
    </div>
    <div
      v-else
      class="text-gray-500 mt-2 space-y-1 max-h-[50dvh] relative overflow-y-auto border-b pb-2"
    >
      <!-- selected items -->
      <UCheckbox
        v-if="queryStringArray.length"
        color="green"
        :key="item"
        v-for="item in queryStringArray"
        @change="(isChecked) => handleSelection(item, isChecked)"
        :modelValue="(queryStringArray || []).includes(item) ? true : false"
        :label="item"
      />

      <!-- others -->
      <UCheckbox
        color="green"
        :key="item"
        v-for="item in unselectedItems"
        @change="(isChecked) => handleSelection(item, isChecked)"
        :modelValue="(queryStringArray || []).includes(item) ? true : false"
      >
        <template #label>
          <span class="font-normal capitalize">{{ item }}</span>
        </template>
      </UCheckbox>
      <p class="text-xs text-gray-400">... use the search</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(["items", "loading", "limit", "filterType"]);
const route = useRoute();
const router = useRouter();

const queryStringArray = ref(
  route.query[props.filterType] ? route.query[props.filterType].split(",") : []
);

const handleSelection = (value, isChecked) => {
  if (isChecked) {
    queryStringArray.value.push(value);
  } else if (!isChecked) {
    const filteredQueries = queryStringArray.value.filter(
      (item) => item !== value
    );
    queryStringArray.value = filteredQueries;
  }
  router.push({
    query: {
      ...route.query,
      [props.filterType]: queryStringArray.value.toString(),
    },
  });
};

const handleResetFilter = () => {
  queryStringArray.value = [];
  router.push({
    query: {
      ...route.query,
      [props.filterType]: queryStringArray.value.toString(),
    },
  });
};

const unselectedItems = computed(() => {
  return props.items
    .filter((item) => !queryStringArray.value.includes(item))
    .slice(0, props.limit);
});

// const sortedItems = computed(() => {
//   return props.items.slice(0, props.limit).sort((a, b) => {
//     const indexA = queryStringArray.value.indexOf(a);
//     const indexB = queryStringArray.value.indexOf(b);

//     if (indexA === -1 && indexB === -1) {
//       // If both letters are not in priorityLetters, sort alphabetically
//       return a.localeCompare(b);
//     } else if (indexA === -1) {
//       // If a is not in priorityLetters but b is, b comes first
//       return 1;
//     } else if (indexB === -1) {
//       // If b is not in priorityLetters but a is, a comes first
//       return -1;
//     } else if (indexB === 1 && indexA === 1) {
//       // If both are in priorityLetters, sort based on their index in priorityLetters
//       return indexA - indexB;
//     }
//   });
// });
</script>
