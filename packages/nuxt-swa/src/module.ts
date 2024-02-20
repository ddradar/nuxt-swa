import {
  defineNuxtModule,
  createResolver,
  addTypeTemplate,
  addRouteMiddleware,
  addImports,
  useLogger,
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
    const logger = useLogger('nuxt-swa')

    if (!nuxt.options.nitro?.azure?.config)
      logger.warn(
        '`nitro.azure.config` in your `nuxt.config.ts` file is undefined.\nIf you are using `staticwebapp.config.json`, consider migrating that configuration.'
      )

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
      addRouteMiddleware({
        name: 'auth',
        path: resolver.resolve('runtime/middleware/auth'),
        global: true,
      })
    }
    // Add `nitro.azure.config` Typing
    addTypeTemplate({
      filename: 'types/AzureOptions.d.ts',
      src: resolver.resolve('runtime/types/AzureOptions.d.ts'),
    })
  },
})
