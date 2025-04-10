<script lang="ts" setup>
const props = defineProps<{
  ideaId: string;
  userAccessToken: string;
}>();

const toast = useToast();

await useFetch(`/api/dafos/${props.ideaId}`, {
  lazy: true,
  headers: {
    Authorization: `Bearer ${props.userAccessToken}`,
  },
  key: 'dafos',
  onResponse: async ({ response: { _data } }) => {
    if (_data.alreadyExists) return;

    await $fetch('/api/dafos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.userAccessToken}`,
      },
      body: JSON.stringify({
        ideaId: props.ideaId,
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

const { data: dafos } = useNuxtData('dafos');
</script>

<template>
  <div>
    <p>dafos</p>
    <p v-if="dafos">{{ dafos }}</p>
    <p v-else>Loading dafos...</p>
  </div>
</template>
