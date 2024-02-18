import {
  type _knownIdentityProviders,
  _preConfiguredProviders,
} from './constants'

export interface SWAModuleOptions {
  /**
   * Authentication Provider list to login your app.
   * If your app does not use built-in Authentication/Authorization, please set this to `[]`.
   * @default ['aad', 'github']
   */
  authProviders: (
    | (typeof _knownIdentityProviders)[number]
    | Omit<string, (typeof _knownIdentityProviders)[number]>
  )[]
  /**
   * Define custom roles to use in your app besides the default roles (`anonymous`, `authenticated`).
   * @default []
   */
  customRoles: Omit<string, 'anonymous' | 'authenticated'>[]
}
export const defaults: SWAModuleOptions = {
  authProviders: _preConfiguredProviders,
  customRoles: [],
}
