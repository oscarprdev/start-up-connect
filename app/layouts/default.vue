<script setup lang="ts">
import Toast from '~/components/Toast/Toast.vue';
</script>

<template>
  <main class="h-screen w-screen">
    <Header />
    <slot />
    <Toast />
  </main>
</template>
