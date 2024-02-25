import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const { useFetchMock } = vi.hoisted(() => ({ useFetchMock: vi.fn() }))
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: { swa: { rest: '/data-api/rest', graphql: '/data-api/graphql' } },
}))
mockNuxtImport('useFetch', () => useFetchMock)

type User = { id: string; name: string }

describe('runtime/composables/useDataApi', () => {
  beforeEach(() => {
    useFetchMock.mockClear()
  })

  describe('useFetchRest', () => {
    it.each([
      ['/User/id/0000', undefined, '/data-api/rest/User/id/0000'],
      [
        '/User',
        { method: 'POST' as const, body: { id: '0001', name: 'foo' } },
        '/data-api/rest/User',
      ],
    ])('(%s, %o) calls %s endpoint', async (request, opts, expected) => {
      // Arrange - Act
      await useFetchRest<User>(request, opts)

      // Assert
      expect(useFetchMock).toBeCalledWith(
        expected,
        { ...opts, transform: expect.any(Function) },
        expect.any(String)
      )
    })
  })

  describe('useFetchGraphQL', () => {
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
      // Arrange - Act
      await useFetchGraphQL<User>(key, query, variables, opts)

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
