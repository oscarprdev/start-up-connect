<script lang="ts" setup>
import SidebarProvider from '~/components/Sidebar/SidebarProvider.vue';
import { Lightbulb } from 'lucide-vue-next';

definePageMeta({
  middleware: ['auth'],
});
</script>

<template>
  <NuxtLayout name="default">
    <SidebarProvider>
      <template #sidebar>
        <NuxtLink to="/dashboard/ideas">
          <Lightbulb />
        </NuxtLink>
      </template>
      <template #screen>
        <slot />
      </template>
    </SidebarProvider>
  </NuxtLayout>
</template>
