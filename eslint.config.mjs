import {
  createConfigForNuxt,
  defineFlatConfigs,
} from '@nuxt/eslint-config/flat'
import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
export default defineFlatConfigs(
  ...(await createConfigForNuxt({
    dirs: {
      layers: ['docs'],
      components: ['docs/components'],
      composables: [
        'docs/composables',
        'packages/nuxt-swa/src/runtime/composables',
      ],
      layouts: ['docs/layouts'],
      middelware: [
        'docs/middleware',
        'packages/nuxt-swa/src/runtime/middleware',
      ],
      pages: ['docs/pages'],
      servers: ['docs/server', 'packages/nuxt-swa/src/runtime/server'],
    },
  })),
  eslintConfigPrettier,
  {
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  }
)
