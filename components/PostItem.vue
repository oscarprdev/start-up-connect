<script setup lang="ts">
import type { Post } from '~/shared/types/post';

defineProps<{
  post: Post;
}>();
</script>

<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.body }}</p>
  </div>
</template>
