// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { parseClientPrincipal } from '~/src/utils'
import { _clientPrincipal } from './constants'

describe('utils', () => {
  describe('parseClientPrincipal', () => {
    it.each([undefined, null, '', 'foo'])('(%o) returns null', header => {
      expect(parseClientPrincipal(header)).toBeNull()
    })

    it('(<JSON => utf-8 => Base64 encoded string>) returns ClientPrincipal', () => {
      // Arrange
      const jsonString = JSON.stringify(_clientPrincipal)
      const buffer = Buffer.from(jsonString, 'utf-8')
      const base64String = buffer.toString('base64')

      // Act
      const sut = parseClientPrincipal(base64String)

      // Assert
      expect(sut).toStrictEqual(_clientPrincipal)
    })
  })
})
