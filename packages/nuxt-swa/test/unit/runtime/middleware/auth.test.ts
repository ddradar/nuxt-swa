import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import authRouteMiddleware from '~/src/runtime/middleware/auth'
import type { RouteLocationNormalized } from '#vue-router'

const { abortNavigationMock, useEasyAuthMock } = vi.hoisted(() => ({
  useEasyAuthMock: vi.fn(),
  abortNavigationMock: vi.fn(),
}))
mockNuxtImport(
  'defineNuxtRouteMiddleware',
  () => (func: (to: RouteLocationNormalized) => void) => func
)
mockNuxtImport('useEasyAuth', () => useEasyAuthMock)
mockNuxtImport('abortNavigation', () => abortNavigationMock)

describe('runtime/middleware/auth', () => {
  beforeEach(() => {
    useEasyAuthMock.mockClear()
    abortNavigationMock.mockClear()
  })

  it('{ allowedRoles: undefined } returns 200', async () => {
    // Arrange - Act
    await authRouteMiddleware({ meta: {} } as any, {} as any)

    // Assert
    expect(abortNavigationMock).not.toBeCalled()
  })
  it.each(['authenticated', ['authenticated']])(
    '{ allowedRoles: %o } returns 200',
    async allowedRoles => {
      // Arrange
      useEasyAuthMock.mockResolvedValue({ hasRole: (_role: string) => true })

      // Act
      await authRouteMiddleware({ meta: { allowedRoles } } as any, {} as any)

      // Assert
      expect(abortNavigationMock).not.toBeCalled()
    }
  )
  it.each(['administrator', ['administrator']])(
    '{ allowedRoles: %o } returns 401 when anonymous',
    async allowedRoles => {
      // Arrange
      useEasyAuthMock.mockResolvedValue({
        hasRole: (_role: string) => false,
        isLoggedIn: ref(false),
      })

      // Act
      await authRouteMiddleware({ meta: { allowedRoles } } as any, {} as any)

      // Assert
      expect(abortNavigationMock).toBeCalledWith({ statusCode: 401 })
    }
  )
  it.each(['administrator', ['administrator']])(
    '{ allowedRoles: %o } returns 403 when authenticated',
    async allowedRoles => {
      // Arrange
      useEasyAuthMock.mockResolvedValue({
        hasRole: (_role: string) => false,
        isLoggedIn: ref(true),
      })

      // Act
      await authRouteMiddleware({ meta: { allowedRoles } } as any, {} as any)

      // Assert
      expect(abortNavigationMock).toBeCalledWith({ statusCode: 403 })
    }
  )
})
