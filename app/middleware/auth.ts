const AUTH_PATH = '/auth';

export default defineNuxtRouteMiddleware(to => {
  const session = useSupabaseSession();
  if (!session.value) {
    return navigateTo(AUTH_PATH);
  }

  if (to.path.match(AUTH_PATH) && session.value) {
    return navigateTo('/');
  }
});
