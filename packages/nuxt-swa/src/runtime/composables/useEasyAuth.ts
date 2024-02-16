import type { ComputedRef, DeepReadonly, Ref } from 'vue'
import { navigateTo, useAsyncData } from '#app'
import { computed, readonly, useRequestHeader } from '#imports'

import {
  _authBasePath,
  _authDataKey,
  _clientPrincipalHeader,
} from '~/src/constants'
import { parseClientPrincipal } from '~/src/utils'

interface Claim {
  typ: string
  val: string
}
/**
 * User-identifiable information to your app.
 * @see https://learn.microsoft.com/azure/static-web-apps/user-information?tabs=javascript#client-principal-data
 */
export interface ClientPrincipal {
  /** The name of the identity provider. */
  identityProvider: IdentityProvider
  /**
   * An Azure Static Web Apps-specific unique identifier for the user.
   * - The value is unique on a per-app basis. For instance, the same user returns a different `userId` value on a different Static Web Apps resource.
   * - The value persists for the lifetime of a user. If you delete and add the same user back to the app, a new `userId` is generated.
   */
  userId: string
  /**
   * Username or email address of the user.
   * Some providers return the user's email address, while others send the user handle.
   */
  userDetails: string
  /** An array of the user's assigned roles. */
  userRoles: UserRole[]
  /**
   * An array of claims returned by your custom authentication provider.
   * Only accessible in the direct-access endpoint (/.auth/me).
   */
  claims?: Claim[]
}
/** return type of `/.auth/me` endpoint */
type AuthMeResult = { clientPrincipal: ClientPrincipal | null }

/**
 * Use authentication & authorization features provided by Azure Static Web Apps.
 * @see https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization
 */
export async function useEasyAuth(): Promise<{
  /** Client Principal data */
  clientPrincipal: DeepReadonly<Ref<ClientPrincipal | null>>
  /** Returns user is logged in app or not. (shorthand of `!!clientPrincipal.value`) */
  isLoggedIn: ComputedRef<boolean>
  /** Refresh `clientPrincipal` data. */
  refresh: ReturnType<typeof useAsyncData>['refresh']
  /**
   * Returns user has specified role.
   * @param role Role name
   * @returns true when `role` is "anonymous" or {@link ClientPrincipal.userRoles clientPrincipal.userRoles} includes `role`.
   */
  hasRole: (role: UserRole) => boolean
  /**
   * Sign in to your app.
   * @param provider Authorization provider used for login
   * @see https://learn.microsoft.com/azure/static-web-apps/authentication-authorization#set-up-sign-in
   */
  login: (provider: IdentityProvider) => Promise<void>
  /**
   * Sign out from your app.
   * @see https://learn.microsoft.com/azure/static-web-apps/authentication-authorization#set-up-sign-out
   */
  logout: () => Promise<void>
  /**
   * Remove personal data from your app.
   * @param provider Authorization provider
   * @see https://learn.microsoft.com/azure/static-web-apps/authentication-authorization#remove-personal-data
   */
  purge: (provider: IdentityProvider) => Promise<void>
}> {
  const { data: _auth, refresh } = await useAsyncData<ClientPrincipal | null>(
    _authDataKey,
    async () => {
      if (import.meta.client) {
        return (await $fetch<AuthMeResult>(`${_authBasePath}/me`))
          .clientPrincipal
      }

      if (import.meta.server)
        return parseClientPrincipal(useRequestHeader(_clientPrincipalHeader))
      return null
    }
  )

  // Computed
  const isLoggedIn = computed(() => !!_auth.value)

  // Method
  function hasRole(role: UserRole): boolean {
    return role === 'anonymous' || !!_auth.value?.userRoles.includes(role)
  }
  async function login(provider: IdentityProvider): Promise<void> {
    await navigateTo(`${_authBasePath}/login/${provider}`, {
      external: true,
    })
    await refresh()
  }
  async function logout(): Promise<void> {
    await navigateTo(`${_authBasePath}/logout`, { external: true })
    await refresh()
  }
  async function purge(provider: IdentityProvider): Promise<void> {
    await navigateTo(`${_authBasePath}/purge/${provider}`, {
      external: true,
    })
    await refresh()
  }

  return {
    clientPrincipal: readonly(_auth),
    isLoggedIn,
    refresh,
    hasRole,
    login,
    logout,
    purge,
  }
}
