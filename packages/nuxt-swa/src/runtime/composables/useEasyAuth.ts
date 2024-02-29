import type { ComputedRef, DeepReadonly, Ref } from 'vue'

import { navigateTo, useAsyncData } from '#app'
import { computed, readonly, useRequestHeader } from '#imports'

import {
  _authBasePath,
  _authDataKey,
  _clientPrincipalHeader,
} from '../constants'
import type { ClientPrincipal } from '../types'
import { parseClientPrincipal } from '../utils/auth'

/** return type of `/.auth/me` endpoint */
type AuthMeResult = { clientPrincipal: ClientPrincipal | null }

/**
 * Use authentication & authorization features provided by Azure Static Web Apps.
 * @see https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization
 */
export const useEasyAuth = async (): Promise<{
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
}> => {
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

export {}
