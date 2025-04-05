<script setup lang="ts">
defineProps<{
  label: string;
  htmlFor: string;
  error?: string;
}>();
</script>

<template>
  <label :for="htmlFor">
    {{ label }}
    <slot />
    <p
      v-if="error"
      class="text-red-500 text-xs">
      {{ error }}
    </p>
  </label>
</template>
