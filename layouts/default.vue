<template>
  <div class="font-inter group flex h-[calc(100dvh)] w-full overflow-hidden">
    <div class="hidden md:block">
      <SideNav />
    </div>
    <div class="flex flex-1 flex-col">
      <BookSearchInput />
      <slot />
    </div>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Book inventory` : "Book inventory";
  },
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
      crossorigin: "",
    },
  ],
});
</script>

<style>
body {
  min-height: calc(100dvh);
}
</style>
