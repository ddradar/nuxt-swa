import {
  defineNuxtModule,
  createResolver,
  addTypeTemplate,
  addImports,
} from '@nuxt/kit'

const name = 'nuxt-swa'
type KnownIdentityProvider =
  | 'aad'
  | 'apple'
  | 'facebook'
  | 'github'
  | 'google'
  | 'twitter'
export interface SWAModuleOptions {
  /**
   * Authentication Provider list to login your app.
   * If your app does not use built-in Authentication/Authorization, please set this to `[]`.
   * @default ['aad', 'github']
   */
  authProviders: (KnownIdentityProvider | string)[]
  /**
   * Define custom roles to use in your app besides the default roles (`anonymous`, `authenticated`).
   * @default []
   */
  customRoles: Omit<string, 'anonymous' | 'authenticated'>[]
}
export const defaults: SWAModuleOptions = {
  authProviders: ['aad', 'github'],
  customRoles: [],
}

export default defineNuxtModule<SWAModuleOptions>({
  meta: {
    name,
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
