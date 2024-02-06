// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  name: "Sushi N Poke",
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Sushi N Poke",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "Sushi N Poke is a restaurant that offers a wide range of pasta dishes, from the most traditional to the most innovative.",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;700&display=swap",
        },
        { rel: "icon", type: "image/x-icon", href: "~/assets/favicon.ico" },
      ],
    },
  },
  // alias
  alias: {
    "~/": "/",
    "@": "/",
  },
  css: [
    "~/assets/scss/main.scss",
    "~/assets/css/style.css",
    "~/assets/css/responsive.css",
    "@fortawesome/fontawesome-svg-core/styles.css",
  ],
  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore"],
      },
    ],
    "@nuxtjs/i18n",
  ],
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
    vueI18n: {
      legacy: false,
      locale: "fr",
      messages: {
        // it: require("./locales/it.json"),
        fr: require("./locales/fr.json"),
      },
    },
  },
  build: {
    transpile: ["@pinia/nuxt", "vee-validate"],
  },
});
