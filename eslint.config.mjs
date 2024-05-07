import eslintConfigPrettier from 'eslint-config-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import docsConfig from './docs/.nuxt/eslint.config.mjs'
import nuxtSwaConfig from './packages/nuxt-swa/.nuxt/eslint.config.mjs'

/**
 * @type {import('eslint').Linter.FlatConfig[]}
 */
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
