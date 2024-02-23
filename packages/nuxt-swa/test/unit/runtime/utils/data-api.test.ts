import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { beforeEach } from 'node:test'
import { describe, expect, it, vi } from 'vitest'

type User = { id: string; name: string }

const users: User[] = [
  { id: '1', name: 'foo' },
  { id: '2', name: 'bar' },
]

const { useRuntimeConfigMock } = vi.hoisted(() => ({
  useRuntimeConfigMock: vi.fn(),
}))
mockNuxtImport('useRuntimeConfig', () => useRuntimeConfigMock)

describe('runtime/utils/data-api', () => {
  const runtimeConfig = {
    public: {
      swa: {
        rest: '/data-api/rest',
        graphql: '/data-api/graphql',
      },
    },
  }
  beforeEach(() => vi.mocked($fetch).mockClear())

  describe('$dataApi("rest")', () => {
    it('calls /data-api/rest/{endpoint}', async () => {
      // Arrange
      useRuntimeConfigMock.mockReturnValue(runtimeConfig)
      vi.mocked($fetch).mockResolvedValue({ value: users })
      // Act
      const res = await $dataApi('rest', '/User')
      // Assert
      expect(res).toStrictEqual({ value: users })
      expect(vi.mocked($fetch)).toBeCalledWith('/data-api/rest/User', undefined)
    })
  })

  describe('$dataApi("graphql")', () => {
    it('calls POST /data-api/graphql', async () => {
      // Arrange
      useRuntimeConfigMock.mockReturnValue(runtimeConfig)
      vi.mocked($fetch).mockResolvedValue({ data: { users } })
      const query = /* GraphQL */ '{ users { id, name } }'
      // Act
      const res = await $dataApi('graphql', query)
      // Assert
      expect(res).toStrictEqual({ data: { users } })
      expect(vi.mocked($fetch)).toBeCalledWith('/data-api/graphql', {
        method: 'POST',
        body: { query },
      })
    })
  })
})
