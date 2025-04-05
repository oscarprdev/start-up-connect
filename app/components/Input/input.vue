<script lang="ts" setup>
defineProps<{
  type: string;
  placeholder: string;
  pattern?: string;
  required?: boolean;
  maxlength?: string;
  minlength?: string;
}>();

const input = defineModel<string>('input');

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
    class="h-9 px-4 py-2 bg-background file:text-foreground duration-300 ease-out aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
    @input="handleInput" />
</template>
