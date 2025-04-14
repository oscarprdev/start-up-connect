<script setup lang="ts">
import { IconBulb } from '@tabler/icons-vue';

defineProps<{
  title: string;
  description: string;
  id: string;
}>();
</script>

<template>
  <article
    class="w-full h-full max-w-[300px] max-h-[150px] flex items-start gap-2 border shadow-sm bg-background rounded-lg p-4">
    <IconBulb class="size-6" />
    <div class="flex items-start gap-2 flex-col w-full h-full">
      <h2 class="text-lg font-bold capitalize">{{ title }}</h2>
      <p class="text-sm text-gray-500 text-ellipsis max-h-[50px]">{{ description }}</p>
      <NuxtLink
        :to="`/dashboard/${id}`"
        class="text-sm ml-auto mt-auto text-indigo-500 hover:text-indigo-600">
        See more
      </NuxtLink>
    </div>
  </article>
</template>
