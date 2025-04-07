// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  typescript: {
    includeWorkspace: true,
    typeCheck: true,
    strict: false,
  },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/supabase',
    'motion-v/nuxt',
  ],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_ANON_KEY,
    useSsrCookies: true,
    redirect: false,
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    perplexityApiKey: process.env.PERPLEXITY_API_KEY,
  },
});
