// @vitest-environment node
import { describe, expect, it } from 'vitest'

import {
  generateTypeDefinition,
  resolveAuthProviders,
  type ModuleOptions,
} from '~~/src/module'

describe('module.ts', () => {
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

  describe('generateTypeDefinition', () => {
    it.each([
      {
        authProviders: ['aad', 'github'],
        customRoles: [],
        dataApi: { rest: '/rest', graphql: '/graphql' },
      },
      {
        authProviders: [],
        customRoles: [],
        dataApi: false,
      },
      {
        authProviders: ['github', 'twitter', 'line'],
        customRoles: ['administrator'],
        dataApi: { rest: '/rest', graphql: '/graphql' },
      },
    ] satisfies ModuleOptions[])(
      '(%o) renders expected Type Definition',
      options => expect(generateTypeDefinition(options)).toMatchSnapshot()
    )
  })
})
