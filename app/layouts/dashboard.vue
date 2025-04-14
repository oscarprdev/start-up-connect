<script lang="ts" setup>
import Aside from '~/components/ui/Aside/Aside.vue';

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <main class="flex w-screen h-screen">
    <Aside />
    <slot />
  </main>
</template>
