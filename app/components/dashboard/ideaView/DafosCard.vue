<script lang="ts" setup>
import Modal from '@/components/ui/Modal/Modal.vue';
const props = defineProps<{
  ideaId: string;
  userAccessToken: string;
}>();
const emit = defineEmits<{
  (e: 'dafos-generated'): void;
}>();

const COMPONENT_KEY = 'dafos';
const toast = useToast();

const { status } = await useFetch(`/api/${COMPONENT_KEY}/${props.ideaId}`, {
  lazy: true,
  headers: {
    Authorization: `Bearer ${props.userAccessToken}`,
  },
  key: COMPONENT_KEY,
  onResponse: async ({ response: { _data } }) => {
    emit('dafos-generated');
    if (_data.alreadyExists) return;

    await $fetch(`/api/${COMPONENT_KEY}`, {
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

const { data } = useNuxtData(COMPONENT_KEY);
</script>

<template>
  <Modal
    id="dafos"
    title="Dafos">
    <template #trigger>
      <div class="flex items-center justify-center p-5 border border-border rounded-md">
        <p>Dafos</p>
      </div>
    </template>
    <template #content>
      <p v-if="data">{{ data }}</p>
      <p v-if="status === 'pending'">Loading dafos...</p>
    </template>
  </Modal>
</template>
