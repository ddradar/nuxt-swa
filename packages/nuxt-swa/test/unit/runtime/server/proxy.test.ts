// @vitest-environment node
import type { RequestEvent } from 'nuxt/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import proxyHandler from '~/src/runtime/server/proxy'

describe('runtime/server/proxy', () => {
  const fetchMock = vi.fn()

  beforeEach(() => {
    fetchMock.mockReset()
    vi.stubGlobal('fetch', fetchMock)
  })

  it.each([
    [
      {
        header: 'http://localhost:4280/playground/api',
        url: '/data-api/graphql',
        method: 'GET',
        body: '',
      },
      'http://localhost:4280/data-api/graphql',
      {
        method: 'GET',
        body: undefined,
      },
    ],
    [
      {
        header: 'https://proud-plant-0fe90bc00.4.azurestaticapps.net/',
        url: '/.auth/me',
        method: 'POST',
        body: 'payload',
      },
      'https://proud-plant-0fe90bc00.4.azurestaticapps.net/.auth/me',
      {
        method: 'POST',
        body: 'payload',
      },
    ],
  ])('(%o) proxies to %s', async (event, uri, request) => {
    const reqHeaders = new Headers({
      host: 'localhost:3000',
      'x-ms-original-url': event.header,
      'x-custom': 'value',
    })

    fetchMock.mockResolvedValue(new Response(null, { status: 200 }))

    // Act
    await proxyHandler({
      req: {
        headers: reqHeaders,
        method: event.method,
        body: event.body,
      },
      url: new URL(`http://localhost:3000${event.url}`),
    } as unknown as RequestEvent)

    // Assert
    expect(fetchMock).toHaveBeenCalledTimes(1)

    const [target, fetchOptions] = fetchMock.mock.calls[0] as [
      string | URL,
      RequestInit,
    ]
    expect(String(target)).toBe(uri)
    expect(fetchOptions.method).toBe(request.method)
    expect(fetchOptions.body).toBe(request.body)

    const fetchHeaders = fetchOptions.headers as Headers
    expect(fetchHeaders.get('host')).toBeNull()
    expect(fetchHeaders.get('x-custom')).toBe('value')
  })
})
