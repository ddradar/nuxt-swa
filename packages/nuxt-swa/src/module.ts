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
   * @default ['aad', 'github']
   */
  authProviders: (KnownIdentityProvider | string)[]
  /**
   * Define custom roles to use in your app besides the default roles (`anonymous`, `authenticated`).
   * @default []
   */
  customRoles: Omit<string, 'anonymous' | 'authenticated'>[]
}

export default defineNuxtModule<SWAModuleOptions>({
  meta: {
    name,
    configKey: 'swa',
    compatibility: {
      nuxt: '^3.9.0',
    },
  },
  defaults: {
    authProviders: ['aad', 'github'],
    customRoles: [],
  },
  setup(options) {
    const resolver = createResolver(import.meta.url)

    if (options.authProviders.length) {
      addType('IdentityProvider', true)
      addImports({
        name: 'useEasyAuth',
        from: resolver.resolve('runtime/composables/useEasyAuth'),
      })
    }
    addType('UserRole', true)
    addType('AzureOptions', true)

    function addType(type: string, isTemplate = false) {
      return addTypeTemplate({
        filename: `types/${name}/${type}.d.ts`,
        src: resolver.resolve(
          `runtime/types/${type}.d.ts${isTemplate ? '.template' : ''}`
        ),
        options: isTemplate ? options : undefined,
      })
    }
  },
})
