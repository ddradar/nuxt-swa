import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    coverage: {
      enabled: true,
      all: true,
      reporter: ['json', 'text'],
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: [
        '.nuxt/**',
        'test/**',
        '**.config.ts',
        '**/*.d.ts',
        '**.test.ts',
      ],
    },
  },
})
