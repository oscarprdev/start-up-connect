<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v';

defineProps<{ isOpen: boolean }>();
</script>
<template>
  <AnimatePresence>
    <motion.aside
      :initial="{ width: '300px', x: 0 }"
      :animate="{ width: isOpen ? '300px' : '50px' }"
      :transition="{ duration: 0.3, ease: 'easeInOut' }"
      class="relative h-full flex flex-col gap-2 pt-12 px-2 z-0 border-r bg-sidebar border-sidebar-border overflow-hidden">
      <slot name="sidebar-content" />
    </motion.aside>
  </AnimatePresence>
</template>
