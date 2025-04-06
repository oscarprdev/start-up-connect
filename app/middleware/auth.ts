const AUTH_PATH = '/auth';

export default defineNuxtRouteMiddleware(to => {
  const session = useSupabaseSession();
  const isUserLogged = session.value;
  const isGoingToAuthPath = to.path.match(AUTH_PATH);

  if (!isUserLogged && !isGoingToAuthPath) {
    return navigateTo(AUTH_PATH);
  }

  if (isUserLogged && isGoingToAuthPath) {
    return navigateTo('/');
  }
});
