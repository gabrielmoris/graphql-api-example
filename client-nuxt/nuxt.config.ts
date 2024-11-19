// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/apollo"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:4000",
      },
    },
  },
  build: {
    transpile: ["@apollo/client", "ts-invariant", "tslib"],
  },
});
