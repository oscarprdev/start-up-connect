<script setup lang="ts">
import CompetitorsCard from '~/components/dashboard/ideaView/CompetitorsCard.vue';
import DafosCard from '~/components/dashboard/ideaView/DafosCard.vue';

const { id } = useRoute().params as { id: string };

const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();
</script>

<template>
  <div>
    <h1 v-if="id">Dashboard {{ id }}</h1>
    <DafosCard
      :idea-id="id"
      :user-access-token="session?.access_token" />
    <CompetitorsCard
      :idea-id="id"
      :user-access-token="session?.access_token" />
  </div>
</template>
