<script setup lang="ts">
import { IconSeedling } from '@tabler/icons-vue';
import { CircleUserRound } from 'lucide-vue-next';

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  navigateTo('/auth');
};
</script>

<template>
  <header class="flex justify-between items-center px-[0.9rem] py-2 z-50 w-screen bg-foreground/5">
    <div class="size-10 rounded-full bg-accent grid place-items-center">
      <IconSeedling
        color="white"
        class="size-8 mt-1" />
    </div>
    <button
      v-if="user"
      class="p-1 rounded-full bg-accent text-accent-foreground"
      @click="logout">
      <CircleUserRound />
    </button>
  </header>
</template>
