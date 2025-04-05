<script setup lang="ts">
import Toast from '~/components/Toast/toast.vue';
</script>

<template>
  <div class="h-screen w-screen">
    <Header />
    <slot />
    <Toast />
  </div>
</template>
