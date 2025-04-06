<script lang="ts" setup>
import Sidebar from '~/components/Sidebar/sidebar.vue';

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <NuxtLayout name="default">
    <section class="h-screen w-screen flex">
      <Sidebar />
      <slot />
    </section>
  </NuxtLayout>
</template>
