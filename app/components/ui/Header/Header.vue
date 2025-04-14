<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  navigateTo('/auth');
};
</script>

<template>
  <header class="flex justify-between items-center px-[0.9rem] py-2 z-50 w-screen">
    <div class="w-5 h-5 rounded-full bg-accent" />

    <button
      v-if="user"
      class="px-4 py-2 rounded-full bg-accent text-accent-foreground"
      @click="logout">
      {{ user?.email.slice(0, 1) }}
    </button>
  </header>
</template>
