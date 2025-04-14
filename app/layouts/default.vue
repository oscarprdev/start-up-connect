<script setup lang="ts">
import Toast from '~/components/ui/Toast/Toast.vue';
import Header from '~/components/ui/Header/Header.vue';
</script>

<template>
  <main class="h-screen w-screen bg-background">
    <Header />
    <slot />
    <Toast />
  </main>
</template>
