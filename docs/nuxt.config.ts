// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  nitro: {
    preset: 'azure',
    azure: { config: { platform: { apiRuntime: 'node:18' } } },
  },
  routeRules: {
    '/api/search.json': { prerender: true },
  },
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    '@nuxthq/studio',
    '@nuxtjs/fontaine',
    '@nuxtjs/google-fonts',
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
    // @ts-ignore
    'applicationinsights:config': config => {
      config.connectionString =
        process.env.APPLICATIONINSIGHTS_CONNECTION_STRING
    },
  },
  ui: {
    icons: ['heroicons', 'simple-icons'],
  },
  // Fonts
  fontMetrics: { fonts: ['DM Sans'] },
  googleFonts: {
    display: 'swap',
    download: true,
    families: { 'DM+Sans': [400, 500, 600, 700] },
  },
  devtools: { enabled: true },
})
