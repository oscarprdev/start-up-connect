<script lang="ts" setup>
import { cva } from 'class-variance-authority';
import type { ButtonVariant, ButtonSize } from './button.types';

const props = defineProps<{
  type: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant: ButtonVariant;
  size: ButtonSize;
}>();

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap duration-300 ease-in-out rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-accent text-accent-foreground shadow-xs hover:bg-accent/80',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/80 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 dark:hover:bg-destructive/80',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/60',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        small: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        large: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonStyles = computed(() => buttonVariants({ variant: props.variant, size: props.size }));
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonStyles">
    <slot name="left-icon" />
    <slot />
    <slot name="right-icon" />
  </button>
</template>
