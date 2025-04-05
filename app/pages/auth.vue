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

const supabase = useSupabaseClient();

const handleLogin = async () => {
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: formState.value.email,
      password: formState.value.password,
    }),
    onResponse: async (response) => {
      const session = response.response._data.session;
      await supabase.auth.setSession({
        access_token: session?.token,
        refresh_token: session?.refreshToken,
      });
      navigateTo('/');
    }
  });
}

const handleSignup = async () => {
  await $fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email: formState.value.email,
      password: formState.value.password,
      username: formState.value.username,
    }),
    onResponse: () => {
      authMode.value = AUTH_UI_MODE.LOGIN;
    }
  });
}

const logout = async () => {
  await supabase.auth.signOut();
}

</script>
<template>
  <div
    class="flex flex-col items-center justify-center h-screen"
  >
    <button @click="logout">Logout</button>
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <input
        v-if="authMode === AUTH_UI_MODE.SIGNUP"
        v-model="formState.username"
        type="text"
        placeholder="Username"
        class="border-2 border-gray-300 rounded-md p-2"
        
      />
      <input
        v-model="formState.email"
        type="email"
        placeholder="Email"
        class="border-2 border-gray-300 rounded-md p-2"
      />
      <input
        v-model="formState.password"
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
