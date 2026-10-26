export default defineNuxtConfig({
  modules: ['./src/module', '@nuxt/test-utils/module', '@nuxt/eslint'],
  eslint: {
    config: {
      standalone: false,
      tooling: true,
    },
  },
})
