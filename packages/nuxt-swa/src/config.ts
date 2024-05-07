import type { NuxtConfig } from 'nuxt/config'

export const preConfiguredProviders = ['aad' as const, 'github' as const]
const knownIdentityProviders = [
  'apple',
  'facebook',
  'google',
  'twitter',
] as const

export interface ModuleOptions {
  /**
   * Authentication Provider list to login your app.
   * If your app does not use built-in Authentication/Authorization, please set this to `[]`.
   * @default ['aad', 'github']
   */
  authProviders?: (
    | (typeof knownIdentityProviders)[number]
    | Omit<string, (typeof knownIdentityProviders)[number]>
  )[]
  /**
   * Define custom roles to use in your app besides the default roles (`anonymous`, `authenticated`).
   * @default []
   */
  customRoles: Omit<string, 'anonymous' | 'authenticated'>[]
  /** Data API config */
  dataApi:
    | {
        /** REST endpoint path (same value as `runtime.rest.path` in `staticwebapp.database.config.json`) */ rest: string
        /** GraphQL endpoint path (same value as `runtime.graphql.path` in `staticwebapp.database.config.json`) */ graphql: string
      }
    | false
}
export const defaults: ModuleOptions = {
  customRoles: [],
  dataApi: { rest: '/rest', graphql: '/graphql' },
}

/** Resolve `authProviders` option from Nitro config. */
export function resolveAuthProviders(
  options: Required<Required<NuxtConfig>['nitro']>['azure']['config']
): Required<ModuleOptions>['authProviders'] {
  if (!options?.auth?.identityProviders) return preConfiguredProviders

  const identityProviders = options?.auth?.identityProviders

  const result: Required<ModuleOptions>['authProviders'] = []

  addPreConfiguredProviderIfEnabled('aad') // Microsoft Entra ID (formerly Azure Active Directory)
  addCustomProviderIfEnabled('apple') // Apple
  addCustomProviderIfEnabled('facebook') // Facebook
  addPreConfiguredProviderIfEnabled('github') // GitHub
  addCustomProviderIfEnabled('google') // Google
  addCustomProviderIfEnabled('twitter') // X (formerly Twitter)

  // OpenID Connect
  for (const key in identityProviders.customOpenIdConnectProviders) {
    if (identityProviders.customOpenIdConnectProviders[key]?.enabled !== false)
      result.push(key)
  }

  return result

  function addPreConfiguredProviderIfEnabled(
    provider: (typeof preConfiguredProviders)[number]
  ) {
    const key = provider === 'aad' ? 'azureActiveDirectory' : provider
    if (identityProviders[key]?.enabled !== false) result.push(provider)
  }

  function addCustomProviderIfEnabled(
    provider: (typeof knownIdentityProviders)[number]
  ) {
    if (
      identityProviders[provider] &&
      identityProviders[provider]?.enabled !== false
    )
      result.push(provider)
  }
}

export interface ModulePublicRuntimeConfig {
  /** Nuxt SWA config */
  swa: {
    /** REST API endpoint */ rest: string
    /** GraphQL endpoint */ graphql: string
  }
}

type SpecifiedRole = Exclude<UserRole, 'anonymous'>

declare module '#app' {
  interface PageMeta {
    /** List of roles required to view this page */
    allowedRoles?: SpecifiedRole | SpecifiedRole[]
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    /** List of roles required to view this page */
    allowedRoles?: SpecifiedRole | SpecifiedRole[]
  }
}
