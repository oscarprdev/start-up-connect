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

const supabase = useSupabaseClient();
const { showToast } = useToast();

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
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: formState.value.email,
      password: formState.value.password,
    }),
    onResponse: async ({response}) => {
      if (!response.ok) {
        return showToast(response._data.message, ToastType.Error);
      }

      const session = response._data.session;
      await supabase.auth.setSession({
        access_token: session?.token,
        refresh_token: session?.refreshToken,
      });
      navigateTo('/');
    },
    onResponseError: (error) => {
      const data = error.response._data;
      if (data.error) {
        return showToast(data.message, ToastType.Error);
      }
    },
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
    },
    onResponseError: (error) => {
      showToast(error.response._data.message, ToastType.Error);
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
        maxlength="16"
        required
      />
      <input
        v-model="formState.email"
        type="email"
        placeholder="Email"
        class="border border-gray-300 rounded-md p-2 not-placeholder-shown:invalid:border-red-500 not-placeholder-shown:invalid:ring-2 not-placeholder-shown:invalid:ring-red-200 "
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        required
      />
      <input
        v-model="formState.password"
        type="password"
        placeholder="Password"
        class="border-2 border-gray-300 rounded-md p-2"
        minlength="6"
        maxlength="16"
        required
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
