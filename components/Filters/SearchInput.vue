<template>
  <div class="px-3">
    <form class="relative" @submit.prevent="emit('submit')">
      <input
        type="text"
        class="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8"
        :placeholder="props.placeholder"
        v-model="model"
      />
      <UIcon
        size="24"
        name="i-heroicons-funnel"
        class="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <UButton
        type="submit"
        size="xs"
        class="bg-slate-100 border hover:bg-slate-200 absolute right-0 top-1/2 transform -translate-y-1/2 px-2 rounded-s-none"
      >
        <UIcon
          size="24"
          name="i-heroicons-magnifying-glass"
          class="w-4 h-4 text-slate-400"
        />
      </UButton>
    </form>
  </div>
</template>

<script setup>
const props = defineProps(["placeholder"]);
const model = defineModel();
const emit = defineEmits(["submit"]);
</script>
