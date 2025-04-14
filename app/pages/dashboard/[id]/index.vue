<script setup lang="ts">
import CompetitorsCard from '~/components/dashboard/ideaView/CompetitorsCard.vue';
import DafosCard from '~/components/dashboard/ideaView/DafosCard.vue';
import PersonaCard from '~/components/dashboard/ideaView/PersonaCard.vue';
import UVPSCard from '~/components/dashboard/ideaView/UVPSCard.vue';
const { id } = useRoute().params as { id: string };

const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

const isDafosGenerated = ref(false);
</script>

<template>
  <div class="flex flex-col gap-4 h-full">
    <h1 v-if="id">Dashboard {{ id }}</h1>
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
  </div>
</template>
