// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    modules: ['nuxt-applicationinsights'],
  },
  extends: ['@nuxt/ui-pro'],
  experimental: { asyncContext: true },
  nitro: {
    preset: 'azure',
    azure: { config: { platform: { apiRuntime: 'node:18' } } },
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/fonts',
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
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  devtools: { enabled: true },
  runtimeConfig: {
    applicationinsights: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING || '',
    },
  },
})
