<script setup lang="ts">
import { z } from 'zod';
import { ButtonSize, ButtonVariant } from '../ui/Button/button.types';

const props = defineProps<{
  accessToken: string;
}>();

const emit = defineEmits<{
  (e: 'create-idea', idea: { title: string; description: string }): void;
  (e: 'refresh-ideas'): void;
}>();

const toast = useToast();

const defaultValues = {
  title: '',
  description: '',
};

const formStateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});
type FormState = z.infer<typeof formStateSchema>;

const { formState, isPending, handleSubmit } = useForm<FormState>({
  defaultValues,
  schema: formStateSchema,
  onSubmit: async () => {
    await createNewIdea({ title: formState.value.title, description: formState.value.description });
  },
});

const createNewIdea = async ({ title, description }: { title: string; description: string }) => {
  await $fetch('/api/ideas', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${props.accessToken}`,
    },
    body: JSON.stringify({ title, description }),
    onRequest: () => {
      emit('create-idea', { title, description });
    },
    onResponse: () => {
      emit('refresh-ideas');
    },
    onResponseError: () => {
      toast.showToast('Failed to create idea', ToastType.Error);
    },
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <Input
      v-model="formState.title"
      placeholder="Title"
      type="text" />
    <Input
      v-model="formState.description"
      placeholder="Description"
      type="text" />
    <Button
      type="submit"
      :disabled="isPending"
      :variant="ButtonVariant.DEFAULT"
      :size="ButtonSize.LARGE">
      <template #left-icon>
        <Loader
          v-if="isPending"
          class="animate-spin" />
      </template>
      Submit
    </Button>
  </form>
</template>
