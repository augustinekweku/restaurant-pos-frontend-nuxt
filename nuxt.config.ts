// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Restaurant POS",
      link: [
        {
          id: "theme-css",
          rel: "stylesheet",
          type: "text/css",
          // href: "/themes/lara-light-indigo/theme.css",
        },
      ],
    },
  },

  build: {
    transpile: ["primevue"],
  },
  modules: [
    //...
    [
      "@vee-validate/nuxt",
      {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
          Form: "VeeForm",
          Field: "VeeField",
          FieldArray: "VeeFieldArray",
          ErrorMessage: "VeeErrorMessage",
        },
      },
    ],
  ],

  ssr: true,

  css: [
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.scss",
    "primevue/resources/primevue.min.css",
    "@/assets/styles.scss",
  ],
});
