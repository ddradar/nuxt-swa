// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    modules: ['nuxt-applicationinsights'],
    runtimeConfig: {
      public: {
        applicationinsights: {
          connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
        },
      },
    },
  },
  compatibilityDate: '2024-08-31',
  extends: ['@nuxt/ui-pro'],
  experimental: { asyncContext: true },
  nitro: {
    preset: 'azure',
    azure: { config: { platform: { apiRuntime: 'node:20' } } },
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxthq/studio',
    'nuxt-swa',
  ],
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': components => {
      const globals = components.filter(c =>
        ['UButton', 'UIcon'].includes(c.pascalName)
      )

      globals.forEach(c => (c.global = true))
    },
  },
  devtools: { enabled: true },
})
