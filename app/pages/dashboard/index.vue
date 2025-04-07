<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <main class="w-full h-full flex flex-col items-center">
    <h1>Welcome to your ai-founder assistant.</h1>
    <section class="p-5 border shadow-sm rounded-xl w-full max-w-[600px]">
      <textarea
        class="size-full focus:outline-none"
        placeholder="What's your idea about?" />
    </section>
  </main>
</template>
