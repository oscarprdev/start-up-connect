<script setup lang="ts">
import { Loader } from 'lucide-vue-next';
import { z } from 'zod';
import { ButtonSize, ButtonVariant } from '~/components/ui/Button/button.types';
import Label from '~/components/ui/Label/Label.vue';
import Button from '~/components/ui/Button/Button.vue';
import Input from '~/components/ui/Input/Input.vue';
import { InputVariant } from '~/components/ui/Input/input.types';

definePageMeta({
  middleware: ['auth'],
});

const AUTH_UI_MODE = {
  LOGIN: 'login',
  SIGNUP: 'signup',
} as const;

type AUTH_UI_MODE = (typeof AUTH_UI_MODE)[keyof typeof AUTH_UI_MODE];

type FormState = z.infer<typeof formStateSchema>;

const formStateSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(16, { message: 'Password must be less than 16 characters' }),
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, { message: 'Username is required' })
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(16, { message: 'Username must be less than 16 characters' })
    .optional(),
});

const defaultValues: FormState = {
  email: '',
  password: '',
  username: '',
};

const authMode = ref<AUTH_UI_MODE>(AUTH_UI_MODE.LOGIN);
const supabase = useSupabaseClient();
const { showToast } = useToast();
const { formState, isPending, errors, handleSubmit } = useForm<FormState>({
  defaultValues,
  schema: formStateSchema,
  onSubmit: async () => (authMode.value === AUTH_UI_MODE.LOGIN ? handleLogin() : handleSignup()),
});

const handleLogin = async () => {
  await $fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      email: formState.value.email,
      password: formState.value.password,
    }),
    onResponse: async ({ response }) => {
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
    onResponseError: error => {
      const data = error.response._data;
      if (data.error) {
        return showToast(data.message, ToastType.Error);
      }
    },
  });
};

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
    onResponseError: error => {
      showToast(error.response._data.message, ToastType.Error);
    },
  });
};
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form
      class="flex flex-col gap-4"
      @submit.prevent="handleSubmit">
      <Label
        v-if="authMode === AUTH_UI_MODE.SIGNUP"
        label="Username"
        html-for="username"
        :error="errors.username?.[0]">
        <Input
          v-model="formState.username"
          type="text"
          placeholder="Enter your username"
          :variant="errors.password ? InputVariant.DESTRUCTIVE : InputVariant.DEFAULT" />
      </Label>
      <Label
        label="Email"
        html-for="email"
        :error="errors.email?.[0]">
        <Input
          v-model="formState.email"
          type="text"
          placeholder="Enter your email"
          :variant="errors.password ? InputVariant.DESTRUCTIVE : InputVariant.DEFAULT" />
      </Label>
      <Label
        label="Password"
        html-for="password"
        :error="errors.password?.[0]">
        <Input
          v-model="formState.password"
          type="password"
          placeholder="Enter your password"
          :variant="errors.password ? InputVariant.DESTRUCTIVE : InputVariant.DEFAULT" />
      </Label>
      <Button
        type="submit"
        :disabled="isPending"
        :variant="ButtonVariant.DEFAULT"
        :size="ButtonSize.LARGE">
        <template #left-icon>
          <Loader
            v-if="isPending"
            class="animate-spin" />
        </template>
        {{ authMode === AUTH_UI_MODE.LOGIN ? 'Login' : 'Signup' }}
      </Button>
    </form>
    <button
      class="bg-blue-500 text-white p-2 rounded-md"
      @click="
        authMode = authMode === AUTH_UI_MODE.LOGIN ? AUTH_UI_MODE.SIGNUP : AUTH_UI_MODE.LOGIN
      ">
      {{ authMode === AUTH_UI_MODE.LOGIN ? 'Signup' : 'Login' }}
    </button>
  </div>
</template>
