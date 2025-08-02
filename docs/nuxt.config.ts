// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  $production: {
    modules: ['nuxt-applicationinsights'],
    applicationinsights: {
      connectionString: process.env.APPLICATIONINSIGHTS_CONNECTION_STRING,
    },
    content: {
      database: { type: 'sqlite', filename: '/tmp/contents.sqlite' },
    },
  },
  compatibilityDate: '2024-07-11',
  nitro: {
    preset: 'azure-swa',
    azure: { config: { platform: { apiRuntime: 'node:20' } } },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
    'nuxt-swa',
  ],
  css: ['~/assets/css/main.css'],
  content: {
    build: { markdown: { toc: { searchDepth: 1 } } },
    preview: { api: 'https://api.nuxt.studio' },
  },
  icon: {
    provider: 'iconify',
  },
  llms: {
    domain: 'https://proud-plant-0fe90bc00.4.azurestaticapps.net/',
    title: 'Nuxt SWA',
    description: 'Nuxt Module that provides Azure Static Web Apps features.',
    full: {
      title: 'Nuxt SWA - Nuxt Module for Azure Static Web Apps',
      description: 'Nuxt Module that provides Azure Static Web Apps features.',
    },
    sections: [
      {
        title: 'Getting Started',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/getting-started%' },
        ],
      },
      {
        title: 'API',
        contentCollection: 'docs',
        contentFilters: [
          { field: 'path', operator: 'LIKE', value: '/api-docs%' },
        ],
      },
    ],
  },
  devtools: { enabled: true },
})
