<script setup lang="ts">
const { id } = useRoute().params as { id: string };

const toast = useToast();
const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

await useFetch(`/api/dafos/${id}`, {
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
  },
  key: 'dafos',
  onResponse: async ({ response: { _data } }) => {
    if (_data.alreadyExists) return;

    await $fetch('/api/dafos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        ideaId: id,
        dafo: _data,
      }),
      onResponseError: () => {
        toast.showToast('Failed to store dafos', ToastType.Error);
      },
    });
  },
  onResponseError: () => {
    toast.showToast('Failed to get dafos', ToastType.Error);
  },
});

const { data } = useNuxtData('dafos');
</script>

<template>
  <div>
    <h1 v-if="id">Dashboard {{ id }}</h1>
    <div>
      <p>dafos</p>
      <p v-if="data">{{ data }}</p>
      <p v-else>Loading dafos...</p>
    </div>
  </div>
</template>
