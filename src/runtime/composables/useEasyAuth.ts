import { navigateTo, useAsyncData } from '#app'
import { computed, readonly, useRequestHeader } from '#imports'
import { parseClientPrincipal } from '~/src/utils'
import { _authBasePath, _clientPrincipalHeader } from '../../constants'

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

export async function useEasyAuth() {
  const { data: _auth, refresh } = await useAsyncData<ClientPrincipal | null>(
    'swa-principal',
    async () => {
      if (import.meta.client) {
        return (
          await $fetch<{ clientPrincipal: ClientPrincipal | null }>(
            `${_authBasePath}/me`
          )
        ).clientPrincipal
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
    return role === 'anonymous' || _auth.value?.userRoles.includes(role)
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
