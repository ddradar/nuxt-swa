// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { parseClientPrincipal } from '~/src/utils'

describe('utils', () => {
  describe('parseClientPrincipal', () => {
    it.each([undefined, null, '', 'foo'])('%o returns null', header => {
      expect(parseClientPrincipal(header)).toBeNull()
    })

    it('(Base64 encoded JSON string) returns ClientPrincipal', () => {
      // Arrange
      const sampleData = {
        identityProvider: 'github',
        userId: 'd75b260a64504067bfc5b2905e3b8182',
        userDetails: 'username',
        userRoles: ['anonymous', 'authenticated'],
        claims: [{ typ: 'name', val: 'Azure Static Web Apps' }],
      }
      const jsonString = JSON.stringify(sampleData)
      const buffer = Buffer.from(jsonString, 'utf-8')
      const base64String = buffer.toString('base64')

      // Act
      const sut = parseClientPrincipal(base64String)

      // Assert
      expect(sut).toStrictEqual(sampleData)
    })
  })
})
