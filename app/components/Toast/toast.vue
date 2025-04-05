<script setup lang="ts">
import { AnimatePresence, motion } from 'motion-v';
import { CircleCheck, TriangleAlert, Info } from 'lucide-vue-next';

const { toast } = useToast();

const toastStyles = computed(() => {
  const commonStyles =
    'rounded-md p-4 border shadow-lg text-sm font-medium flex items-center gap-2';

  switch (toast.value.type) {
    case ToastType.Default:
      return `${commonStyles} bg-stone-100/15 text-stone-600 border-stone-400`;
    case ToastType.Success:
      return `${commonStyles} bg-emerald-100 text-emerald-600 border-emerald-400`;
    case ToastType.Error:
      return `${commonStyles} bg-red-100 text-red-600 border-red-400`;
    default:
      return commonStyles;
  }
});
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="toast.show"
      class="z-50 fixed bottom-0 right-0 m-4"
      :initial="{ opacity: 0, x: 100 }"
      :animate="{ opacity: 1, x: 0 }"
      :exit="{ opacity: 0, x: 100 }"
      :transition="{ duration: 0.3, type: 'spring' }">
      <div :class="toastStyles">
        <CircleCheck
          v-if="toast.type === ToastType.Success"
          :size="18" />
        <TriangleAlert
          v-else-if="toast.type === ToastType.Error"
          :size="18" />
        <Info
          v-else
          :size="18" />
        {{ toast.message }}
      </div>
    </motion.div>
  </AnimatePresence>
</template>
