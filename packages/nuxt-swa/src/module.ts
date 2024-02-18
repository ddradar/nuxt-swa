import {
  defineNuxtModule,
  createResolver,
  addTypeTemplate,
  addImports,
} from '@nuxt/kit'
import { defaults, type SWAModuleOptions } from './config'

export default defineNuxtModule<SWAModuleOptions>({
  meta: {
    name: 'nuxt-swa',
    configKey: 'swa',
    compatibility: {
      nuxt: '^3.9.0',
    },
  },
  defaults,
  setup(options) {
    const resolver = createResolver(import.meta.url)

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
