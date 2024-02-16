import {
  defineNuxtModule,
  createResolver,
  addTypeTemplate,
  addImports,
} from '@nuxt/kit'

// Module options TypeScript interface definition
type KnownIdentityProvider =
  | 'aad'
  | 'apple'
  | 'facebook'
  | 'github'
  | 'google'
  | 'twitter'
export interface ModuleOptions {
  authProviders: (KnownIdentityProvider | string)[]
  customRoles: string[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@ddradar/nuxt-swa',
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
      addTypeTemplate({
        filename: 'types/nuxt-swa.d.ts',
        getContents: () => `// Generated by @ddradar/nuxt-swa
type IdentityProvider = ${options.authProviders.map(s => `'${s}'`).join(' | ')}
type UserRole = ${['anonymous', 'authenticated', ...options.customRoles].map(s => `'${s}'`).join(' | ')}
`,
      })
      addImports({
        name: 'useEasyAuth',
        from: resolver.resolve('runtime/composables/useEasyAuth'),
      })
    }
  },
})
