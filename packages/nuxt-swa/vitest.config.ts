import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    setupFiles: ['./test/setup-fetch.ts'],
    coverage: {
      enabled: true,
      all: true,
      reporter: ['json', 'text'],
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: [
        '.nuxt/**',
        'src/module.ts',
        'test/**',
        '**.config.ts',
        '**/*.d.ts',
        '**.test.ts',
      ],
    },
  },
})
