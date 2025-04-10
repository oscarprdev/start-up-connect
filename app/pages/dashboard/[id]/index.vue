<script setup lang="ts">
const { id } = useRoute().params as { id: string };

const toast = useToast();
const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

await useFetch(`/api/dafos/${id}`, {
  lazy: true,
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
        dafo: _data.dafo,
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

await useFetch(`/api/competitors/${id}`, {
  lazy: true,
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
  },
  key: 'competitors',
  onResponse: async ({ response: { _data } }) => {
    if (_data.alreadyExists) return;

    await $fetch('/api/competitors', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        ideaId: id,
        analysis: _data.competitors,
      }),
      onResponseError: () => {
        toast.showToast('Failed to store competitors', ToastType.Error);
      },
    });
  },
  onResponseError: () => {
    toast.showToast('Failed to get competitors', ToastType.Error);
  },
});

const { data: dafos } = useNuxtData('dafos');
const { data: competitors } = useNuxtData('competitors');
</script>

<template>
  <div>
    <h1 v-if="id">Dashboard {{ id }}</h1>
    <div>
      <p>dafos</p>
      <p v-if="dafos">{{ dafos }}</p>
      <p v-else>Loading dafos...</p>
    </div>
    <div>
      <p>competitors</p>
      <p v-if="competitors">{{ competitors }}</p>
      <p v-else>Loading competitors...</p>
    </div>
  </div>
</template>
