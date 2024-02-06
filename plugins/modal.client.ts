import vfmPlugin from "vue-final-modal";

// register vue 3 plugin to nuxt 3
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vfmPlugin);
});
