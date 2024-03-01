import { getHeader, type H3Event } from 'h3'

import { _clientPrincipalHeader } from '../../constants'
import type { ClientPrincipal } from '../../types'
import { parseClientPrincipal } from '../../utils/auth'

/**
 * Get user client principal data from request.
 * @param event H3Event
 * @returns Client Principal if parsed, otherwise null.
 */
export const getClientPrincipal = (event: H3Event): ClientPrincipal | null => {
  const header = getHeader(event, _clientPrincipalHeader)
  return parseClientPrincipal(header)
}

/**
 * Returns the user sending request has any of the specified roles or not.
 * @param event H3Event
 * @param roles User roles
 * @returns true if the user has any of the specified roles; false otherwise.
 */
export const hasRole = (
  event: H3Event,
  ...roles: Exclude<string, 'anonymous'>[]
): boolean => {
  const auth = getClientPrincipal(event)
  return !!auth?.userRoles.some(s =>
    roles.includes(s as (typeof roles)[number])
  )
}
