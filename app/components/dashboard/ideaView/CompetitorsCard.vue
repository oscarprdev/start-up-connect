<script setup lang="ts">
const props = defineProps<{
  ideaId: string;
  userAccessToken: string;
}>();

const toast = useToast();

await useFetch(`/api/competitors/${props.ideaId}`, {
  lazy: true,
  headers: {
    Authorization: `Bearer ${props.userAccessToken}`,
  },
  key: 'competitors',
  onResponse: async ({ response: { _data } }) => {
    if (_data.alreadyExists) return;

    await $fetch('/api/competitors', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.userAccessToken}`,
      },
      body: JSON.stringify({
        ideaId: props.ideaId,
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

const { data } = useNuxtData('competitors');
</script>

<template>
  <div>
    <p>competitors</p>
    <p v-if="data">{{ data }}</p>
    <p v-else>Loading competitors...</p>
  </div>
</template>
