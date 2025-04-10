<script setup lang="ts">
const props = defineProps<{
  ideaId: string;
  userAccessToken: string;
}>();

const COMPONENT_KEY = 'competitors';
const toast = useToast();

await useFetch(`/api/${COMPONENT_KEY}/${props.ideaId}`, {
  lazy: true,
  headers: {
    Authorization: `Bearer ${props.userAccessToken}`,
  },
  key: COMPONENT_KEY,
  onResponse: async ({ response: { _data } }) => {
    if (_data.alreadyExists) return;

    await $fetch(`/api/${COMPONENT_KEY}`, {
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

const { data } = useNuxtData(COMPONENT_KEY);
</script>

<template>
  <div>
    <p>competitors</p>
    <p v-if="data">{{ data }}</p>
    <p v-else>Loading competitors...</p>
  </div>
</template>
