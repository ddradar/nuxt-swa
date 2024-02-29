import { defineEventHandler, getHeader, proxyRequest } from 'h3'
import { joinURL, parseURL } from 'ufo'

import { _originalUrlHeader } from '../constants'

export default defineEventHandler(event => {
  const originalUri = parseURL(getHeader(event, _originalUrlHeader))
  const domain = `${originalUri.protocol}//${originalUri.host}`

  return proxyRequest(event, joinURL(domain, event.path))
})
