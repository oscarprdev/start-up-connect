<script lang="ts" setup>
import { useChat } from '@ai-sdk/vue';

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
});

const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

const { messages, input, handleSubmit, status } = useChat({
  maxSteps: 5,
  api: '/api/chats',
  headers: {
    Authorization: `Bearer ${session?.access_token}`,
    RefreshToken: session?.refresh_token,
  },
  // onFinish: async () => {
  //   await $fetch('/api/messages', {
  //     method: 'POST',
  //     body: {
  //       // TODO: Get the current chat id
  //       chatId: messages.value[0].id,
  //       messages: messages.value,
  //     },
  //     headers: {
  //       Authorization: `Bearer ${session?.access_token}`,
  //       RefreshToken: session?.refresh_token,
  //     },
  //   });
  // },
});
</script>

<template>
  <main class="w-full h-full flex flex-col items-center">
    <h1>Welcome to your ai-founder assistant.</h1>
    <p>{{ status === 'streaming' }}</p>
    <section class="p-5 border shadow-sm rounded-xl w-full max-w-[600px]">
      <div
        v-for="m in messages"
        :key="m.id"
        class="whitespace-pre-wrap mb-2 overflow-y-auto max-h-[500px]">
        {{ m.role === 'user' ? 'User: ' : 'AI: ' }}
        <p>{{ m.content }}</p>
      </div>

      <form @submit="handleSubmit">
        <textarea
          v-model="input"
          class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          placeholder="Say something..." />
        <button
          type="submit"
          class="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl">
          Submit
        </button>
      </form>
    </section>
  </main>
</template>
