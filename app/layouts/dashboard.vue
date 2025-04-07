<script lang="ts" setup>
import SidebarProvider from '~/components/Sidebar/SidebarProvider.vue';

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <NuxtLayout name="default">
    <SidebarProvider>
      <template #screen>
        <slot />
      </template>
    </SidebarProvider>
  </NuxtLayout>
</template>
