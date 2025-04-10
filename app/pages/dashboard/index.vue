<script lang="ts" setup>
import { z } from 'zod';
import Input from '~/components/Input/Input.vue';
import Button from '~/components/Button/Button.vue';
import { ButtonVariant, ButtonSize } from '~/components/Button/button.types';
import { Loader } from 'lucide-vue-next';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

const defaultValues = {
  title: '',
  description: '',
};

const formStateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});
type FormState = z.infer<typeof formStateSchema>;

await useFetch('/api/ideas/list', {
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
    RefreshToken: session?.refresh_token,
  },
  key: 'ideas',
  onResponseError: () => {
    toast.showToast('Failed to get ideas', ToastType.Error);
  },
});

const toast = useToast();
const { data } = useNuxtData('ideas');
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
      Authorization: `Bearer ${session?.access_token}`,
    },
    body: JSON.stringify({ title, description }),
    onRequest: () => {
      data.value.ideas = [...(data.value.ideas || []), { title, description }];
    },
    onResponse: () => {
      refreshNuxtData('ideas');
    },
    onResponseError: () => {
      toast.showToast('Failed to create idea', ToastType.Error);
    },
  });
};
</script>

<template>
  <main class="w-full h-full flex flex-col items-center">
    <h1>Dashboard</h1>
    <ul v-if="data?.ideas?.length > 0">
      <li
        v-for="idea in data.ideas"
        :key="idea.id">
        <h2>{{ idea.title }}</h2>
        <p>{{ idea.description }}</p>
      </li>
    </ul>
    <p v-else>No ideas yet</p>
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
  </main>
</template>
