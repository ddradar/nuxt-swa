import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { RouteLocationNormalized as Route } from '#vue-router'
import authRouteMiddleware from '~/src/runtime/middleware/auth'

const { abortNavigationMock, useEasyAuthMock } = vi.hoisted(() => ({
  useEasyAuthMock: vi.fn(),
  abortNavigationMock: vi.fn(),
}))
mockNuxtImport(
  'defineNuxtRouteMiddleware',
  () => (func: (to: Route) => void) => func
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
    await authRouteMiddleware({ meta: {} } as Route, {} as Route)

    // Assert
    expect(abortNavigationMock).not.toBeCalled()
  })
  it.each(['authenticated', ['authenticated']])(
    '{ allowedRoles: %o } returns 200',
    async allowedRoles => {
      // Arrange
      useEasyAuthMock.mockResolvedValue({
        hasRole: (_role: string) => ref(true),
      })

      // Act
      await authRouteMiddleware(
        { meta: { allowedRoles } } as Route,
        {} as Route
      )

      // Assert
      expect(abortNavigationMock).not.toBeCalled()
    }
  )
  it.each(['administrator', ['administrator']])(
    '{ allowedRoles: %o } returns 401 when anonymous',
    async allowedRoles => {
      // Arrange
      useEasyAuthMock.mockResolvedValue({
        hasRole: (_role: string) => ref(false),
        isLoggedIn: ref(false),
      })

      // Act
      await authRouteMiddleware(
        { meta: { allowedRoles } } as Route,
        {} as Route
      )

      // Assert
      expect(abortNavigationMock).toBeCalledWith({ statusCode: 401 })
    }
  )
  it.each(['administrator', ['administrator']])(
    '{ allowedRoles: %o } returns 403 when authenticated',
    async allowedRoles => {
      // Arrange
      useEasyAuthMock.mockResolvedValue({
        hasRole: (_role: string) => ref(false),
        isLoggedIn: ref(true),
      })

      // Act
      await authRouteMiddleware(
        { meta: { allowedRoles } } as Route,
        {} as Route
      )

      // Assert
      expect(abortNavigationMock).toBeCalledWith({ statusCode: 403 })
    }
  )
})
