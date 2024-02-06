export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.beforeEach((to, from, next) => {
    const locale = "fr";
    if (locale) {
      nuxtApp.$i18n.locale.value = locale;
    }
    next();
  });
});
