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
      class="relative h-full bg-red-500 z-0">
      <slot />
    </motion.aside>
  </AnimatePresence>
</template>
