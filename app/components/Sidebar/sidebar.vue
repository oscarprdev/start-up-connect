<script lang="ts" setup>
import { AnimatePresence, motion } from 'motion-v';

defineProps<{ isOpen: boolean }>();
</script>
<template>
  <AnimatePresence>
    <motion.aside
      :initial="{ x: 0 }"
      :animate="{ x: isOpen ? 0 : -300 }"
      :exit="{ x: -300 }"
      :transition="{ duration: 0.3, ease: 'easeInOut' }"
      class="relative h-full w-[300px] bg-red-500 z-0">
      sidebar
    </motion.aside>
  </AnimatePresence>
</template>
