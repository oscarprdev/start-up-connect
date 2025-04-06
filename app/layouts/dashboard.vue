<script lang="ts" setup>
import { PanelRightOpen, PanelRightClose } from 'lucide-vue-next';
import Sidebar from '~/components/Sidebar/sidebar.vue';

definePageMeta({
  middleware: ['auth'],
});

const isSidebarOpen = ref(false);

const handleToggleSidebarVisibility = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <NuxtLayout name="default">
    <section class="relative h-screen w-screen flex bg-green-100">
      <button
        class="absolute top-4 left-4 z-50"
        @click="handleToggleSidebarVisibility">
        <PanelRightOpen v-if="isSidebarOpen" />
        <PanelRightClose v-else />
      </button>
      <Sidebar :is-open="isSidebarOpen" />
      <slot />
    </section>
  </NuxtLayout>
</template>
