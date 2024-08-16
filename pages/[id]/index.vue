<template>
  <div class="flex-1 flex flex-col overflow-auto px-4">
    <div class="my-4">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        @click="router.back()"
        ><span class="ml-1">Back to books</span></UButton
      >
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
</script>
