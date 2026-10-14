import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { _clientPrincipal } from '../../constants'
import { useEasyAuth } from '~/src/runtime/composables/useEasyAuth'
import { ref } from '#imports'

const { navigateToMock, useAsyncDataMock } = vi.hoisted(() => ({
  useAsyncDataMock: vi.fn(),
  navigateToMock: vi.fn(),
}))
mockNuxtImport('navigateTo', () => navigateToMock)
mockNuxtImport('useAsyncData', () => useAsyncDataMock)

describe('runtime/composables/useEasyAuth', () => {
  beforeEach(() => {
    navigateToMock.mockClear()
    useAsyncDataMock.mockClear()
  })

  // Computed
  describe('isLoggedIn', () => {
    it.each([
      [null, false],
      [_clientPrincipal, true],
    ] as const)('{ auth: %o } returns %o', async (auth, expected) => {
      // Arrange
      useAsyncDataMock.mockResolvedValue({ data: ref(auth) })

      // Act - Assert
      const { isLoggedIn } = await useEasyAuth()
      expect(isLoggedIn.value).toBe(expected)
    })
  })

  // Methods
  describe('hasRole', () => {
    it.each([
      ['anonymous', null, true],
      ['anonymous', _clientPrincipal, true],
      ['authenticated', null, false],
      ['authenticated', _clientPrincipal, true],
    ] as const)(
      '(%o) { auth: %o } returns %o',
      async (role, auth, expected) => {
        // Arrange
        useAsyncDataMock.mockResolvedValue({ data: ref(auth) })

        // Act - Assert
        const { hasRole } = await useEasyAuth()
        expect(hasRole(role).value).toBe(expected)
      }
    )
  })
  describe('login', () => {
    it.each([
      ['github', '/.auth/login/github'],
      ['aad', '/.auth/login/aad'],
    ] as const)('("%s") navigates to "%s"', async (provider, to) => {
      // Arrange
      const refresh = vi.fn()
      useAsyncDataMock.mockResolvedValue({ data: ref(null), refresh })

      // Act
      const { login } = await useEasyAuth()
      await login(provider)

      // Assert
      expect(navigateToMock).toHaveBeenCalledWith(to, { external: true })
      expect(refresh).toHaveBeenCalled()
    })
  })
  describe('logout', () => {
    it('navigates to "/.auth/logout"', async () => {
      // Arrange
      const refresh = vi.fn()
      useAsyncDataMock.mockResolvedValue({ data: ref(null), refresh })

      // Act
      const { logout } = await useEasyAuth()
      await logout()

      // Assert
      expect(navigateToMock).toHaveBeenCalledWith(`/.auth/logout`, {
        external: true,
      })
      expect(refresh).toHaveBeenCalled()
    })
  })
  describe('purge', () => {
    it.each([
      ['github', '/.auth/purge/github'],
      ['aad', '/.auth/purge/aad'],
    ] as const)('("%s") navigates to "%s"', async (provider, to) => {
      // Arrange
      const refresh = vi.fn()
      useAsyncDataMock.mockResolvedValue({ data: ref(null), refresh })

      // Act
      const { purge } = await useEasyAuth()
      await purge(provider)

      // Assert
      expect(navigateToMock).toHaveBeenCalledWith(to, { external: true })
      expect(refresh).toHaveBeenCalled()
    })
  })
})
