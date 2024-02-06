// set app.config.globalProperties.$currency using nuxt plugin

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.globalProperties.$currency =
    useAppConfig().currencySymbol;
});
