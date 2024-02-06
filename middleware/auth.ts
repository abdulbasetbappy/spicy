export default defineNuxtRouteMiddleware((to, from) => {
  if (!to.meta.auth) return;

  // Do something

  // Redirect to login page
});
