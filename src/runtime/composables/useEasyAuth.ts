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
export interface ClientPrincipal {
  identityProvider: IdentityProvider
  userId: string
  userDetails: string
  userRoles: UserRole
  claims?: Claim[]
}
type AuthMeResult = { clientPrincipal: ClientPrincipal | null }

export async function useEasyAuth() {
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
  function hasRole(role: UserRole) {
    return role === 'anonymous' || !!_auth.value?.userRoles.includes(role)
  }
  async function login(provider: IdentityProvider) {
    await navigateTo(`${_authBasePath}/login/${provider}`, {
      external: true,
    })
    await refresh()
  }
  async function logout() {
    await navigateTo(`${_authBasePath}/logout`, { external: true })
    await refresh()
  }
  async function purge(provider: IdentityProvider) {
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
