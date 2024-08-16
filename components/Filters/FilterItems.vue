<template>
  <div class="pl-3">
    <div
      class="flex items-center justify-between gap-2 pt-2"
      v-if="!props.loading && props.items.length > 0"
    >
      <p class="text-xs text-green-600">
        {{ queryStringArray.length }}
        of
        {{ new Intl.NumberFormat().format(props.totalCount) }}
        {{ props.filterType }} selected
      </p>
      <button
        @click="() => handleResetFilter()"
        v-if="queryStringArray.length > 0"
        class="mr-2 text-xs px-1"
        size="xs"
      >
        Reset
      </button>
    </div>
    <div class="text-center space-y-1 pr-3" v-if="props.items.length === 0">
      <USkeleton
        v-if="props.loading && props.items.length === 0"
        v-for="item in Array(5).fill(0)"
        class="h-8 w-full"
      />
      <p v-if="!props.loading && props.items.length === 0" class="mt-5">
        Nothing to show
      </p>
    </div>
    <div
      v-else
      class="text-gray-500 mt-2 space-y-1 max-h-[50dvh] relative overflow-y-auto border-b"
    >
      <UCheckbox
        color="green"
        :key="item"
        v-for="item in sortedItems"
        @change="(isChecked) => handleSelection(item, isChecked)"
        :modelValue="
          (route.query[props.filterType] || []).includes(item) ? true : false
        "
      >
        <template #label>
          <span class="font-normal capitalize">{{ item }}</span>
        </template>
      </UCheckbox>
      <p
        class="text-xs text-gray-400"
        v-if="props.totalCount - props.limit > 0"
      >
        {{ new Intl.NumberFormat().format(props.totalCount - props.limit) }}
        hidden {{ props.filterType }}
      </p>
      <div
        class="sticky bottom-0 py-2 bg-white flex items-center justify-between pr-2"
      >
        <p class="text-xs">
          Showing
          {{ props.items.length <= 200 ? props.items.length : props.limit }}
          {{ props.filterType }}
        </p>
        <UTooltip
          text="Cant find something? Use the search"
          :popper="{ placement: 'left', arrow: true }"
        >
          <UIcon
            class="text-slate-600"
            size="24"
            name="i-heroicons-exclamation-circle-solid"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "items",
  "loading",
  "limit",
  "filterType",
  "totalCount",
]);
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
      (item) => item != value
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

const sortedItems = computed(() => {
  return props.items.slice(0, props.limit).sort((a, b) => {
    const indexA = queryStringArray.value.indexOf(a);
    const indexB = queryStringArray.value.indexOf(b);

    if (indexA === -1 && indexB === -1) {
      // If both letters are not in priorityLetters, sort alphabetically
      return a.localeCompare(b);
    } else if (indexA === -1) {
      // If a is not in priorityLetters but b is, b comes first
      return 1;
    } else if (indexB === -1) {
      // If b is not in priorityLetters but a is, a comes first
      return -1;
    } else if (indexB === 1 && indexA === 1) {
      // If both are in priorityLetters, sort based on their index in priorityLetters
      return indexA - indexB;
    }
  });
});
</script>
