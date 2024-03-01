import { defineEventHandler, getHeader, proxyRequest } from 'h3'
import { joinURL, parseURL } from 'ufo'

export default defineEventHandler(event => {
  // Avoid use _originalUrlHeader (in ../constants) to prevent build error in client application
  const originalUri = parseURL(getHeader(event, 'x-ms-original-url'))
  const domain = `${originalUri.protocol}//${originalUri.host}`

  return proxyRequest(event, joinURL(domain, event.path))
})
