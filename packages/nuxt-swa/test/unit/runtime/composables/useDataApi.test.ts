import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { useRuntimeConfigMock, useFetchMock } = vi.hoisted(() => ({
  useRuntimeConfigMock: vi.fn(),
  useFetchMock: vi.fn(),
}))
mockNuxtImport('useRuntimeConfig', () => useRuntimeConfigMock)
mockNuxtImport('useFetch', () => useFetchMock)

type User = { id: string; name: string }

describe('runtime/composables/useDataApi', () => {
  const runtimeConfig = {
    public: { swa: { rest: '/data-api/rest', graphql: '/data-api/graphql' } },
  }
  beforeEach(() => {
    useRuntimeConfigMock.mockClear()
    useFetchMock.mockClear()
  })

  describe('useDataApiRest', () => {
    it.each([
      ['/User/id/0000', undefined, '/data-api/rest/User/id/0000'],
      [
        '/User',
        { method: 'POST' as const, body: { id: '0001', name: 'foo' } },
        '/data-api/rest/User',
      ],
    ])('(%s, %o) calls %s endpoint', async (request, opts, expected) => {
      // Arrange
      useRuntimeConfigMock.mockReturnValue(runtimeConfig)

      // Act
      await useDataApiRest<User>(request, opts)

      // Assert
      expect(useFetchMock).toBeCalledWith(
        expected,
        { ...opts, transform: expect.any(Function) },
        expect.any(String)
      )
    })
  })

  describe('useDataApiGraphQL', () => {
    it.each([
      [
        'users-get',
        /* GraphQL */ '{ users { id, name } }',
        undefined,
        undefined,
      ],
      [
        'users-post',
        /* GraphQL */ 'mutation create($id: ID!, $name: String!){ createUser(item: { id: $id, name: $name }){ id, name } }',
        { id: '0001', name: 'foo' },
        {},
      ],
    ])('', async (key, query, variables, opts) => {
      // Arrange
      useRuntimeConfigMock.mockReturnValue(runtimeConfig)

      // Act
      await useDataApiGraphQL<User>(key, query, variables, opts)

      // Assert
      expect(useFetchMock).toBeCalledWith(
        '/data-api/graphql',
        {
          ...opts,
          key,
          body: { query, variables },
          method: 'POST',
          transform: expect.any(Function),
        },
        expect.any(String)
      )
    })
  })
})
