<script lang="ts" setup>
import { PanelRightOpen, PanelRightClose } from 'lucide-vue-next';
import Sidebar from '~/components/Sidebar/Sidebar.vue';

const isSidebarOpen = useState(() => true);

const toggleSidebarVisibility = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <section class="relative h-[calc(100vh-3rem)] w-screen flex overflow-hidden">
    <Sidebar :is-open="isSidebarOpen">
      <slot name="sidebar" />
    </Sidebar>
    <div class="relative flex-1 p-4">
      <button
        class="absolute top-4 left-4 z-50"
        @click="toggleSidebarVisibility">
        <PanelRightOpen v-if="isSidebarOpen" />
        <PanelRightClose v-else />
      </button>
      <slot name="screen" />
    </div>
  </section>
</template>
