<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});
</script>

<template>
  <main class="w-full">
    <div class="flex flex-col gap-4">
      <h1 class="text-2xl font-bold">Dashboard</h1>
    </div>
  </main>
</template>
