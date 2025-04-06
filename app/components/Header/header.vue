<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  navigateTo('/auth');
};
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-blue-500 h-[3rem]">
    <h1>Header</h1>
    <p>{{ user?.email }}</p>
    <button
      v-if="user"
      @click="logout">
      Logout
    </button>
  </header>
</template>
