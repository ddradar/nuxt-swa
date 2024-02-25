import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const rest = '/data-api/rest'
const graphql = '/data-api/graphql'
const { useFetchMock } = vi.hoisted(() => ({ useFetchMock: vi.fn() }))
mockNuxtImport('useRuntimeConfig', () => () => ({
  public: { swa: { rest, graphql } },
}))
mockNuxtImport('useFetch', () => useFetchMock)

type User = { id: string; name: string }

describe('runtime/composables/useDataApi', () => {
  beforeEach(() => {
    useFetchMock.mockClear()
  })

  describe('useDataApi', () => {
    it('creates $fetch object for REST & GraphQL', async () => {
      // Arrange
      vi.mocked($fetch.create).mockClear()
      // Act
      useDataApi()
      // Assert
      expect(vi.mocked($fetch.create)).toBeCalledWith({
        baseURL: graphql,
        method: 'POST',
      })
      expect(vi.mocked($fetch.create)).toBeCalledWith({ baseURL: rest })
    })
  })

  describe('useFetchRest', () => {
    it.each([
      ['/User/id/0000', undefined, `${rest}/User/id/0000`],
      [
        '/User',
        { method: 'POST' as const, body: { id: '0001', name: 'foo' } },
        `${rest}/User`,
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
        graphql,
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
