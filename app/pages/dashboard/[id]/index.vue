<script setup lang="ts">
import CompetitorsCard from '~/components/dashboard/ideaView/CompetitorsCard.vue';
import DafosCard from '~/components/dashboard/ideaView/DafosCard.vue';
import PersonaCard from '~/components/dashboard/ideaView/PersonaCard.vue';
import UVPSCard from '~/components/dashboard/ideaView/UVPSCard.vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const { id } = useRoute().params as { id: string };

const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

const { data: idea } = await useFetch(`/api/ideas/${id}`, {
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
    RefreshToken: session?.refresh_token,
  },
});

const isDafosGenerated = ref(false);
</script>

<template>
  <section class="relative w-full h-full bg-background px-5 py-3 flex flex-col gap-5">
    <h1
      v-if="idea"
      class="text-2xl font-bold text-foreground/80">
      {{ idea.title }}
    </h1>
    <DafosCard
      :idea-id="id"
      :user-access-token="session?.access_token"
      @dafos-generated="isDafosGenerated = true" />
    <CompetitorsCard
      :idea-id="id"
      :user-access-token="session?.access_token" />
    <UVPSCard
      v-if="isDafosGenerated"
      :idea-id="id"
      :user-access-token="session?.access_token" />
    <PersonaCard
      v-if="isDafosGenerated"
      :idea-id="id"
      :user-access-token="session?.access_token"
      :is-dafos-generated="isDafosGenerated" />
  </section>
</template>
