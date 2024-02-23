// @vitest-environment node
import { getHeader } from 'h3'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  getClientPrincipal,
  hasRole,
} from '~/src/runtime/server/utils/swa-auth'
import { parseClientPrincipal } from '~/src/runtime/utils/auth'
import { _clientPrincipal } from '~/test/unit/constants'

vi.mock('h3')
vi.mock('~/src/runtime/utils/auth')

describe('runtime/server/utils/swa-auth', () => {
  beforeEach(() => {
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
        const res = getClientPrincipal({} as any)
        // Assert
        expect(res).toStrictEqual(auth)
        expect(vi.mocked(getHeader)).toBeCalled()
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
      expect(hasRole({} as any, role as any)).toBe(expected)
    })
    it.each([
      [null, ['anonymous', 'authenticated'], false],
      [_clientPrincipal, ['administrator', 'authenticated'], true],
    ])('{ auth: %o } (%o) returns %o', (auth, role, expected) => {
      // Arrange
      vi.mocked(parseClientPrincipal).mockReturnValue(auth)
      // Act - Assert
      expect(hasRole({} as any, ...(role as any))).toBe(expected)
    })
  })
})
