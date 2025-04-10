<script setup lang="ts">
const props = defineProps<{
  ideaId: string;
  userAccessToken: string;
}>();

const COMPONENT_KEY = 'uvps';
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
        text: _data.uvps.text,
      }),
      onResponseError: () => {
        toast.showToast('Failed to store uvps', ToastType.Error);
      },
    });
  },
  onResponseError: () => {
    toast.showToast('Failed to get upvs', ToastType.Error);
  },
});

const { data } = useNuxtData(COMPONENT_KEY);
</script>

<template>
  <div>
    <p>uvps</p>
    <p v-if="data">{{ data }}</p>
    <p v-else>Loading uvps...</p>
  </div>
</template>
