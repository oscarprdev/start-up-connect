<script setup lang="ts">
enum AUTH_UI_MODE {
  LOGIN = 'login',
  SIGNUP = 'signup',
}

type FormState = {
  email: string;
  password: string;
  username?: string;
}   

const authMode = ref<AUTH_UI_MODE>(AUTH_UI_MODE.LOGIN);
const isLoading = ref(false);
const formState = ref<FormState>({
  email: '',
  password: '',
  username: '',
});

const handleSubmit = async () => {
  isLoading.value = true;
  if (authMode.value === AUTH_UI_MODE.LOGIN) {
    await handleLogin();
  } else {
    await handleSignup();
  }
  isLoading.value = false;
}

const handleLogin = async () => {
  const response = await $fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({
      email: formState.value.email,
      password: formState.value.password,
    }),
  });
  console.log(response);

  // TODO: Save the token to pinia store
}

const handleSignup = async () => {
  const response = await $fetch('/api/signup', {
    method: 'POST',
    body: JSON.stringify({
      email: formState.value.email,
      password: formState.value.password,
      username: formState.value.username,
    }),
  });
  console.log(response);
}

</script>
<template>
  <div
    class="flex flex-col items-center justify-center h-screen"
  >
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <input
        v-if="authMode === AUTH_UI_MODE.SIGNUP"
        type="text"
        placeholder="Username"
        class="border-2 border-gray-300 rounded-md p-2"
      />
      <input
        type="email"
        placeholder="Email"
        class="border-2 border-gray-300 rounded-md p-2"
      />
      <input
        type="password"
        placeholder="Password"
        class="border-2 border-gray-300 rounded-md p-2"
      />
      <button
        type="submit"
        class="bg-blue-500 text-white p-2 rounded-md"
      >
        {{ authMode === AUTH_UI_MODE.LOGIN ? 'Login' : 'Signup' }}
      </button>
    </form>
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      @click="authMode = authMode === AUTH_UI_MODE.LOGIN ? AUTH_UI_MODE.SIGNUP : AUTH_UI_MODE.LOGIN"
    >
      {{ authMode === AUTH_UI_MODE.LOGIN ? 'Signup' : 'Login' }}
    </button>
  </div>
</template>
