<script lang="ts" setup>
import { PanelRightOpen, PanelRightClose, Lightbulb } from 'lucide-vue-next';
import Sidebar from '~/components/Sidebar/Sidebar.vue';

const isSidebarOpen = useState(() => true);

const toggleSidebarVisibility = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<template>
  <section class="relative h-[calc(100vh-3rem)] w-screen flex overflow-hidden">
    <Sidebar :is-open="isSidebarOpen">
      <template #sidebar-content>
        <NuxtLink
          to="/dashboard/ideas"
          class="relative w-full items-center justify-start flex hover:bg-sidebar-primary-foreground rounded-md duration-200">
          <Lightbulb
            :size="17"
            class="m-2" />
          <p
            v-if="isSidebarOpen"
            class="duration-200 truncate flex-1">
            Ideas
          </p>
        </NuxtLink>
      </template>
    </Sidebar>
    <div class="relative flex-1 p-4">
      <button
        class="absolute top-2 left-2 z-50 text-muted-foreground/50 rounded-md p-2 bg-muted hover:text-foreground/50 duration-200"
        @click="toggleSidebarVisibility">
        <PanelRightOpen v-if="isSidebarOpen" />
        <PanelRightClose v-else />
      </button>
      <slot name="screen" />
    </div>
  </section>
</template>
