import { defineEventHandler } from 'nuxt/server'

export default defineEventHandler(event => {
  const originalUrl = new URL(event.req.headers.get('x-ms-original-url')!)
  const targetUrl = new URL(
    event.url.pathname + event.url.search,
    originalUrl.origin
  )

  const method = event.req.method || 'GET'
  const headers = new Headers(event.req.headers)
  headers.delete('host')
  const body =
    method === 'GET' || method === 'HEAD' ? undefined : event.req.body

  return fetch(targetUrl, {
    method,
    headers,
    body,
  })
})
