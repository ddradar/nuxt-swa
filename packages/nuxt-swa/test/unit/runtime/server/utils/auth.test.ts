// @vitest-environment node
import { getCookie } from 'nuxt/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getClientPrincipal, hasRole } from '~/src/runtime/server/utils/auth'
import { parseClientPrincipal } from '~/src/runtime/utils/auth'
import { _clientPrincipal } from '~/test/unit/constants'

vi.mock('nuxt/server')
vi.mock('~/src/runtime/utils/auth')

type Role = Parameters<typeof hasRole>[1]

describe('runtime/server/utils/auth', () => {
  const getHeaderValueMock = vi.fn()
  const event = {
    req: {
      headers: {
        get: getHeaderValueMock,
      },
    },
  } as unknown as Parameters<typeof getClientPrincipal>[0]

  beforeEach(() => {
    vi.mocked(getCookie).mockClear()
    vi.mocked(parseClientPrincipal).mockClear()
    getHeaderValueMock.mockReset()
    getHeaderValueMock.mockReturnValue(null)
  })

  describe('getClientPrincipal', () => {
    it.each([null, _clientPrincipal])(
      'returns same object as parseClientPrincipal()',
      auth => {
        // Arrange
        vi.mocked(parseClientPrincipal).mockReturnValue(auth)
        // Act
        const res = getClientPrincipal(event)
        // Assert
        expect(res).toStrictEqual(auth)
        expect(getHeaderValueMock).toHaveBeenCalled()
        expect(vi.mocked(getCookie)).toHaveBeenCalled()
      }
    )
  })
  describe('hasRole', () => {
    it.each([
      [null, 'anonymous', false],
      [null, 'authenticated', false],
      [_clientPrincipal, 'administrator', false],
      [_clientPrincipal, 'authenticated', true],
    ])('{ auth: %o } (%o) returns %o', (auth, role, expected) => {
      // Arrange
      vi.mocked(parseClientPrincipal).mockReturnValue(auth)
      // Act - Assert
      expect(hasRole(event, role as Role)).toBe(expected)
    })
    it.each([
      [null, ['anonymous', 'authenticated'], false],
      [_clientPrincipal, ['administrator', 'authenticated'], true],
    ])('{ auth: %o } (%o) returns %o', (auth, roles, expected) => {
      // Arrange
      vi.mocked(parseClientPrincipal).mockReturnValue(auth)
      // Act - Assert
      expect(hasRole(event, ...(roles as Role[]))).toBe(expected)
    })
  })
})
