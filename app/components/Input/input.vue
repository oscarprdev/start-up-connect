<script lang="ts" setup>
import { cva } from 'class-variance-authority';
import type { InputVariant, InputSize } from './input.types';

const props = defineProps<{
  type: string;
  placeholder: string;
  variant?: InputVariant;
  size?: InputSize;
  class?: string;
  pattern?: string;
  required?: boolean;
  maxlength?: string;
  minlength?: string;
}>();

const input = defineModel<string>('input');

const inputVariants = cva(
  'file:text-foreground duration-300 ease-out aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground placeholder:text-sm selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
  {
    variants: {
      variant: {
        default: 'bg-background',
        ghost: 'border-none shadow-none',
        destructive:
          'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:ring-destructive/40',
      },
      sizes: {
        default: 'h-9 px-3 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      sizes: 'default',
    },
  }
);

const inputStyles = computed(() => {
  return cn(inputVariants({ variant: props.variant, sizes: props.size }), props.class);
});

const emit = defineEmits<{
  (e: 'update:value', value: string): void;
}>();

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:value', target.value);
};
</script>
<template>
  <input
    v-model="input"
    :type="type"
    :placeholder="placeholder"
    :pattern="pattern"
    :required="required"
    :maxlength="maxlength"
    :minlength="minlength"
    :class="inputStyles"
    @input="handleInput" />
</template>
