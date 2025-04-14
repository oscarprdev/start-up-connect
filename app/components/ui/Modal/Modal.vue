<script setup lang="ts">
defineProps<{
  id: string;
  title: string;
}>();
</script>

<template>
  <button
    :commandfor="id"
    command="show-modal">
    <slot name="trigger" />
  </button>
  <dialog
    :id="id"
    class="fixed inset-0 backdrop:bg-black/50 w-full h-full max-w-screen-md mx-auto max-h-screen-md my-auto p-5">
    <button
      class="absolute top-0 right-0"
      :commandfor="id"
      command="close">
      Close
    </button>
    <p>{{ title }}</p>
    <slot name="content" />
  </dialog>
</template>
