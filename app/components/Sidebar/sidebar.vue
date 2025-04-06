<script lang="ts" setup>
import { PanelRightClose, PanelRightOpen } from 'lucide-vue-next';
import { AnimatePresence, motion } from 'motion-v';

const isSidebarOpen = ref(true);

const handleToggleSidebarVisibility = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
<template>
  <div class="relative">
    <button
      class="absolute top-2 left-2 z-50"
      @click="handleToggleSidebarVisibility">
      <PanelRightOpen v-if="isSidebarOpen" />
      <PanelRightClose v-else />
    </button>

    <AnimatePresence>
      <motion.aside
        :initial="{ x: 0 }"
        :animate="{ x: isSidebarOpen ? 0 : -300 }"
        :exit="{ x: -300 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
        class="h-full w-[300px] bg-red-500 z-0">
      </motion.aside>
    </AnimatePresence>
  </div>
</template>
