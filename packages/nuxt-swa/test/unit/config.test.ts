// @vitest-environment node
import { describe, expect, it } from 'vitest'

import { resolveAuthProviders } from '~/src/config'

describe('config', () => {
  describe('resolveAuthProviders', () => {
    it.each([undefined, {}, { auth: {} }])(
      '(%o) returns ["aad", "github"]',
      config =>
        expect(resolveAuthProviders(config)).toStrictEqual(['aad', 'github'])
    )

    it.each([
      [{}, ['aad', 'github']],
      [
        { google: {}, twitter: { enabled: false } },
        ['aad', 'github', 'google'],
      ],
      [
        {
          azureActiveDirectory: { enabled: false },
          customOpenIdConnectProviders: { line: {}, yahoo: { enabled: false } },
        },
        ['github', 'line'],
      ],
    ])(
      '( azure.config.auth.identityProviders: %o ) returns %o',
      (identityProviders, expected) =>
        expect(
          resolveAuthProviders({ auth: { identityProviders } })
        ).toStrictEqual(expected)
    )
  })
})
