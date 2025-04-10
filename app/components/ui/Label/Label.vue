<script setup lang="ts">
defineProps<{
  label: string;
  htmlFor: string;
  error?: string;
}>();
</script>

<template>
  <label
    :for="htmlFor"
    class="flex flex-col gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
    {{ label }}
    <slot />
    <p
      v-if="error"
      class="text-red-500 text-xs">
      {{ error }}
    </p>
  </label>
</template>
