<script setup lang="ts">
import { House, LayoutGrid, ChartNoAxesGantt } from 'lucide-vue-next';
import { IconSeedling } from '@tabler/icons-vue';

const route = useRoute();

const isActive = computed(() => (path: string) => {
  return route.path === path;
});

const links = [
  {
    path: '/dashboard',
    icon: House,
    label: 'Dashboard',
  },
  {
    path: '/dashboard/dafos',
    icon: LayoutGrid,
    label: 'Dafos',
  },
  {
    path: '/dashboard/roadmap',
    icon: ChartNoAxesGantt,
    label: 'Roadmap',
  },
];
</script>

<template>
  <aside class="w-fit h-screen flex flex-col gap-2 items-center p-3 bg-foreground/85">
    <NuxtLink
      to="/"
      class="w-10 pb-4 grid place-items-center border-b text-white border-white/20 hover:text-accent duration-300">
      <IconSeedling class="size-8" />
    </NuxtLink>

    <NuxtLink
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      :class="[
        'p-2 rounded-full shadow-sm hover:text-white duration-300',
        isActive(link.path) ? 'text-white' : 'text-white/30',
      ]">
      <component :is="link.icon" />
    </NuxtLink>
  </aside>
</template>
