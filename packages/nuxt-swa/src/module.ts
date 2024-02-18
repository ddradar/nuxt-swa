import {
  defineNuxtModule,
  createResolver,
  addTypeTemplate,
  addImports,
} from '@nuxt/kit'

import { defaults, resolveAuthProviders } from './config'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-swa',
    configKey: 'swa',
    compatibility: {
      nuxt: '^3.9.0',
    },
  },
  defaults,
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    if (options.authProviders === undefined)
      options.authProviders = resolveAuthProviders(
        nuxt.options.nitro?.azure?.config
      )

    addTypeTemplate({
      filename: 'types/nuxt-swa.d.ts',
      src: resolver.resolve('runtime/types/nuxt-swa.d.ts.template'),
      options,
    })
    if (options.authProviders.length) {
      // Use auth feature
      addImports({
        name: 'useEasyAuth',
        from: resolver.resolve('runtime/composables/useEasyAuth'),
      })
    }
    // Add `nitro.azure.config` Typing
    addTypeTemplate({
      filename: 'types/AzureOptions.d.ts',
      src: resolver.resolve('runtime/types/AzureOptions.d.ts'),
    })
  },
})
