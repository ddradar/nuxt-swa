import type { NuxtConfig } from 'nuxt/config'

import {
  type _knownIdentityProviders,
  _preConfiguredProviders,
} from './runtime/constants'

export interface SWAModuleOptions {
  /**
   * Authentication Provider list to login your app.
   * If your app does not use built-in Authentication/Authorization, please set this to `[]`.
   * @default ['aad', 'github']
   */
  authProviders?: (
    | (typeof _knownIdentityProviders)[number]
    | Omit<string, (typeof _knownIdentityProviders)[number]>
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
export const defaults: SWAModuleOptions = {
  customRoles: [],
  dataApi: { rest: '/rest', graphql: '/graphql' },
}

/** Resolve `authProviders` option from Nitro config. */
export function resolveAuthProviders(
  options: Required<Required<NuxtConfig>['nitro']>['azure']['config']
): Required<SWAModuleOptions>['authProviders'] {
  if (!options?.auth?.identityProviders) return _preConfiguredProviders

  const identityProviders = options?.auth?.identityProviders

  const result: Required<SWAModuleOptions>['authProviders'] = []

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
    provider: (typeof _preConfiguredProviders)[number]
  ) {
    const key = provider === 'aad' ? 'azureActiveDirectory' : provider
    if (identityProviders[key]?.enabled !== false) result.push(provider)
  }

  function addCustomProviderIfEnabled(
    provider: (typeof _knownIdentityProviders)[number]
  ) {
    if (
      identityProviders[provider] &&
      identityProviders[provider]?.enabled !== false
    )
      result.push(provider)
  }
}
