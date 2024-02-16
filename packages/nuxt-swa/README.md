# Nuxt SWA Module

[![NPM Version](https://img.shields.io/npm/v/nuxt-swa?logo=npm)](https://npmjs.com/package/nuxt-swa)
[![License](https://img.shields.io/github/license/ddradar/nuxt-swa)](https://github.com/ddradar/nuxt-swa/blob/main/LICENSE)
[![Nuxt](https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js)](https://nuxt.com)
[![Node.js CI](https://github.com/ddradar/nuxt-swa/actions/workflows/node-ci.yml/badge.svg)](https://github.com/ddradar/nuxt-swa/actions/workflows/node-ci.yml)
[![codecov](https://codecov.io/gh/ddradar/nuxt-swa/graph/badge.svg?token=UtH6u1Ndid)](https://codecov.io/gh/ddradar/nuxt-swa)

Provides [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/) features to your Nuxt apps.

- [📖 &nbsp;Documentation](https://proud-plant-0fe90bc00.4.azurestaticapps.net/)

## Features

- 🔑 &nbsp;Authentication & Authorization
- 📐 &nbsp;Provide type for `nitro.azure.config` (PLANNED)
- 🗄️ &nbsp;[Data API](https://learn.microsoft.com/azure/static-web-apps/database-overview) support (PLANNED)

## Quick Setup

1. Add `nuxt-swa` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-swa

# Using yarn
yarn add --dev nuxt-swa

# Using npm
npm install --save-dev nuxt-swa
```

2. Add `nuxt-swa` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-swa'
  ]
})
```

That's it! You can now use Nuxt SWA Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
pnpm install

# Develop with the docs
pnpm dev

# Build module & docs
# Note: You need to purchase a Nuxt UI Pro license key and set it in the `NUXT_UI_PRO_LICENSE` environment variable.
pnpm build

# Run ESLint & Prettier
pnpm lint

# Run ESLint & Prettier (auto fix)
pnpm format

# Run Vitest
pnpm test
```
