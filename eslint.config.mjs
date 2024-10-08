// @ts-check
import vitest from '@vitest/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import docsConfig from './docs/.nuxt/eslint.config.mjs'
import nuxtSwaConfig from './packages/nuxt-swa/.nuxt/eslint.config.mjs'

export default docsConfig({ ignores: ['packages'] })
  .append(nuxtSwaConfig({ ignores: ['docs'] }))
  .append(eslintConfigPrettier)
  .append({
    plugins: { 'simple-import-sort': simpleImportSort },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  })
  .append({
    files: ['**/*.test.ts'],
    plugins: { vitest },
    rules: {
      ...vitest.configs.recommended.rules,
      'vitest/consistent-test-filename': 'error',
      'vitest/consistent-test-it': ['error', { fn: 'test' }],
      'vitest/no-alias-methods': 'error',
      'vitest/no-conditional-in-test': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-duplicate-hooks': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-import-node-test': 'error',
      'vitest/no-standalone-expect': 'error',
      'vitest/no-test-return-statement': 'error',
      'vitest/prefer-comparison-matcher': 'error',
      'vitest/prefer-each': 'error',
      'vitest/prefer-equality-matcher': 'error',
      'vitest/prefer-hooks-in-order': 'error',
      'vitest/prefer-hooks-on-top': 'error',
      'vitest/prefer-mock-promise-shorthand': 'error',
      'vitest/prefer-strict-equal': 'error',
      'vitest/require-to-throw-message': 'error',
    },
  })
