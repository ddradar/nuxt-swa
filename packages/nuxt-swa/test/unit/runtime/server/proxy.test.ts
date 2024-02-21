// @vitest-environment node
import { getHeader, proxyRequest } from 'h3'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('h3', async () => ({
  ...(await vi.importActual('h3')),
  getHeader: vi.fn(),
  proxyRequest: vi.fn(),
}))

import proxyHandler from '~/src/runtime/server/proxy'

describe('runtime/server/proxy', () => {
  beforeEach(() => {
    vi.mocked(getHeader).mockClear()
    vi.mocked(proxyRequest).mockClear()
  })

  it.each([
    [
      {
        header: 'http://localhost:4280/playground/api',
        path: '/data-api/graphql',
      },
      'http://localhost:4280/data-api/graphql',
    ],
    [
      {
        header: 'https://proud-plant-0fe90bc00.4.azurestaticapps.net/',
        path: '/.auth/me',
      },
      'https://proud-plant-0fe90bc00.4.azurestaticapps.net/.auth/me',
    ],
  ])('(%o) proxies to %s', (event, uri) => {
    // Arrange
    vi.mocked(getHeader).mockReturnValue(event.header)
    // Act
    proxyHandler(event as any)
    // Assert
    expect(vi.mocked(getHeader)).toBeCalledWith(event, 'x-ms-original-url')
    expect(vi.mocked(proxyRequest)).toBeCalledWith(event, uri)
  })
})
