// @vitest-environment node
import type { H3Event } from 'h3'
import { getCookie, getHeader } from 'h3'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getClientPrincipal, hasRole } from '~/src/runtime/server/utils/auth'
import { parseClientPrincipal } from '~/src/runtime/utils/auth'
import { _clientPrincipal } from '~/test/unit/constants'

vi.mock('h3')
vi.mock('~/src/runtime/utils/auth')

type Role = Parameters<typeof hasRole>[1]

describe('runtime/server/utils/auth', () => {
  beforeEach(() => {
    vi.mocked(getCookie).mockClear()
    vi.mocked(getHeader).mockClear()
    vi.mocked(parseClientPrincipal).mockClear()
  })

  describe('getClientPrincipal', () => {
    it.each([null, _clientPrincipal])(
      'returns same object as parseClientPrincipal()',
      auth => {
        // Arrange
        vi.mocked(parseClientPrincipal).mockReturnValue(auth)
        // Act
        const res = getClientPrincipal({} as H3Event)
        // Assert
        expect(res).toStrictEqual(auth)
        expect(vi.mocked(getHeader)).toBeCalled()
        expect(vi.mocked(getCookie)).toBeCalled()
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
      expect(hasRole({} as H3Event, role as Role)).toBe(expected)
    })
    it.each([
      [null, ['anonymous', 'authenticated'], false],
      [_clientPrincipal, ['administrator', 'authenticated'], true],
    ])('{ auth: %o } (%o) returns %o', (auth, roles, expected) => {
      // Arrange
      vi.mocked(parseClientPrincipal).mockReturnValue(auth)
      // Act - Assert
      expect(hasRole({} as H3Event, ...(roles as Role[]))).toBe(expected)
    })
  })
})
