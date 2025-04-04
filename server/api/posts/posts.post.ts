import type { Post } from '~/shared/types/post';

export default defineEventHandler(async event => {
  const posts = await $fetch<Post[]>('https://jsonplaceholder.typicode.com/posts');
  return posts;
});
