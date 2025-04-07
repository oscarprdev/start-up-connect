<script setup lang="ts">
import Toast from '~/components/Toast/Toast.vue';
import Header from '~/components/Header/Header.vue';
</script>

<template>
  <main class="h-screen w-screen">
    <Header />
    <slot />
    <Toast />
  </main>
</template>
