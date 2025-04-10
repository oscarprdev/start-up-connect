<script lang="ts" setup>
definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <NuxtLayout name="default">
    <slot />
  </NuxtLayout>
</template>
