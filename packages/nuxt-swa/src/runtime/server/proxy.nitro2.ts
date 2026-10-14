import { defineEventHandler, getHeader, proxyRequest } from 'h3'

export default defineEventHandler(event => {
  const originalUrl = new URL(getHeader(event, 'x-ms-original-url')!)
  const targetUrl = new URL(event.path, originalUrl.origin)

  return proxyRequest(event, targetUrl.href)
})
