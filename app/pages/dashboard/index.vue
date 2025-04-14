<script lang="ts" setup>
import IdeaCard from '~/components/dashboard/IdeaCard.vue';
import CreateIdeaForm from '~/components/dashboard/CreateIdeaForm.vue';
import Modal from '~/components/ui/Modal/Modal.vue';
import Button from '~/components/ui/Button/Button.vue';
import { ButtonSize, ButtonVariant } from '~/components/ui/Button/button.types';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const toast = useToast();
const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

await useFetch('/api/ideas', {
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
    RefreshToken: session?.refresh_token,
  },
  key: 'ideas',
  onResponseError: () => {
    toast.showToast('Failed to get ideas', ToastType.Error);
  },
});

const { data } = useNuxtData('ideas');

const createIdea = (idea: { title: string; description: string }) => {
  data.value.ideas = [...(data.value.ideas || []), idea];
};

const refreshIdeas = () => {
  refreshNuxtData('ideas');
};
</script>

<template>
  <section class="relative w-full h-full bg-background p-5 flex flex-col gap-4">
    <h1 class="text-2xl font-bold text-foreground/80">Dashboard</h1>
    <div class="flex flex-wrap gap-4 w-full">
      <IdeaCard
        v-for="idea in data?.ideas"
        :id="idea.id"
        :key="idea.id"
        :title="idea.title"
        :description="idea.description" />
    </div>

    <Modal
      id="create-idea-modal"
      title="Create Idea">
      <template #trigger>
        <Button
          type="button"
          :variant="ButtonVariant.DEFAULT"
          :size="ButtonSize.LARGE"
          class="w-fit absolute top-5 right-5">
          Create Idea
        </Button>
      </template>
      <template #content>
        <CreateIdeaForm
          :access-token="session?.access_token"
          @create-idea="createIdea"
          @refresh-ideas="refreshIdeas" />
      </template>
    </Modal>
  </section>
</template>
